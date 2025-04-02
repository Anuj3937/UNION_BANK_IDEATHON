"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, Video, Send, X, DollarSign, CreditCard, PiggyBank, HelpCircle, ThumbsUp, ThumbsDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface UVAChatbotProps {
  onClose: () => void
}

export default function UVAChatbot({ onClose }: UVAChatbotProps) {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot"; media?: { type: "audio" | "video"; url: string } }[]
  >([{ text: "Hello! I'm UVA, your virtual assistant. How can I help you today?", sender: "bot" }])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingType, setRecordingType] = useState<"audio" | "video" | null>(null)
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }])
      processUserInput(input)
      setInput("")
    }
  }

  const processUserInput = (userInput: string) => {
    const lowerInput = userInput.toLowerCase()
    setTimeout(() => {
      if (lowerInput.includes("loan") || lowerInput.includes("credit")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "I understand you have a loan query. To better assist you, please record a video or audio message explaining your query in detail.",
            sender: "bot",
          },
        ])
      } else if (lowerInput.includes("account") || lowerInput.includes("balance")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "For account-related queries, I can help you with:\n1. Checking your balance\n2. Recent transactions\n3. Account statements\nWhat specific information do you need?",
            sender: "bot",
          },
        ])
      } else if (lowerInput.includes("transfer") || lowerInput.includes("payment")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "I can assist you with transfers and payments. Here are some options:\n1. Transfer money to another account\n2. Pay bills\n3. Set up recurring payments\nWhat would you like to do?",
            sender: "bot",
          },
        ])
      } else if (lowerInput.includes("invest") || lowerInput.includes("mutual fund")) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Great! I can help you with investment options. We offer:\n1. Mutual Funds\n2. Fixed Deposits\n3. Stocks and Securities\nWhich investment product are you interested in?",
            sender: "bot",
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "I'm not sure I understand. Could you please choose from one of our common services:\n1. Loans and Credit\n2. Account Information\n3. Transfers and Payments\n4. Investments",
            sender: "bot",
          },
        ])
      }
      setShowFeedback(true)
    }, 1000)
  }

  const startRecording = async (type: "audio" | "video") => {
    setRecordingType(type)
    setIsRecording(true)
    chunksRef.current = []

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === "video",
      })

      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: type === "video" ? "video/webm" : "audio/webm" })
        const url = URL.createObjectURL(blob)
        setRecordingUrl(url)

        setMessages((prev) => [
          ...prev,
          {
            text: `Your ${type} message has been recorded and is being processed.`,
            sender: "bot",
            media: { type, url },
          },
        ])

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              text: "Thank you for your message. Our team will review it and get back to you shortly. Is there anything else I can help you with?",
              sender: "bot",
            },
          ])
          setShowFeedback(true)
        }, 3000)
      }

      mediaRecorderRef.current.start()
    } catch (err) {
      console.error(`Error starting ${type} recording:`, err)
      setIsRecording(false)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setRecordingType(null)
    }
  }

  const handleFeedback = (isPositive: boolean) => {
    setMessages((prev) => [
      ...prev,
      {
        text: `Thank you for your ${isPositive ? "positive" : "negative"} feedback. We'll use this to improve our service. Is there anything specific you'd like to share about your experience?`,
        sender: "bot",
      },
    ])
    setShowFeedback(false)
    // In a real app, you would send this feedback to your server
    console.log(`Feedback received: ${isPositive ? "Positive" : "Negative"}`)
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>UVA Chatbot</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden flex flex-col">
        <div className="flex-grow overflow-y-auto space-y-2 p-2 border rounded mb-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-2 rounded ${
                  message.sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
                } max-w-[80%]`}
              >
                {message.text}
                {message.media && (
                  <div className="mt-2">
                    {message.media.type === "video" ? (
                      <video src={message.media.url} controls className="w-full" />
                    ) : (
                      <audio src={message.media.url} controls className="w-full" />
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        {showFeedback && (
          <div className="flex justify-center space-x-2 mb-2">
            <Button onClick={() => handleFeedback(true)} variant="outline" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Helpful
            </Button>
            <Button onClick={() => handleFeedback(false)} variant="outline" size="sm">
              <ThumbsDown className="h-4 w-4 mr-2" />
              Not Helpful
            </Button>
          </div>
        )}
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send size={20} />
          </Button>
          {!isRecording ? (
            <>
              <Button onClick={() => startRecording("audio")}>
                <Mic size={20} />
              </Button>
              <Button onClick={() => startRecording("video")}>
                <Video size={20} />
              </Button>
            </>
          ) : (
            <Button onClick={stopRecording} variant="destructive">
              Stop Recording
            </Button>
          )}
        </div>
        <div className="mt-4 flex justify-around">
          <Button variant="outline" onClick={() => setInput("Check balance")}>
            <DollarSign className="mr-2 h-4 w-4" />
            Balance
          </Button>
          <Button variant="outline" onClick={() => setInput("Transfer money")}>
            <CreditCard className="mr-2 h-4 w-4" />
            Transfer
          </Button>
          <Button variant="outline" onClick={() => setInput("Investment options")}>
            <PiggyBank className="mr-2 h-4 w-4" />
            Invest
          </Button>
          <Button variant="outline" onClick={() => setInput("Help")}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

