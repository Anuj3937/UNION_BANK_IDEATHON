import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Welcome to Union Bank of India's Vyom App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Existing Customers</CardTitle>
            <CardDescription>Access your account and services</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login">
              <Button className="w-full">Login</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Customers</CardTitle>
            <CardDescription>Open a new account with Union Bank of India</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/signup">
              <Button className="w-full">Sign Up</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

