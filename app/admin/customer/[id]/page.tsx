"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"

interface CustomerData {
  id: string
  name: string
  priority: "High" | "Medium" | "Low"
  holdings: number
  urgentReason: string
  sentiment: "Positive" | "Neutral" | "Negative"
  recordingType: "video" | "audio"
  recordingUrl: string
  transcript: string
}

export default function CustomerDetails({ params }: { params: { id: string } }) {
  const [customer, setCustomer] = useState<CustomerData | null>(null)
  const router = useRouter()

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchCustomerData = async () => {
      // Simulated API response
      const data: CustomerData = {
        id: params.id,
        name: "Vatsalya Sharma",
        priority: "High",
        holdings: 10000000,
        urgentReason: "Loan application pending",
        sentiment: "Neutral",
        recordingType: "video",
        recordingUrl: "https://example.com/recording.mp4",
        transcript:
          "Hello, I'm calling about my loan application. I submitted it last week and haven't heard back yet. I'm a bit concerned about the delay as I need the funds urgently for my business expansion. Could you please check the status and let me know if there's anything else I need to provide? Thank you.",
      }
      setCustomer(data)
    }

    fetchCustomerData()
  }, [params.id])

  const handleCustomerAction = (action: "approve" | "reject" | "escalate") => {
    // In a real application, this would send the action to a backend API
    console.log(`Action ${action} taken for customer ${params.id}`)
    // Navigate back to the admin dashboard after action
    router.push("/admin/dashboard")
  }

  if (!customer) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Customer Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{customer.name}</CardTitle>
          <CardDescription>Customer ID: {customer.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Priority</h3>
            <Badge variant="destructive">{customer.priority}</Badge>
          </div>
          <div>
            <h3 className="font-semibold">Holdings</h3>
            <p>₹{customer.holdings.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Urgent Reason</h3>
            <p>{customer.urgentReason}</p>
          </div>
          <div>
            <h3 className="font-semibold">Sentiment</h3>
            <p
              className={`font-semibold ${
                customer.sentiment === "Positive"
                  ? "text-green-500"
                  : customer.sentiment === "Negative"
                    ? "text-red-500"
                    : "text-yellow-500"
              }`}
            >
              {customer.sentiment}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Customer Recording</h3>
            {customer.recordingType === "video" ? (
              <video src={customer.recordingUrl} controls className="w-full mt-2" />
            ) : (
              <audio src={customer.recordingUrl} controls className="w-full mt-2" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">Transcript</h3>
            <p>{customer.transcript}</p>
          </div>
          <div className="flex justify-between mt-6">
            <Button onClick={() => handleCustomerAction("approve")} className="flex items-center">
              <CheckCircle2 className="mr-2" />
              Approve
            </Button>
            <Button onClick={() => handleCustomerAction("reject")} variant="destructive" className="flex items-center">
              <XCircle className="mr-2" />
              Reject
            </Button>
            <Button onClick={() => handleCustomerAction("escalate")} variant="outline" className="flex items-center">
              <AlertCircle className="mr-2" />
              Escalate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

