"use client";
import React, { useState } from "react";
import { CheckCircle2, Circle, Search, ArrowDownToLine } from "lucide-react";

const DUMMY_REPORTS = [
    { id: 1, client: "Acme Corp", date: "2026-07-02", type: "AI Audit Phase 1", url: "#" },
    { id: 2, client: "Globex Inc", date: "2026-06-28", type: "Web3 Transition Proposal", url: "#" },
    { id: 3, client: "Soylent", date: "2026-06-15", type: "Agentic Outreach Strategy", url: "#" },
    { id: 4, client: "Initech", date: "2026-05-30", type: "Q2 Engagement Findings", url: "#" },
    { id: 5, client: "Umbrella Corp", date: "2026-05-18", type: "AR Experience Brief", url: "#" }
];

export default function ReportsLibraryPage() {
    return (
        <div className="flex flex-col gap-6 max-w-5xl">
            <h1 className="text-3xl font-bold tracking-tight">Reports Library</h1>
            <p className="text-muted-foreground">Generated PDFs and proposal documents archived per engagement.</p>

            <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                <div className="p-4 border-b">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input type="search" placeholder="Search reports..." className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors pl-9" />
                    </div>
                </div>
                <div className="p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">Client</th>
                                <th className="px-6 py-3 font-medium">Document Type</th>
                                <th className="px-6 py-3 font-medium">Date Generated</th>
                                <th className="px-6 py-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {DUMMY_REPORTS.map((report) => (
                                <tr key={report.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{report.client}</td>
                                    <td className="px-6 py-4">{report.type}</td>
                                    <td className="px-6 py-4">{new Date(report.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <a href={report.url} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                            <ArrowDownToLine className="h-4 w-4" /> Download PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
