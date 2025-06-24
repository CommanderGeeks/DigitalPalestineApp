"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { RegionKey, VillageData, RegionConfig, TooltipData } from "../data/types"

interface RegionDetailMapProps {
  regionKey: RegionKey
  isOpen: boolean
  onClose: () => void
}

export default function RegionDetailMap({ regionKey, isOpen, onClose }: RegionDetailMapProps) {
  const [hoveredVillage, setHoveredVillage] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [villageData, setVillageData] = useState<Record<string, VillageData>>({})
  const [regionConfig, setRegionConfig] = useState<RegionConfig | null>(null)
  const [svgContent, setSvgContent] = useState<string>("")

  // Load region data dynamically
  useEffect(() => {
    if (!isOpen || !regionKey) return

    const loadRegionData = async () => {
      try {
        // Load villages data
        const villagesModule = await import(`../data/regions/${regionKey}/villages`)
        const configModule = await import(`../data/regions/${regionKey}/config`)
        
        const villagesKey = `${regionKey.toUpperCase()}_VILLAGES`
        const configKey = `${regionKey.toUpperCase()}_CONFIG`
        
        setVillageData(villagesModule[villagesKey] || {})
        setRegionConfig(configModule[configKey] || null)

        // Load SVG content
        const svgResponse = await fetch(`/${regionKey.charAt(0).toUpperCase() + regionKey.slice(1)}.svg`)
        if (svgResponse.ok) {
          const svgText = await svgResponse.text()
          setSvgContent(svgText)
        }
      } catch (error) {
        console.error(`Error loading data for region ${regionKey}:`, error)
      }
    }

    loadRegionData()
  }, [regionKey, isOpen])

  const handleVillageHover = (villageId: string | null, event?: React.MouseEvent) => {
    setHoveredVillage(villageId)
    
    if (villageId && event && villageData[villageId]) {
      // Get the modal container position
      const modalElement = event.currentTarget.closest('.fixed')
      const modalRect = modalElement?.getBoundingClientRect()
      
      if (modalRect) {
        // Position relative to the modal, not the entire window
        const relativeX = event.clientX - modalRect.left
        const relativeY = event.clientY - modalRect.top
        
        setTooltip({
          village: villageData[villageId],
          x: relativeX + 15, // 15px to the right within the modal
          y: relativeY - 10  // 10px above within the modal
        })
      }
    } else {
      setTooltip(null)
    }
  }

  const renderSVGWithInteractivity = () => {
    if (!svgContent || !regionConfig) return null

    // Parse the SVG content and add interactivity
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml')
    const svgElement = svgDoc.querySelector('svg')
    
    if (!svgElement) return null

    // Get all path elements with IDs (villages)
    const paths = svgElement.querySelectorAll('path[id]')
    
    return (
      <svg 
        width="100%" 
        height="auto" 
        viewBox={regionConfig.svgViewBox}
        className="border-2 border-green-200 rounded-lg shadow-lg bg-white"
        style={{ aspectRatio: `${regionConfig.svgDimensions.width}/${regionConfig.svgDimensions.height}` }}
      >
        <rect width={regionConfig.svgDimensions.width} height={regionConfig.svgDimensions.height} fill="#F8F9FA"/>
        
        {Array.from(paths).map((path, index) => {
          const villageId = path.getAttribute('id')
          if (!villageId) return null

          // Clean the village ID to match our data keys
          const cleanId = villageId.replace(/_2$/, '') // Remove _2 suffix if present
          const isHovered = hoveredVillage === cleanId
          
          // Check if this is the main region boundary (large path, usually the region name)
          const pathData = path.getAttribute('d') || ''
          const isMainRegionBoundary = pathData.length > 100 // Main boundaries are typically very long paths
          
          // Only show interactivity for _2 versions (capitals) OR small village paths that exist in our data
          const shouldShowInteractivity = (villageId.endsWith('_2') && villageData[cleanId]) || 
                                        (!isMainRegionBoundary && villageData[cleanId])
          
          return (
            <path
              key={index}
              id={villageId}
              d={pathData}
              stroke="black"
              strokeWidth={isMainRegionBoundary ? "2" : "1"}
              fill={
                isMainRegionBoundary 
                  ? "transparent" 
                  : shouldShowInteractivity && isHovered 
                    ? "rgba(220, 38, 38, 0.6)" 
                    : shouldShowInteractivity
                      ? "rgba(34, 197, 94, 0.4)"
                      : "rgba(34, 197, 94, 0.2)"
              }
              className={shouldShowInteractivity ? "cursor-pointer transition-all duration-200 hover:stroke-2" : ""}
              onMouseEnter={shouldShowInteractivity ? (e) => handleVillageHover(cleanId, e) : undefined}
              onMouseLeave={shouldShowInteractivity ? () => handleVillageHover(null) : undefined}
            />
          )
        })}
      </svg>
    )
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
          {regionConfig && (
            <>
              <h2 className="text-3xl font-bold mb-2">{regionConfig.title}</h2>
              <p className="text-green-100">{regionConfig.arabicName} - {regionConfig.description}</p>
            </>
          )}
        </div>

        {/* Map Container */}
        <div className="p-8 bg-gradient-to-br from-green-50 via-white to-red-50">
          <div className="relative mx-auto" style={{ maxWidth: '600px' }}>
            {renderSVGWithInteractivity()}
          </div>

          {/* Legend */}
          <div className="mt-6 bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-gray-800 mb-3">
              Villages in {regionConfig?.title || 'Region'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm max-h-40 overflow-y-auto">
              {Object.values(villageData).map((village) => (
                <div key={village.id} className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 truncate">{village.name}</span>
                  <span className="text-gray-500 flex-shrink-0">({village.registrants})</span>
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