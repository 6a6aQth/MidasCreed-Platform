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

    const prospect = await prisma.prospect.create({
        data: { name, tier, source, sector, country, assignedTo, status: "sourced" }
    });

    redirect(`/dashboard/prospects/${prospect.id}`);
}

// ─── Update Prospect (status + optional deal) ──────────────────────────────────

export async function updateProspect(formData: FormData) {
    const session = await auth();
    const assignedTo = session?.user?.assignedTo;
    if (!assignedTo) throw new Error("Not authorized");

    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    const clientPaid = formData.get("client_paid") === "on";
    const dealAmount = formData.get("deal_amount") as string;
    const dealCurrency = formData.get("deal_currency") as string;
    const dealService = formData.get("deal_service") as string;

    const existing = await prisma.prospect.findUnique({
        where: { id },
        select: { deals: { select: { status: true } } },
    });

    // Create Deal row on first "client paid" tick
    if (clientPaid && dealAmount && existing) {
        const hasPaidDeal = existing.deals.some((d) => d.status === "paid");
        if (!hasPaidDeal) {
            await prisma.deal.create({
                data: {
                    prospectId: id,
                    serviceType: dealService || "one_time_build",
                    amount: parseFloat(dealAmount),
                    currency: dealCurrency || "USD",
                    status: "paid",
                },
            });
        }
    }

    await prisma.prospect.update({ where: { id }, data: { status } });

    revalidatePath(`/dashboard/prospects/${id}`);
    revalidatePath("/dashboard/prospects");
    revalidatePath("/dashboard");
}

// ─── Add Interaction (engagement log entry) ────────────────────────────────────

export async function addInteraction(formData: FormData) {
    const session = await auth();
    const assignedTo = session?.user?.assignedTo;
    if (!assignedTo) throw new Error("Not authorized");

    const prospectId = formData.get("prospectId") as string;
    const type = formData.get("type") as string;
    const direction = formData.get("direction") as string;
    const summary = formData.get("summary") as string;
    const fitScore = formData.get("fit_score") as string;
    const signalScore = formData.get("signal_score") as string;

    const scoreSuffix =
        fitScore || signalScore
            ? ` [Fit: ${fitScore || 0}/5, Signal: ${signalScore || 0}/5 → ${Number(fitScore || 0) + Number(signalScore || 0)}/10]`
            : "";

    await prisma.interaction.create({
        data: {
            prospectId,
            type,
            direction,
            summary: summary + scoreSuffix,
            loggedBy: assignedTo,
        },
    });

    await prisma.prospect.update({
        where: { id: prospectId },
        data: { lastContactAt: new Date() },
    });

    revalidatePath(`/dashboard/prospects/${prospectId}`);
}

// ─── Mark Follow-up Done + progressive scheduling ──────────────────────────────

export async function completeFollowUp(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Not authorized");

    const followUpId = formData.get("followUpId") as string;

    const fu = await prisma.followUp.update({
        where: { id: followUpId },
        data: { completed: true, completedAt: new Date() },
    });

    const now = new Date();

    if (fu.type === "follow_up_1") {
        const existingFu2 = await prisma.followUp.findFirst({
            where: { prospectId: fu.prospectId, type: "follow_up_2" },
        });
        if (!existingFu2) {
            const fu2Date = new Date(now);
            fu2Date.setDate(fu2Date.getDate() + 4);
            await prisma.followUp.create({
                data: { prospectId: fu.prospectId, dueDate: fu2Date, type: "follow_up_2" },
            });
        }
    }

    if (fu.type === "follow_up_2") {
        const existingBreakup = await prisma.followUp.findFirst({
            where: { prospectId: fu.prospectId, type: "breakup" },
        });
        if (!existingBreakup) {
            const breakupDate = new Date(now);
            breakupDate.setDate(breakupDate.getDate() + 7);
            await prisma.followUp.create({
                data: { prospectId: fu.prospectId, dueDate: breakupDate, type: "breakup" },
            });
        }
    }

    revalidatePath(`/dashboard/prospects/${fu.prospectId}`);
}
