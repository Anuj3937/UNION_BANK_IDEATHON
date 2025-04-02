"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft } from "lucide-react"

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "JPY"]

// Mock exchange rates (in a real app, these would come from an API)
const EXCHANGE_RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  JPY: 1.72,
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("INR")
  const [toCurrency, setToCurrency] = useState<string>("USD")
  const [result, setResult] = useState<string>("")

  useEffect(() => {
    convertCurrency()
  }, [amount, fromCurrency, toCurrency]) //This line was already correct.  The prompt's update was unnecessary.

  const convertCurrency = () => {
    const fromRate = EXCHANGE_RATES[fromCurrency as keyof typeof EXCHANGE_RATES]
    const toRate = EXCHANGE_RATES[toCurrency as keyof typeof EXCHANGE_RATES]
    const convertedAmount = (Number.parseFloat(amount) / fromRate) * toRate
    setResult(convertedAmount.toFixed(2))
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>Convert between different currencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="from-currency">From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="from-currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end justify-center">
              <Button variant="outline" size="icon" onClick={swapCurrencies}>
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <Label htmlFor="to-currency">To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="to-currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <p className="text-2xl font-bold">
            {amount} {fromCurrency} = {result} {toCurrency}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

