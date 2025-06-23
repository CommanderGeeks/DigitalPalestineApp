// Path: app/page.tsx
// Updated with modern Palestinian aesthetic - removed top left and bottom right glowing balls

"use client"

import { useState } from "react"
import PalestineHistoricMap from "@/components/palestine-historic-map"
import { Button } from "@/components/ui/button"
import { RegisterForm } from "@/components/register-form"
import { PassportSelection } from "@/components/passport-selection"

export default function Home() {
  const [passportSelectionOpen, setPassportSelectionOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [selectedPassportType, setSelectedPassportType] = useState("")

  const handlePassportSelect = (type: string) => {
    setSelectedPassportType(type)
    setPassportSelectionOpen(false)
    // Small delay to allow the selection dialog to close smoothly
    setTimeout(() => {
      setRegisterOpen(true)
    }, 200)
  }

  const handleRegisterClose = (open: boolean) => {
    setRegisterOpen(open)
    if (!open) {
      // Reset the selected type when closing the form
      setSelectedPassportType("")
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Palestinian Pattern Background */}
      <div className="absolute inset-0">
        {/* Gradient background with Palestinian flag colors subtly incorporated */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-red-50" />
        
        {/* Geometric pattern overlay inspired by Palestinian embroidery */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Modern floating element behind the map - keeping only the center one */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-600 rounded-full filter blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Modern Header with Arabic Typography */}
        <header className="text-center mb-12">
          <div className="mb-6">
            {/* Arabic text for "Digital Palestine" */}
            <h1 className="text-7xl font-bold mb-2 bg-gradient-to-r from-green-800 via-black to-red-800 bg-clip-text text-transparent animate-gradient" dir="rtl">
              فلسطين الرقمية
            </h1>
            <h2 className="text-5xl font-bold text-gray-800">Digital Palestine</h2>
          </div>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-green-800">Reclaiming</span> our ancestral homeland and{' '}
            <span className="font-semibold text-black">preserving</span> our cultural heritage. 
            Together we will <span className="font-semibold text-red-800">restore</span> what is
            rightfully ours and build a future where Palestinians return to their historic lands.
          </p>

          {/* Modern divider inspired by tatreez patterns */}
          <div className="flex items-center justify-center mt-8 space-x-2">
            <div className="h-px bg-gradient-to-r from-transparent via-green-600 to-transparent w-24" />
            <div className="w-2 h-2 bg-black rotate-45" />
            <div className="w-3 h-3 bg-red-600 rotate-45" />
            <div className="w-2 h-2 bg-black rotate-45" />
            <div className="h-px bg-gradient-to-l from-transparent via-green-600 to-transparent w-24" />
          </div>
        </header>

        {/* Map Container - clean and clickable */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-lg cursor-pointer transform transition-transform duration-200 hover:scale-105">
            <PalestineHistoricMap />
          </div>
        </div>

        {/* Modern Register Button with hover effects */}
        <div className="text-center pb-16">
          <div className="relative inline-block group">
            {/* Button glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200" />
            
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-16 py-8 text-2xl font-bold rounded-lg shadow-xl transform transition-all duration-200 hover:scale-105"
              onClick={() => setPassportSelectionOpen(true)}
            >
              <span className="flex items-center space-x-3">
                <span>Register</span>
                <span className="text-lg" dir="rtl">سجل</span>
              </span>
            </Button>
          </div>
          
          {/* Subtitle under button */}
          <p className="mt-4 text-gray-600 text-sm">
            Join thousands reconnecting with their homeland
          </p>
        </div>

        {/* Decorative bottom pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-green-100/30 to-transparent" />
          <svg className="absolute bottom-0 w-full h-20 text-green-800/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
        </div>

        {/* Passport Selection Dialog */}
        <PassportSelection 
          open={passportSelectionOpen} 
          onOpenChange={setPassportSelectionOpen}
          onSelectType={handlePassportSelect}
        />

        {/* Registration Form Dialog */}
        <RegisterForm 
          open={registerOpen} 
          onOpenChange={handleRegisterClose}
          preselectedType={selectedPassportType}
        />
      </div>
    </div>
  )
}