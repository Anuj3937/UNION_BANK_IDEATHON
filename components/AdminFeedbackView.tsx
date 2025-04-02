"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Mock data for feedback
const mockFeedback = [
  {
    id: 1,
    customerId: "C001",
    rating: 4,
    issue: "Loan application delay",
    resolution: "Expedited process",
    timestamp: "2023-06-15T10:30:00Z",
    mediaType: "video",
    mediaUrl: "https://example.com/video1.mp4",
  },
  {
    id: 2,
    customerId: "C002",
    rating: 2,
    issue: "Account access problem",
    resolution: "Reset credentials",
    timestamp: "2023-06-14T14:45:00Z",
    mediaType: "audio",
    mediaUrl: "https://example.com/audio1.mp3",
  },
  {
    id: 3,
    customerId: "C003",
    rating: 5,
    issue: "Credit card application",
    resolution: "Approved quickly",
    timestamp: "2023-06-13T09:15:00Z",
    mediaType: "video",
    mediaUrl: "https://example.com/video2.mp4",
  },
]

// Mock XAI explanation (in a real app, this would come from a backend API)
const getXAIExplanation = (feedbackId: number) => {
  // In a real application, this would be an API call to a backend service
  // that processes the feedback using XAI techniques
  const feedback = mockFeedback.find((f) => f.id === feedbackId)

  if (!feedback) {
    return null
  }

  const shapValues = {
    resolution_speed: Math.random() * 0.5,
    communication_clarity: Math.random() * 0.5,
    issue_understanding: Math.random() * 0.5,
    follow_up: Math.random() * 0.5,
    customer_service: Math.random() * 0.5,
  }

  // Normalize SHAP values
  const totalShap = Object.values(shapValues).reduce((a, b) => a + b, 0)
  Object.keys(shapValues).forEach((key) => {
    shapValues[key as keyof typeof shapValues] /= totalShap
  })

  const limeExplanation = {
    positive_factors: [
      feedback.rating > 3 ? "Quick resolution" : "Agent politeness",
      feedback.rating > 3 ? "Clear communication" : "Attempt to understand issue",
    ],
    negative_factors: [
      feedback.rating < 4 ? "Long wait time" : "No follow-up",
      feedback.rating < 4 ? "Lack of issue resolution" : "Complex process",
    ],
  }

  return {
    shap: shapValues,
    lime: limeExplanation,
  }
}

interface AdminFeedbackViewProps {
  onSelectFeedback: (feedback: any) => void
}

export function AdminFeedbackView({ onSelectFeedback }: AdminFeedbackViewProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null)
  const [xaiExplanation, setXAIExplanation] = useState<any>(null)

  const handleViewXAI = (feedbackId: number) => {
    setSelectedFeedback(feedbackId)
    const explanation = getXAIExplanation(feedbackId)
    setXAIExplanation(explanation)
  }

  const handleSelectFeedback = (feedback: any) => {
    onSelectFeedback(feedback)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Feedback</CardTitle>
        <CardDescription>Review and analyze customer feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer ID</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Resolution</TableHead>
              <TableHead>Media</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockFeedback.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>{feedback.customerId}</TableCell>
                <TableCell>{feedback.rating}/5</TableCell>
                <TableCell>{feedback.issue}</TableCell>
                <TableCell>{feedback.resolution}</TableCell>
                <TableCell>{feedback.mediaType}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewXAI(feedback.id)} className="mr-2">
                    View XAI
                  </Button>
                  <Button onClick={() => handleSelectFeedback(feedback)}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedFeedback && xaiExplanation && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>XAI Explanation for Feedback #{selectedFeedback}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold mb-2">SHAP Values (Feature Importance)</h3>
                  <ul>
                    {Object.entries(xaiExplanation.shap).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span>{key.replace("_", " ")}:</span>
                        <span>{(value as number).toFixed(3)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">LIME Explanation</h3>
                  <div>
                    <h4 className="font-semibold">Positive Factors:</h4>
                    <ul className="list-disc pl-5">
                      {xaiExplanation.lime.positive_factors.map((factor: string, index: number) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold">Negative Factors:</h4>
                    <ul className="list-disc pl-5">
                      {xaiExplanation.lime.negative_factors.map((factor: string, index: number) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

