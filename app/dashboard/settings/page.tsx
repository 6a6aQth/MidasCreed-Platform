"use client";
import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { SlidersHorizontal, Users, TimerReset, TrendingUp } from "lucide-react";

const PIPELINE_VELOCITY = [
    { month: "Feb", prospects: 4, converted: 1 },
    { month: "Mar", prospects: 7, converted: 2 },
    { month: "Apr", prospects: 9, converted: 3 },
    { month: "May", prospects: 12, converted: 4 },
    { month: "Jun", prospects: 11, converted: 3 },
    { month: "Jul", prospects: 6, converted: 2 },
];

const STAGE_FUNNEL = [
    { name: "Engaging", count: 14 },
    { name: "Traction", count: 8 },
    { name: "Resolution", count: 4 },
    { name: "Closed Won", count: 3 },
];

const TEAM_MEMBERS = [
    { id: 1, name: "Baron", role: "Founder", active: true },
    { id: 2, name: "Aisha", role: "Account Manager", active: true },
    { id: 3, name: "Liam", role: "Technical Advisor", active: false },
];

export default function SettingsPage() {
    const [fu1Days, setFu1Days] = useState(4);
    const [fu2Days, setFu2Days] = useState(7);
    const [breakupDays, setBreakupDays] = useState(11);

    return (
        <div className="flex flex-col gap-8 max-w-5xl pb-16">
            <h1 className="text-3xl font-bold tracking-tight">Settings & Analytics</h1>

            {/* Analytics Section */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" /> Pipeline Analytics
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border bg-card shadow-sm p-6">
                        <h3 className="font-medium text-sm text-muted-foreground mb-4">Monthly Prospects vs. Conversions</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={PIPELINE_VELOCITY}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                                <Legend />
                                <Bar dataKey="prospects" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="converted" fill="hsl(var(--primary) / 0.4)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="rounded-lg border bg-card shadow-sm p-6">
                        <h3 className="font-medium text-sm text-muted-foreground mb-4">Stage Funnel (Current Month)</h3>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={STAGE_FUNNEL}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                                <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.15)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            {/* Workflow Constants Section */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <TimerReset className="h-5 w-5" /> Follow-Up Day Offsets
                </h2>
                <div className="rounded-lg border bg-card shadow-sm p-6 grid md:grid-cols-3 gap-6">
                    {[
                        { label: "Follow Up 1", state: fu1Days, setter: setFu1Days },
                        { label: "Follow Up 2", state: fu2Days, setter: setFu2Days },
                        { label: "Breakup Email", state: breakupDays, setter: setBreakupDays },
                    ].map(({ label, state, setter }) => (
                        <div key={label} className="flex flex-col gap-2">
                            <label className="text-sm font-medium">{label}</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    min={1} max={30}
                                    value={state}
                                    onChange={e => setter(Number(e.target.value))}
                                    className="flex h-9 w-24 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                                />
                                <span className="text-sm text-muted-foreground">days after contact</span>
                            </div>
                        </div>
                    ))}
                    <div className="md:col-span-3 pt-2">
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:bg-primary/90">
                            Save Constants (dummy)
                        </button>
                    </div>
                </div>
            </section>

            {/* Team Management Section */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5" /> Team Members
                </h2>
                <div className="rounded-lg border bg-card shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium">Name</th>
                                <th className="px-6 py-3 text-left font-medium">Role</th>
                                <th className="px-6 py-3 text-center font-medium">Active</th>
                                <th className="px-6 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {TEAM_MEMBERS.map((member) => (
                                <tr key={member.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{member.name}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{member.role}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${member.active ? "bg-green-500/15 text-green-600" : "bg-muted text-muted-foreground"}`}>
                                            {member.active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs text-primary hover:underline">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="p-4 border-t">
                        <button className="text-sm text-primary hover:underline">+ Invite team member</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
