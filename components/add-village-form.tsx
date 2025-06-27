"use client"

import { useState, useRef } from "react"
import { X, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RegionKey, RegionConfig } from "../data/types"

interface AddVillageFormProps {
  isOpen: boolean
  onClose: () => void
  regionKey: RegionKey
  regionConfig: RegionConfig
  svgContent: string
}

interface PlacedDot {
  x: number
  y: number
}

export default function AddVillageForm({ 
  isOpen, 
  onClose, 
  regionKey, 
  regionConfig, 
  svgContent 
}: AddVillageFormProps) {
  const [step, setStep] = useState<'intro' | 'placing' | 'confirm' | 'success'>('intro')
  const [villageName, setVillageName] = useState('')
  const [placedDot, setPlacedDot] = useState<PlacedDot | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const handleSvgClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (step !== 'placing') return

    const svgElement = svgRef.current
    if (!svgElement) return

    const rect = svgElement.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * regionConfig.svgDimensions.width
    const y = ((event.clientY - rect.top) / rect.height) * regionConfig.svgDimensions.height

    setPlacedDot({ x, y })
  }

  const handleConfirmLocation = () => {
    if (placedDot && villageName.trim()) {
      setStep('confirm')
    }
  }

  const handleSubmit = async () => {
    if (!placedDot || !villageName.trim()) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/village-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          villageName: villageName.trim(),
          regionKey,
          coordinates: placedDot,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setStep('success')
      } else {
        console.error('Failed to submit village')
        // Could add error handling here
      }
    } catch (error) {
      console.error('Error submitting village:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep('intro')
    setVillageName('')
    setPlacedDot(null)
    setIsSubmitting(false)
    onClose()
  }

  const renderSVGWithPlacement = () => {
    if (!svgContent || !regionConfig) return null

    return (
      <div className="relative">
        <svg 
          ref={svgRef}
          width="100%" 
          height="auto" 
          viewBox={regionConfig.svgViewBox}
          className="border-2 border-green-200 rounded-lg shadow-lg bg-white cursor-crosshair"
          style={{ aspectRatio: `${regionConfig.svgDimensions.width}/${regionConfig.svgDimensions.height}` }}
          onClick={handleSvgClick}
          dangerouslySetInnerHTML={{ __html: svgContent.replace(/<svg[^>]*>|<\/svg>/g, '') }}
        />
        
        {placedDot && (
          <div 
            className="absolute w-2 h-2 bg-red-500 border-2 border-red-700 rounded-sm pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(placedDot.x / regionConfig.svgDimensions.width) * 100}%`,
              top: `${(placedDot.y / regionConfig.svgDimensions.height) * 100}%`,
            }}
          />
        )}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Add Your Village to the Map
          </DialogTitle>
        </DialogHeader>

        {step === 'intro' && (
          <div className="space-y-6">
            <DialogDescription className="text-base leading-relaxed">
              Thank you for helping preserve Palestinian heritage. Every village has a story, and every story matters. 
              By placing your village on this map, you're contributing to a collective act of remembrance that ensures 
              these places are never forgotten. Your knowledge helps fight against decades of cultural erasure and 
              builds a more complete picture of historic Palestine.
            </DialogDescription>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="villageName">Village Name</Label>
                <Input
                  id="villageName"
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                  placeholder="Enter your village name"
                  className="mt-2"
                />
              </div>
              
              <Button 
                onClick={() => setStep('placing')}
                disabled={!villageName.trim()}
                className="w-full"
              >
                Continue to Place on Map
              </Button>
            </div>
          </div>
        )}

        {step === 'placing' && (
          <div className="space-y-4">
            <DialogDescription>
              Click on the map to place <strong>{villageName}</strong> at its historic location. 
              You can click again to adjust the position.
            </DialogDescription>
            
            <div className="space-y-4">
              {renderSVGWithPlacement()}
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setStep('intro')}
                >
                  Back
                </Button>
                <Button 
                  onClick={handleConfirmLocation}
                  disabled={!placedDot}
                  className="flex-1"
                >
                  Confirm Location
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-6">
            <DialogDescription>
              Please confirm the details of your village submission:
            </DialogDescription>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div><strong>Village Name:</strong> {villageName}</div>
              <div><strong>Region:</strong> {regionConfig.title}</div>
              <div><strong>Coordinates:</strong> ({placedDot?.x.toFixed(1)}, {placedDot?.y.toFixed(1)})</div>
            </div>

            <div className="border rounded-lg p-2">
              {renderSVGWithPlacement()}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setStep('placing')}
                disabled={isSubmitting}
              >
                Adjust Location
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Village'}
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Thank You!</h3>
              <DialogDescription className="text-base">
                Your submission for <strong>{villageName}</strong> has been received. Our development team will 
                review and add it to the map soon. Your contribution helps preserve Palestinian heritage for 
                future generations.
              </DialogDescription>
            </div>
            
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}