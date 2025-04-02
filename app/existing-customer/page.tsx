"use client"

import { useState } from "react"
import FacialRecognition from "@/components/FacialRecognition"
import VideoAudioRecording from "@/components/VideoAudioRecording"
import ServiceTicket from "@/components/ServiceTicket"
import CustomerRedirection from "@/components/CustomerRedirection"
import CustomerPrioritization from "@/components/CustomerPrioritization"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExistingCustomer() {
  const [step, setStep] = useState(1)

  const handleAuthenticated = () => setStep(2)
  const handleRecordingComplete = () => setStep(3)
  const handleFeedback = () => {
    // In a real application, this would submit feedback to a backend
    alert("Thank you for your feedback!")
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome Back, Vatsalya</h1>
      {step === 1 && <FacialRecognition onAuthenticated={handleAuthenticated} />}
      {step === 2 && <VideoAudioRecording onRecordingComplete={handleRecordingComplete} />}
      {step === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ServiceTicket
              customerName="Vatsalya"
              customerType="existing"
              queryType="Loan"
              creditScore={750}
              recommendedProduct="Home Loan"
            />
            <CustomerRedirection department="Loan Department" appointmentTime="Tomorrow at 2:00 PM" />
          </div>
          <div className="space-y-8">
            <CustomerPrioritization customerName="Vatsalya" holdings={1000000} priority="High" />
            <Card>
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
                <CardDescription>Help us improve our service</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleFeedback}>Provide Feedback</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

