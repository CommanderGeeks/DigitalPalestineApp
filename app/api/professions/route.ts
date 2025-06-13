export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"

// This is a static list of professions for the autocomplete
// In a real application, this might come from a database
const professions = [
  "Accountant",
  "Actor",
  "Architect",
  "Artist",
  "Attorney",
  "Banker",
  "Chef",
  "Consultant",
  "Designer",
  "Doctor",
  "Educator",
  "Engineer",
  "Entrepreneur",
  "Farmer",
  "Filmmaker",
  "Financial Analyst",
  "Graphic Designer",
  "Healthcare Professional",
  "Journalist",
  "Lawyer",
  "Manager",
  "Marketing Professional",
  "Musician",
  "Nurse",
  "Pharmacist",
  "Photographer",
  "Programmer",
  "Researcher",
  "Retired",
  "Sales Professional",
  "Scientist",
  "Software Developer",
  "Student",
  "Teacher",
  "Technician",
  "Writer",
  // Add more professions as needed
]

export async function GET() {
  try {
    return NextResponse.json(professions)
  } catch (error) {
    console.error("Error fetching professions:", error)
    return NextResponse.json({ error: "Failed to fetch professions" }, { status: 500 })
  }
}
