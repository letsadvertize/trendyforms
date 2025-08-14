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
import { appTheme } from "@/lib/theme"

interface FormData {
  providerName: string
  providerAddress: string
  providerEmail: string
  phoneNumber: string
  npiNumber: string
  faxNumber: string
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

export function ProviderVisitAttestationDiabetesModyPredict() {
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
    npiNumber: "",
    faxNumber: "",
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
          formType: "provider-visit-attestation-diabetes-mody-predict",
          specialty: "diabetes-mody-predict",
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
        setFormId(`PVADMP-${Date.now()}`)
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
      <div className={`bg-gradient-to-br from-pink-50 to-pink-100 ${appTheme.layout.pageContainer}`}>
        <div className={appTheme.layout.contentContainer}>
          <Card className={`${appTheme.layout.successCard} text-center`}>
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-pink-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-pink-700 mb-2">Form Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                The Provider Visit Attestation for Diabetes MODY & Predict has been saved and will be processed shortly.
              </p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full bg-pink-600 hover:bg-pink-700">
                  <Link href="/diabetes-mody-predict">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Diabetes MODY & Predict Forms
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
    <div className={`bg-gradient-to-br from-pink-50 to-pink-100 ${appTheme.layout.pageContainer}`}>
      <div className={appTheme.layout.contentContainer}>
        <div className={appTheme.layout.backButton}>
          <Button variant="ghost" asChild>
            <Link href="/diabetes-mody-predict">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Diabetes MODY & Predict Forms
            </Link>
          </Button>
        </div>
        <Card className={appTheme.layout.formCard}>
          <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Provider Visit Attestation</CardTitle>
                <p className="text-pink-100 text-sm">Diabetes MODY & Predict</p>
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
              {/* Provider Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Provider Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="providerName" className="text-sm font-semibold text-pink-700">
                      Name:
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
                    <Label htmlFor="providerEmail" className="text-sm font-semibold text-pink-700">
                      Email:
                    </Label>
                    <Input
                      id="providerEmail"
                      type="email"
                      value={formData.providerEmail}
                      onChange={(e) => handleInputChange("providerEmail", e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider's email address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="npiNumber" className="text-sm font-semibold text-pink-700">
                      NPI Number:
                    </Label>
                    <Input
                      id="npiNumber"
                      value={formData.npiNumber}
                      onChange={(e) => handleInputChange("npiNumber", e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider's NPI number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="faxNumber" className="text-sm font-semibold text-pink-700">
                      Fax Number:
                    </Label>
                    <Input
                      id="faxNumber"
                      value={formData.faxNumber}
                      onChange={(e) => handleInputChange("faxNumber", e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider's fax number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="providerAddress" className="text-sm font-semibold text-pink-700">
                    Address:
                  </Label>
                  <Textarea
                    id="providerAddress"
                    value={formData.providerAddress}
                    onChange={(e) => handleInputChange("providerAddress", e.target.value)}
                    className="mt-1"
                    rows={3}
                    placeholder="Enter provider's complete address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm font-semibold text-pink-700">
                    Phone Number:
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="mt-1"
                    placeholder="Enter provider's phone number"
                    required
                  />
                </div>
              </div>
              {/* Referring Provider Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Referring Provider Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="referringProviderName" className="text-sm font-semibold text-pink-700">
                      Name:
                    </Label>
                    <Input
                      id="referringProviderName"
                      value={formData.referringProviderName}
                      onChange={(e) => handleInputChange("referringProviderName", e.target.value)}
                      className="mt-1"
                      placeholder="Enter referring provider's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="referringNpiNumber" className="text-sm font-semibold text-pink-700">
                      NPI Number:
                    </Label>
                    <Input
                      id="referringNpiNumber"
                      value={formData.referringNpiNumber}
                      onChange={(e) => handleInputChange("referringNpiNumber", e.target.value)}
                      className="mt-1"
                      placeholder="Enter NPI number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="referringPhoneNumber" className="text-sm font-semibold text-pink-700">
                      Phone Number:
                    </Label>
                    <Input
                      id="referringPhoneNumber"
                      value={formData.referringPhoneNumber}
                      onChange={(e) => handleInputChange("referringPhoneNumber", e.target.value)}
                      className="mt-1"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="referringFaxNumber" className="text-sm font-semibold text-pink-700">
                      Fax Number:
                    </Label>
                    <Input
                      id="referringFaxNumber"
                      value={formData.referringFaxNumber}
                      onChange={(e) => handleInputChange("referringFaxNumber", e.target.value)}
                      className="mt-1"
                      placeholder="Enter fax number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="referringProviderAddress" className="text-sm font-semibold text-pink-700">
                    Address:
                  </Label>
                  <Textarea
                    id="referringProviderAddress"
                    value={formData.referringProviderAddress}
                    onChange={(e) => handleInputChange("referringProviderAddress", e.target.value)}
                    className="mt-1"
                    rows={3}
                    placeholder="Enter referring provider's address"
                  />
                </div>
              </div>
              {/* Patient Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="patientName" className="text-sm font-semibold text-pink-700">
                      Name:
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
                    <Label htmlFor="patientDOB" className="text-sm font-semibold text-pink-700">
                      Date of Birth:
                    </Label>
                    <Input
                      id="patientDOB"
                      type="date"
                      value={formData.patientDOB}
                      onChange={(e) => handleInputChange("patientDOB", e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="patientAddress" className="text-sm font-semibold text-pink-700">
                    Address:
                  </Label>
                  <Textarea
                    id="patientAddress"
                    value={formData.patientAddress}
                    onChange={(e) => handleInputChange("patientAddress", e.target.value)}
                    className="mt-1"
                    rows={3}
                    placeholder="Enter patient's address"
                    required
                  />
                </div>
              </div>
              {/* Visit & Attestation */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Visit & Attestation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="dateOfConsult" className="text-sm font-semibold text-pink-700">
                      Date of Consult:
                    </Label>
                    <Input
                      id="dateOfConsult"
                      value={formData.dateOfConsult}
                      onChange={(e) => handleInputChange("dateOfConsult", e.target.value)}
                      className="mt-1"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfService" className="text-sm font-semibold text-pink-700">
                      Date of Service:
                    </Label>
                    <Input
                      id="dateOfService"
                      type="date"
                      value={formData.dateOfService}
                      onChange={(e) => handleInputChange("dateOfService", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="icdCodes" className="text-sm font-semibold text-pink-700">
                    ICD Codes:
                  </Label>
                  <Textarea
                    id="icdCodes"
                    value={formData.icdCodes}
                    onChange={(e) => handleInputChange("icdCodes", e.target.value)}
                    className="mt-1"
                    rows={2}
                    placeholder="Enter ICD codes for this visit"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="providerSignature" className="text-sm font-semibold text-pink-700">
                      Provider Signature:
                    </Label>
                    <Input
                      id="providerSignature"
                      value={formData.providerSignature}
                      onChange={(e) => handleInputChange("providerSignature", e.target.value)}
                      className="mt-1"
                      placeholder="Provider signature"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="providerNameSignature" className="text-sm font-semibold text-pink-700">
                      Provider Name (Printed):
                    </Label>
                    <Input
                      id="providerNameSignature"
                      value={formData.providerNameSignature}
                      onChange={(e) => handleInputChange("providerNameSignature", e.target.value)}
                      className="mt-1"
                      placeholder="Provider name (printed)"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signatureDate" className="text-sm font-semibold text-pink-700">
                    Signature Date:
                  </Label>
                  <Input
                    id="signatureDate"
                    type="date"
                    value={formData.signatureDate}
                    onChange={(e) => handleInputChange("signatureDate", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-pink-600 hover:bg-pink-700 px-8 py-3 text-lg"
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
