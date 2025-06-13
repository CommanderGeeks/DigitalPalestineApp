import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Home, Users, MapPin, Landmark } from "lucide-react"

const governorates = {
  jenin: {
    name: "Jenin",
    population: "330,000",
    demographics: "Predominantly agricultural and trade-focused",
    culture: "Known for its olive harvest and historic markets; strong tradition of resistance",
    cities: ["Jenin (city)", "Qabatiya", "Arraba", "Ya'bad"],
    description:
      "Jenin Governorate is located in the northern region of historic Palestine and is renowned for its fertile agricultural lands and rich cultural heritage. The region has been a center of Palestinian resistance and is famous for its olive groves, which have been cultivated for centuries.",
    economy:
      "The economy is primarily based on agriculture, with olive oil production being a major industry. The region also has a growing trade sector and small-scale manufacturing.",
    history:
      "Jenin has ancient roots dating back to Canaanite times. The city has witnessed numerous historical events and has been an important crossroads for trade routes throughout the history of Palestine.",
  },
  tubas: {
    name: "Tubas",
    population: "70,000",
    demographics: "Largely rural and agricultural",
    culture: "Renowned for rich agricultural traditions and pastoral heritage",
    cities: ["Tubas (city)", "Tammun", "Aqaba"],
    description:
      "Tubas Governorate is located in the northeastern region of historic Palestine, known for its pastoral landscapes and agricultural traditions. The region is characterized by its rural character and strong community bonds.",
    economy:
      "Agriculture dominates the economy, with livestock farming and crop cultivation being the primary economic activities. The region is known for its dairy products and traditional farming methods.",
    history:
      "Tubas has a long history of pastoral life and has maintained its traditional character despite modern developments. The area has been inhabited for thousands of years within the broader context of Palestinian history.",
  },
  tulkarm: {
    name: "Tulkarm",
    population: "210,000",
    demographics: "Agricultural and commercial economy",
    culture: "Vibrant urban culture mixed with deep farming traditions, famous for citrus orchards",
    cities: ["Tulkarm (city)", "Anabta", "Qaffin"],
    description:
      "Tulkarm Governorate is located in the northwestern region of historic Palestine, combining urban development with agricultural excellence. The region is famous for its citrus groves and has a thriving commercial sector.",
    economy:
      "The economy is diversified with agriculture, commerce, and small industries. Citrus fruits, especially oranges and lemons, are major products that have been cultivated in this fertile region for generations.",
    history:
      "Tulkarm has been an important agricultural center for centuries within historic Palestine. The city developed as a major railway station during the Ottoman period and has maintained its significance as a commercial hub.",
  },
  nablus: {
    name: "Nablus",
    population: "415,000",
    demographics: "Commercial, historical, and cultural hub",
    culture: "Renowned for traditional industries, especially soap, sweets (kanafeh), and historic architecture",
    cities: ["Nablus (city)", "Beita", "Balata Refugee Camp", "Asira ash-Shamaliya"],
    description:
      "Nablus is one of the most important cities in historic Palestine, serving as a major commercial and cultural center. The city is famous for its traditional soap industry, delicious kanafeh, and well-preserved old city architecture.",
    economy:
      "Nablus has a diverse economy including traditional industries like soap-making, food processing, and modern commerce. The city has been a major trading hub throughout Palestinian history.",
    history:
      "Founded by the Romans as Flavia Neapolis, Nablus has over 2,000 years of continuous habitation. It has been a center of learning and commerce throughout the history of Palestine, maintaining its importance through various periods of rule.",
  },
  qalqilya: {
    name: "Qalqilya",
    population: "120,000",
    demographics: "Agriculture-centric economy",
    culture: "Known for fertile farmland and citrus fruits, especially guavas",
    cities: ["Qalqilya (city)", "Azzun", "Jayyus"],
    description:
      "Qalqilya Governorate is located in the central-western region of historic Palestine, known for its exceptional agricultural productivity, particularly in citrus cultivation. The region has some of the most fertile land in Palestine.",
    economy:
      "Agriculture is the backbone of the economy, with citrus fruits, vegetables, and guavas being major products. The region also has a growing agro-processing industry that serves the broader Palestinian market.",
    history:
      "Qalqilya has been an agricultural center for millennia within historic Palestine. The fertile plains have supported continuous settlement and farming activities, contributing to the region's reputation as a breadbasket.",
  },
  salfit: {
    name: "Salfit",
    population: "90,000",
    demographics: "Agricultural and olive cultivation focus",
    culture: "Strong olive oil heritage, traditional farming practices",
    cities: ["Salfit (city)", "Bidya", "Kifl Haris"],
    description:
      "Salfit Governorate is located in the central region of historic Palestine, renowned for its olive groves and traditional olive oil production. The region maintains strong agricultural traditions and rural character.",
    economy:
      "Olive cultivation and oil production dominate the economy. The region produces some of the finest olive oil in Palestine, continuing traditions that date back thousands of years.",
    history:
      "Salfit has been associated with olive cultivation for thousands of years within the context of historic Palestine. The ancient olive trees in the region are testament to its long agricultural heritage and connection to the land.",
  },
  ramallah: {
    name: "Ramallah and Al-Bireh",
    population: "370,000",
    demographics: "Administrative, political, and economic center",
    culture: "Cosmopolitan hub, known for vibrant cultural scene, art galleries, and international institutions",
    cities: ["Ramallah", "Al-Bireh", "Beitunia", "Birzeit"],
    description:
      "Ramallah is located in the central highlands of historic Palestine and serves as a major administrative and cultural center. It hosts numerous international organizations and cultural institutions while maintaining its Palestinian character.",
    economy:
      "The economy is diverse, including government services, international organizations, technology, and cultural industries. It serves as an important economic hub within the broader context of historic Palestine.",
    history:
      "Ramallah was founded in the 16th century and has grown from a small village to become a significant political and cultural center within historic Palestine, playing an important role in modern Palestinian development.",
  },
  jericho: {
    name: "Jericho and Al-Aghwar",
    population: "60,000",
    demographics: "Tourism, agriculture-based economy",
    culture: "World's oldest continuously inhabited city, famous for archaeological sites and desert tourism",
    cities: ["Jericho", "Al-Jiftlik", "Ein al-Sultan Refugee Camp"],
    description:
      "Jericho is located in the Jordan Valley region of historic Palestine and is one of the world's oldest continuously inhabited cities, with archaeological evidence of settlement dating back 11,000 years.",
    economy:
      "Tourism and agriculture are the main economic activities. The region benefits from year-round warm climate for agriculture and attracts visitors to its numerous historical and archaeological sites.",
    history:
      "Jericho's history spans millennia within historic Palestine, with significant biblical and archaeological importance. It has been continuously inhabited longer than almost any other city in the region, serving as a testament to Palestinian heritage.",
  },
  jerusalem: {
    name: "Jerusalem",
    population: "400,000",
    demographics: "Palestinian East Jerusalem population; religious, historical, and cultural capital",
    culture: "Deeply significant for Islam, Christianity, and Judaism; vibrant marketplaces and religious landmarks",
    cities: ["Jerusalem (Al-Quds)", "Abu Dis", "Beit Hanina", "Silwan"],
    description:
      "Jerusalem (Al-Quds) is the spiritual and cultural heart of historic Palestine. The city holds immense religious significance for Muslims, Christians, and Jews, and contains some of the world's most important religious sites.",
    economy:
      "The economy is based on religious tourism, services, and small businesses. The Old City's markets have been important commercial centers throughout the history of Palestine.",
    history:
      "Jerusalem has over 3,000 years of history and is one of the world's oldest cities. It has been the center of religious and political significance throughout the history of Palestine, serving as its eternal capital.",
  },
  bethlehem: {
    name: "Bethlehem",
    population: "230,000",
    demographics: "Significant Christian minority",
    culture: "Rich heritage as birthplace of Jesus, renowned for handicrafts (olive wood carvings, embroidery)",
    cities: ["Bethlehem", "Beit Jala", "Beit Sahour", "Dheisheh Refugee Camp"],
    description:
      "Bethlehem is located in the southern region of historic Palestine and is revered as the birthplace of Jesus Christ, making it a major pilgrimage destination. The city is famous for its Christian heritage and traditional handicrafts.",
    economy:
      "Tourism, particularly religious tourism, is a major economic driver. The city is also known for its traditional handicrafts including olive wood carvings and embroidery that reflect Palestinian cultural heritage.",
    history:
      "Bethlehem has been continuously inhabited for over 2,000 years within historic Palestine and holds central importance in Christian tradition as the birthplace of Jesus, while maintaining its Palestinian Arab character.",
  },
  hebron: {
    name: "Hebron",
    population: "780,000",
    demographics: "Largest Palestinian governorate, industrial and commercial powerhouse",
    culture: "Famous for traditional industries such as pottery, glass-making, and rich historical architecture",
    cities: ["Hebron (Al-Khalil)", "Dura", "Halhul", "Yatta"],
    description:
      "Hebron is located in the southern region of historic Palestine and is the largest Palestinian governorate. It serves as a major industrial and commercial center while maintaining its historical significance.",
    economy:
      "Hebron has a diverse economy including manufacturing, agriculture, and commerce. It is known for its leather goods, pottery, and glass industries that have been part of Palestinian heritage for centuries.",
    history:
      "Hebron is one of the oldest cities in historic Palestine, with a history spanning over 4,000 years. It is significant in Jewish, Christian, and Islamic traditions and has been continuously inhabited throughout Palestinian history.",
  },
  northgaza: {
    name: "North Gaza",
    population: "430,000",
    demographics: "Dense, urban population, significant refugee communities",
    culture: "Strong community bonds, known for resilience amid ongoing conflict",
    cities: ["Jabalia", "Beit Lahia", "Beit Hanoun"],
    description:
      "North Gaza is located in the northern coastal region of historic Palestine, characterized by its dense population and strong community networks. Despite challenges, the region maintains vibrant cultural traditions.",
    economy:
      "The economy includes small-scale agriculture, fishing, and local commerce, maintaining traditional Palestinian economic activities despite modern challenges.",
    history:
      "The area has ancient roots within historic Palestine and has been shaped by waves of migration and settlement, including significant refugee populations that are part of the broader Palestinian story.",
  },
  gaza: {
    name: "Gaza",
    population: "700,000",
    demographics: "Largest city in Gaza Strip, administrative and commercial center",
    culture: "Vibrant urban life, renowned for traditions in fishing, trade, and cultural festivals",
    cities: ["Gaza City", "Al-Shati (Beach Camp)", "Sheikh Radwan"],
    description:
      "Gaza City is located on the Mediterranean coast of historic Palestine and serves as the largest urban center in the southern coastal region. The city has a rich maritime heritage and vibrant cultural life.",
    economy:
      "Despite challenges, Gaza maintains commerce, fishing, and small industries. The port has historically been important for trade throughout the history of Palestine.",
    history:
      "Gaza has been an important city for over 3,000 years within historic Palestine, serving as a major trading post between Africa and Asia and maintaining its significance throughout Palestinian history.",
  },
  deiralbalah: {
    name: "Deir al-Balah",
    population: "300,000",
    demographics: "Predominantly agricultural and coastal",
    culture: "Known for citrus farming, palm trees, and historical sites dating back to ancient civilizations",
    cities: ["Deir al-Balah", "Al-Nuseirat", "Al-Maghazi Refugee Camp"],
    description:
      "Deir al-Balah is located in the central coastal region of historic Palestine, known for its agricultural productivity and coastal location. The region is famous for its citrus groves and palm trees.",
    economy:
      "Agriculture, particularly citrus cultivation, is the main economic activity. Fishing also contributes to the local economy, maintaining traditional Palestinian coastal livelihoods.",
    history:
      "The area has ancient historical significance within historic Palestine and has been continuously cultivated for thousands of years, representing the agricultural heritage of the Palestinian people.",
  },
  khanyunis: {
    name: "Khan Yunis",
    population: "420,000",
    demographics: "Agricultural and coastal economy",
    culture: "Renowned for market trading traditions, historic castles, and cultural gatherings",
    cities: ["Khan Yunis", "Bani Suheila", "Abasan al-Kabira"],
    description:
      "Khan Yunis is located in the southern coastal region of historic Palestine, known for its historical significance and traditional market culture. The city has maintained its commercial traditions despite modern challenges.",
    economy:
      "Agriculture and trade are the main economic activities. The region is known for its traditional markets and commercial networks that have been part of Palestinian economic life for centuries.",
    history:
      "Khan Yunis was founded in the 14th century within historic Palestine and has served as an important commercial center along ancient trade routes, contributing to the rich commercial heritage of Palestine.",
  },
  rafah: {
    name: "Rafah",
    population: "260,000",
    demographics: "Strategic border area, densely populated",
    culture: "Strong cross-border cultural influence, resilient communities shaped by refugee experiences",
    cities: ["Rafah City", "Al-Shaboura Refugee Camp", "Tel al-Sultan"],
    description:
      "Rafah is located at the southern tip of the coastal region of historic Palestine and has significant cultural connections across traditional boundaries. The city has a unique character shaped by its strategic location.",
    economy:
      "The economy includes agriculture and small-scale commerce, maintaining traditional Palestinian economic activities.",
    history:
      "Rafah has ancient origins within historic Palestine and has been an important crossing point between different regions throughout Palestinian history, serving as a gateway in the broader Palestinian landscape.",
  },
}

interface PageProps {
  params: {
    id: string
  }
}

export default function GovernoratePage({ params }: PageProps) {
  const governorate = governorates[params.id as keyof typeof governorates]

  if (!governorate) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-green-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/digpal-logo.png"
                alt="Digital Palestine Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <h1 className="text-3xl font-bold text-gray-900">Digital Palestine</h1>
            </div>
            <p className="text-sm text-gray-600">Historic Palestine - From the River to the Sea</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-900 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:text-green-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Historic Map</span>
            </Link>
            <Link href="/" className="flex items-center space-x-2 hover:text-green-400 transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-700 mb-4">{governorate.name}</h1>
            <p className="text-lg text-gray-600 mb-2">Part of Historic Palestine</p>
            <p className="text-xl text-gray-600 mb-6">{governorate.description}</p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="text-center">
                <Users className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <CardTitle>Population</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-bold text-gray-900">{governorate.population}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <MapPin className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <CardTitle>Key Cities</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-700">{governorate.cities.length} major areas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Landmark className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <CardTitle>Character</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-700">{governorate.demographics}</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-700">Culture & Heritage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{governorate.culture}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-700">Key Cities & Towns</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {governorate.cities.map((city, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">{city}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-700">Economy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{governorate.economy}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-green-700">History within Palestine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{governorate.history}</p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold">
              Connect with {governorate.name} Community
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 Digital Palestine. Preserving culture, connecting communities.</p>
          <p className="text-gray-500 text-sm mt-2">From the River to the Sea - Historic Palestine</p>
        </div>
      </footer>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(governorates).map((id) => ({
    id,
  }))
}
