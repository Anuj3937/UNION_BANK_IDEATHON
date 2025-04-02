"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UVAChatbot from "@/components/UVAChatbot"
import { DocumentUpload } from "@/components/DocumentUpload"
import { TwoFactorAuth } from "@/components/TwoFactorAuth"
import { CurrencyConverter } from "@/components/CurrencyConverter"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Send, PiggyBank, TrendingUp, Bell } from "lucide-react"
import { motion } from "framer-motion"

const accountData = [
  { name: "Savings", value: 70000 },
  { name: "Current", value: 30000 },
  { name: "Fixed Deposit", value: 50000 },
]

const transactionData = [
  { name: "Jan", amount: 4000 },
  { name: "Feb", amount: 3000 },
  { name: "Mar", amount: 5000 },
  { name: "Apr", amount: 2780 },
  { name: "May", amount: 1890 },
  { name: "Jun", amount: 2390 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showChatbot, setShowChatbot] = useState(false)

  const totalBalance = accountData.reduce((sum, account) => sum + account.value, 0)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, Vatsalya</h1>
        <Button onClick={() => setShowChatbot(!showChatbot)}>{showChatbot ? "Close UVA" : "Open UVA Chatbot"}</Button>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalBalance.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Account Distribution</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={accountData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {accountData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 flex justify-center space-x-4">
                    {accountData.map((account, index) => (
                      <div key={account.name} className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2`}
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-sm">{account.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Deposits</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+₹12,234</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Withdrawals</CardTitle>
                  <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-₹8,743</div>
                  <p className="text-xs text-muted-foreground">+7% from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your financial activity over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest account activities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <Send className="h-6 w-6 mr-2 text-blue-500" />
                    <div>
                      <p className="font-medium">Online Transfer</p>
                      <p className="text-sm text-muted-foreground">To: John Doe</p>
                    </div>
                  </div>
                  <div className="text-red-500">-₹10,000</div>
                </li>
                <li className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2 text-green-500" />
                    <div>
                      <p className="font-medium">Salary Credit</p>
                      <p className="text-sm text-muted-foreground">From: ABC Corp</p>
                    </div>
                  </div>
                  <div className="text-green-500">+₹50,000</div>
                </li>
                <li className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <CreditCard className="h-6 w-6 mr-2 text-yellow-500" />
                    <div>
                      <p className="font-medium">ATM Withdrawal</p>
                      <p className="text-sm text-muted-foreground">Location: Main St.</p>
                    </div>
                  </div>
                  <div className="text-red-500">-₹5,000</div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Available Services</CardTitle>
              <CardDescription>Quick access to our banking services</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Button className="w-full flex items-center justify-start space-x-2 h-20">
                <Send className="h-6 w-6" />
                <span>Transfer Money</span>
              </Button>
              <Button className="w-full flex items-center justify-start space-x-2 h-20">
                <CreditCard className="h-6 w-6" />
                <span>Apply for Credit Card</span>
              </Button>
              <Button className="w-full flex items-center justify-start space-x-2 h-20">
                <DollarSign className="h-6 w-6" />
                <span>Apply for Loan</span>
              </Button>
              <Button className="w-full flex items-center justify-start space-x-2 h-20">
                <PiggyBank className="h-6 w-6" />
                <span>Open Fixed Deposit</span>
              </Button>
              <Button className="w-full flex items-center justify-start space-x-2 h-20">
                <Bell className="h-6 w-6" />
                <span>Set Account Alerts</span>
              </Button>
              <Button className="w-full flex items-center justify-start space-x-2 h-20">
                <TrendingUp className="h-6 w-6" />
                <span>Investment Options</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <div className="grid gap-4 md:grid-cols-2">
            <DocumentUpload documentType="kyc" />
            <DocumentUpload documentType="loan" />
          </div>
        </TabsContent>
        <TabsContent value="security">
          <TwoFactorAuth />
        </TabsContent>
        <TabsContent value="tools">
          <CurrencyConverter />
        </TabsContent>
      </Tabs>
      {showChatbot && <UVAChatbot onClose={() => setShowChatbot(false)} />}
    </div>
  )
}

