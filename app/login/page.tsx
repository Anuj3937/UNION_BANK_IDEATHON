"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FacialRecognition from "@/components/FacialRecognition"

export default function Login() {
  const [step, setStep] = useState(1)
  const [mobileNumber, setMobileNumber] = useState("")
  const router = useRouter()

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would check if the mobile number is associated with an account
    // For this example, we'll assume it is and move to facial recognition
    setStep(2)
  }

  const handleAuthenticated = () => {
    // In a real app, we would verify the facial recognition result
    // For this example, we'll just redirect to the dashboard
    router.push("/dashboard")
  }

  return (
    <div className="max-w-md mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Login to Vyom App</h1>
      {step === 1 ? (
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Mobile Number</CardTitle>
            <CardDescription>We'll use this to verify your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleMobileSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <FacialRecognition onAuthenticated={handleAuthenticated} />
      )}
    </div>
  )
}

