"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createProspect(formData: FormData) {
    const session = await auth();
    const assignedTo = session?.user?.assignedTo;

    if (!assignedTo) {
        throw new Error("Not authorized");
    }

    const name = formData.get("name") as string;
    const tier = formData.get("tier") as string;
    const source = formData.get("source") as string;
    const sector = formData.get("sector") as string | null;
    const country = formData.get("country") as string | null;

    const prospect = await prisma.prospect.create({
        data: {
            name,
            tier,
            source,
            sector,
            country,
            assignedTo,
            status: "sourced"
        }
    });

    redirect(`/dashboard/prospects/${prospect.id}`);
}

export async function updateProspect(formData: FormData) {
    const session = await auth();
    const assignedTo = session?.user?.assignedTo;

    if (!assignedTo) {
        throw new Error("Not authorized");
    }

    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    const score = formData.get("score") as string;
    const notes = formData.get("notes") as string;

    // --- Meeting booked side-effect ---
    const meetingBooked = formData.get("meeting_booked") === "on";
    // --- Client paid side-effect ---
    const clientPaid = formData.get("client_paid") === "on";
    const dealAmount = formData.get("deal_amount") as string;
    const dealCurrency = formData.get("deal_currency") as string;
    const dealService = formData.get("deal_service") as string;

    // Fetch existing data to compare
    const existing = await prisma.prospect.findUnique({
        where: { id },
        include: {
            interactions: { orderBy: { occurredAt: "desc" }, take: 1 },
            followUps: true,
            deals: { orderBy: { date: "desc" }, take: 1 },
        },
    });

    if (!existing) throw new Error("Prospect not found");

    let newLastContactAt: Date | undefined;

    // 1. Notes → Interaction row + lastContactAt update
    if (notes) {
        await prisma.interaction.create({
            data: {
                prospectId: id,
                type: "meeting",
                direction: "outbound",
                summary: `[Score: ${score || "N/A"}] ${notes}`,
                loggedBy: assignedTo,
            },
        });
        newLastContactAt = new Date();
    }

    // 2. Meeting booked side-effect: create Interaction + schedule follow-ups if not already done
    if (meetingBooked && status === "meeting_booked") {
        const hasMeetingInteraction = existing.interactions.some(
            (i) => i.type === "meeting" && i.summary.startsWith("[meeting_booked]")
        );
        if (!hasMeetingInteraction) {
            const now = new Date();
            await prisma.interaction.create({
                data: {
                    prospectId: id,
                    type: "meeting",
                    direction: "outbound",
                    summary: "[meeting_booked] Meeting automatically logged on status change.",
                    loggedBy: assignedTo,
                },
            });
            newLastContactAt = now;

            // Auto-schedule follow-ups if none exist yet
            const hasFollowUps = existing.followUps.some(
                (f) => f.type === "follow_up_1" || f.type === "follow_up_2"
            );
            if (!hasFollowUps) {
                const fu1Date = new Date(now);
                fu1Date.setDate(fu1Date.getDate() + 4);
                const fu2Date = new Date(now);
                fu2Date.setDate(fu2Date.getDate() + 7);
                const breakupDate = new Date(fu2Date);
                breakupDate.setDate(breakupDate.getDate() + 4); // +4 from FU2 = +11 total

                await prisma.followUp.createMany({
                    data: [
                        { prospectId: id, dueDate: fu1Date, type: "follow_up_1" },
                        { prospectId: id, dueDate: fu2Date, type: "follow_up_2" },
                        { prospectId: id, dueDate: breakupDate, type: "breakup" },
                    ],
                });
            }
        }
    }

    // 3. Client paid side-effect: create a Deal row (once)
    if (clientPaid && dealAmount) {
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

    // 4. Update prospect record
    await prisma.prospect.update({
        where: { id },
        data: {
            status,
            ...(newLastContactAt && { lastContactAt: newLastContactAt }),
        },
    });

    revalidatePath(`/dashboard/prospects/${id}`);
    revalidatePath("/dashboard/prospects");
    revalidatePath("/dashboard");
}
