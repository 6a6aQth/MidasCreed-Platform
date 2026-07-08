import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Plus } from "lucide-react";

const prisma = new PrismaClient();

export default async function ProspectsPage(props: {
    searchParams: Promise<{ tier?: string, status?: string, mineOnly?: string }>
}) {
    const searchParams = await props.searchParams;
    const session = await auth();

    // Built simple filtering
    const whereClause: any = {};
    if (searchParams.tier) whereClause.tier = searchParams.tier;
    if (searchParams.status) whereClause.status = searchParams.status;
    if (searchParams.mineOnly === "true") whereClause.assignedTo = session?.user?.assignedTo;

    const prospects = await prisma.prospect.findMany({
        where: whereClause,
        orderBy: { updatedAt: 'desc' }
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Prospects</h1>
                    <p className="text-muted-foreground">Manage your deals and prospects.</p>
                </div>
                <Link
                    href="/dashboard/prospects/new"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Prospect
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="text-xs uppercase bg-muted/50 border-b">
                            <tr>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Tier</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Assigned</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prospects.map((prospect) => (
                                <tr key={prospect.id} className="border-b hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{prospect.name}</td>
                                    <td className="px-6 py-4">{prospect.tier.replace('_', ' ')}</td>
                                    <td className="px-6 py-4">{prospect.status.replace('_', ' ')}</td>
                                    <td className="px-6 py-4 capitalize">{prospect.assignedTo}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/dashboard/prospects/${prospect.id}`} className="text-primary hover:underline">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {prospects.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No prospects found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
