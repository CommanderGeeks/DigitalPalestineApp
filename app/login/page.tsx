"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  return <LoginForm />
}

// LoginForm component can be defined here if needed
const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
      })

      if (result?.error) {
        setMessage({ type: "error", text: "Failed to send login email. Please try again." })
      } else {
        setMessage({
          type: "success",
          text: "Check your email! We've sent you a magic link to sign in.",
        })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleWalletLogin = async () => {
    // This is a placeholder for wallet login
    // In a real implementation, you would connect to MetaMask or another wallet
    // and handle the signature verification
    alert("Wallet login would be implemented here")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-emerald-700">Digital Palestine</CardTitle>
          <CardDescription>Sign in to access your Digital Palestine Passport</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Magic Link"}
                </Button>

                {message && (
                  <div
                    className={`p-3 rounded text-sm ${
                      message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                    }`}
                  >
                    {message.text}
                  </div>
                )}
              </form>
            </TabsContent>

            <TabsContent value="wallet">
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Connect your wallet to sign in securely without a password.</p>

                <Button onClick={handleWalletLogin} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Connect Wallet
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="/" className="text-emerald-600 hover:text-emerald-700">
                Register for a Digital Palestine Passport
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
