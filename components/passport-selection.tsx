// Path: components/passport-selection.tsx
// New component for passport type selection

"use client"

import { Users, Building2, Heart, Code2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PassportSelectionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectType: (type: string) => void
}

export function PassportSelection({ open, onOpenChange, onSelectType }: PassportSelectionProps) {
  const passportTypes = [
    {
      id: "personal",
      title: "Personal",
      description: "For any Palestinian or Palestinian ally joining our digital nation",
      icon: Users,
      color: "bg-green-100 hover:bg-green-200 border-green-300"
    },
    {
      id: "business",
      title: "Business",
      description: "For businesses led by Palestinians or allies supporting our economy",
      icon: Building2,
      color: "bg-blue-100 hover:bg-blue-200 border-blue-300"
    },
    {
      id: "institution",
      title: "Institution",
      description: "For non-profits, NGOs, and financial institutions serving our community",
      icon: Heart,
      color: "bg-purple-100 hover:bg-purple-200 border-purple-300"
    },
    {
      id: "developer",
      title: "Developer",
      description: "For Web2/Web3 developers building our digital infrastructure",
      icon: Code2,
      color: "bg-orange-100 hover:bg-orange-200 border-orange-300"
    }
  ]

  const handleSelect = (type: string) => {
    onSelectType(type)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Choose Your Passport Type</DialogTitle>
          <DialogDescription className="text-center">
            Select the passport that best represents your connection to Digital Palestine
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {passportTypes.map((type) => {
            const Icon = type.icon
            return (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className={`
                  relative p-8 rounded-lg border-2 transition-all duration-200
                  ${type.color}
                  flex flex-col items-center text-center space-y-4
                  transform hover:scale-105 hover:shadow-lg
                `}
              >
                <Icon className="w-16 h-16 text-gray-700" />
                <h3 className="text-xl font-bold text-gray-800">{type.title}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}