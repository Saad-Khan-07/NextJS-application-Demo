// app/api/clients/route.ts (or whatever path makes sense for this API)

import { NextResponse } from 'next/server'; // Import NextResponse
import { prisma } from "@/lib/prisma"; // Assuming your prisma client is exported from here

export async function GET() {
    try {
        const targetRole = "CLIENT"; // Using uppercase to match Prisma Enum convention if applicable

        // You should use Promise.all to fetch both data concurrently
        const [clients, clientCount] = await Promise.all([
            prisma.user.findMany({
                where: { role: targetRole } // Ensure 'role' here matches your Prisma Enum value (e.g., Role.CLIENT)
            }),
            prisma.user.count({
                where: { role: targetRole }
            })
        ]);

        return NextResponse.json({
            clients,
            clientCount
        }, { status: 200 }); // Return a NextResponse with your data and status
    } catch (error) {
        console.error("Error fetching clients:", error);
        return NextResponse.json({
            message: "Failed to fetch client data."
        }, { status: 500 }); // Return an error response
    }
}