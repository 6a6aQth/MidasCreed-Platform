import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { auth } from "@/auth";

export async function GET() {
    const session = await auth();
    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const prospects = await prisma.prospect.findMany({
        include: {
            payments: true,
        },
        orderBy: { createdAt: "desc" },
    });

    const pipelineRows = prospects.map((p) => ({
        ID: p.id,
        Name: p.name,
        Tier: p.tier,
        Stage: p.outcome === "dead" ? "Closed (Dead)" : (p.outcome ? "Payment" : (p.meetingDone ? "Resolution" : (p.replied ? "Traction" : "Engaging"))),
        Outcome: p.outcome ?? "",
        Sector: p.sector ?? "",
        Country: p.country ?? "",
        Source: p.source,
        AssignedTo: p.assignedTo,
        CreatedAt: new Date(p.createdAt).toISOString().split("T")[0],
    }));

    const paymentRows = prospects.flatMap((p) =>
        p.payments.map((pmt) => ({
            ProspectName: p.name,
            ProspectID: p.id,
            Type: pmt.type,
            Amount: Number(pmt.amount),
            Currency: pmt.currency,
            Invoiced: pmt.invoiced ? "Yes" : "No",
            Paid: pmt.paid ? "Yes" : "No",
            Date: new Date(pmt.date).toISOString().split("T")[0],
        }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(pipelineRows), "Prospects");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(paymentRows), "Payments");

    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buf, {
        headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="midascreed-pipeline-${new Date().toISOString().split("T")[0]}.xlsx"`,
        },
    });
}
