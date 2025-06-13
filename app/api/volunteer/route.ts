export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

const volunteerUpdateSchema = z.object({
  volunteer: z.boolean(),
  joinSubCommittee: z.boolean().optional(),
  volunteerSkills: z.array(z.string()).optional(),
  additionalContributions: z.string().optional().nullable(),
  committees: z.array(z.string()).optional(),
})

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Parse and validate the request body
    const body = await req.json()
    const validationResult = volunteerUpdateSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validationResult.error.format() },
        { status: 400 },
      )
    }

    const { volunteer, joinSubCommittee, volunteerSkills, additionalContributions, committees } = validationResult.data

    // Update user volunteer information
    await prisma.user.update({
      where: { id: userId },
      data: {
        volunteer,
        joinSubCommittee: joinSubCommittee || false,
        volunteerSkills: volunteerSkills || [],
        additionalContributions,
      },
    })

    // Update committee interests if provided
    if (committees && committees.length > 0) {
      // First, delete existing committee interests
      await prisma.committeeInterest.deleteMany({
        where: { userId },
      })

      // Then create new ones
      for (const committee of committees) {
        await prisma.committeeInterest.create({
          data: {
            userId,
            committee,
            skillMatch: 1, // Default match score
          },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating volunteer information:", error)
    return NextResponse.json({ error: "Failed to update volunteer information" }, { status: 500 })
  }
}
