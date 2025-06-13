import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create regions
  await prisma.region.createMany({
    data: [
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
    ],
    skipDuplicates: true,
  })

  // Sample towns for each region (you would expand this with actual towns)
  const regions = await prisma.region.findMany()

  for (const region of regions) {
    // Add 3-5 sample towns per region
    const townCount = Math.floor(Math.random() * 3) + 3
    const townNames = generateTownNames(region.name, townCount)

    for (const townName of townNames) {
      await prisma.town.create({
        data: {
          name: townName,
          region: {
            connect: { id: region.id },
          },
        },
      })
    }
  }

  console.log("Database seeded successfully!")
}

// Helper function to generate sample town names
function generateTownNames(regionName: string, count: number): string[] {
  const baseTowns = [
    `${regionName} City`,
    `North ${regionName}`,
    `South ${regionName}`,
    `East ${regionName}`,
    `West ${regionName}`,
    `Old ${regionName}`,
    `New ${regionName}`,
    `${regionName} Heights`,
    `${regionName} Valley`,
  ]

  return baseTowns.slice(0, count)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
