import { Metadata } from "next";
import { getDashboardMetrics } from "./actions";

export const metadata: Metadata = {
    title: "Dashboard overview - MidasCreed",
};

export default async function DashboardPage() {
    const { metrics, needsFollowUp } = await getDashboardMetrics();

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome to the MidasCreed pipeline dashboard.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {/* Placeholder for metrics */}
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Engagements</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{metrics.totalEngagements}</div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Leads Converted</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{metrics.leadsConverted}</div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Payments Done</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">{metrics.paymentsDone}</div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Revenue (USD)</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">${metrics.revenueUsd.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="font-semibold leading-none tracking-tight">Needs Follow-up</h3>
                        <p className="text-sm text-muted-foreground">Prospects with no interaction in &gt;8 days.</p>
                    </div>
                    <div className="p-6 pt-0">
                        {needsFollowUp.length === 0 ? (
                            <div className="text-sm text-muted-foreground">No prospects need follow-up.</div>
                        ) : (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {needsFollowUp.map(prospect => (
                                    <div key={prospect.id} className="flex flex-col gap-1 border-b pb-2">
                                        <span className="font-medium text-sm">{prospect.name}</span>
                                        <span className="text-xs text-muted-foreground">Last contacted: {prospect.lastContactAt?.toLocaleDateString() || 'Never'}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
