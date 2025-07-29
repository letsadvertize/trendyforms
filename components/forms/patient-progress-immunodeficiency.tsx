"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Printer, ArrowLeft, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"

interface FormData {
  patientName: string
  dateOfBirth: string
  medicalRecordNumber: string
  dateOfVisit: string
  chiefComplaint: string
  historyOfPresentIllness: string
  reviewOfSystems: string
  physicalExamination: string
  assessment: string
  plan: string
  providerName: string
  providerTitle: string
  providerDate: string
  providerSignature: string
}

export function PatientProgressImmunodeficiency() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formId, setFormId] = useState<string>("")
  const [submittedAt, setSubmittedAt] = useState<string>("")
  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    dateOfBirth: "",
    medicalRecordNumber: "",
    dateOfVisit: new Date().toISOString().split("T")[0],
    chiefComplaint: "",
    historyOfPresentIllness: "",
    reviewOfSystems: "",
    physicalExamination: "",
    assessment: "",
    plan: "",
    providerName: "",
    providerTitle: "",
    providerDate: new Date().toISOString().split("T")[0],
    providerSignature: "",
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "patient-progress-immunodeficiency",
          formData,
          timestamp: new Date().toISOString(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Form Submitted Successfully",
          description: `PDF saved to Google Drive: ${result.fileName}`,
        })
        if (result.driveUrl) {
          window.open(result.driveUrl, "_blank")
        }
        setFormId(`PIP-${Date.now()}`)
        setSubmittedAt(new Date().toLocaleString())
        setShowSuccess(true)
      } else {
        throw new Error(result.error || "Failed to submit form")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "An error occurred while submitting the form",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-xl text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                The Progress Note for Immunodeficiency Patient has been saved to Google Drive and will be processed shortly.
              </p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="/immunodeficiency">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Immunodeficiency Forms
                  </Link>
                </Button>
                <div className="text-sm text-gray-500">
                  <p>Form ID: {formId}</p>
                  <p>Submitted: {submittedAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
    <Card className="bg-white shadow-xl">
      {/* Unified Form Header */}
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
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
              <CardTitle className="text-xl font-bold">Progress Note</CardTitle>
              <p className="text-blue-200 text-sm">Immunodeficiency Patient</p>
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
              <p className="font-semibold text-blue-900">Hospital in Your Home</p>
              <p className="text-blue-700">Comprehensive Healthcare Solutions</p>
            </div>
            <div className="text-right text-slate-600">
              <p className="font-medium">📞 1-844-MY-HIYH</p>
              <p className="font-medium">✉️ info@hiyh.us</p>
            </div>
          </div>
        </div>

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
                  value={formData.patientName}
                  onChange={(e) => handleInputChange("patientName", e.target.value)}
                  className="mt-1"
                  placeholder="Enter patient's full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-slate-700">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="medicalRecordNumber" className="text-sm font-semibold text-slate-700">
                  Medical Record Number
                </Label>
                <Input
                  id="medicalRecordNumber"
                  value={formData.medicalRecordNumber}
                  onChange={(e) => handleInputChange("medicalRecordNumber", e.target.value)}
                  className="mt-1"
                  placeholder="Enter MRN"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfVisit" className="text-sm font-semibold text-slate-700">
                  Date of Visit
                </Label>
                <Input
                  id="dateOfVisit"
                  type="date"
                  value={formData.dateOfVisit}
                  onChange={(e) => handleInputChange("dateOfVisit", e.target.value)}
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
                value={formData.chiefComplaint}
                onChange={(e) => handleInputChange("chiefComplaint", e.target.value)}
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
                value={formData.historyOfPresentIllness}
                onChange={(e) => handleInputChange("historyOfPresentIllness", e.target.value)}
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
                value={formData.reviewOfSystems}
                onChange={(e) => handleInputChange("reviewOfSystems", e.target.value)}
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
                value={formData.physicalExamination}
                onChange={(e) => handleInputChange("physicalExamination", e.target.value)}
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
                value={formData.assessment}
                onChange={(e) => handleInputChange("assessment", e.target.value)}
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
                value={formData.plan}
                onChange={(e) => handleInputChange("plan", e.target.value)}
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
                  value={formData.providerName}
                  onChange={(e) => handleInputChange("providerName", e.target.value)}
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
                  value={formData.providerTitle}
                  onChange={(e) => handleInputChange("providerTitle", e.target.value)}
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
                  value={formData.providerDate}
                  onChange={(e) => handleInputChange("providerDate", e.target.value)}
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
                  value={formData.providerSignature}
                  onChange={(e) => handleInputChange("providerSignature", e.target.value)}
                  className="mt-1"
                  placeholder="Type your name to sign electronically"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6 border-t border-blue-200">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit & Save Form"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
      </div>
    </div>
  )
}
