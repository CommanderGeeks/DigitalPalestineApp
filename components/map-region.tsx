"use client"

import { useState } from "react"

interface MapRegionProps {
  onRegionClick: (regionId: string) => void
}

export function MapRegion({ onRegionClick }: MapRegionProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  // Function to handle region hover
  const handleRegionHover = (regionId: string | null) => {
    setHoveredRegion(regionId)
  }

  return (
    <div className="w-full">
      <svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Base map image */}
        <image href="/PalestineMapFinal.svg" width="1200" height="1200" preserveAspectRatio="xMidYMid meet" />

        {/* Interactive regions - these are transparent overlays that capture mouse events */}
        <g>
          {/* Region 1 - Jenin */}
          <path
            id="region-1"
            d="M 400,100 L 500,100 L 500,200 L 400,200 Z"
            fill={hoveredRegion === "region-1" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-1" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-1")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-1")}
          />

          {/* Region 2 - Tubas */}
          <path
            id="region-2"
            d="M 500,100 L 600,100 L 600,200 L 500,200 Z"
            fill={hoveredRegion === "region-2" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-2" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-2")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-2")}
          />

          {/* Region 3 - Tulkarm */}
          <path
            id="region-3"
            d="M 300,200 L 400,200 L 400,300 L 300,300 Z"
            fill={hoveredRegion === "region-3" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-3" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-3")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-3")}
          />

          {/* Region 4 - Nablus */}
          <path
            id="region-4"
            d="M 400,200 L 500,200 L 500,300 L 400,300 Z"
            fill={hoveredRegion === "region-4" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-4" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-4")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-4")}
          />

          {/* Region 5 - Qalqilya */}
          <path
            id="region-5"
            d="M 300,300 L 400,300 L 400,400 L 300,400 Z"
            fill={hoveredRegion === "region-5" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-5" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-5")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-5")}
          />

          {/* Region 6 - Salfit */}
          <path
            id="region-6"
            d="M 400,300 L 500,300 L 500,400 L 400,400 Z"
            fill={hoveredRegion === "region-6" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-6" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-6")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-6")}
          />

          {/* Region 7 - Ramallah */}
          <path
            id="region-7"
            d="M 350,400 L 450,400 L 450,500 L 350,500 Z"
            fill={hoveredRegion === "region-7" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-7" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-7")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-7")}
          />

          {/* Region 8 - Jericho */}
          <path
            id="region-8"
            d="M 500,300 L 600,300 L 600,500 L 500,500 Z"
            fill={hoveredRegion === "region-8" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-8" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-8")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-8")}
          />

          {/* Region 9 - Jerusalem */}
          <path
            id="region-9"
            d="M 400,500 L 500,500 L 500,550 L 400,550 Z"
            fill={hoveredRegion === "region-9" ? "rgba(220, 38, 38, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-9" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-9")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-9")}
          />

          {/* Region 10 - Bethlehem */}
          <path
            id="region-10"
            d="M 400,550 L 500,550 L 500,600 L 400,600 Z"
            fill={hoveredRegion === "region-10" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-10" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-10")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-10")}
          />

          {/* Region 11 - Hebron */}
          <path
            id="region-11"
            d="M 350,600 L 500,600 L 500,700 L 350,700 Z"
            fill={hoveredRegion === "region-11" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-11" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-11")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-11")}
          />

          {/* Region 12 - North Gaza */}
          <path
            id="region-12"
            d="M 200,800 L 250,800 L 250,850 L 200,850 Z"
            fill={hoveredRegion === "region-12" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-12" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-12")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-12")}
          />

          {/* Region 13 - Gaza */}
          <path
            id="region-13"
            d="M 200,850 L 250,850 L 250,900 L 200,900 Z"
            fill={hoveredRegion === "region-13" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-13" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-13")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-13")}
          />

          {/* Region 14 - Deir al-Balah */}
          <path
            id="region-14"
            d="M 200,900 L 250,900 L 250,950 L 200,950 Z"
            fill={hoveredRegion === "region-14" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-14" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-14")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-14")}
          />

          {/* Region 15 - Khan Yunis */}
          <path
            id="region-15"
            d="M 200,950 L 250,950 L 250,1000 L 200,1000 Z"
            fill={hoveredRegion === "region-15" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-15" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-15")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-15")}
          />

          {/* Region 16 - Rafah */}
          <path
            id="region-16"
            d="M 200,1000 L 250,1000 L 250,1050 L 200,1050 Z"
            fill={hoveredRegion === "region-16" ? "rgba(46, 125, 50, 0.5)" : "transparent"}
            stroke={hoveredRegion === "region-16" ? "#fff" : "transparent"}
            strokeWidth="2"
            className="cursor-pointer transition-colors duration-200"
            onMouseEnter={() => handleRegionHover("region-16")}
            onMouseLeave={() => handleRegionHover(null)}
            onClick={() => onRegionClick("region-16")}
          />
        </g>
      </svg>
    </div>
  )
}
