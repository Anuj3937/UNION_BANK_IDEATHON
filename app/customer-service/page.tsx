"use client"

import { useState } from "react"
import FacialRecognition from "@/components/FacialRecognition"
import VideoAudioRecording from "@/components/VideoAudioRecording"
import ServiceTicket from "@/components/ServiceTicket"
import CustomerRedirection from "@/components/CustomerRedirection"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CustomerService() {
  const [step, setStep] = useState(1)
  const [customerData, setCustomerData] = useState<any>(null)

  const handleAuthenticated = (data: any) => {
    setCustomerData(data)
    setStep(2)
  }

  const handleRecordingComplete = (queryData: any) => {
    setStep(3)
    // In a real application, this would send the query to the backend for processing
    console.log("Query data:", queryData)
  }

  const handleFeedback = () => {
    // In a real application, this would submit feedback to a backend
    alert("Thank you for your feedback!")
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Customer Service</h1>
      {step === 1 && <FacialRecognition onAuthenticated={handleAuthenticated} />}
      {step === 2 && <VideoAudioRecording onRecordingComplete={handleRecordingComplete} />}
      {step === 3 && customerData && (
        <div className="space-y-8">
          <ServiceTicket
            customerName={customerData.name}
            customerType="existing"
            queryType="General Inquiry"
            creditScore={customerData.creditScore}
          />
          <CustomerRedirection department="General Customer Service" appointmentTime="In 15 minutes" />
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
      )}
    </div>
  )
}

