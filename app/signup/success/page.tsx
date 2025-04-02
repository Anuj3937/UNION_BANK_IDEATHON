import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupSuccess() {
  return (
    <div className="max-w-md mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Account Created Successfully</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Union Bank of India</CardTitle>
          <CardDescription>Your account has been created and is pending verification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We will review your application and contact you within 2-3 business days to complete the account opening
            process.
          </p>
          <Link href="/login">
            <Button className="w-full">Proceed to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

