import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Mermaid from "@/components/Mermaid"

const flowchartDefinition = `
graph TD
    A[Start] --> B[Customer Launches Vyom App]
    B --> C[Authentication & Fraud Prevention]
    C --> C1[Facial Scan]
    C1 --> C2[Liveness Check]
    C2 --> C3[Aadhaar Verification]
    C3 --> C4{High-Risk Transaction?}
    C4 -->|Yes| C5[Voice Biometrics]
    C4 -->|No| D[Customer Service Query Handling]
    C5 --> D
    D --> D1[Choose Support Type]
    D1 --> D2[Video]
    D1 --> D3[Audio]
    D1 --> D4[Chat]
    D2 --> D5[NLP Processes Query]
    D3 --> D5
    D4 --> D5
    D5 --> D6[Intent & Sentiment Analysis]
    D6 --> D7[Smart Routing to Agent]
    D7 --> E[Intelligent Ticketing & Routing]
    E --> E1[Generate Ticket with Customer Profile & Issue Context]
    E1 --> E2[ML-Based Priority Assignment]
    E2 --> E3[Route to Relevant Department]
    E3 --> F[AI-Driven Appointment Scheduling]
    F --> F1[Sync with CRM]
    F1 --> F2[Show Available Slots]
    F2 --> F3[Secure Video Call Link Sent to Customer]
    F3 --> G[Post-Interaction Analytics & Security Compliance]
    G --> G1[Customer Feedback Collected]
    G1 --> G2[AI Reviews Resolution Time & Satisfaction Score]
    G2 --> G3[Data Stored Securely with Blockchain Audit Trail]
    G3 --> H[End]
`

export default function SystemFlowchart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>System Flowchart</CardTitle>
        <CardDescription>Advanced Facial Recognition System for Union Bank of India's Vyom App</CardDescription>
      </CardHeader>
      <CardContent>
        <Mermaid chart={flowchartDefinition} />
      </CardContent>
    </Card>
  )
}

