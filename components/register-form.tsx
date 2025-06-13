"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Initial form data structure
const initialFormData = {
  // Basic Information
  name: "",
  email: "",
  isPalestinian: false,
  ancestralRegion: "",
  cityOfOrigin: "",
  connectToOrigin: false,
  passportType: "personal",

  // Volunteer Information
  volunteerInterest: false,
  joinSubCommittee: false,
  volunteerSkills: [],
  additionalContributions: "",

  // Community Engagement
  participateInSurveys: false,
  earlyAccessTesting: false,
  joinCommunityEvents: false,
  connectWithOthers: false,
  contributeIdeas: false,
  hopesForDigitalPalestine: "",
  supportNeeds: "",
  desiredFeatures: "",

  // Personal Profile
  dateOfBirth: "",
  gender: "",
  nationality: "",
  countryOfResidence: "",
  cityOfResidence: "",
  profession: "",
  areasOfExpertise: "",
  skillsOrHobbies: "",
  primaryInterests: "",
  interestedInGovernance: false,

  // Business Profile
  businessName: "",
  businessWebsite: "",
  businessCountry: "",
  businessCity: "",
  businessSector: "",
  businessSize: "",
  businessGoals: "",
  businessChallenges: "",
  businessInterestedInGovernance: false,

  // Institution Profile
  institutionName: "",
  institutionWebsite: "",
  institutionCountry: "",
  institutionCity: "",
  memberCount: "",
  areaOfFocus: "",
  institutionGoals: "",
  existingPartnerships: "",
  currentServices: "",
  institutionCategory: "",

  // Developer Profile
  developerNationality: "",
  developerCountry: "",
  developerCity: "",
  developerExpertise: "",
  yearsOfExperience: "",
  primaryFocus: "",
  technicalSkills: [],
  interestedInGrants: false,
  interestedInDevGovernance: false,
  joinDeveloperNetwork: false,
  workingModality: "",
}

// Skills options for volunteers
const volunteerSkillOptions = [
  "Writing",
  "Translation",
  "Software Development",
  "Community Outreach",
  "Graphic Design",
  "Legal Expertise",
  "Fundraising",
  "Social Media",
  "Event Organizing",
]

// Technical skills for developers
const technicalSkillOptions = [
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
  "DevOps",
  "UI/UX Design",
  "Data Science",
  "Blockchain",
  "AI/Machine Learning",
  "Security",
]

// Change from named export to default export
export default function RegisterForm({ open, onOpenChange }) {
  const [formData, setFormData] = useState(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [regions, setRegions] = useState([])
  const [towns, setTowns] = useState([])

  // Fetch regions from API or use hardcoded fallback
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch("/api/regions")
        if (response.ok) {
          const data = await response.json()
          setRegions(data)
        } else {
          // Fallback to hardcoded regions
          setRegions([
            { id: "jenin", name: "Jenin" },
            { id: "acre", name: "Acre" },
            { id: "tulkarm", name: "Tulkarm" },
            { id: "nablus", name: "Nablus" },
            { id: "tiberias", name: "Tiberias" },
            { id: "safad", name: "Safad" },
            { id: "ramallah", name: "Ramallah" },
            { id: "jerusalem", name: "Jerusalem" },
            { id: "hebron", name: "Hebron" },
            { id: "gaza", name: "Gaza" },
            { id: "baysan", name: "Baysan" },
            { id: "nazareth", name: "Nazareth" },
            { id: "jaffa", name: "Jaffa" },
            { id: "alramla", name: "al-Ramla" },
            { id: "haifa", name: "Haifa" },
            { id: "beershebah", name: "Beershebah" },
          ])
        }
      } catch (error) {
        console.error("Error fetching regions:", error)
        // Fallback to hardcoded regions
        setRegions([
          { id: "jenin", name: "Jenin" },
          { id: "acre", name: "Acre" },
          { id: "tulkarm", name: "Tulkarm" },
          { id: "nablus", name: "Nablus" },
          { id: "tiberias", name: "Tiberias" },
          { id: "safad", name: "Safad" },
          { id: "ramallah", name: "Ramallah" },
          { id: "jerusalem", name: "Jerusalem" },
          { id: "hebron", name: "Hebron" },
          { id: "gaza", name: "Gaza" },
          { id: "baysan", name: "Baysan" },
          { id: "nazareth", name: "Nazareth" },
          { id: "jaffa", name: "Jaffa" },
          { id: "alramla", name: "al-Ramla" },
          { id: "haifa", name: "Haifa" },
          { id: "beershebah", name: "Beershebah" },
        ])
      }
    }

    fetchRegions()
  }, [])

  // Fetch towns when region changes
  useEffect(() => {
    if (formData.ancestralRegion) {
      const fetchTowns = async () => {
        try {
          const response = await fetch(`/api/regions?regionId=${formData.ancestralRegion}`)
          if (response.ok) {
            const data = await response.json()
            setTowns(data)
          }
        } catch (error) {
          console.error("Error fetching towns:", error)
        }
      }

      fetchTowns()
    }
  }, [formData.ancestralRegion])

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Handle checkbox array changes (for skills)
  const handleCheckboxArrayChange = (field, value, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        [field]: [...(formData[field] || []), value],
      })
    } else {
      setFormData({
        ...formData,
        [field]: (formData[field] || []).filter((item) => item !== value),
      })
    }
  }

  // Validate current step
  const validateStep = () => {
    // Basic validation for demonstration
    if (currentStep === 1) {
      if (!formData.name || !formData.email) {
        setError("Please fill in all required fields")
        return false
      }
      if (formData.isPalestinian && !formData.ancestralRegion) {
        setError("Please select your ancestral region")
        return false
      }
    }

    if (currentStep === 2 && !formData.passportType) {
      setError("Please select a passport type")
      return false
    }

    setError(null)
    return true
  }

  // Move to next step
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Move to previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (validateStep()) {
      try {
        setLoading(true)
        setError(null)

        // Prepare the data for submission based on the form data
        const submissionData = {
          user: {
            name: formData.name,
            email: formData.email,
            isPalestinian: formData.isPalestinian || false,
            regionId: formData.isPalestinian ? formData.ancestralRegion : null,
            townCity: formData.isPalestinian ? formData.cityOfOrigin : null,
            connectToOrigin: formData.isPalestinian ? formData.connectToOrigin : false,
            passportType: formData.passportType?.toUpperCase() || "PERSONAL",
            volunteer: formData.volunteerInterest,
            joinSubCommittee: formData.joinSubCommittee,
            volunteerSkills: formData.volunteerSkills || [],
            additionalContributions: formData.additionalContributions,
            participateInSurveys: formData.participateInSurveys,
            earlyAccessTesting: formData.earlyAccessTesting,
            joinCommunityEvents: formData.joinCommunityEvents,
            connectWithOthers: formData.connectWithOthers,
            contributeIdeas: formData.contributeIdeas,
            hopesForDigitalPalestine: formData.hopesForDigitalPalestine,
            supportNeeds: formData.supportNeeds,
            desiredFeatures: formData.desiredFeatures,
          },
        }

        // Add the appropriate profile data based on passport type
        if (formData.passportType === "personal") {
          submissionData.personalProfile = {
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            nationality: formData.nationality,
            countryOfResidence: formData.countryOfResidence,
            cityOfResidence: formData.cityOfResidence,
            profession: formData.profession,
            areasOfExpertise: formData.areasOfExpertise,
            skillsOrHobbies: formData.skillsOrHobbies,
            primaryInterests: formData.primaryInterests,
            interestedInGovernance: formData.interestedInGovernance,
          }
        } else if (formData.passportType === "business") {
          submissionData.businessInfo = {
            companyName: formData.businessName,
            website: formData.businessWebsite,
            country: formData.businessCountry,
            city: formData.businessCity,
            sector: formData.businessSector,
            employeeCount: formData.businessSize,
            goals: formData.businessGoals,
            challenges: formData.businessChallenges,
            interestedInGovernance: formData.businessInterestedInGovernance,
          }
        } else if (formData.passportType === "institutional") {
          submissionData.institutionInfo = {
            orgName: formData.institutionName,
            website: formData.institutionWebsite,
            country: formData.institutionCountry,
            city: formData.institutionCity,
            memberCount: formData.memberCount,
            areaOfFocus: formData.areaOfFocus,
            goals: formData.institutionGoals,
            partnerships: formData.existingPartnerships,
            services: formData.currentServices,
            category: formData.institutionCategory,
          }
        } else if (formData.passportType === "developer") {
          submissionData.developerInfo = {
            nationality: formData.developerNationality || "",
            country: formData.developerCountry || "",
            city: formData.developerCity || "",
            expertise: formData.developerExpertise || "",
            yearsExperience: formData.yearsOfExperience || "",
            primaryFocus: formData.primaryFocus || "",
            stack: Array.isArray(formData.technicalSkills) ? formData.technicalSkills : [],
            github: "", // Add a field for GitHub if needed
            interestedInGrants: formData.interestedInGrants || false,
            interestedInGovernance: formData.interestedInDevGovernance || false,
            joinDeveloperNetwork: formData.joinDeveloperNetwork || false,
            workingModality: formData.workingModality || "",
          }
        }

        console.log("Submitting data:", submissionData)

        // Send the data to the API
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error("Registration error details:", errorData)
          throw new Error(errorData.error || "Failed to submit registration")
        }

        const result = await response.json()

        // Show success message
        alert("Thank you for registering with Digital Palestine!")

        // Close the form
        onOpenChange(false)

        // Reset form for next time
        setFormData(initialFormData)
        setCurrentStep(1)

        // Redirect to dashboard or login page
        // window.location.href = '/dashboard'
      } catch (error) {
        console.error("Registration error:", error)
        setError(`Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`)
      } finally {
        setLoading(false)
      }
    }
  }

  // Render the form
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-green-700">
            Digital Palestine Registration
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email address"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPalestinian"
                checked={formData.isPalestinian}
                onCheckedChange={(checked) => handleChange("isPalestinian", checked)}
              />
              <Label htmlFor="isPalestinian">I am of Palestinian origin</Label>
            </div>

            {formData.isPalestinian && (
              <div className="space-y-4 pl-6 border-l-2 border-green-200">
                <div className="space-y-2">
                  <Label htmlFor="ancestralRegion">Ancestral Region in Palestine</Label>
                  <Select
                    value={formData.ancestralRegion}
                    onValueChange={(value) => handleChange("ancestralRegion", value)}
                  >
                    <SelectTrigger id="ancestralRegion">
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.id} value={region.id}>
                          {region.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cityOfOrigin">City/Town of Origin</Label>
                  <Input
                    id="cityOfOrigin"
                    value={formData.cityOfOrigin}
                    onChange={(e) => handleChange("cityOfOrigin", e.target.value)}
                    placeholder="Enter your city or town of origin"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="connectToOrigin"
                    checked={formData.connectToOrigin}
                    onCheckedChange={(checked) => handleChange("connectToOrigin", checked)}
                  />
                  <Label htmlFor="connectToOrigin">I would like to connect with others from my region of origin</Label>
                </div>
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end">
              <Button onClick={nextStep}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 2: Passport Type */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Choose Your Passport Type</h2>

            <Tabs
              value={formData.passportType}
              onValueChange={(value) => handleChange("passportType", value)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="institutional">Institutional</TabsTrigger>
                <TabsTrigger value="developer">Developer</TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="personal">
                  <p className="text-sm text-gray-600 mb-4">
                    For individuals who want to connect with the Palestinian community and support the cause.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        id="nationality"
                        value={formData.nationality}
                        onChange={(e) => handleChange("nationality", e.target.value)}
                        placeholder="Enter your nationality"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="countryOfResidence">Country of Residence</Label>
                        <Input
                          id="countryOfResidence"
                          value={formData.countryOfResidence}
                          onChange={(e) => handleChange("countryOfResidence", e.target.value)}
                          placeholder="Enter your country"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cityOfResidence">City of Residence</Label>
                        <Input
                          id="cityOfResidence"
                          value={formData.cityOfResidence}
                          onChange={(e) => handleChange("cityOfResidence", e.target.value)}
                          placeholder="Enter your city"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profession">Profession</Label>
                      <Input
                        id="profession"
                        value={formData.profession}
                        onChange={(e) => handleChange("profession", e.target.value)}
                        placeholder="Enter your profession"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="areasOfExpertise">Areas of Expertise</Label>
                      <Input
                        id="areasOfExpertise"
                        value={formData.areasOfExpertise}
                        onChange={(e) => handleChange("areasOfExpertise", e.target.value)}
                        placeholder="Enter your areas of expertise"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skillsOrHobbies">Skills or Hobbies</Label>
                      <Input
                        id="skillsOrHobbies"
                        value={formData.skillsOrHobbies}
                        onChange={(e) => handleChange("skillsOrHobbies", e.target.value)}
                        placeholder="Enter your skills or hobbies"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primaryInterests">Primary Interests</Label>
                      <Input
                        id="primaryInterests"
                        value={formData.primaryInterests}
                        onChange={(e) => handleChange("primaryInterests", e.target.value)}
                        placeholder="Enter your primary interests"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="interestedInGovernance"
                        checked={formData.interestedInGovernance}
                        onCheckedChange={(checked) => handleChange("interestedInGovernance", checked)}
                      />
                      <Label htmlFor="interestedInGovernance">
                        I am interested in participating in governance of Digital Palestine
                      </Label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="business">
                  <p className="text-sm text-gray-600 mb-4">
                    For businesses that want to support Palestine and connect with Palestinian entrepreneurs.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => handleChange("businessName", e.target.value)}
                        placeholder="Enter your business name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessWebsite">Business Website</Label>
                      <Input
                        id="businessWebsite"
                        value={formData.businessWebsite}
                        onChange={(e) => handleChange("businessWebsite", e.target.value)}
                        placeholder="Enter your business website"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessCountry">Country</Label>
                        <Input
                          id="businessCountry"
                          value={formData.businessCountry}
                          onChange={(e) => handleChange("businessCountry", e.target.value)}
                          placeholder="Enter country"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessCity">City</Label>
                        <Input
                          id="businessCity"
                          value={formData.businessCity}
                          onChange={(e) => handleChange("businessCity", e.target.value)}
                          placeholder="Enter city"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessSector">Business Sector</Label>
                      <Input
                        id="businessSector"
                        value={formData.businessSector}
                        onChange={(e) => handleChange("businessSector", e.target.value)}
                        placeholder="Enter your business sector"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessSize">Number of Employees</Label>
                      <Select
                        value={formData.businessSize}
                        onValueChange={(value) => handleChange("businessSize", value)}
                      >
                        <SelectTrigger id="businessSize">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10</SelectItem>
                          <SelectItem value="11-50">11-50</SelectItem>
                          <SelectItem value="51-200">51-200</SelectItem>
                          <SelectItem value="201-500">201-500</SelectItem>
                          <SelectItem value="501+">501+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessGoals">Business Goals with Digital Palestine</Label>
                      <Textarea
                        id="businessGoals"
                        value={formData.businessGoals}
                        onChange={(e) => handleChange("businessGoals", e.target.value)}
                        placeholder="Describe your business goals"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessChallenges">Business Challenges</Label>
                      <Textarea
                        id="businessChallenges"
                        value={formData.businessChallenges}
                        onChange={(e) => handleChange("businessChallenges", e.target.value)}
                        placeholder="Describe your business challenges"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="businessInterestedInGovernance"
                        checked={formData.businessInterestedInGovernance}
                        onCheckedChange={(checked) => handleChange("businessInterestedInGovernance", checked)}
                      />
                      <Label htmlFor="businessInterestedInGovernance">
                        My business is interested in participating in governance of Digital Palestine
                      </Label>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="institutional">
                  <p className="text-sm text-gray-600 mb-4">
                    For organizations, NGOs, and institutions working with or supporting Palestine.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="institutionName">Institution Name</Label>
                      <Input
                        id="institutionName"
                        value={formData.institutionName}
                        onChange={(e) => handleChange("institutionName", e.target.value)}
                        placeholder="Enter your institution name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="institutionCategory">Institution Type</Label>
                      <Select
                        value={formData.institutionCategory}
                        onValueChange={(value) => handleChange("institutionCategory", value)}
                      >
                        <SelectTrigger id="institutionCategory">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ngo">NGO</SelectItem>
                          <SelectItem value="educational">Educational Institution</SelectItem>
                          <SelectItem value="government">Government Organization</SelectItem>
                          <SelectItem value="cultural">Cultural Institution</SelectItem>
                          <SelectItem value="religious">Religious Institution</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="institutionWebsite">Institution Website</Label>
                      <Input
                        id="institutionWebsite"
                        value={formData.institutionWebsite}
                        onChange={(e) => handleChange("institutionWebsite", e.target.value)}
                        placeholder="Enter your institution website"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="institutionCountry">Country</Label>
                        <Input
                          id="institutionCountry"
                          value={formData.institutionCountry}
                          onChange={(e) => handleChange("institutionCountry", e.target.value)}
                          placeholder="Enter country"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="institutionCity">City</Label>
                        <Input
                          id="institutionCity"
                          value={formData.institutionCity}
                          onChange={(e) => handleChange("institutionCity", e.target.value)}
                          placeholder="Enter city"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="memberCount">Number of Members/Staff</Label>
                      <Input
                        id="memberCount"
                        value={formData.memberCount}
                        onChange={(e) => handleChange("memberCount", e.target.value)}
                        placeholder="Enter number of members or staff"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="areaOfFocus">Area of Focus</Label>
                      <Input
                        id="areaOfFocus"
                        value={formData.areaOfFocus}
                        onChange={(e) => handleChange("areaOfFocus", e.target.value)}
                        placeholder="Enter your area of focus"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="institutionGoals">Goals with Digital Palestine</Label>
                      <Textarea
                        id="institutionGoals"
                        value={formData.institutionGoals}
                        onChange={(e) => handleChange("institutionGoals", e.target.value)}
                        placeholder="Describe your goals"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="existingPartnerships">Existing Partnerships</Label>
                      <Textarea
                        id="existingPartnerships"
                        value={formData.existingPartnerships}
                        onChange={(e) => handleChange("existingPartnerships", e.target.value)}
                        placeholder="Describe your existing partnerships"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentServices">Current Services</Label>
                      <Textarea
                        id="currentServices"
                        value={formData.currentServices}
                        onChange={(e) => handleChange("currentServices", e.target.value)}
                        placeholder="Describe your current services"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="developer">
                  <p className="text-sm text-gray-600 mb-4">
                    For developers and tech professionals who want to contribute to Palestinian digital projects.
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="developerNationality">Nationality</Label>
                      <Input
                        id="developerNationality"
                        value={formData.developerNationality}
                        onChange={(e) => handleChange("developerNationality", e.target.value)}
                        placeholder="Enter your nationality"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="developerCountry">Country of Residence</Label>
                        <Input
                          id="developerCountry"
                          value={formData.developerCountry}
                          onChange={(e) => handleChange("developerCountry", e.target.value)}
                          placeholder="Enter your country"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="developerCity">City of Residence</Label>
                        <Input
                          id="developerCity"
                          value={formData.developerCity}
                          onChange={(e) => handleChange("developerCity", e.target.value)}
                          placeholder="Enter your city"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="developerExpertise">Area of Expertise</Label>
                      <Input
                        id="developerExpertise"
                        value={formData.developerExpertise}
                        onChange={(e) => handleChange("developerExpertise", e.target.value)}
                        placeholder="Enter your area of expertise"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Select
                        value={formData.yearsOfExperience}
                        onValueChange={(value) => handleChange("yearsOfExperience", value)}
                      >
                        <SelectTrigger id="yearsOfExperience">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="primaryFocus">Primary Focus</Label>
                      <Input
                        id="primaryFocus"
                        value={formData.primaryFocus}
                        onChange={(e) => handleChange("primaryFocus", e.target.value)}
                        placeholder="Enter your primary focus"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Technical Skills</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {technicalSkillOptions.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={`skill-${skill}`}
                              checked={formData.technicalSkills.includes(skill)}
                              onCheckedChange={(checked) => {
                                handleCheckboxArrayChange("technicalSkills", skill, checked)
                              }}
                            />
                            <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workingModality">Preferred Working Modality</Label>
                      <RadioGroup
                        value={formData.workingModality}
                        onValueChange={(value) => handleChange("workingModality", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="full-time" id="full-time" />
                          <Label htmlFor="full-time">Full-time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="part-time" id="part-time" />
                          <Label htmlFor="part-time">Part-time</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="project-based" id="project-based" />
                          <Label htmlFor="project-based">Project-based</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="volunteer" id="volunteer" />
                          <Label htmlFor="volunteer">Volunteer</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="interestedInGrants"
                        checked={formData.interestedInGrants}
                        onCheckedChange={(checked) => handleChange("interestedInGrants", checked)}
                      />
                      <Label htmlFor="interestedInGrants">
                        I am interested in grant opportunities for Palestinian tech projects
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="interestedInDevGovernance"
                        checked={formData.interestedInDevGovernance}
                        onCheckedChange={(checked) => handleChange("interestedInDevGovernance", checked)}
                      />
                      <Label htmlFor="interestedInDevGovernance">
                        I am interested in participating in technical governance of Digital Palestine
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="joinDeveloperNetwork"
                        checked={formData.joinDeveloperNetwork}
                        onCheckedChange={(checked) => handleChange("joinDeveloperNetwork", checked)}
                      />
                      <Label htmlFor="joinDeveloperNetwork">
                        I would like to join the Palestinian developer network
                      </Label>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 3: Volunteer Information */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Volunteer Opportunities</h2>

            <div className="flex items-center space-x-2">
              <Switch
                id="volunteerInterest"
                checked={formData.volunteerInterest}
                onCheckedChange={(checked) => handleChange("volunteerInterest", checked)}
              />
              <Label htmlFor="volunteerInterest">I'm interested in volunteering for Digital Palestine</Label>
            </div>

            {formData.volunteerInterest && (
              <div className="space-y-4 pl-6 border-l-2 border-green-200">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="joinSubCommittee"
                    checked={formData.joinSubCommittee}
                    onCheckedChange={(checked) => handleChange("joinSubCommittee", checked)}
                  />
                  <Label htmlFor="joinSubCommittee">I would like to join a sub-committee</Label>
                </div>

                <div className="space-y-2">
                  <Label>Skills I can contribute (select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {volunteerSkillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={formData.volunteerSkills.includes(skill)}
                          onCheckedChange={(checked) => {
                            handleCheckboxArrayChange("volunteerSkills", skill, checked)
                          }}
                        />
                        <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalContributions">Additional ways I can contribute</Label>
                  <Textarea
                    id="additionalContributions"
                    value={formData.additionalContributions}
                    onChange={(e) => handleChange("additionalContributions", e.target.value)}
                    placeholder="Describe other ways you can help"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 4: Community Engagement */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Community Engagement</h2>
            <p className="text-sm text-gray-600">
              Let us know how you'd like to engage with the Digital Palestine community.
            </p>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="participateInSurveys"
                  checked={formData.participateInSurveys}
                  onCheckedChange={(checked) => handleChange("participateInSurveys", checked)}
                />
                <Label htmlFor="participateInSurveys">Participate in surveys and feedback sessions</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="earlyAccessTesting"
                  checked={formData.earlyAccessTesting}
                  onCheckedChange={(checked) => handleChange("earlyAccessTesting", checked)}
                />
                <Label htmlFor="earlyAccessTesting">Test early access features</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="joinCommunityEvents"
                  checked={formData.joinCommunityEvents}
                  onCheckedChange={(checked) => handleChange("joinCommunityEvents", checked)}
                />
                <Label htmlFor="joinCommunityEvents">Join community events and webinars</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="connectWithOthers"
                  checked={formData.connectWithOthers}
                  onCheckedChange={(checked) => handleChange("connectWithOthers", checked)}
                />
                <Label htmlFor="connectWithOthers">Connect with other community members</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contributeIdeas"
                  checked={formData.contributeIdeas}
                  onCheckedChange={(checked) => handleChange("contributeIdeas", checked)}
                />
                <Label htmlFor="contributeIdeas">Contribute ideas for platform development</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hopesForDigitalPalestine">What are your hopes for Digital Palestine?</Label>
              <Textarea
                id="hopesForDigitalPalestine"
                value={formData.hopesForDigitalPalestine}
                onChange={(e) => handleChange("hopesForDigitalPalestine", e.target.value)}
                placeholder="Share your vision"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportNeeds">What support do you need from Digital Palestine?</Label>
              <Textarea
                id="supportNeeds"
                value={formData.supportNeeds}
                onChange={(e) => handleChange("supportNeeds", e.target.value)}
                placeholder="Describe your needs"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredFeatures">What features would you like to see on the platform?</Label>
              <Textarea
                id="desiredFeatures"
                value={formData.desiredFeatures}
                onChange={(e) => handleChange("desiredFeatures", e.target.value)}
                placeholder="Suggest features"
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
