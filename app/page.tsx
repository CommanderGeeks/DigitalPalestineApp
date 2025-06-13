"use client"

import { useState } from "react"
import PalestineHistoricMap from "@/components/palestine-historic-map"
import { Button } from "@/components/ui/button"
import RegisterForm from "@/components/register-form"

export default function Home() {
  const [registerOpen, setRegisterOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-800 mb-4">Digital Palestine</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Reclaiming our ancestral homeland and preserving our cultural heritage. Together we will restore what is
            rightfully ours and build a future where Palestinians return to their historic lands.
          </p>
        </header>

        {/* Map Container */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-lg">
            <PalestineHistoricMap />
          </div>
        </div>

        {/* Register Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-bold rounded-md"
            onClick={() => setRegisterOpen(true)}
          >
            Register
          </Button>
        </div>

        {/* Registration Form Dialog */}
        <RegisterForm open={registerOpen} onOpenChange={setRegisterOpen} />
      </div>
    </div>
  )
}
