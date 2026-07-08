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
            interactions: true,
            followUps: true,
            deals: true,
        },
        orderBy: { createdAt: "desc" },
    });

    // Sheet 1 — Pipeline Overview
    const pipelineRows = prospects.map((p) => ({
        ID: p.id,
        Name: p.name,
        Tier: p.tier,
        Status: p.status,
        Sector: p.sector ?? "",
        Country: p.country ?? "",
        Source: p.source,
        AssignedTo: p.assignedTo,
        LastContactAt: p.lastContactAt ? new Date(p.lastContactAt).toISOString().split("T")[0] : "",
        CreatedAt: new Date(p.createdAt).toISOString().split("T")[0],
    }));

    // Sheet 2 — Interactions
    const interactionRows = prospects.flatMap((p) =>
        p.interactions.map((i) => ({
            ProspectName: p.name,
            ProspectID: p.id,
            Type: i.type,
            Direction: i.direction,
            Summary: i.summary,
            LoggedBy: i.loggedBy,
            OccurredAt: new Date(i.occurredAt).toISOString().split("T")[0],
        }))
    );

    // Sheet 3 — Deals
    const dealRows = prospects.flatMap((p) =>
        p.deals.map((d) => ({
            ProspectName: p.name,
            ProspectID: p.id,
            ServiceType: d.serviceType,
            Amount: Number(d.amount),
            Currency: d.currency,
            Status: d.status,
            Date: new Date(d.date).toISOString().split("T")[0],
        }))
    );

    // Sheet 4 — Follow-ups
    const followUpRows = prospects.flatMap((p) =>
        p.followUps.map((f) => ({
            ProspectName: p.name,
            ProspectID: p.id,
            Type: f.type,
            DueDate: new Date(f.dueDate).toISOString().split("T")[0],
            Completed: f.completed ? "Yes" : "No",
            CompletedAt: f.completedAt ? new Date(f.completedAt).toISOString().split("T")[0] : "",
        }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(pipelineRows), "Pipeline");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(interactionRows), "Interactions");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(dealRows), "Deals");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(followUpRows), "Follow-ups");

    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buf, {
        headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="midascreed-pipeline-${new Date().toISOString().split("T")[0]}.xlsx"`,
        },
    });
}
