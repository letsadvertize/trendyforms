"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Download, Printer, CheckCircle, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { appTheme, getSpecialtyTheme } from "@/lib/theme"

export function ProgressNoteCardiopulmonaryTesting() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  // Provider fields
  const [providerName, setProviderName] = useState("")
  const [providerTitle, setProviderTitle] = useState("")
  const [providerDate, setProviderDate] = useState(new Date().toISOString().split("T")[0])
  const [providerSignature, setProviderSignature] = useState("")
  // Patient fields
  const [patientName, setPatientName] = useState("")
  const [patientDOB, setPatientDOB] = useState("")
  const [patientID, setPatientID] = useState("")
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split("T")[0])
  // Clinical fields
  const [chiefComplaint, setChiefComplaint] = useState("")
  const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState("")
  const [reviewOfSystems, setReviewOfSystems] = useState("")
  const [physicalExamination, setPhysicalExamination] = useState("")
  const [assessment, setAssessment] = useState("")
  const [plan, setPlan] = useState("")
  // Use 'general' as fallback for theme
  const specialty = "general"
  const theme = getSpecialtyTheme(specialty)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        formType: "progress-note-cardiopulmonary-testing",
        specialty: "cardiopulmonary-testing",
        formData: {
          patientName,
          patientDOB,
          patientID,
          visitDate,
          chiefComplaint,
          historyOfPresentIllness,
          reviewOfSystems,
          physicalExamination,
          assessment,
          plan,
          providerName,
          providerTitle,
          providerDate,
          providerSignature,
        },
        timestamp: new Date().toISOString(),
      }
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          setPatientName("")
          setPatientDOB("")
          setPatientID("")
          setVisitDate(new Date().toISOString().split("T")[0])
          setChiefComplaint("")
          setHistoryOfPresentIllness("")
          setReviewOfSystems("")
          setPhysicalExamination("")
          setAssessment("")
          setPlan("")
          setProviderName("")
          setProviderTitle("")
          setProviderDate(new Date().toISOString().split("T")[0])
          setProviderSignature("")
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
                Your Progress Note has been processed and saved to Google Drive.
              </p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/cardiopulmonary-testing">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Cardiopulmonary Testing Forms
                </Link>
              </Button>
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
                <CardTitle className="text-xl font-bold">Progress Note</CardTitle>
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Patient Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="patientName" className="text-sm font-semibold text-slate-700">
                      Patient Name
                    </Label>
                    <Input
                      id="patientName"
                      value={patientName}
                      onChange={e => setPatientName(e.target.value)}
                      className="mt-1"
                      placeholder="Enter patient's full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientDOB" className="text-sm font-semibold text-slate-700">
                      Date of Birth
                    </Label>
                    <Input
                      id="patientDOB"
                      type="date"
                      value={patientDOB}
                      onChange={e => setPatientDOB(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="patientID" className="text-sm font-semibold text-slate-700">
                      Patient ID
                    </Label>
                    <Input
                      id="patientID"
                      value={patientID}
                      onChange={e => setPatientID(e.target.value)}
                      className="mt-1"
                      placeholder="Enter patient ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="visitDate" className="text-sm font-semibold text-slate-700">
                      Date of Visit
                    </Label>
                    <Input
                      id="visitDate"
                      type="date"
                      value={visitDate}
                      onChange={e => setVisitDate(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Clinical Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Clinical Information
                </h3>
                <div>
                  <Label htmlFor="chiefComplaint" className="text-sm font-semibold text-slate-700">
                    Chief Complaint
                  </Label>
                  <Textarea
                    id="chiefComplaint"
                    value={chiefComplaint}
                    onChange={e => setChiefComplaint(e.target.value)}
                    className="mt-1"
                    rows={3}
                    placeholder="Enter the patient's chief complaint"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="historyOfPresentIllness" className="text-sm font-semibold text-slate-700">
                    History of Present Illness
                  </Label>
                  <Textarea
                    id="historyOfPresentIllness"
                    value={historyOfPresentIllness}
                    onChange={e => setHistoryOfPresentIllness(e.target.value)}
                    className="mt-1"
                    rows={4}
                    placeholder="Describe the history of present illness"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="reviewOfSystems" className="text-sm font-semibold text-slate-700">
                    Review of Systems (Optional)
                  </Label>
                  <Textarea
                    id="reviewOfSystems"
                    value={reviewOfSystems}
                    onChange={e => setReviewOfSystems(e.target.value)}
                    className="mt-1"
                    rows={3}
                    placeholder="Enter review of systems findings"
                  />
                </div>
                <div>
                  <Label htmlFor="physicalExamination" className="text-sm font-semibold text-slate-700">
                    Physical Examination
                  </Label>
                  <Textarea
                    id="physicalExamination"
                    value={physicalExamination}
                    onChange={e => setPhysicalExamination(e.target.value)}
                    className="mt-1"
                    rows={4}
                    placeholder="Document physical examination findings"
                    required
                  />
                </div>
              </div>
              {/* Assessment and Plan */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Assessment and Plan
                </h3>
                <div>
                  <Label htmlFor="assessment" className="text-sm font-semibold text-slate-700">
                    Assessment
                  </Label>
                  <Textarea
                    id="assessment"
                    value={assessment}
                    onChange={e => setAssessment(e.target.value)}
                    className="mt-1"
                    rows={4}
                    placeholder="Enter clinical assessment and diagnosis"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="plan" className="text-sm font-semibold text-slate-700">
                    Plan
                  </Label>
                  <Textarea
                    id="plan"
                    value={plan}
                    onChange={e => setPlan(e.target.value)}
                    className="mt-1"
                    rows={4}
                    placeholder="Enter treatment plan and follow-up instructions"
                    required
                  />
                </div>
              </div>
              {/* Provider Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Provider Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="providerName" className="text-sm font-semibold text-slate-700">
                      Provider Name
                    </Label>
                    <Input
                      id="providerName"
                      value={providerName}
                      onChange={e => setProviderName(e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider's full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="providerTitle" className="text-sm font-semibold text-slate-700">
                      Provider Title
                    </Label>
                    <Input
                      id="providerTitle"
                      value={providerTitle}
                      onChange={e => setProviderTitle(e.target.value)}
                      className="mt-1"
                      placeholder="MD, NP, PA, etc."
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="providerDate" className="text-sm font-semibold text-slate-700">
                      Date
                    </Label>
                    <Input
                      id="providerDate"
                      type="date"
                      value={providerDate}
                      onChange={e => setProviderDate(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="providerSignature" className="text-sm font-semibold text-slate-700">
                      Electronic Signature
                    </Label>
                    <Input
                      id="providerSignature"
                      value={providerSignature}
                      onChange={e => setProviderSignature(e.target.value)}
                      className="mt-1"
                      placeholder="Type your name to sign electronically"
                      required
                    />
                  </div>
                </div>
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
