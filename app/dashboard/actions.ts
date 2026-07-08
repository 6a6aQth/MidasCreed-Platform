import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getDashboardMetrics() {
    const session = await auth();
    const assignedTo = session?.user?.assignedTo;

    const totalEngagements = await prisma.prospect.count();
    const leadsConverted = await prisma.prospect.count({
        where: {
            outcome: "won"
        }
    });

    const paidPayments = await prisma.payment.findMany({
        where: { paid: true }
    });

    const paymentsDone = paidPayments.length;
    const revenueUsd = paidPayments
        .filter(d => d.currency === "USD")
        .reduce((sum, d) => sum + Number(d.amount), 0);

    const candidates = await prisma.prospect.findMany({
        where: {
            replied: false,
            outcome: null,
        }
    });

    const now = new Date();
    const needsFollowUp = candidates.filter(p => {
        if (!p.followUp1Done && p.followUp1Date && p.followUp1Date < now) return true;
        if (p.followUp1Done && !p.followUp2Done && p.followUp2Date && p.followUp2Date < now) return true;
        if (p.followUp2Done && !p.breakupDone && p.breakupDate && p.breakupDate < now) return true;
        return false;
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
