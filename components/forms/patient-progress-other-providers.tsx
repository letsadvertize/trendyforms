"use client"

import React from "react"
import type { ChangeEvent } from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, Printer, CheckCircle, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function PatientProgressOtherProviders() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Provider manual fields
  const [providerName, setProviderName] = useState("")
  const [providerEmail, setProviderEmail] = useState("")
  const [providerPhone, setProviderPhone] = useState("")
  const [providerAddress, setProviderAddress] = useState("")

  // Form fields
  const [patientName, setPatientName] = useState("")
  const [patientDOB, setPatientDOB] = useState("")
  const [patientID, setPatientID] = useState("")
  const [reportDate, setReportDate] = useState("")
  const [visitDate, setVisitDate] = useState("")
  const [chiefComplaint, setChiefComplaint] = useState("")
  const [currentSymptoms, setCurrentSymptoms] = useState("")
  const [treatmentResponse, setTreatmentResponse] = useState("")
  const [functionalStatus, setFunctionalStatus] = useState("")
  const [currentMedications, setCurrentMedications] = useState("")
  const [adverseEvents, setAdverseEvents] = useState("")
  const [planOfCare, setPlanOfCare] = useState("")
  const [nextAppointment, setNextAppointment] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        formType: "patient-progress-other-providers",
        specialty: "other-providers",
        formData: {
          patientName,
          patientDOB,
          patientID,
          providerName,
          providerEmail,
          providerPhone,
          providerAddress,
          reportDate,
          visitDate,
          chiefComplaint,
          currentSymptoms,
          treatmentResponse,
          functionalStatus,
          currentMedications,
          adverseEvents,
          planOfCare,
          nextAppointment,
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
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
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
          // Reset form
          setPatientName("")
          setPatientDOB("")
          setPatientID("")
          setProviderName("")
          setProviderEmail("")
          setProviderPhone("")
          setProviderAddress("")
          setReportDate("")
          setVisitDate("")
          setChiefComplaint("")
          setCurrentSymptoms("")
          setTreatmentResponse("")
          setFunctionalStatus("")
          setCurrentMedications("")
          setAdverseEvents("")
          setPlanOfCare("")
          setNextAppointment("")
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

  // Set default dates only on client to avoid hydration mismatch
  React.useEffect(() => {
    if (!reportDate) setReportDate(new Date().toISOString().split("T")[0])
    if (!visitDate) setVisitDate(new Date().toISOString().split("T")[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (showSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-700 mb-2">Form Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your Patient Progress Report has been processed and saved to Google Drive.
          </p>
          <Link href="/other-providers">
            <Button className="bg-green-600 hover:bg-green-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Other Provider Forms
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/other-providers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Other Provider Forms
            </Link>
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto bg-white shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Patient Progress Report</CardTitle>
                <p className="text-green-100 text-sm">Other Provider Specialty</p>
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
              {/* Provider Information (manual entry) */}
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="providerName" className="text-sm font-semibold text-green-700">
                      Provider Name
                    </Label>
                    <Input
                      id="providerName"
                      value={providerName}
                      onChange={(e) => setProviderName(e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="providerEmail" className="text-sm font-semibold text-green-700">
                      Provider Email
                    </Label>
                    <Input
                      id="providerEmail"
                      type="email"
                      value={providerEmail}
                      onChange={(e) => setProviderEmail(e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="providerPhone" className="text-sm font-semibold text-green-700">
                      Provider Phone
                    </Label>
                    <Input
                      id="providerPhone"
                      type="tel"
                      value={providerPhone}
                      onChange={(e) => setProviderPhone(e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider phone"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="providerAddress" className="text-sm font-semibold text-green-700">
                      Provider Address
                    </Label>
                    <Input
                      id="providerAddress"
                      value={providerAddress}
                      onChange={(e) => setProviderAddress(e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <Label htmlFor="patientDOB">Date of Birth *</Label>
                    <Input
                      id="patientDOB"
                      type="date"
                      value={patientDOB}
                      onChange={(e) => setPatientDOB(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientID">Patient ID *</Label>
                    <Input
                      id="patientID"
                      value={patientID}
                      onChange={(e) => setPatientID(e.target.value)}
                      required
                      placeholder="Enter patient ID"
                    />
                  </div>
                </div>
              </div>

              {/* Report Information */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="reportDate">Report Date *</Label>
                    <Input
                      id="reportDate"
                      type="date"
                      value={reportDate}
                      onChange={(e) => setReportDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="visitDate">Last Visit Date *</Label>
                    <Input
                      id="visitDate"
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Clinical Assessment */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Assessment</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="chiefComplaint">Chief Complaint *</Label>
                    <Textarea
                      id="chiefComplaint"
                      value={chiefComplaint}
                      onChange={(e) => setChiefComplaint(e.target.value)}
                      required
                      placeholder="Enter the patient's chief complaint"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentSymptoms">Current Symptoms *</Label>
                    <Textarea
                      id="currentSymptoms"
                      value={currentSymptoms}
                      onChange={(e) => setCurrentSymptoms(e.target.value)}
                      required
                      placeholder="Describe current symptoms and their severity"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="treatmentResponse">Treatment Response *</Label>
                    <Textarea
                      id="treatmentResponse"
                      value={treatmentResponse}
                      onChange={(e) => setTreatmentResponse(e.target.value)}
                      required
                      placeholder="Describe patient's response to current treatment"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="functionalStatus">Functional Status *</Label>
                    <Textarea
                      id="functionalStatus"
                      value={functionalStatus}
                      onChange={(e) => setFunctionalStatus(e.target.value)}
                      required
                      placeholder="Describe patient's current functional status and daily activities"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Medications and Care Plan */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Medications and Care Plan</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentMedications">Current Medications *</Label>
                    <Textarea
                      id="currentMedications"
                      value={currentMedications}
                      onChange={(e) => setCurrentMedications(e.target.value)}
                      required
                      placeholder="List current medications with dosages and frequencies"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="adverseEvents">Adverse Events/Side Effects</Label>
                    <Textarea
                      id="adverseEvents"
                      value={adverseEvents}
                      onChange={(e) => setAdverseEvents(e.target.value)}
                      placeholder="Report any adverse events or medication side effects"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="planOfCare">Plan of Care *</Label>
                    <Textarea
                      id="planOfCare"
                      value={planOfCare}
                      onChange={(e) => setPlanOfCare(e.target.value)}
                      required
                      placeholder="Outline the ongoing plan of care and treatment goals"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nextAppointment">Next Appointment</Label>
                    <Input
                      id="nextAppointment"
                      type="datetime-local"
                      value={nextAppointment}
                      onChange={(e) => setNextAppointment(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
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
