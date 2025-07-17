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
import Image from "next/image"

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

export function MedicationReconciliationImmunodeficiency() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Basic patient information
  const [patientName, setPatientName] = useState("")
  const [patientDOB, setPatientDOB] = useState("")
  const [patientAddress, setPatientAddress] = useState("")
  
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

    console.log("Medication Reconciliation form submission started...")
    console.log("Form data:", {
      patientName,
      patientDOB,
      patientAddress,
      currentMedications,
      pastMedicalHistory,
    })

    try {
      const payload = {
        formType: "medication-reconciliation-immunodeficiency",
        specialty: "immunodeficiency",
        formData: {
          patientName,
          patientDOB,
          patientAddress,
          currentMedications,
          pastMedicalHistory,
        },
        timestamp: new Date().toISOString(),
      }

      console.log("Submitting payload:", payload)

      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}. ${errorText}`)
      }

      const result = await response.json()
      console.log("Success response:", result)

      if (result.success) {
        setShowSuccess(true)
        toast({
          title: "Form Submitted Successfully",
          description: `PDF saved to Google Drive: ${result.fileName}`,
        })
        
        // Reset form after successful submission
        setTimeout(() => {
          setShowSuccess(false)
          setPatientName("")
          setPatientDOB("")
          setPatientAddress("")
          setCurrentMedications([{ name: "", dosage: "", frequency: "" }])
          setPastMedicalHistory([{ condition: "", diagnosisDate: "", status: "" }])
        }, 3000)
      } else {
        throw new Error(result.error || "Unknown error occurred")
      }
    } catch (error) {
      console.error("Submission error:", error)
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
          <h2 className="text-2xl font-bold text-green-700 mb-2">Form Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your Medication Reconciliation form has been processed and saved to Google Drive.
          </p>
          <Link href="/immunodeficiency">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Immunodeficiency Forms
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/immunodeficiency">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Immunodeficiency Forms
            </Link>
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto bg-white shadow-xl">
          {/* Unified Form Header */}
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/hosp-in-home.png"
                  alt="Hospital in Your Home Logo"
                  width={150}
                  height={45}
                  className="h-10 w-auto brightness-0 invert"
                />
                <div>
                  <CardTitle className="text-xl font-bold">Medication Reconciliation</CardTitle>
                  <p className="text-blue-100 text-sm">Immunodeficiency Specialty</p>
                </div>
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
            {/* Hospital Information Bar */}
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600 mb-8">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-semibold text-blue-800">Hospital in Your Home</p>
                  <p className="text-blue-600">Comprehensive Healthcare Solutions</p>
                </div>
                <div className="text-right text-blue-600">
                  <p className="font-medium">📞 1-844-MY-HIYH</p>
                  <p className="font-medium">✉️ info@hiyh.us</p>
                </div>
              </div>
            </div>
          <form onSubmit={handleSubmit} className="space-y-8">
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
                    placeholder="Enter patient's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="patientDOB">Patient Date of Birth *</Label>
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
                    placeholder="Enter patient's full address"
                  />
                </div>
              </div>
            </div>

            {/* Current Medications Section */}
            <div className="border-b pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Medication List</h3>
                <Button
                  type="button"
                  onClick={addMedication}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Medication
                </Button>
              </div>
              
              <div className="space-y-4">
                {currentMedications.map((medication, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`medication-name-${index}`}>Medication Name</Label>
                      <Input
                        id={`medication-name-${index}`}
                        value={medication.name}
                        onChange={(e) => updateMedication(index, "name", e.target.value)}
                        placeholder="e.g., Metformin"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`medication-dosage-${index}`}>Dosage</Label>
                      <Input
                        id={`medication-dosage-${index}`}
                        value={medication.dosage}
                        onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                        placeholder="e.g., 500mg"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`medication-frequency-${index}`}>Frequency</Label>
                      <Input
                        id={`medication-frequency-${index}`}
                        value={medication.frequency}
                        onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                        placeholder="e.g., Twice daily"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        onClick={() => removeMedication(index)}
                        size="sm"
                        variant="destructive"
                        disabled={currentMedications.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Medical History Section */}
            <div className="border-b pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Past Medical History</h3>
                <Button
                  type="button"
                  onClick={addMedicalHistory}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add History
                </Button>
              </div>
              
              <div className="space-y-4">
                {pastMedicalHistory.map((history, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label htmlFor={`history-condition-${index}`}>Medical Condition</Label>
                      <Input
                        id={`history-condition-${index}`}
                        value={history.condition}
                        onChange={(e) => updateMedicalHistory(index, "condition", e.target.value)}
                        placeholder="e.g., Diabetes Type 2"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`history-date-${index}`}>Diagnosis Date</Label>
                      <Input
                        id={`history-date-${index}`}
                        type="date"
                        value={history.diagnosisDate}
                        onChange={(e) => updateMedicalHistory(index, "diagnosisDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`history-status-${index}`}>Current Status</Label>
                      <Input
                        id={`history-status-${index}`}
                        value={history.status}
                        onChange={(e) => updateMedicalHistory(index, "status", e.target.value)}
                        placeholder="e.g., Controlled, Active"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        onClick={() => removeMedicalHistory(index)}
                        size="sm"
                        variant="destructive"
                        disabled={pastMedicalHistory.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Submit Form
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
)
}
