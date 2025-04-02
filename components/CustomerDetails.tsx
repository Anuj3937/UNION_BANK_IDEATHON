import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CustomerDetailsProps {
  customerId: string
}

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

export function CustomerDetails({ customerId }: CustomerDetailsProps) {
  const [customer, setCustomer] = useState<CustomerData | null>(null)

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchCustomerData = async () => {
      // Simulated API response
      const data: CustomerData = {
        id: customerId,
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
  }, [customerId])

  if (!customer) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{customer.name}</CardTitle>
        <CardDescription>Customer Details</CardDescription>
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
          <h3 className="font-semibold">Recording</h3>
          {customer.recordingType === "video" ? (
            <video src={customer.recordingUrl} controls className="w-full" />
          ) : (
            <audio src={customer.recordingUrl} controls className="w-full" />
          )}
        </div>
        <div>
          <h3 className="font-semibold">Transcript</h3>
          <p>{customer.transcript}</p>
        </div>
      </CardContent>
    </Card>
  )
}

