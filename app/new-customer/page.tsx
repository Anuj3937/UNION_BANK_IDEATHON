"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ServiceTicket from "@/components/ServiceTicket"
import CustomerRedirection from "@/components/CustomerRedirection"

export default function NewCustomer() {
  const [step, setStep] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome to Union Bank, Ravi</h1>
      {step === 1 && (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>New Customer Onboarding</CardTitle>
            <CardDescription>Please provide your details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input id="aadhaar" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Card Number</Label>
                <Input id="pan" required />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      {step === 2 && (
        <>
          <ServiceTicket
            customerName="Ravi"
            customerType="new"
            queryType="Housing Loan"
            creditScore={680}
            recommendedProduct="First-Time Homebuyer Loan"
          />
          <CustomerRedirection department="Loan Department" appointmentTime="Friday at 11:00 AM" />
        </>
      )}
    </div>
  )
}

