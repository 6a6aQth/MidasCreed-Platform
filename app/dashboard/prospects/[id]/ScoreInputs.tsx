"use client";

import { useState } from "react";

export function ScoreInputs() {
    const [fit, setFit] = useState(0);
    const [signal, setSignal] = useState(0);

    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1">
                    <label className="text-xs font-medium text-muted-foreground">Fit Score (0–5)</label>
                    <input
                        type="number"
                        name="fit_score"
                        min={0}
                        max={5}
                        value={fit}
                        onChange={(e) => setFit(Math.min(5, Math.max(0, Number(e.target.value))))}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                </div>
                <div className="grid gap-1">
                    <label className="text-xs font-medium text-muted-foreground">Signal Score (0–5)</label>
                    <input
                        type="number"
                        name="signal_score"
                        min={0}
                        max={5}
                        value={signal}
                        onChange={(e) => setSignal(Math.min(5, Math.max(0, Number(e.target.value))))}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                </div>
            </div>
            <p className="text-sm text-muted-foreground">
                Combined: <span className="font-semibold text-foreground">{fit + signal}/10</span>
            </p>
        </div>
    );
}
