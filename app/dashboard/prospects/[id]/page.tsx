import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import {
    setFirstContact,
    setFollowUpDate,
    markFollowUpDone,
    markReplied,
    saveOutcome,
    addPayment,
    togglePaymentStatus,
    revertStage
} from "../actions";
import { Stage2TractionForm } from "./Stage2TractionForm";

const inputCls = "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm";
const selectCls = inputCls;
const btnPrimary = "inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2";
const btnOutline = "inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent h-9 px-4 py-2";
const btnSmall = "inline-flex items-center justify-center rounded-md text-xs font-medium border border-input bg-background hover:bg-accent h-7 px-3 py-1";

export default async function ProspectDetailPage(props: any) {
    const params = await props.params;
    const searchParams = props.searchParams ? await props.searchParams : {};
    const prospect = await prisma.prospect.findUnique({
        where: { id: params.id },
        include: { payments: { orderBy: { date: "desc" } } }
    });

    if (!prospect) notFound();

    // Progression rules
    const isEngaging = !prospect.replied && !prospect.meetingDone;
    const isTraction = prospect.replied && !prospect.meetingDone;
    const isResolution = prospect.meetingDone && !prospect.outcome;
    const isPayment = prospect.outcome === "agent_work" || prospect.outcome === "ai_audit";
    const isDead = prospect.outcome === "dead_lead";

    // Determine which stage to show currently
    let activeStage = 0;
    if (isEngaging) activeStage = 1;
    else if (isTraction) activeStage = 2;
    else if (isResolution) activeStage = 3;
    else if (isPayment) activeStage = 4;
    else if (isDead) activeStage = 5;

    // Override from ?edit URL 
    if (searchParams?.edit === "1") activeStage = 1;
    if (searchParams?.edit === "2") activeStage = 2;
    if (searchParams?.edit === "3") activeStage = 3;

    const showStage1 = activeStage === 1;
    const showStage2 = activeStage === 2;
    const showStage3 = activeStage === 3;
    const showStage4 = activeStage === 4;

    return (
        <div className="flex flex-col gap-6 max-w-4xl pb-16">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/prospects" className="text-muted-foreground hover:text-primary">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{prospect.name}</h1>
                    <p className="text-muted-foreground">Prospect Tracker</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 flex flex-col gap-4">

                    {/* Historical Context (Collapsed completed stages) */}
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground bg-accent/30 p-4 rounded-md border border-border/50">
                        {prospect.firstContactDate && (
                            <Link href="?edit=1" scroll={false} className="hover:text-foreground transition-colors hover:underline" title="Click to edit Stage 1">
                                First contact: {prospect.firstContactDate.toLocaleDateString()} {prospect.contactChannel && `(${prospect.contactChannel})`}
                            </Link>
                        )}
                        {prospect.replied && (
                            <Link href="?edit=2" scroll={false} className="hover:text-foreground transition-colors hover:underline" title="Click to edit Stage 2">
                                · Replied: Yes
                            </Link>
                        )}
                        {prospect.meetingDone && prospect.meetingDate && (
                            <Link href="?edit=2" scroll={false} className="hover:text-foreground transition-colors hover:underline" title="Click to edit Meeting details">
                                · Meeting: {prospect.meetingDate.toLocaleDateString()}
                                {prospect.meetingTime && ` @ ${prospect.meetingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                                {prospect.meetingType && ` (${prospect.meetingType.replace('_', ' ')})`}
                                {prospect.meetingLocation && ` — ${prospect.meetingLocation}`}
                            </Link>
                        )}
                        {prospect.outcome && (
                            <Link href="?edit=3" scroll={false} className="hover:text-foreground transition-colors hover:underline capitalize" title="Click to edit Outcome">
                                · Outcome: {prospect.outcome.replace('_', ' ')}
                            </Link>
                        )}
                        {!prospect.firstContactDate && <span>No historical interaction recorded yet.</span>}
                    </div>

                    {/* Stage 1: Engaging */}
                    {showStage1 && (
                        <div className="rounded-md border bg-card p-6 shadow-sm border-primary/20">
                            <h2 className="text-xl font-semibold mb-4">Stage 1: Engaging</h2>
                            <div className="flex flex-col gap-6">
                                {/* First Contact */}
                                <div className="p-3 border rounded-md flex flex-col gap-3 bg-muted/20">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">First Contact Date</span>
                                        {prospect.firstContactDate && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded text-nowrap">Done</span>}
                                    </div>
                                    {!prospect.firstContactDate ? (
                                        <form action={setFirstContact} className="flex gap-4 items-end">
                                            <input type="hidden" name="prospectId" value={prospect.id} />
                                            <div className="grid gap-1.5 flex-1">
                                                <input type="date" name="date" defaultValue={(prospect.firstContactDate || new Date()).toISOString().split('T')[0]} className={`${inputCls} opacity-90`} />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">Channel:</span>
                                                <select name="contactChannel" required className={`${inputCls} w-36`} defaultValue={prospect.contactChannel || ""}>
                                                    <option value="">— Select —</option>
                                                    <option value="Email">Email</option>
                                                    <option value="LinkedIn">LinkedIn</option>
                                                    <option value="WhatsApp DM">WhatsApp DM</option>
                                                </select>
                                            </div>
                                            <button type="submit" className={btnPrimary}>Save</button>
                                        </form>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">Recorded: {prospect.firstContactDate.toLocaleDateString()}</span>
                                    )}
                                </div>

                                {/* Follow Up 1 */}
                                {prospect.firstContactDate && (
                                    <div className="p-3 border rounded-md flex flex-col gap-3 bg-muted/20">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Follow Up 1</span>
                                            {prospect.followUp1Done && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded text-nowrap">Done</span>}
                                        </div>
                                        {!prospect.followUp1Done ? (
                                            <div className="flex gap-4 items-end">
                                                <div className="grid gap-1.5 flex-1">
                                                    <label className="text-xs font-medium text-muted-foreground">Scheduled Date (Auto)</label>
                                                    <input type="date" disabled readOnly value={prospect.followUp1Date?.toISOString().split('T')[0] || ''} className={`${inputCls} opacity-70 bg-muted cursor-not-allowed`} />
                                                </div>
                                                <form action={markFollowUpDone}>
                                                    <input type="hidden" name="prospectId" value={prospect.id} />
                                                    <input type="hidden" name="field" value="followUp1Done" />
                                                    <button type="submit" className={btnPrimary}>Mark Done</button>
                                                </form>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">Scheduled: {prospect.followUp1Date?.toLocaleDateString()}</span>
                                        )}
                                    </div>
                                )}

                                {/* Follow Up 2 */}
                                {prospect.followUp1Done && (
                                    <div className="p-3 border rounded-md flex flex-col gap-3 bg-muted/20">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Follow Up 2</span>
                                            {prospect.followUp2Done && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded text-nowrap">Done</span>}
                                        </div>
                                        {!prospect.followUp2Done ? (
                                            <div className="flex gap-4 items-end">
                                                <div className="grid gap-1.5 flex-1">
                                                    <label className="text-xs font-medium text-muted-foreground">Scheduled Date (Auto)</label>
                                                    <input type="date" disabled readOnly value={prospect.followUp2Date?.toISOString().split('T')[0] || ''} className={`${inputCls} opacity-70 bg-muted cursor-not-allowed`} />
                                                </div>
                                                <form action={markFollowUpDone}>
                                                    <input type="hidden" name="prospectId" value={prospect.id} />
                                                    <input type="hidden" name="field" value="followUp2Done" />
                                                    <button type="submit" className={btnPrimary}>Mark Done</button>
                                                </form>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">Scheduled: {prospect.followUp2Date?.toLocaleDateString()}</span>
                                        )}
                                    </div>
                                )}

                                {/* Breakup */}
                                {prospect.followUp2Done && (
                                    <div className="p-3 border rounded-md flex flex-col gap-3 bg-muted/20">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Breakup Message</span>
                                            {prospect.breakupDone && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded text-nowrap">Done</span>}
                                        </div>
                                        {!prospect.breakupDone ? (
                                            <div className="flex gap-4 items-end">
                                                <div className="grid gap-1.5 flex-1">
                                                    <label className="text-xs font-medium text-muted-foreground">Scheduled Date (Auto)</label>
                                                    <input type="date" disabled readOnly value={prospect.breakupDate?.toISOString().split('T')[0] || ''} className={`${inputCls} opacity-70 bg-muted cursor-not-allowed`} />
                                                </div>
                                                <form action={markFollowUpDone}>
                                                    <input type="hidden" name="prospectId" value={prospect.id} />
                                                    <input type="hidden" name="field" value="breakupDone" />
                                                    <button type="submit" className={btnPrimary}>Mark Done</button>
                                                </form>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">Scheduled: {prospect.breakupDate?.toLocaleDateString()}</span>
                                        )}
                                    </div>
                                )}

                                <div className="mt-4 pt-4 border-t flex justify-end">
                                    <form action={markReplied}>
                                        <input type="hidden" name="prospectId" value={prospect.id} />
                                        <button type="submit" className={btnPrimary}>Client Replied (Move to Stage 2)</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Stage 2: Traction */}
                    {showStage2 && (
                        <Stage2TractionForm prospect={prospect} />
                    )}

                    {/* Stage 3: Resolution */}
                    {showStage3 && (
                        <div className="rounded-md border bg-card p-6 shadow-sm border-primary/20">
                            <h2 className="text-xl font-semibold mb-4">Stage 3: Resolution</h2>
                            <form action={saveOutcome} className="flex flex-col gap-4">
                                <input type="hidden" name="prospectId" value={prospect.id} />
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Determine Outcome</label>
                                    <select name="outcome" className={selectCls} required defaultValue="">
                                        <option value="" disabled>Select an outcome...</option>
                                        <option value="ai_audit">AI Audit</option>
                                        <option value="agent_work">Agent Work</option>
                                        <option value="dead_lead">Dead Lead</option>
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Description (Optional)</label>
                                    <textarea name="agentDescription" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm" placeholder="Describe the outcome details..."></textarea>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button type="submit" className={btnPrimary}>Finalize Outcome</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {isDead && (
                        <div className="rounded-md border bg-card p-6 text-center text-muted-foreground">
                            This prospect is closed (Dead outcome). No further actions required.
                        </div>
                    )}

                    {/* Stage 4: Payment */}
                    {showStage4 && (
                        <div className="flex flex-col gap-6">
                            <div className="rounded-md border bg-card p-6 shadow-sm border-green-500/20">
                                <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
                                    <span>Stage 4: Revenue &amp; Payments</span>
                                </h2>

                                {prospect.payments.length > 0 ? (
                                    <div className="flex flex-col gap-3 mb-6">
                                        {prospect.payments.map(p => (
                                            <div key={p.id} className="flex items-center justify-between p-3 border rounded-md">
                                                <div>
                                                    <div className="font-medium">{p.currency} {Number(p.amount).toLocaleString()}</div>
                                                    <div className="text-xs text-muted-foreground capitalize">{p.type.replace('_', ' ')}</div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <form action={togglePaymentStatus} className="flex items-center gap-1">
                                                        <input type="hidden" name="paymentId" value={p.id} />
                                                        <input type="hidden" name="prospectId" value={prospect.id} />
                                                        <input type="hidden" name="field" value="invoiced" />
                                                        <button type="submit" className={`text-xs px-2 py-1 border rounded-md ${p.invoiced ? 'bg-blue-100/50 text-blue-700 border-blue-200' : 'bg-background text-muted-foreground'}`}>
                                                            {p.invoiced ? 'Invoiced' : 'Pending Invoice'}
                                                        </button>
                                                    </form>
                                                    <form action={togglePaymentStatus} className="flex items-center gap-1">
                                                        <input type="hidden" name="paymentId" value={p.id} />
                                                        <input type="hidden" name="prospectId" value={prospect.id} />
                                                        <input type="hidden" name="field" value="paid" />
                                                        <button type="submit" className={`text-xs px-2 py-1 border rounded-md ${p.paid ? 'bg-green-100/50 text-green-700 border-green-200' : 'bg-background text-muted-foreground'}`}>
                                                            {p.paid ? 'Paid' : 'Pending Payment'}
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground mb-6 pb-6 border-b">No payments recorded yet.</p>
                                )}

                                <form action={addPayment} className="flex flex-col gap-4 bg-muted/20 p-4 rounded-md border">
                                    <h3 className="text-sm font-semibold">New Payment</h3>
                                    <input type="hidden" name="prospectId" value={prospect.id} />
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <div className="grid gap-1.5 md:col-span-2">
                                            <label className="text-xs font-medium">Type</label>
                                            <select name="type" className={selectCls}>
                                                <option value="one_time">One-time Build Fee</option>
                                                <option value="monthly_retainer">Monthly Retainer</option>
                                            </select>
                                        </div>
                                        <div className="grid gap-1.5">
                                            <label className="text-xs font-medium">Currency</label>
                                            <select name="currency" className={selectCls}>
                                                <option value="USD">USD</option>
                                                <option value="MWK">MWK</option>
                                            </select>
                                        </div>
                                        <div className="grid gap-1.5">
                                            <label className="text-xs font-medium">Amount</label>
                                            <input type="number" step="0.01" name="amount" required className={inputCls} placeholder="e.g. 500" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button type="submit" className={btnPrimary}>Add Payment Record</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Metadata sidebar ──────────────────────────────────── */}
                <div className="rounded-md border bg-card p-6 flex flex-col gap-4 h-fit">
                    <h2 className="text-lg font-semibold border-b pb-2">Metadata</h2>
                    <div className="text-sm">
                        <span className="text-muted-foreground block text-xs">Assigned To</span>
                        <span className="font-medium capitalize">{prospect.assignedTo}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block text-xs">Tier</span>
                        <span className="font-medium capitalize">{prospect.tier.replace(/_/g, " ")}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block text-xs">Source</span>
                        <span className="font-medium capitalize">{prospect.source.replace(/_/g, " ")}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block text-xs">Sector / Country</span>
                        <span className="font-medium capitalize">{prospect.sector || "N/A"} / {prospect.country || "N/A"}</span>
                    </div>
                    <div className="text-sm">
                        <span className="text-muted-foreground block text-xs">Creation Date</span>
                        <span className="font-medium">{prospect.createdAt.toLocaleDateString()}</span>
                    </div>

                    <div className="text-sm pt-4 border-t text-muted-foreground mt-2">
                        <p className="text-xs mb-2">Proposal / Report PDF:</p>
                        <form action={async (formData) => {
                            "use server";
                            await updateProspectField(prospect.id, { reportUrl: formData.get("reportUrl") as string });
                        }} className="flex gap-2">
                            <input
                                type="url"
                                name="reportUrl"
                                defaultValue={prospect.reportUrl || ""}
                                placeholder="https://drive.google.com/..."
                                className="flex h-8 w-full rounded-md border border-input bg-background px-2 text-xs"
                            />
                            <button type="submit" className="rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 h-8 text-xs font-medium">Save</button>
                        </form>
                    </div>

                    <div className="text-sm pt-4 border-t text-muted-foreground mt-2">
                        <p className="text-xs mb-1">Qualifying Scores:</p>
                        <span className="font-medium text-foreground">Fit {prospect.fitScore || 0}/5 · Signal {prospect.signalScore || 0}/5</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
