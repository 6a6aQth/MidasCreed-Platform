"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createProspect(formData: FormData) {
    const session = await auth();
    const assignedTo = session?.user?.assignedTo;

    if (!assignedTo) {
        throw new Error("Not authorized");
    }

    const name = formData.get("name") as string;
    const tier = formData.get("tier") as string;
    const source = formData.get("source") as string;
    const sector = formData.get("sector") as string | null;
    const country = formData.get("country") as string | null;

    const prospect = await prisma.prospect.create({
        data: {
            name,
            tier,
            source,
            sector,
            country,
            assignedTo,
            status: "sourced"
        }
    });

    redirect(`/dashboard/prospects/${prospect.id}`);
}
