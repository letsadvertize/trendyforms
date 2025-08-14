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
import { appTheme, getSpecialtyTheme } from "@/lib/theme"

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

export function MedicationReconciliationCardiopulmonaryTesting() {
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

  // Use 'general' as fallback for theme
  const specialty = "general"
  const theme = getSpecialtyTheme(specialty)

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
        formType: "medication-reconciliation-cardiopulmonary-testing",
        specialty: "cardiopulmonary-testing",
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
      <div className={`${appTheme.layout.pageContainer} bg-gradient-to-br ${theme.gradient}`}>
        <div className={appTheme.layout.contentContainer}>
          <Card className="max-w-2xl mx-auto shadow-xl text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-700 mb-2">Form Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                The Medication Reconciliation for Cardiopulmonary Testing has been saved and will be processed shortly.
              </p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/cardiopulmonary-testing">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Cardiopulmonary Testing Forms
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className={`${appTheme.layout.pageContainer} bg-gradient-to-br ${theme.gradient}`}>
      <div className={appTheme.layout.contentContainer}>
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/cardiopulmonary-testing">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cardiopulmonary Testing Forms
            </Link>
          </Button>
        </div>
        <Card className={appTheme.layout.formCard}>
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Medication Reconciliation</CardTitle>
                <p className="text-red-100 text-sm">Cardiopulmonary Testing Specialty</p>
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
          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit}>
              {/* Patient Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="patientDOB">Patient Date of Birth</Label>
                  <Input id="patientDOB" type="date" value={patientDOB} onChange={e => setPatientDOB(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="patientAddress">Patient Address</Label>
                  <Input id="patientAddress" value={patientAddress} onChange={e => setPatientAddress(e.target.value)} required />
                </div>
              </div>
              {/* Provider Info */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="providerName">Provider Name</Label>
                  <Input id="providerName" value={providerName} onChange={e => setProviderName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="providerPhone">Provider Phone</Label>
                  <Input id="providerPhone" value={providerPhone} onChange={e => setProviderPhone(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="providerEmail">Provider Email</Label>
                  <Input id="providerEmail" type="email" value={providerEmail} onChange={e => setProviderEmail(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="providerAddress">Provider Address</Label>
                  <Input id="providerAddress" value={providerAddress} onChange={e => setProviderAddress(e.target.value)} required />
                </div>
              </div>
              {/* Current Medications */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Current Medications</h3>
                {currentMedications.map((med, idx) => (
                  <div key={idx} className="grid md:grid-cols-3 gap-4 mb-2 items-end">
                    <div>
                      <Label>Name</Label>
                      <Input value={med.name} onChange={e => updateMedication(idx, "name", e.target.value)} required />
                    </div>
                    <div>
                      <Label>Dosage</Label>
                      <Input value={med.dosage} onChange={e => updateMedication(idx, "dosage", e.target.value)} required />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label>Frequency</Label>
                        <Input value={med.frequency} onChange={e => updateMedication(idx, "frequency", e.target.value)} required />
                      </div>
                      {currentMedications.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeMedication(idx)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addMedication} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Medication
                </Button>
              </div>
              {/* Past Medical History */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Past Medical History</h3>
                {pastMedicalHistory.map((hist, idx) => (
                  <div key={idx} className="grid md:grid-cols-3 gap-4 mb-2 items-end">
                    <div>
                      <Label>Condition</Label>
                      <Input value={hist.condition} onChange={e => updateMedicalHistory(idx, "condition", e.target.value)} required />
                    </div>
                    <div>
                      <Label>Diagnosis Date</Label>
                      <Input type="date" value={hist.diagnosisDate} onChange={e => updateMedicalHistory(idx, "diagnosisDate", e.target.value)} required />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label>Status</Label>
                        <Input value={hist.status} onChange={e => updateMedicalHistory(idx, "status", e.target.value)} required />
                      </div>
                      {pastMedicalHistory.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeMedicalHistory(idx)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addMedicalHistory} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Medical History
                </Button>
              </div>
              {/* Submit Button */}
              <div className="flex justify-center pt-6 border-t border-red-200 mt-8">
                <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold shadow-lg">
                  {isSubmitting ? "Submitting..." : "Submit & Save to Google Drive"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
