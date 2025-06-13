export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Try a simple query to test the database connection
    const count = await prisma.user.count()

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      userCount: count,
    })
  } catch (error) {
    console.error("Database connection error:", error)

    return NextResponse.json(
      {
        error: "Database connection failed",
        message: error instanceof Error ? error.message : "Unknown error",
        details: error instanceof Error ? error.stack : null,
      },
      { status: 500 },
    )
  }
}
