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
  // Referring Provider Information
  providerName: string
  providerAddress: string
  npiNumber: string
  phoneNumber: string
  faxNumber: string
  
  // Patient Information
  patientName: string
  patientAddress: string
  patientDOB: string
  
  // Test Information
  dateOfConsult: string
  icdCodes: string
  dateOfService: string
  
  // Attestation and Signature
  providerSignature: string
  providerNameSignature: string
  signatureDate: string
}

export function ProviderVisitAttestationImmunodeficiency() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    // Referring Provider Information
    providerName: "",
    providerAddress: "",
    npiNumber: "",
    phoneNumber: "",
    faxNumber: "",
    
    // Patient Information
    patientName: "",
    patientAddress: "",
    patientDOB: "",
    
    // Test Information
    dateOfConsult: "",
    icdCodes: "",
    dateOfService: "",
    
    // Attestation and Signature
    providerSignature: "",
    providerNameSignature: "",
    signatureDate: new Date().toISOString().split("T")[0],
  })
  
  // Debug: Log form data changes
  console.log("Current form data state:", formData)

  const handleInputChange = (field: keyof FormData, value: string) => {
    console.log(`Field ${field} changed to:`, value)
    console.log("Current form data before update:", formData)
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }
      console.log("Updated form data:", updated)
      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Debug: Log form data before submission
    console.log("Form data being submitted:", formData)
    
    // Check if form is actually empty
    const nonEmptyFields = Object.entries(formData).filter(([key, value]) => value && value.toString().trim() !== '')
    console.log("Non-empty fields:", nonEmptyFields)
    
    if (nonEmptyFields.length === 0) {
      console.error("ERROR: No form data filled out!")
      toast({
        title: "Form Error",
        description: "Please fill out the form before submitting",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }
    
    // Check if any required fields are missing
    const requiredFields = ['providerName', 'npiNumber', 'phoneNumber', 'faxNumber', 'patientName', 'patientDOB', 'dateOfConsult', 'icdCodes', 'dateOfService', 'providerSignature', 'providerNameSignature', 'signatureDate']
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData] || formData[field as keyof FormData].toString().trim() === '')
    
    if (missingFields.length > 0) {
      console.error("ERROR: Missing required fields:", missingFields)
      toast({
        title: "Form Error",
        description: `Please fill out the following required fields: ${missingFields.join(', ')}`,
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      const requestBody = {
        formType: "provider-visit-attestation-immunodeficiency",
        specialty: "immunodeficiency",
        formData,
        timestamp: new Date().toISOString(),
      }

      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-xl text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                The Provider Visit Attestation for Immunodeficiency Genetic Testing has been saved and will be processed shortly.
              </p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="/immunodeficiency">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Immunodeficiency Forms
                  </Link>
                </Button>
                <div className="text-sm text-gray-500">
                  <p>Form ID: PVAI-{Date.now()}</p>
                  <p>Submitted: {new Date().toLocaleString()}</p>
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
      {/* Unified Form Header - Matching Letter of Medical Necessity */}
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
              <CardTitle className="text-xl font-bold">Provider Visit Attestation</CardTitle>
              <p className="text-blue-200 text-sm">Immunodeficiency Genetic Testing</p>
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

      <CardContent className="p-8 space-y-8">
        {/* Hospital Information Bar - Matching Letter of Medical Necessity */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
          <div className="flex justify-between items-center text-sm">
            <div>
              <p className="font-semibold text-blue-900">Hospital in Your Home</p>
              <p className="text-blue-700">Comprehensive Healthcare Solutions</p>
            </div>
            <div className="text-right text-blue-700">
              <p className="font-medium">📞 1-844-MY-HIYH</p>
              <p className="font-medium">✉️ info@hiyh.us</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Referring Provider Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
              Referring Provider Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="providerName" className="text-sm font-semibold text-slate-700">
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
                <Label htmlFor="npiNumber" className="text-sm font-semibold text-slate-700">
                  NPI#:
                </Label>
                <Input
                  id="npiNumber"
                  value={formData.npiNumber}
                  onChange={(e) => handleInputChange("npiNumber", e.target.value)}
                  className="mt-1"
                  placeholder="Enter NPI number"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="providerAddress" className="text-sm font-semibold text-slate-700">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phoneNumber" className="text-sm font-semibold text-slate-700">
                  Phone #:
                </Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="mt-1"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="faxNumber" className="text-sm font-semibold text-slate-700">
                  Fax #:
                </Label>
                <Input
                  id="faxNumber"
                  value={formData.faxNumber}
                  onChange={(e) => handleInputChange("faxNumber", e.target.value)}
                  className="mt-1"
                  placeholder="Enter fax number"
                  required
                />
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="patientName" className="text-sm font-semibold text-slate-700">
                  Patient Name:
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
                <Label htmlFor="patientDOB" className="text-sm font-semibold text-slate-700">
                  Patient DOB:
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
              <Label htmlFor="patientAddress" className="text-sm font-semibold text-slate-700">
                Patient Address:
              </Label>
              <Textarea
                id="patientAddress"
                value={formData.patientAddress}
                onChange={(e) => handleInputChange("patientAddress", e.target.value)}
                className="mt-1"
                rows={3}
                placeholder="Enter patient's complete address"
                required
              />
            </div>
          </div>

          {/* Test Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
              Test Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="dateOfConsult" className="text-sm font-semibold text-slate-700">
                  Date of Consult:
                </Label>
                <Input
                  id="dateOfConsult"
                  type="date"
                  value={formData.dateOfConsult}
                  onChange={(e) => handleInputChange("dateOfConsult", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfService" className="text-sm font-semibold text-slate-700">
                  Date of Service:
                </Label>
                <Input
                  id="dateOfService"
                  type="date"
                  value={formData.dateOfService}
                  onChange={(e) => handleInputChange("dateOfService", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="icdCodes" className="text-sm font-semibold text-slate-700">
                ICD-10 Codes:
              </Label>
              <Input
                id="icdCodes"
                value={formData.icdCodes}
                onChange={(e) => handleInputChange("icdCodes", e.target.value)}
                className="mt-1"
                placeholder="Enter ICD-10 diagnosis codes"
                required
              />
            </div>
          </div>

          {/* Attestation Statement */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
              Attestation
            </h3>
            <div className="bg-slate-50 p-6 rounded-lg border">
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>
                  I am the treating physician for <strong>{formData.patientName || "[PATIENT NAME]"}</strong>. I have ordered a Comprehensive
                  Immunodeficiency genetic test on <strong>{formData.dateOfConsult ? new Date(formData.dateOfConsult).toLocaleDateString() : "[DATE OF CONSULT]"}</strong>. The original requisition form signed by myself and the patient is attached for review.
                </p>
                <p>
                  The test was ordered based on the following diagnosis as identified on the requisition <strong>({formData.icdCodes || "[ICD 10-CODES]"})</strong>
                </p>
                <p>
                  The specimen was provided via a saliva swab test as of the actual date of service by the patient and sent directly to the lab.
                </p>
                <p>
                  Test results will be processed by the lab and returned to CLINIC/OFFICE. The results will be added to the patient's electronic medical record and will be included as part of the patient's ongoing treatment plan.
                </p>
                <p>
                  I hereby attest that the medical record entry for <strong>{formData.dateOfConsult ? new Date(formData.dateOfConsult).toLocaleDateString() : "[DATE OF CONSULT]"}</strong> accurately reflects my signature and the notations that I made in my capacity when I treated and diagnosed the above-listed patient.
                </p>
                <p>
                  I do hereby attest that this information is true, accurate and complete to the best of my knowledge.
                </p>
              </div>
            </div>
          </div>

          {/* Provider Signature */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
              Sincerely,
            </h3>
            <div className="space-y-6">
              <div>
                <Label htmlFor="providerSignature" className="text-sm font-semibold text-slate-700">
                  Provider Signature:
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
              <div>
                <Label htmlFor="providerNameSignature" className="text-sm font-semibold text-slate-700">
                  Provider Name:
                </Label>
                <Input
                  id="providerNameSignature"
                  value={formData.providerNameSignature}
                  onChange={(e) => handleInputChange("providerNameSignature", e.target.value)}
                  className="mt-1"
                  placeholder="Enter provider's full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="signatureDate" className="text-sm font-semibold text-slate-700">
                  Date:
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
