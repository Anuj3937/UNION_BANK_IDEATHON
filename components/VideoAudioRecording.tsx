"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Video, StopCircle } from "lucide-react"

export default function VideoAudioRecording({ onRecordingComplete }: { onRecordingComplete: (data: any) => void }) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingType, setRecordingType] = useState<"video" | "audio" | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const startRecording = async (type: "video" | "audio") => {
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
        onRecordingComplete({ type, blob })
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

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Record Your Query</CardTitle>
        <CardDescription>Choose video or audio to record your question</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-around">
        {!isRecording ? (
          <>
            <Button onClick={() => startRecording("video")}>
              <Video className="mr-2" />
              Record Video
            </Button>
            <Button onClick={() => startRecording("audio")}>
              <Mic className="mr-2" />
              Record Audio
            </Button>
          </>
        ) : (
          <Button onClick={stopRecording} variant="destructive">
            <StopCircle className="mr-2" />
            Stop Recording
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

