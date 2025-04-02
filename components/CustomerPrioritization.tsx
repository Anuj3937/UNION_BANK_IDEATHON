import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CustomerPriorityProps {
  customerName: string
  holdings: number
  priority: "High" | "Medium" | "Low"
}

export default function CustomerPrioritization({ customerName, holdings, priority }: CustomerPriorityProps) {
  const priorityColor = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Priority</CardTitle>
        <CardDescription>Based on customer holdings and engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Customer Name:</strong> {customerName}
          </p>
          <p>
            <strong>Holdings:</strong> ₹{holdings.toLocaleString()}
          </p>
          <div>
            <strong>Priority:</strong> <Badge className={priorityColor[priority]}>{priority}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

