"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, Search } from "lucide-react"

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: "credit" | "debit"
}

const initialTransactions: Transaction[] = [
  { id: "1", date: "2023-06-01", description: "Salary Credit", amount: 50000, type: "credit" },
  { id: "2", date: "2023-06-02", description: "Online Transfer to John", amount: 5000, type: "debit" },
  { id: "3", date: "2023-06-03", description: "ATM Withdrawal", amount: 2000, type: "debit" },
  { id: "4", date: "2023-06-04", description: "Interest Credit", amount: 500, type: "credit" },
  { id: "5", date: "2023-06-05", description: "Utility Bill Payment", amount: 1500, type: "debit" },
]

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")

  const sortTransactions = () => {
    const sorted = [...transactions].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })
    setTransactions(sorted)
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const filterTransactions = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const filtered = initialTransactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm),
    )
    setTransactions(filtered)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View and search your recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={filterTransactions} className="flex space-x-2 mb-4">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" onClick={sortTransactions}>
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={transaction.type === "credit" ? "text-green-600" : "text-red-600"}>
                    {transaction.type === "credit" ? "Credit" : "Debit"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

