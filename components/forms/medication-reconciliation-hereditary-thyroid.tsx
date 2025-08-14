"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Download, Printer, CheckCircle, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Medication {
  name: string
  dosage: string
  frequency: string
}

interface MedicalHistory {
  condition: string
  diagnosisDate: string
  status: string
}

export function MedicationReconciliationHereditaryThyroid() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Basic patient information
  const [patientName, setPatientName] = useState("")
  const [patientDOB, setPatientDOB] = useState("")
  const [patientAddress, setPatientAddress] = useState("")

  // Provider information
  const [providerName, setProviderName] = useState("")
  const [providerPhone, setProviderPhone] = useState("")
  const [providerEmail, setProviderEmail] = useState("")
  const [providerAddress, setProviderAddress] = useState("")

  // Current medications (dynamic list)
  const [currentMedications, setCurrentMedications] = useState<Medication[]>([
    { name: "", dosage: "", frequency: "" }
  ])

  // Past medical history (dynamic list)
  const [pastMedicalHistory, setPastMedicalHistory] = useState<MedicalHistory[]>([
    { condition: "", diagnosisDate: "", status: "" }
  ])

  // Functions for managing current medications
  const addMedication = () => {
    setCurrentMedications([...currentMedications, { name: "", dosage: "", frequency: "" }])
  }

  const removeMedication = (index: number) => {
    if (currentMedications.length > 1) {
      setCurrentMedications(currentMedications.filter((_, i) => i !== index))
    }
  }

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const updated = currentMedications.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setCurrentMedications(updated)
  }

  // Functions for managing past medical history
  const addMedicalHistory = () => {
    setPastMedicalHistory([...pastMedicalHistory, { condition: "", diagnosisDate: "", status: "" }])
  }

  const removeMedicalHistory = (index: number) => {
    if (pastMedicalHistory.length > 1) {
      setPastMedicalHistory(pastMedicalHistory.filter((_, i) => i !== index))
    }
  }

  const updateMedicalHistory = (index: number, field: keyof MedicalHistory, value: string) => {
    const updated = pastMedicalHistory.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setPastMedicalHistory(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        formType: "medication-reconciliation-hereditary-thyroid",
        specialty: "hereditary-thyroid",
        formData: {
          patientName,
          patientDOB,
          patientAddress,
          providerName,
          providerPhone,
          providerEmail,
          providerAddress,
          currentMedications,
          pastMedicalHistory,
        },
        timestamp: new Date().toISOString(),
      }
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${response.statusText}. ${errorText}`)
      }
      const result = await response.json()
      if (result.success) {
        setShowSuccess(true)
        toast({
          title: "Form Submitted Successfully",
          description: `PDF saved to Google Drive: ${result.fileName}`,
        })
        setTimeout(() => {
          setShowSuccess(false)
          setPatientName("")
          setPatientDOB("")
          setPatientAddress("")
          setProviderName("")
          setProviderPhone("")
          setProviderEmail("")
          setProviderAddress("")
          setCurrentMedications([{ name: "", dosage: "", frequency: "" }])
          setPastMedicalHistory([{ condition: "", diagnosisDate: "", status: "" }])
        }, 3000)
      } else {
        throw new Error(result.error || "Unknown error occurred")
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">Form Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your Medication Reconciliation form has been processed and saved to Google Drive.
          </p>
          {/* Back button removed for consistency; handled by parent page */}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 py-8">
      <div className="container mx-auto px-4">
  {/* Back button removed for consistency; handled by parent page */}
        <Card className="max-w-4xl mx-auto bg-white shadow-xl">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Medication Reconciliation</CardTitle>
                <p className="text-yellow-100 text-sm">Hereditary Thyroid Disorder Risk</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => window.print()}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => window.print()}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Provider Information Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Provider Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="providerName">Provider Name *</Label>
                    <Input
                      id="providerName"
                      value={providerName}
                      onChange={(e) => setProviderName(e.target.value)}
                      required
                      placeholder="Enter provider name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="providerPhone">Phone Number *</Label>
                    <Input
                      id="providerPhone"
                      value={providerPhone}
                      onChange={(e) => setProviderPhone(e.target.value)}
                      required
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="providerEmail">Email Address *</Label>
                    <Input
                      id="providerEmail"
                      type="email"
                      value={providerEmail}
                      onChange={(e) => setProviderEmail(e.target.value)}
                      required
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="providerAddress">Provider Address *</Label>
                    <Input
                      id="providerAddress"
                      value={providerAddress}
                      onChange={(e) => setProviderAddress(e.target.value)}
                      required
                      placeholder="Enter provider address"
                    />
                  </div>
                </div>
              </div>
              {/* Patient Information Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientName">Patient Name *</Label>
                    <Input
                      id="patientName"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientDOB">Date of Birth *</Label>
                    <Input
                      id="patientDOB"
                      type="date"
                      value={patientDOB}
                      onChange={(e) => setPatientDOB(e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="patientAddress">Patient Address *</Label>
                    <Input
                      id="patientAddress"
                      value={patientAddress}
                      onChange={(e) => setPatientAddress(e.target.value)}
                      required
                      placeholder="Enter patient address"
                    />
                  </div>
                </div>
              </div>
              {/* Current Medications Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
                {currentMedications.map((med, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-2 mb-2">
                    <Input
                      placeholder="Medication Name"
                      value={med.name}
                      onChange={e => updateMedication(idx, "name", e.target.value)}
                    />
                    <Input
                      placeholder="Dosage"
                      value={med.dosage}
                      onChange={e => updateMedication(idx, "dosage", e.target.value)}
                    />
                    <Input
                      placeholder="Frequency"
                      value={med.frequency}
                      onChange={e => updateMedication(idx, "frequency", e.target.value)}
                    />
                    <Button type="button" variant="destructive" onClick={() => removeMedication(idx)} size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addMedication} size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-1" /> Add Medication
                </Button>
              </div>
              {/* Past Medical History Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Medical History</h3>
                {pastMedicalHistory.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-2 mb-2">
                    <Input
                      placeholder="Condition"
                      value={item.condition}
                      onChange={e => updateMedicalHistory(idx, "condition", e.target.value)}
                    />
                    <Input
                      type="date"
                      placeholder="Diagnosis Date"
                      value={item.diagnosisDate}
                      onChange={e => updateMedicalHistory(idx, "diagnosisDate", e.target.value)}
                    />
                    <Input
                      placeholder="Status"
                      value={item.status}
                      onChange={e => updateMedicalHistory(idx, "status", e.target.value)}
                    />
                    <Button type="button" variant="destructive" onClick={() => removeMedicalHistory(idx)} size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addMedicalHistory} size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-1" /> Add Medical History
                </Button>
              </div>
              <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
