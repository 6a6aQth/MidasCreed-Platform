"use client";
import React from "react";
import { Target, Award, ListChecks } from "lucide-react";

export default function ProofPointsPage() {
    const DUMMY_PROOF_POINTS = [
        {
            id: 1,
            clientType: "Fintech Startup",
            problem: "Manual customer onboarding taking 4 days and requiring intense human verification.",
            result: "Implemented Agentic verification pipeline; onboarding reduced to 15 minutes with 0% false positives.",
            name: "Anonymized (Series A Fintech)"
        },
        {
            id: 2,
            clientType: "Retail Enterprise",
            problem: "Inventory logistics software failing to predict stockouts reliably.",
            result: "Deployed AI predictive modeling. Stockout rate plummeted by 84% over Q3.",
            name: "Globex Retail Corp"
        },
        {
            id: 3,
            clientType: "Real Estate Firm",
            problem: "Static 2D image galleries generating low engagement for premium pre-construction properties.",
            result: "Integrated WebGL 3D architectural viewer. Client inquiries skyrocketed by 300%.",
            name: "Prime Developments"
        }
    ];

    return (
        <div className="flex flex-col gap-6 max-w-5xl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Proof Points repository</h1>
                    <p className="text-muted-foreground">Managed case studies referenced by AI outreach prompts and social media logic.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:bg-primary/90">
                    Add Case Study
                </button>
            </div>

            <div className="grid gap-6">
                {DUMMY_PROOF_POINTS.map((proof) => (
                    <div key={proof.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <div className="flex items-start justify-between">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Award className="w-5 h-5 text-amber-500" />
                                {proof.clientType}
                                <span className="text-sm font-normal text-muted-foreground ml-2">({proof.name})</span>
                            </h3>
                            <button className="text-sm text-primary hover:underline">Edit</button>
                        </div>
                        <div className="mt-4 grid md:grid-cols-2 gap-4">
                            <div className="bg-muted/30 p-4 rounded-md border border-red-500/10">
                                <h4 className="text-sm font-semibold text-red-500 flex items-center gap-2 mb-2">
                                    <Target className="w-4 h-4" /> The Problem
                                </h4>
                                <p className="text-sm text-foreground/80 leading-relaxed">{proof.problem}</p>
                            </div>
                            <div className="bg-muted/30 p-4 rounded-md border border-green-500/10">
                                <h4 className="text-sm font-semibold text-green-500 flex items-center gap-2 mb-2">
                                    <ListChecks className="w-4 h-4" /> The Result
                                </h4>
                                <p className="text-sm text-foreground/80 leading-relaxed">{proof.result}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
