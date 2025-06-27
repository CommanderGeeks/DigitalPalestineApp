import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { RegionKey } from "@/data/types"

export interface VillageSubmission {
  villageName: string
  regionKey: RegionKey
  coordinates: {
    x: number
    y: number
  }
  submittedAt: string
  id?: string
  status?: 'pending' | 'reviewed' | 'added'
}

export async function POST(request: NextRequest) {
  try {
    const body: VillageSubmission = await request.json()
    
    // Validate required fields
    if (!body.villageName || !body.regionKey || !body.coordinates || !body.submittedAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Generate unique ID for submission
    const submissionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    const submission: VillageSubmission = {
      ...body,
      id: submissionId,
      status: 'pending'
    }

    // Ensure the submissions directory exists
    const submissionsDir = join(process.cwd(), 'data', 'village-submissions')
    try {
      await mkdir(submissionsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist, that's fine
    }

    // Save submission to JSON file
    const filename = `${submissionId}.json`
    const filepath = join(submissionsDir, filename)
    
    await writeFile(filepath, JSON.stringify(submission, null, 2))

    console.log(`New village submission: ${body.villageName} in ${body.regionKey} region`)
    console.log(`Coordinates: (${body.coordinates.x}, ${body.coordinates.y})`)
    console.log(`Saved to: ${filepath}`)

    return NextResponse.json({ 
      success: true, 
      submissionId,
      message: "Village submission received successfully" 
    })

  } catch (error) {
    console.error("Error processing village submission:", error)
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    )
  }
}

export async function GET() {
  // This endpoint could be used later to retrieve submissions for admin dashboard
  return NextResponse.json({ 
    message: "Village submissions endpoint active" 
  })
}