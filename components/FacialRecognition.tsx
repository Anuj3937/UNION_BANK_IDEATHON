"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FacialRecognition({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (isScanning) {
      startCamera()
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsScanning(false)
            stopCamera()
            onAuthenticated()
            return 100
          }
          return prev + 10
        })
      }, 300)
      return () => clearInterval(interval)
    }
  }, [isScanning, onAuthenticated])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing the camera", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
  }

  const handleScan = () => {
    setIsScanning(true)
    setScanProgress(0)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Facial Recognition</CardTitle>
        <CardDescription>Please scan your face to authenticate</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-64 h-64 bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
          {isScanning ? (
            <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
          ) : (
            <canvas ref={canvasRef} width={256} height={256} className="w-full h-full" />
          )}
          {isScanning && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500" style={{ width: `${scanProgress}%` }} />
          )}
        </div>
        <Button onClick={handleScan} disabled={isScanning}>
          {isScanning ? "Scanning..." : "Start Scan"}
        </Button>
      </CardContent>
    </Card>
  )
}

