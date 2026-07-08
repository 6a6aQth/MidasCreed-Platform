"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// ─── Create Prospect ───────────────────────────────────────────────────────────

export async function createProspect(formData: FormData) {
    const session = await auth();
    const assignedTo = session?.user?.assignedTo;
    if (!assignedTo) throw new Error("Not authorized");

    const name = formData.get("name") as string;
    const tier = formData.get("tier") as string;
    const source = formData.get("source") as string;
    const sector = formData.get("sector") as string | null;
    const country = formData.get("country") as string | null;
    const fitRaw = formData.get("fitScore");
    const signalRaw = formData.get("signalScore");
    const fitScore = fitRaw !== null && fitRaw !== "" ? parseInt(fitRaw as string, 10) : null;
    const signalScore = signalRaw !== null && signalRaw !== "" ? parseInt(signalRaw as string, 10) : null;

    const prospect = await prisma.prospect.create({
        data: { name, tier, source, sector, country, assignedTo, fitScore, signalScore }
    });

    redirect(`/dashboard/prospects/${prospect.id}`);
}

// ─── Update Fields (Stage Generic) ──────────────────────────────────────────────

export async function updateProspectField(id: string, data: any) {
    const session = await auth();
    if (!session?.user) throw new Error("Not authorized");

    await prisma.prospect.update({
        where: { id },
        data
    });

    revalidatePath(`/dashboard/prospects/${id}`);
    revalidatePath("/dashboard/prospects");
    revalidatePath("/dashboard");

    // Force Next.js to navigate to the clean URL, stripping any ?edit= state
    redirect(`/dashboard/prospects/${id}`);
}

const OFFSET_FU1_DAYS = 4;
const OFFSET_FU2_DAYS = 7;
const OFFSET_BREAKUP_DAYS = 11;

export async function setFirstContact(formData: FormData) {
    const prospectId = formData.get("prospectId") as string;
    const contactChannel = formData.get("contactChannel") as string;
    const dateStr = formData.get("date") as string;

    // Use the provided date, or default to current local time if somehow missing
    const userDate = dateStr ? new Date(dateStr) : new Date();

    // Check if the parsed userDate is valid, fallback to now if invalid
    const now = isNaN(userDate.getTime()) ? new Date() : userDate;

    const followUp1Date = new Date(now);
    followUp1Date.setDate(followUp1Date.getDate() + OFFSET_FU1_DAYS);

    await updateProspectField(prospectId, {
        firstContactDate: now,
        contactChannel,
        followUp1Date
    });

    redirect(`/dashboard/prospects/${prospectId}`);
}

export async function setFollowUpDate(formData: FormData) {
    const prospectId = formData.get("prospectId") as string;
    const field = formData.get("field") as string; // followUp1Date, followUp2Date, breakupDate
    const dateStr = formData.get("date") as string;
    if (!dateStr) return;
    await updateProspectField(prospectId, { [field]: new Date(dateStr) });
}

export async function markFollowUpDone(formData: FormData) {
    const prospectId = formData.get("prospectId") as string;
    const field = formData.get("field") as string; // followUp1Done, followUp2Done, breakupDone

    const updateData: any = { [field]: true };
    const now = new Date();

    if (field === "followUp1Done") {
        const nextDate = new Date(now);
        nextDate.setDate(nextDate.getDate() + OFFSET_FU2_DAYS);
        updateData.followUp2Date = nextDate;
    } else if (field === "followUp2Done") {
        const nextDate = new Date(now);
        nextDate.setDate(nextDate.getDate() + OFFSET_BREAKUP_DAYS);
        updateData.breakupDate = nextDate;
    }
    // breakupDone: sequence simply stops, no outcome is auto-set

    await updateProspectField(prospectId, updateData);
}

export async function markReplied(formData: FormData) {
    const prospectId = formData.get("prospectId") as string;
    await updateProspectField(prospectId, { replied: true });
}

export async function saveMeeting(formData: FormData) {
    const prospectId = formData.get("prospectId") as string;
    const dateStr = formData.get("date") as string;
    const timeStr = formData.get("time") as string;
    const meetingType = formData.get("meetingType") as string | null;
    const meetingLocation = formData.get("meetingLocation") as string | null;
    const done = formData.get("done") === "on";

    const data: any = { meetingDone: done };
    if (dateStr) data.meetingDate = new Date(dateStr);
    // Combine date + time into meetingTime if both provided
    if (dateStr && timeStr) {
        data.meetingTime = new Date(`${dateStr}T${timeStr}`);
    } else if (dateStr) {
        data.meetingTime = new Date(dateStr);
    }
    if (meetingType) data.meetingType = meetingType;
    if (meetingLocation !== null) data.meetingLocation = meetingLocation;

    await updateProspectField(prospectId, data);
}

export async function saveOutcome(formData: FormData) {
    const prospectId = formData.get("prospectId") as string;
    const outcome = formData.get("outcome") as string;
    const agentDescription = formData.get("agentDescription") as string;
    await updateProspectField(prospectId, { outcome, agentDescription });
}

export async function updateScores(prospectId: string, fitScore: number, signalScore: number) {
    await updateProspectField(prospectId, { fitScore, signalScore });
}

export async function revertStage(prospectId: string, toStage: "first_contact" | "replied" | "meeting") {
    // Determine what to wipe depending on how far back we go.
    // If we revert to first_contact: wipe replied, meeting, outcome
    // If we revert to replied: wipe meeting, outcome
    // If we revert to meeting: wipe outcome
    const data: any = { outcome: null, agentDescription: null };

    if (toStage === "replied" || toStage === "first_contact") {
        data.meetingDone = false;
        data.meetingDate = null;
        data.meetingTime = null;
        data.meetingType = null;
        data.meetingLocation = null;
    }

    if (toStage === "first_contact") {
        data.replied = false;
    }

    await updateProspectField(prospectId, data);
}

// ─── Payment Actions ───────────────────────────────────────────────────────────

export async function addPayment(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Not authorized");

    const prospectId = formData.get("prospectId") as string;
    const type = formData.get("type") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const currency = formData.get("currency") as string;

    await prisma.payment.create({
        data: {
            prospectId,
            type,
            amount,
            currency,
        }
    });

    revalidatePath(`/dashboard/prospects/${prospectId}`);
    revalidatePath("/dashboard");
}

export async function togglePaymentStatus(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Not authorized");

    const paymentId = formData.get("paymentId") as string;
    const field = formData.get("field") as "invoiced" | "paid";
    const prospectId = formData.get("prospectId") as string;

    const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
    if (!payment) return;

    await prisma.payment.update({
        where: { id: paymentId },
        data: { [field]: !payment[field] }
    });

    revalidatePath(`/dashboard/prospects/${prospectId}`);
    revalidatePath("/dashboard");
}
