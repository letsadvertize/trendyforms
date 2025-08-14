"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Download, Printer, ArrowLeft, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { appTheme, getSpecialtyTheme } from "@/lib/theme"

interface FormData {
  providerName: string
  providerAddress: string
  providerEmail: string
  phoneNumber: string
  referringProviderName: string
  referringProviderAddress: string
  referringNpiNumber: string
  referringPhoneNumber: string
  referringFaxNumber: string
  patientName: string
  patientAddress: string
  patientDOB: string
  dateOfConsult: string
  icdCodes: string
  dateOfService: string
  providerSignature: string
  providerNameSignature: string
  signatureDate: string
}

export function ProviderVisitAttestationCardiopulmonaryTesting() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formId, setFormId] = useState<string>("")
  const [submittedAt, setSubmittedAt] = useState<string>("")
  const [formData, setFormData] = useState<FormData>({
    providerName: "",
    providerAddress: "",
    providerEmail: "",
    phoneNumber: "",
    referringProviderName: "",
    referringProviderAddress: "",
    referringNpiNumber: "",
    referringPhoneNumber: "",
    referringFaxNumber: "",
    patientName: "",
    patientAddress: "",
    patientDOB: "",
    dateOfConsult: "",
    icdCodes: "",
    dateOfService: "",
    providerSignature: "",
    providerNameSignature: "",
    signatureDate: new Date().toISOString().split("T")[0],
  })

  // Use 'general' as fallback for theme
  const specialty = "general"
  const theme = getSpecialtyTheme(specialty)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    setFormData((prev) => {
      let updated = { ...prev }
      if (!prev.providerSignature) updated.providerSignature = prev.providerName
      if (!prev.providerNameSignature) updated.providerNameSignature = prev.providerName
      return updated
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.providerName])

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
          formType: "provider-visit-attestation-cardiopulmonary-testing",
          specialty: "cardiopulmonary-testing",
          formData,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${response.statusText}. ${errorText}`)
      }

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Form Submitted Successfully",
          description: `PDF saved to Google Drive: ${result.fileName}`,
        })
        if (result.driveUrl) {
          window.open(result.driveUrl, "_blank")
        }
        setFormId(`PVACT-${Date.now()}`)
        setSubmittedAt(new Date().toLocaleString())
        setShowSuccess(true)
      } else {
        throw new Error(result.error || "Failed to submit form")
      }
    } catch (error: any) {
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
      <div className={`${appTheme.layout.pageContainer} bg-gradient-to-br ${theme.gradient}`}>
        <div className={appTheme.layout.contentContainer}>
          <Card className="max-w-2xl mx-auto shadow-xl text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-700 mb-2">Form Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                The Provider Visit Attestation for Cardiopulmonary Testing has been saved and will be processed shortly.
              </p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full bg-red-600 hover:bg-red-700">
                  <Link href="/cardiopulmonary-testing">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Cardiopulmonary Testing Forms
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
          {/* Unified Form Header */}
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Provider Visit Attestation</CardTitle>
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
              {/* Provider Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="providerName">Provider Name</Label>
                  <Input id="providerName" value={formData.providerName} onChange={e => handleInputChange("providerName", e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="providerAddress">Provider Address</Label>
                  <Input id="providerAddress" value={formData.providerAddress} onChange={e => handleInputChange("providerAddress", e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="providerEmail">Provider Email</Label>
                  <Input id="providerEmail" type="email" value={formData.providerEmail} onChange={e => handleInputChange("providerEmail", e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Provider Phone Number</Label>
                  <Input id="phoneNumber" value={formData.phoneNumber} onChange={e => handleInputChange("phoneNumber", e.target.value)} required />
                </div>
              </div>
              {/* Referring Provider Info */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="referringProviderName">Referring Provider Name</Label>
                  <Input id="referringProviderName" value={formData.referringProviderName} onChange={e => handleInputChange("referringProviderName", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="referringProviderAddress">Referring Provider Address</Label>
                  <Input id="referringProviderAddress" value={formData.referringProviderAddress} onChange={e => handleInputChange("referringProviderAddress", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="referringNpiNumber">Referring NPI Number</Label>
                  <Input id="referringNpiNumber" value={formData.referringNpiNumber} onChange={e => handleInputChange("referringNpiNumber", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="referringPhoneNumber">Referring Phone Number</Label>
                  <Input id="referringPhoneNumber" value={formData.referringPhoneNumber} onChange={e => handleInputChange("referringPhoneNumber", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="referringFaxNumber">Referring Fax Number</Label>
                  <Input id="referringFaxNumber" value={formData.referringFaxNumber} onChange={e => handleInputChange("referringFaxNumber", e.target.value)} />
                </div>
              </div>
              {/* Patient Info */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input id="patientName" value={formData.patientName} onChange={e => handleInputChange("patientName", e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="patientAddress">Patient Address</Label>
                  <Input id="patientAddress" value={formData.patientAddress} onChange={e => handleInputChange("patientAddress", e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="patientDOB">Patient Date of Birth</Label>
                  <Input id="patientDOB" type="date" value={formData.patientDOB} onChange={e => handleInputChange("patientDOB", e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="dateOfConsult">Date of Consult</Label>
                  <Input id="dateOfConsult" type="date" value={formData.dateOfConsult} onChange={e => handleInputChange("dateOfConsult", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="icdCodes">ICD Codes</Label>
                  <Input id="icdCodes" value={formData.icdCodes} onChange={e => handleInputChange("icdCodes", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="dateOfService">Date of Service</Label>
                  <Input id="dateOfService" type="date" value={formData.dateOfService} onChange={e => handleInputChange("dateOfService", e.target.value)} />
                </div>
              </div>
              {/* Attestation Statement */}
              <div className="mt-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="text-slate-800 leading-relaxed">
                  I hereby attest that the above information is accurate and complete to the best of my knowledge. I have provided care to the patient as described above and have reviewed all relevant medical records.
                </p>
              </div>
              {/* Provider Signature */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="providerSignature">Provider Signature</Label>
                  <Input id="providerSignature" value={formData.providerSignature} onChange={e => handleInputChange("providerSignature", e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="providerNameSignature">Provider Name (Printed)</Label>
                  <Input id="providerNameSignature" value={formData.providerNameSignature} onChange={e => handleInputChange("providerNameSignature", e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="signatureDate">Date</Label>
                  <Input id="signatureDate" type="date" value={formData.signatureDate} onChange={e => handleInputChange("signatureDate", e.target.value)} required />
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
