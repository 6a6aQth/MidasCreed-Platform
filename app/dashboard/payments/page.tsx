"use client";
import React, { useState } from "react";
import { DollarSign, CheckCircle2, Circle, Ban } from "lucide-react";

const DUMMY_PAYMENTS = [
    { id: "INV-1001", client: "Acme Corp", type: "agent_work", amount: 25000, currency: "USD", invoiced: true, paid: true, date: "2026-06-01" },
    { id: "INV-1002", client: "Globex Inc", type: "ai_audit", amount: 5000, currency: "USD", invoiced: true, paid: false, date: "2026-06-15" },
    { id: "INV-1003", client: "Soylent", type: "agent_work", amount: 15000, currency: "EUR", invoiced: false, paid: false, date: "2026-07-01" },
    { id: "INV-1004", client: "Initech", type: "ai_audit", amount: 5000, currency: "USD", invoiced: true, paid: true, date: "2026-05-20" },
    { id: "INV-1005", client: "Umbrella Corp", type: "agent_work", amount: 45000, currency: "GBP", invoiced: true, paid: false, date: "2026-07-05" }
];

export default function GlobalPaymentsPage() {
    const [filterPaid, setFilterPaid] = useState<"all" | "paid" | "unpaid">("all");
    const [filterInvoiced, setFilterInvoiced] = useState<"all" | "invoiced" | "pending">("all");

    const filtered = DUMMY_PAYMENTS.filter(p => {
        if (filterPaid === "paid" && !p.paid) return false;
        if (filterPaid === "unpaid" && p.paid) return false;
        if (filterInvoiced === "invoiced" && !p.invoiced) return false;
        if (filterInvoiced === "pending" && p.invoiced) return false;
        return true;
    });

    const formatCurrency = (amt: number, cur: string) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(amt);
    };

    // calculate dummy totals
    const totalUSD = DUMMY_PAYMENTS.filter(p => p.currency === "USD").reduce((a, b) => a + b.amount, 0);
    const outstandingUSD = DUMMY_PAYMENTS.filter(p => p.currency === "USD" && !p.paid).reduce((a, b) => a + b.amount, 0);

    return (
        <div className="flex flex-col gap-6 max-w-6xl">
            <h1 className="text-3xl font-bold tracking-tight">Global Payments</h1>
            <p className="text-muted-foreground">Cross-prospect view of all invoices and revenue statuses.</p>

            {/* Top Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Revenue (USD)</h3>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{formatCurrency(totalUSD, "USD")}</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Outstanding (USD)</h3>
                        <Ban className="h-4 w-4 text-red-500/70" />
                    </div>
                    <div className="text-2xl font-bold text-red-500/90">{formatCurrency(outstandingUSD, "USD")}</div>
                </div>
                {/* Dummy layout for EUR/GBP... */}
            </div>

            <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                <div className="p-4 border-b flex gap-4">
                    <select
                        className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                        value={filterPaid} onChange={e => setFilterPaid(e.target.value as any)}
                    >
                        <option value="all">All Payment Status</option>
                        <option value="paid">Paid Only</option>
                        <option value="unpaid">Unpaid Only</option>
                    </select>
                    <select
                        className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                        value={filterInvoiced} onChange={e => setFilterInvoiced(e.target.value as any)}
                    >
                        <option value="all">All Invoice Status</option>
                        <option value="invoiced">Invoiced Only</option>
                        <option value="pending">Pending Invoice</option>
                    </select>
                </div>
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">Invoice ID</th>
                                <th className="px-6 py-3 font-medium">Client</th>
                                <th className="px-6 py-3 font-medium">Type</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium text-right">Amount</th>
                                <th className="px-6 py-3 font-medium text-center">Invoiced</th>
                                <th className="px-6 py-3 font-medium text-center">Paid</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filtered.map((p) => (
                                <tr key={p.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{p.id}</td>
                                    <td className="px-6 py-4 font-medium">{p.client}</td>
                                    <td className="px-6 py-4 capitalize">{p.type.replace('_', ' ')}</td>
                                    <td className="px-6 py-4">{new Date(p.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right font-medium">{formatCurrency(p.amount, p.currency)}</td>
                                    <td className="px-6 py-4 text-center">
                                        {p.invoiced ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /> : <Circle className="w-4 h-4 text-muted-foreground mx-auto" />}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {p.paid ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /> : <Circle className="w-4 h-4 text-muted-foreground mx-auto" />}
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">No payments match filters.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
