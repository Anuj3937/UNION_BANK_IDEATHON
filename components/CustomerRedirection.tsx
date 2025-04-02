import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerRedirectionProps {
  department: string
  appointmentTime: string
}

export default function CustomerRedirection({ department, appointmentTime }: CustomerRedirectionProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Customer Redirection</CardTitle>
        <CardDescription>Your query has been processed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          You have been redirected to the <strong>{department}</strong> department.
        </p>
        <p>
          Your appointment is scheduled for: <strong>{appointmentTime}</strong>
        </p>
        <Button className="w-full">Confirm Appointment</Button>
      </CardContent>
    </Card>
  )
}

