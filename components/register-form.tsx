// Path: components/register-form.tsx
// Updated to work as a dialog/modal

"use client"

import { useState } from "react"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock village data - replace with actual 1139 villages
const VILLAGES = [
  'Acre', 'Ajjur', 'Al-Bassa', 'Al-Bireh', 'Al-Birwa', 'Al-Dawayima',
  'Al-Kabri', 'Al-Majdal', 'Beersheba', 'Bethlehem', 'Deir Yassin',
  'Ein Karem', 'Gaza', 'Haifa', 'Hebron', 'Jaffa', 'Jenin', 'Jerusalem',
  'Lifta', 'Lydda', 'Nablus', 'Nazareth', 'Qalqilya', 'Ramallah', 'Ramla',
  'Safad', 'Tantura', 'Tiberias', 'Tulkarm'
  // Add all 1139 villages here
]

interface RegisterFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  preselectedType?: string
}

export function RegisterForm({ open, onOpenChange, preselectedType }: RegisterFormProps) {
  const router = useRouter()
  const [passportType, setPassportType] = useState(preselectedType || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Personal/Business/Institution common fields
  const [wantsToVolunteer, setWantsToVolunteer] = useState(false)
  const [isPalestinian, setIsPalestinian] = useState(false)
  const [isPalestinianOwned, setIsPalestinianOwned] = useState(false)
  
  // Village search
  const [villageSearch, setVillageSearch] = useState("")
  const [showVillageDropdown, setShowVillageDropdown] = useState(false)
  const [selectedVillage, setSelectedVillage] = useState("")

  // Update passportType when preselectedType changes
  React.useEffect(() => {
    if (preselectedType) {
      setPassportType(preselectedType)
    }
  }, [preselectedType])

  const filteredVillages = VILLAGES.filter(village => 
    village.toLowerCase().startsWith(villageSearch.toLowerCase())
  )

  const handleVillageSelect = (village: string) => {
    setSelectedVillage(village)
    setVillageSearch(village)
    setShowVillageDropdown(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    
    // Add passport type and boolean values
    data.passportType = passportType
    data.isPalestinian = isPalestinian.toString()
    data.isPalestinianOwned = isPalestinianOwned.toString()
    data.wantsToVolunteer = wantsToVolunteer.toString()
    data.village = selectedVillage

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      // Show success message
      alert("We welcome you as a citizen to Digital Palestine")
      
      // Close dialog and redirect
      onOpenChange(false)
      router.push("/share")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Digital Palestine Registration</DialogTitle>
          <DialogDescription>Join our digital nation and connect with Palestinians worldwide</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Show selected passport type as a header */}
          {passportType && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Selected passport type:</p>
              <p className="font-semibold">
                {passportType === 'personal' && 'Any Palestinian / Palestinian Ally'}
                {passportType === 'business' && 'Businesses led by Palestinians / Allies'}
                {passportType === 'institution' && 'Non-Profit / NGO / Financial Institution'}
                {passportType === 'developer' && 'Web2 / Web3 Developer'}
              </p>
            </div>
          )}

          {/* Personal Form */}
          {passportType === "personal" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearOfBirth">Year of Birth</Label>
                  <Input 
                    id="yearOfBirth" 
                    name="yearOfBirth" 
                    type="number" 
                    placeholder="YYYY"
                    min="1900"
                    max={new Date().getFullYear()}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select name="gender" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentLocation">Where do you currently live?</Label>
                  <Input 
                    id="currentLocation" 
                    name="currentLocation" 
                    placeholder="City, Country"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">What is your profession?</Label>
                  <Input id="profession" name="profession" required />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isPalestinian" 
                  checked={isPalestinian}
                  onCheckedChange={(checked) => setIsPalestinian(checked as boolean)}
                />
                <Label htmlFor="isPalestinian">I am Palestinian</Label>
              </div>

              {/* Village selection - only shows if Palestinian */}
              {isPalestinian && (
                <div className="space-y-2">
                  <Label htmlFor="village">What village are you/your family from?</Label>
                  <div className="relative">
                    <Input
                      id="village"
                      value={villageSearch}
                      onChange={(e) => {
                        setVillageSearch(e.target.value)
                        setShowVillageDropdown(true)
                      }}
                      onFocus={() => setShowVillageDropdown(true)}
                      placeholder="Start typing village name..."
                      autoComplete="off"
                      required
                    />
                    {showVillageDropdown && filteredVillages.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredVillages.map((village) => (
                          <div
                            key={village}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleVillageSelect(village)}
                          >
                            {village}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Business Form */}
          {passportType === "business" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" name="businessName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessWebsite">Business Website / Social Media</Label>
                  <Input 
                    id="businessWebsite" 
                    name="businessWebsite" 
                    placeholder="www.example.com or @socialmedia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input id="contactName" name="contactName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" name="contactEmail" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input id="contactPhone" name="contactPhone" type="tel" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea id="businessDescription" name="businessDescription" rows={4} required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isPalestinianOwned" 
                  checked={isPalestinianOwned}
                  onCheckedChange={(checked) => setIsPalestinianOwned(checked as boolean)}
                />
                <Label htmlFor="isPalestinianOwned">This is a Palestinian-owned business</Label>
              </div>

              {/* Village selection - only shows if Palestinian owned */}
              {isPalestinianOwned && (
                <div className="space-y-2">
                  <Label htmlFor="village">What village is your business connected to?</Label>
                  <div className="relative">
                    <Input
                      id="village"
                      value={villageSearch}
                      onChange={(e) => {
                        setVillageSearch(e.target.value)
                        setShowVillageDropdown(true)
                      }}
                      onFocus={() => setShowVillageDropdown(true)}
                      placeholder="Start typing village name..."
                      autoComplete="off"
                      required
                    />
                    {showVillageDropdown && filteredVillages.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredVillages.map((village) => (
                          <div
                            key={village}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleVillageSelect(village)}
                          >
                            {village}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Institution Form */}
          {passportType === "institution" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institutionName">Institution Name</Label>
                  <Input id="institutionName" name="institutionName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institutionType">Institution Type</Label>
                  <Select name="institutionType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nonprofit">Non-Profit</SelectItem>
                      <SelectItem value="ngo">NGO</SelectItem>
                      <SelectItem value="financial">Financial Institution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website / Social Media Platform</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    placeholder="www.example.org or social media link"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Primary Contact Name</Label>
                  <Input id="contactName" name="contactName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" name="contactEmail" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone (WhatsApp optional)</Label>
                  <Input id="contactPhone" name="contactPhone" type="tel" placeholder="+1234567890" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="institutionDescription">Institution Description</Label>
                <Textarea id="institutionDescription" name="institutionDescription" rows={4} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servicesOffered">
                  Services Offered
                  <span className="text-sm text-gray-500 ml-2">
                    (This will help with shaping your identity within Digital Palestine)
                  </span>
                </Label>
                <Textarea id="servicesOffered" name="servicesOffered" rows={3} />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isPalestinian" 
                  checked={isPalestinian}
                  onCheckedChange={(checked) => setIsPalestinian(checked as boolean)}
                />
                <Label htmlFor="isPalestinian">This is a Palestinian institution</Label>
              </div>

              {/* Village selection - only shows if Palestinian institution */}
              {isPalestinian && (
                <div className="space-y-2">
                  <Label htmlFor="village">What village is your institution connected to?</Label>
                  <div className="relative">
                    <Input
                      id="village"
                      value={villageSearch}
                      onChange={(e) => {
                        setVillageSearch(e.target.value)
                        setShowVillageDropdown(true)
                      }}
                      onFocus={() => setShowVillageDropdown(true)}
                      placeholder="Start typing village name..."
                      autoComplete="off"
                      required
                    />
                    {showVillageDropdown && filteredVillages.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredVillages.map((village) => (
                          <div
                            key={village}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleVillageSelect(village)}
                          >
                            {village}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Developer Form stays the same */}
          {passportType === "developer" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input id="github" name="github" placeholder="github.com/username" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Technical Skills</Label>
                <Textarea id="skills" name="skills" placeholder="React, Node.js, Solidity, etc." rows={3} required />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isPalestinian" 
                  checked={isPalestinian}
                  onCheckedChange={(checked) => setIsPalestinian(checked as boolean)}
                />
                <Label htmlFor="isPalestinian">I am Palestinian</Label>
              </div>

              {/* Village selection - only shows if Palestinian */}
              {isPalestinian && (
                <div className="space-y-2">
                  <Label htmlFor="village">What village are you/your family from?</Label>
                  <div className="relative">
                    <Input
                      id="village"
                      value={villageSearch}
                      onChange={(e) => {
                        setVillageSearch(e.target.value)
                        setShowVillageDropdown(true)
                      }}
                      onFocus={() => setShowVillageDropdown(true)}
                      placeholder="Start typing village name..."
                      autoComplete="off"
                      required
                    />
                    {showVillageDropdown && filteredVillages.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredVillages.map((village) => (
                          <div
                            key={village}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleVillageSelect(village)}
                          >
                            {village}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Volunteer Section - Shows for all passport types */}
          {passportType && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="wantsToVolunteer" 
                  checked={wantsToVolunteer}
                  onCheckedChange={(checked) => setWantsToVolunteer(checked as boolean)}
                />
                <Label htmlFor="wantsToVolunteer">
                  {passportType === "institution" 
                    ? "Build Digital Palestine with us?" 
                    : passportType === "business"
                    ? "We want to help build Digital Palestine"
                    : "I want to help build Digital Palestine"}
                </Label>
              </div>
              
              {wantsToVolunteer && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter/X Handle (optional)</Label>
                    <Input id="twitter" name="twitter" placeholder="@username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile (optional)</Label>
                    <Input id="linkedin" name="linkedin" placeholder="linkedin.com/in/username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram Handle (optional)</Label>
                    <Input id="instagram" name="instagram" placeholder="@username" />
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!passportType || isLoading}
          >
            {isLoading ? "Registering..." : "Register for Digital Palestine"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}