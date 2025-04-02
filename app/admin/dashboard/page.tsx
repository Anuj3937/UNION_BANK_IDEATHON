"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { HighPriorityCustomers } from "@/components/HighPriorityCustomers"
import { useRouter } from "next/navigation"
import { AdminFeedbackView } from "@/components/AdminFeedbackView"
import { Button } from "@/components/ui/button"

const customerData = [
  { name: "Jan", newCustomers: 400, existingCustomers: 2400 },
  { name: "Feb", newCustomers: 300, existingCustomers: 1398 },
  { name: "Mar", newCustomers: 200, existingCustomers: 9800 },
  { name: "Apr", newCustomers: 278, existingCustomers: 3908 },
  { name: "May", newCustomers: 189, existingCustomers: 4800 },
  { name: "Jun", newCustomers: 239, existingCustomers: 3800 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const router = useRouter()
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)

  const handleCustomerAction = (action: "approve" | "reject" | "escalate") => {
    // In a real application, this would send the action to a backend API
    console.log(`Action ${action} taken for customer ${selectedCustomerId}`)
    // Reset selected customer after action
    setSelectedCustomerId(null)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="priority">Priority Customers</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">10,245</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Customers (Today)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">42</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">189</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>New vs Existing Customers</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="newCustomers" fill="#8884d8" />
                  <Bar dataKey="existingCustomers" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="priority">
          <div className="grid gap-4 md:grid-cols-2">
            <HighPriorityCustomers onAttend={(customerId) => router.push(`/admin/customer/${customerId}`)} />
          </div>
        </TabsContent>
        <TabsContent value="feedback">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminFeedbackView onSelectFeedback={setSelectedFeedback} />
            {selectedFeedback && (
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Feedback</CardTitle>
                  <CardDescription>Customer ID: {selectedFeedback.customerId}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Issue:</strong> {selectedFeedback.issue}
                  </p>
                  <p>
                    <strong>Resolution:</strong> {selectedFeedback.resolution}
                  </p>
                  <p>
                    <strong>Rating:</strong> {selectedFeedback.rating}/5
                  </p>
                  <p>
                    <strong>Timestamp:</strong> {new Date(selectedFeedback.timestamp).toLocaleString()}
                  </p>
                  {selectedFeedback.mediaType === "video" && (
                    <div className="mt-4">
                      <h3 className="font-bold mb-2">Customer Video</h3>
                      <video src={selectedFeedback.mediaUrl} controls className="w-full" />
                    </div>
                  )}
                  {selectedFeedback.mediaType === "audio" && (
                    <div className="mt-4">
                      <h3 className="font-bold mb-2">Customer Audio</h3>
                      <audio src={selectedFeedback.mediaUrl} controls className="w-full" />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      /* Implement action */
                    }}
                  >
                    Take Action
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

