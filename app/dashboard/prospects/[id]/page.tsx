import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function ProspectDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const prospect = await prisma.prospect.findUnique({
        where: { id: params.id }
    });

    if (!prospect) {
        notFound();
    }

    return (
        <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/prospects" className="text-muted-foreground hover:text-primary">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{prospect.name}</h1>
                    <p className="text-muted-foreground">Prospect Details & Entry Form.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 rounded-md border bg-card p-6">
                    <h2 className="text-xl font-semibold mb-4">Pipeline Status & Scoring</h2>
                    <form className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Pipeline Status</label>
                                <select name="status" defaultValue={prospect.status} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
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
                                <input type="number" min="1" max="10" defaultValue="5" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                            </div>
                        </div>

                        <div className="grid gap-2 mt-4">
                            <label className="text-sm font-medium">Internal Notes & Context</label>
                            <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Extracted signals, key talking points..." />
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                Save Details
                            </button>
                        </div>
                    </form>
                </div>

                <div className="rounded-md border bg-card p-6 flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">Metadata</h2>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Assigned To</span>
                        <span className="font-medium capitalize">{prospect.assignedTo}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Tier</span>
                        <span className="font-medium capitalize">{prospect.tier.replace('_', ' ')}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Source</span>
                        <span className="font-medium capitalize">{prospect.source.replace('_', ' ')}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Sector / Country</span>
                        <span className="font-medium capitalize">{prospect.sector || 'N/A'} / {prospect.country || 'N/A'}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block">Created At</span>
                        <span className="font-medium capitalize">{prospect.createdAt.toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
