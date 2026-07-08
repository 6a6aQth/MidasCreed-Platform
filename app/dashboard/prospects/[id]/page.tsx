import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { updateProspect } from "../actions";

export default async function ProspectDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const prospect = await prisma.prospect.findUnique({
        where: { id: params.id },
        include: {
            interactions: { orderBy: { occurredAt: "desc" } },
            followUps: { orderBy: { dueDate: "asc" } },
            deals: { orderBy: { date: "desc" } },
        },
    });

    if (!prospect) {
        notFound();
    }

    const hasPaidDeal = prospect.deals.some((d) => d.status === "paid");
    const isMeetingBooked = prospect.status === "meeting_booked" ||
        ["audit_done", "agent_built", "won"].includes(prospect.status);

    return (
        <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/prospects" className="text-muted-foreground hover:text-primary">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{prospect.name}</h1>
                    <p className="text-muted-foreground">Prospect Details &amp; Entry Form.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* --- Main Form --- */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <div className="rounded-md border bg-card p-6">
                        <h2 className="text-xl font-semibold mb-4">Pipeline Status &amp; Scoring</h2>
                        <form action={updateProspect} className="flex flex-col gap-4">
                            <input type="hidden" name="id" value={prospect.id} />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Pipeline Status</label>
                                    <select name="status" defaultValue={prospect.status} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                        <option value="sourced">Sourced</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="replied">Replied</option>
                                        <option value="meeting_booked">Meeting Booked</option>
                                        <option value="audit_done">Audit Done</option>
                                        <option value="agent_built">Agent Built</option>
                                        <option value="won">Won</option>
                                        <option value="dead">Dead</option>
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Fit / Signal Score (1-10)</label>
                                    <input type="number" name="score" min="1" max="10" defaultValue="5" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                                </div>
                            </div>

                            {/* Meeting booked checkbox */}
                            <div className="flex items-center gap-3 rounded-md border border-input bg-background px-3 py-3">
                                <input
                                    type="checkbox"
                                    id="meeting_booked"
                                    name="meeting_booked"
                                    defaultChecked={isMeetingBooked}
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <label htmlFor="meeting_booked" className="text-sm font-medium cursor-pointer">
                                    Meeting held — log interaction &amp; auto-schedule follow-ups
                                    <span className="text-muted-foreground ml-1 font-normal">(+4 / +7 / +11 days)</span>
                                </label>
                            </div>

                            {/* Client paid checkbox + deal fields */}
                            <div className="rounded-md border border-input bg-background px-3 py-3 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="client_paid"
                                        name="client_paid"
                                        defaultChecked={hasPaidDeal}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <label htmlFor="client_paid" className="text-sm font-medium cursor-pointer">
                                        Client paid — create Deal record
                                    </label>
                                </div>
                                {!hasPaidDeal && (
                                    <div className="grid grid-cols-3 gap-3 pl-7">
                                        <div className="grid gap-1">
                                            <label className="text-xs text-muted-foreground">Amount</label>
                                            <input type="number" step="0.01" name="deal_amount" placeholder="e.g. 500" className="flex h-9 w-full rounded-md border border-input bg-background px-2 py-1 text-sm" />
                                        </div>
                                        <div className="grid gap-1">
                                            <label className="text-xs text-muted-foreground">Currency</label>
                                            <select name="deal_currency" className="flex h-9 w-full rounded-md border border-input bg-background px-2 py-1 text-sm">
                                                <option value="USD">USD</option>
                                                <option value="MWK">MWK</option>
                                            </select>
                                        </div>
                                        <div className="grid gap-1">
                                            <label className="text-xs text-muted-foreground">Service Type</label>
                                            <select name="deal_service" className="flex h-9 w-full rounded-md border border-input bg-background px-2 py-1 text-sm">
                                                <option value="one_time_build">One-time Build</option>
                                                <option value="audit">Audit</option>
                                                <option value="managed_service">Managed Service</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                                {hasPaidDeal && (
                                    <p className="pl-7 text-xs text-muted-foreground">
                                        Deal already recorded: {prospect.deals[0].currency} {Number(prospect.deals[0].amount).toLocaleString()}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Internal Notes &amp; Context</label>
                                <textarea name="notes" className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Extracted signals, key talking points..." />
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                    Save Details
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Follow-ups panel */}
                    {prospect.followUps.length > 0 && (
                        <div className="rounded-md border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-3">Scheduled Follow-ups</h2>
                            <ul className="flex flex-col gap-2">
                                {prospect.followUps.map((fu) => (
                                    <li key={fu.id} className={`flex items-center justify-between text-sm rounded-md px-3 py-2 border ${fu.completed ? "opacity-50 line-through" : ""}`}>
                                        <span className="capitalize font-medium">{fu.type.replace(/_/g, " ")}</span>
                                        <span className="text-muted-foreground">{new Date(fu.dueDate).toLocaleDateString()}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${fu.completed ? "bg-green-100 text-green-700" : new Date(fu.dueDate) < new Date() ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                                            {fu.completed ? "Done" : new Date(fu.dueDate) < new Date() ? "Overdue" : "Pending"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Interaction log */}
                    {prospect.interactions.length > 0 && (
                        <div className="rounded-md border bg-card p-6">
                            <h2 className="text-lg font-semibold mb-3">Interaction Log</h2>
                            <ul className="flex flex-col gap-2">
                                {prospect.interactions.map((i) => (
                                    <li key={i.id} className="text-sm border rounded-md px-3 py-2">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-medium capitalize">{i.type} ({i.direction})</span>
                                            <span className="text-muted-foreground">{new Date(i.occurredAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-muted-foreground">{i.summary}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Metadata sidebar */}
                <div className="rounded-md border bg-card p-6 flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Metadata</h2>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Assigned To</span>
                        <span className="font-medium capitalize">{prospect.assignedTo}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Tier</span>
                        <span className="font-medium capitalize">{prospect.tier.replace(/_/g, " ")}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Source</span>
                        <span className="font-medium capitalize">{prospect.source.replace(/_/g, " ")}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Sector / Country</span>
                        <span className="font-medium capitalize">{prospect.sector || "N/A"} / {prospect.country || "N/A"}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Last Contact</span>
                        <span className="font-medium">{prospect.lastContactAt ? new Date(prospect.lastContactAt).toLocaleDateString() : "Never"}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Created At</span>
                        <span className="font-medium">{prospect.createdAt.toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
