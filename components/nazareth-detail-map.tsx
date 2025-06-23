"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface VillageData {
  id: string
  name: string
  registrants: number
  description: string
}

// Mock data for the villages in Nazareth - you can replace this with your actual data
const VILLAGE_DATA: Record<string, VillageData> = {
  "Ma'lul": {
    id: "Ma'lul",
    name: "Ma'lul",
    registrants: 143,
    description: "A historic village known for its ancient olive groves and traditional stone houses, where generations of Palestinians cultivated the land."
  },
  "Nazareth": {
    id: "Nazareth", 
    name: "Nazareth",
    registrants: 2847,
    description: "The largest city in the Galilee region, renowned as a center of Christian pilgrimage and Palestinian Arab culture, with a rich history spanning millennia."
  },
  "Saffuriyya": {
    id: "Saffuriyya",
    name: "Saffuriyya",
    registrants: 287,
    description: "An ancient village that served as the capital of Galilee, famous for its archaeological significance and beautiful mosaics from the Roman and Byzantine periods."
  },
  "al-Mujaydil": {
    id: "al-Mujaydil",
    name: "al-Mujaydil",
    registrants: 156,
    description: "A small agricultural village nestled in the hills, known for its terraced farmland and traditional Palestinian rural architecture."
  },
  "Indur": {
    id: "Indur",
    name: "Indur",
    registrants: 92,
    description: "A village with ancient roots, where residents were known for their expertise in traditional crafts and agriculture before 1948."
  }
}

interface NazarethDetailMapProps {
  isOpen: boolean
  onClose: () => void
}

interface TooltipData {
  village: VillageData
  x: number
  y: number
}

export default function NazarethDetailMap({ isOpen, onClose }: NazarethDetailMapProps) {
  console.log("NazarethDetailMap isOpen:", isOpen)
  const [hoveredVillage, setHoveredVillage] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)

  const handleVillageHover = (villageId: string | null, event?: React.MouseEvent) => {
  setHoveredVillage(villageId)
  
  if (villageId && event && VILLAGE_DATA[villageId]) {
    // Get the modal container position
    const modalElement = event.currentTarget.closest('.fixed')
    const modalRect = modalElement?.getBoundingClientRect()
    
    if (modalRect) {
      // Position relative to the modal, not the entire window
      const relativeX = event.clientX - modalRect.left
      const relativeY = event.clientY - modalRect.top
      
      setTooltip({
        village: VILLAGE_DATA[villageId],
        x: relativeX + 15, // 15px to the right within the modal
        y: relativeY - 10  // 10px above within the modal
      })
    }
  } else {
    setTooltip(null)
  }
}

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-800 via-black to-red-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold mb-2">Nazareth Region</h2>
          <p className="text-green-100">الناصرة - Galilee's Historic Heart</p>
        </div>

        {/* Map Container */}
        <div className="p-8 bg-gradient-to-br from-green-50 via-white to-red-50">
          <div className="relative mx-auto" style={{ maxWidth: '600px' }}>
            <svg 
              width="100%" 
              height="auto" 
              viewBox="0 0 67 75" 
              className="border-2 border-green-200 rounded-lg shadow-lg bg-white"
              style={{ aspectRatio: '67/75' }}
            >
              <rect width="67" height="75" fill="#F8F9FA"/>
              
              {/* Ma'lul */}
              <path 
                id="Ma'lul" 
                d="M19.5 39.5H18.5V40.5H19.5V39.5Z" 
                stroke="black"
                strokeWidth="1"
                fill={hoveredVillage === "Ma'lul" ? "rgba(220, 38, 38, 0.6)" : "rgba(34, 197, 94, 0.4)"}
                className="cursor-pointer transition-all duration-200 hover:stroke-2"
                onMouseEnter={(e) => handleVillageHover("Ma'lul", e)}
                onMouseLeave={() => handleVillageHover(null)}
              />
              
              {/* Nazareth - Main City */}
              <path 
                id="Nazareth" 
                d="M19 9.5L16 11L18.5 22.5L14 27L11.5 37.5L5 43L1 52L2.5 59H14L18.5 61.5L20 67L27.5 71L34.5 73.5L42 71L48 69L53 71L61 68V63.5L57.5 60.5V56L59.5 52L66 53.5L64.5 43L54.5 32.5L53 26L57.5 21V13L53 11H48L45 13L40.5 18H37L32 3L25 1L21 3L19 9.5Z" 
                stroke="black"
                strokeWidth="1.5"
                fill={hoveredVillage === "Nazareth" ? "rgba(220, 38, 38, 0.6)" : "rgba(34, 197, 94, 0.5)"}
                className="cursor-pointer transition-all duration-200 hover:stroke-2"
                onMouseEnter={(e) => handleVillageHover("Nazareth", e)}
                onMouseLeave={() => handleVillageHover(null)}
              />
              
              {/* Saffuriyya */}
              <path 
                id="Saffuriyya" 
                d="M30 25H29V26H30V25Z" 
                stroke="black"
                strokeWidth="1"
                fill={hoveredVillage === "Saffuriyya" ? "rgba(220, 38, 38, 0.6)" : "rgba(34, 197, 94, 0.4)"}
                className="cursor-pointer transition-all duration-200 hover:stroke-2"
                onMouseEnter={(e) => handleVillageHover("Saffuriyya", e)}
                onMouseLeave={() => handleVillageHover(null)}
              />
              
              {/* al-Mujaydil */}
              <path 
                id="al-Mujaydil" 
                d="M21 44.5H20V45.5H21V44.5Z" 
                stroke="black"
                strokeWidth="1"
                fill={hoveredVillage === "al-Mujaydil" ? "rgba(220, 38, 38, 0.6)" : "rgba(34, 197, 94, 0.4)"}
                className="cursor-pointer transition-all duration-200 hover:stroke-2"
                onMouseEnter={(e) => handleVillageHover("al-Mujaydil", e)}
                onMouseLeave={() => handleVillageHover(null)}
              />
              
              {/* Indur */}
              <path 
                id="Indur" 
                d="M51.5 59H50.5V60H51.5V59Z" 
                stroke="black"
                strokeWidth="1"
                fill={hoveredVillage === "Indur" ? "rgba(220, 38, 38, 0.6)" : "rgba(34, 197, 94, 0.4)"}
                className="cursor-pointer transition-all duration-200 hover:stroke-2"
                onMouseEnter={(e) => handleVillageHover("Indur", e)}
                onMouseLeave={() => handleVillageHover(null)}
              />
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-6 bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-gray-800 mb-3">Villages in Nazareth Region</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {Object.values(VILLAGE_DATA).map((village) => (
                <div key={village.id} className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-700">{village.name}</span>
                  <span className="text-gray-500">({village.registrants} registered)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
        {tooltip && (
        <div 
            className="absolute z-60 bg-white border-2 border-green-600 rounded-lg shadow-xl p-4 pointer-events-none max-w-xs"
            style={{ 
            left: `${tooltip.x}px`, 
            top: `${tooltip.y}px`,
            transform: 'translateY(-100%)'
            }}
        >
          <div className="space-y-2">
            <h4 className="font-bold text-green-800 text-lg">{tooltip.village.name}</h4>
            <div className="flex items-center space-x-2">
              <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                {tooltip.village.registrants} Registered
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {tooltip.village.description}
            </p>
          </div>
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-green-600"></div>
        </div>
      )}
    </div>
  )
}