export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Fallback regions in case the database is empty
const fallbackRegions = [
  { id: "beersheba", name: "Beersheba" },
  { id: "hebron", name: "Hebron" },
  { id: "gaza", name: "Gaza" },
  { id: "jerusalem", name: "Jerusalem" },
  { id: "alramla", name: "al-Ramla" },
  { id: "ramallah", name: "Ramallah" },
  { id: "nablus", name: "Nablus" },
  { id: "jaffa", name: "Jaffa" },
  { id: "tulkarm", name: "Tulkarm" },
  { id: "jenin", name: "Jenin" },
  { id: "baysan", name: "Baysan" },
  { id: "nazareth", name: "Nazareth" },
  { id: "haifa", name: "Haifa" },
  { id: "tiberias", name: "Tiberias" },
  { id: "acre", name: "Acre" },
  { id: "safad", name: "Safad" },
]

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const regionId = url.searchParams.get("regionId")

    if (regionId) {
      // Get towns for a specific region
      try {
        const towns = await prisma.town.findMany({
          where: { regionId },
          select: { id: true, name: true },
        })
        return NextResponse.json(towns)
      } catch (error) {
        console.error("Error fetching towns:", error)
        return NextResponse.json([])
      }
    } else {
      // Get all regions
      try {
        let regions = await prisma.region.findMany({
          select: { id: true, name: true },
        })

        // If no regions found in the database, use the fallback list
        if (regions.length === 0) {
          regions = fallbackRegions
        }

        return NextResponse.json(regions)
      } catch (error) {
        console.error("Error fetching regions:", error)
        // Return fallback regions in case of error
        return NextResponse.json(fallbackRegions)
      }
    }
  } catch (error) {
    console.error("Error in regions API:", error)
    // Return fallback regions in case of error
    return NextResponse.json(fallbackRegions)
  }
}
