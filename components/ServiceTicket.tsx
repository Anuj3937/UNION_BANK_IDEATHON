import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceTicketProps {
  customerName: string
  customerType: "existing" | "new"
  queryType: string
  creditScore: number
  recommendedProduct?: string
}

export default function ServiceTicket({
  customerName,
  customerType,
  queryType,
  creditScore,
  recommendedProduct,
}: ServiceTicketProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Service Ticket</CardTitle>
        <CardDescription>Customer query details and analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Customer Name:</strong> {customerName}
          </p>
          <p>
            <strong>Customer Type:</strong> {customerType === "existing" ? "Existing Customer" : "New Customer"}
          </p>
          <p>
            <strong>Query Type:</strong> {queryType}
          </p>
          <p>
            <strong>Credit Score:</strong> {creditScore}
          </p>
          {recommendedProduct && (
            <p>
              <strong>Recommended Product:</strong> {recommendedProduct}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

