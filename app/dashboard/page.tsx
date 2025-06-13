"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Dashboard from "@/components/dashboard"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  return <Dashboard />
}

// The original Dashboard component code can be kept as is or moved to Dashboard.tsx
// For the sake of this example, I'll keep it here but note that it should ideally be moved to Dashboard.tsx

const DashboardComponent = () => {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login")
    },
  })

  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "authenticated" && session) {
      fetchUserData()
    }
  }, [status, session])

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/me")
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      } else {
        console.error("Failed to fetch user data")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">Digital Palestine Dashboard</h1>

      {userData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {userData.name}</CardTitle>
              <CardDescription>Your Digital Palestine Passport</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Passport Type:</span> {userData.passportType}
                </div>
                {userData.isPalestinian && userData.region && (
                  <div>
                    <span className="font-medium">Region of Origin:</span> {userData.region.name}
                  </div>
                )}
                {userData.volunteer && (
                  <div>
                    <span className="font-medium">Volunteer Status:</span> Active
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Engagement</CardTitle>
              <CardDescription>Your participation in Digital Palestine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userData.committeeInterests && userData.committeeInterests.length > 0 && (
                  <div>
                    <span className="font-medium">Committee Interests:</span>{" "}
                    {userData.committeeInterests.map((ci: any) => ci.committee).join(", ")}
                  </div>
                )}
                {userData.joinCommunityEvents && (
                  <div className="text-emerald-600">✓ Interested in community events</div>
                )}
                {userData.participateInSurveys && (
                  <div className="text-emerald-600">✓ Willing to participate in surveys</div>
                )}
                {userData.earlyAccessTesting && (
                  <div className="text-emerald-600">✓ Signed up for early access testing</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg mb-4">No user data found. Please complete your registration.</p>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      )}
    </div>
  )
}

// Optionally, you can export the DashboardComponent if needed
// export default DashboardComponent
