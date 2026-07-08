import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getDashboardMetrics() {
    const session = await auth();
    const assignedTo = session?.user?.assignedTo;

    const totalEngagements = await prisma.interaction.count();
    const leadsConverted = await prisma.prospect.count({
        where: {
            status: "won"
        }
    });

    const paidDeals = await prisma.deal.findMany({
        where: { status: "paid" }
    });

    const paymentsDone = paidDeals.length;
    const revenueUsd = paidDeals
        .filter(d => d.currency === "USD")
        .reduce((sum, d) => sum + Number(d.amount), 0);

    const eightDaysAgo = new Date();
    eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

    const needsFollowUp = await prisma.prospect.findMany({
        where: {
            OR: [
                { lastContactAt: { lt: eightDaysAgo } },
                { lastContactAt: null, createdAt: { lt: eightDaysAgo } }
            ],
            status: { notIn: ["won", "dead"] }
        },
        orderBy: {
            lastContactAt: 'asc'
        }
    });

    return {
        metrics: {
            totalEngagements,
            leadsConverted,
            paymentsDone,
            revenueUsd
        },
        needsFollowUp
    };
}
