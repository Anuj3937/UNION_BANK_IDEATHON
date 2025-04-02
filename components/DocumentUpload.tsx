"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"]

interface DocumentUploadProps {
  documentType: "kyc" | "loan"
}

export function DocumentUpload({ documentType }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setError(null)
    setSuccess(false)

    if (!selectedFile) {
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB limit.")
      return
    }

    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload a PDF, JPEG, or PNG file.")
      return
    }

    setFile(selectedFile)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) {
      setError("Please select a file to upload.")
      return
    }

    // Simulated API call
    try {
      // In a real application, you would send the file to your server here
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network request
      setSuccess(true)
      setFile(null)
      // Reset the file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      setError("An error occurred while uploading the file. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{documentType === "kyc" ? "KYC Document Upload" : "Loan Application Document Upload"}</CardTitle>
        <CardDescription>
          {documentType === "kyc"
            ? "Upload your identification documents for KYC verification."
            : "Upload supporting documents for your loan application."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file-upload">Upload File</Label>
            <Input id="file-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mt-4">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your document has been successfully uploaded.</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={!file || success}>
          <Upload className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </CardFooter>
    </Card>
  )
}

