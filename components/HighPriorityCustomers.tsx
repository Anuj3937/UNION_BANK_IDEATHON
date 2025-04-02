import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Customer {
  id: string
  name: string
  priority: "High" | "Medium" | "Low"
  holdings: number
  urgentReason: string
  sentiment: "Positive" | "Neutral" | "Negative"
}

const customers: Customer[] = [
  {
    id: "1",
    name: "Vatsalya Sharma",
    priority: "High",
    holdings: 10000000,
    urgentReason: "Loan application pending",
    sentiment: "Neutral",
  },
  {
    id: "2",
    name: "Priya Patel",
    priority: "High",
    holdings: 5000000,
    urgentReason: "Reported fraudulent activity",
    sentiment: "Negative",
  },
  {
    id: "3",
    name: "Rahul Gupta",
    priority: "High",
    holdings: 7500000,
    urgentReason: "Large transaction approval needed",
    sentiment: "Positive",
  },
]

interface HighPriorityCustomersProps {
  onAttend: (customerId: string) => void
}

export function HighPriorityCustomers({ onAttend }: HighPriorityCustomersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>High Priority Customers</CardTitle>
        <CardDescription>Customers requiring urgent attention</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {customers.map((customer) => (
            <li key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{customer.name}</h3>
                <p className="text-sm text-gray-500">Holdings: ₹{customer.holdings.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{customer.urgentReason}</p>
                <p className="text-sm">
                  Sentiment:{" "}
                  <span
                    className={`font-semibold ${
                      customer.sentiment === "Positive"
                        ? "text-green-500"
                        : customer.sentiment === "Negative"
                          ? "text-red-500"
                          : "text-yellow-500"
                    }`}
                  >
                    {customer.sentiment}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="destructive">{customer.priority}</Badge>
                <Button size="sm" onClick={() => onAttend(customer.id)}>
                  Attend
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

