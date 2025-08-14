"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Download, Printer, CheckCircle, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function LetterMedicalNecessityDiabetesModyPredict() {
  // Custom Provider Fields
  const [customProviderName, setCustomProviderName] = useState("")
  const [customProviderEmail, setCustomProviderEmail] = useState("")
  const [customProviderPhone, setCustomProviderPhone] = useState("")
  const [customProviderAddress, setCustomProviderAddress] = useState("")

  // Form fields
  const [patientName, setPatientName] = useState("")
  const [patientDOB, setPatientDOB] = useState("")
  const [date, setDate] = useState("")
  const [insuranceCompany, setInsuranceCompany] = useState("")
  const [policyNumber, setPolicyNumber] = useState("")
  const [diagnosisCode, setDiagnosisCode] = useState("")
  const [diagnosis, setDiagnosis] = useState("")
  const [treatmentRequested, setTreatmentRequested] = useState("")
  const [medicalJustification, setMedicalJustification] = useState("")
  const [priorTreatments, setPriorTreatments] = useState("")
  const [urgency, setUrgency] = useState("")
  const [modyType, setModyType] = useState("")

  // Patient Conditions State
  const [patientConditions, setPatientConditions] = useState([
    { condition: "", dxAge: "" }
  ])

  const addPatientCondition = () => {
    setPatientConditions([...patientConditions, { condition: "", dxAge: "" }])
  }

  const updatePatientCondition = (index: number, field: "condition" | "dxAge", value: string) => {
    setPatientConditions((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const removePatientCondition = (index: number) => {
    setPatientConditions((prev) => prev.filter((_, i) => i !== index))
  }

  // Family History State
  const [familyHistory, setFamilyHistory] = useState([
    { relative: "", side: "", relationship: "", condition: "", dxAge: "" }
  ])

  const addFamilyHistory = () => {
    setFamilyHistory([...familyHistory, { relative: "", side: "", relationship: "", condition: "", dxAge: "" }])
  }

  const updateFamilyHistory = (index: number, field: string, value: string) => {
    setFamilyHistory((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const removeFamilyHistory = (index: number) => {
    setFamilyHistory((prev) => prev.filter((_, i) => i !== index))
  }

  // Medical Management State
  const [medicalManagement, setMedicalManagement] = useState("")

  // Provider Date State
  const [providerDate, setProviderDate] = useState("")

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formId, setFormId] = useState("")
  const [submittedAt, setSubmittedAt] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        formType: "letter-medical-necessity-diabetes-mody-predict",
        specialty: "diabetes-mody-predict",
        formData: {
          patientName,
          patientDOB,
          insuranceCompany,
          policyNumber,
          customProviderName,
          customProviderEmail,
          customProviderPhone,
          customProviderAddress,
          diagnosisCode,
          diagnosis,
          treatmentRequested,
          medicalJustification,
          priorTreatments,
          urgency,
          modyType,
          patientConditions,
          familyHistory,
          medicalManagement,
          providerDate,
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
        setFormId(result.formId || "")
        setSubmittedAt(result.submittedAt || new Date().toLocaleString())
        toast({
          title: "Form Submitted Successfully",
          description: `PDF saved to Google Drive: ${result.fileName}`,
        })

        setTimeout(() => {
          setShowSuccess(false)
          // Reset form
          setPatientName("")
          setPatientDOB("")
          setInsuranceCompany("")
          setPolicyNumber("")
          setCustomProviderName("")
          setCustomProviderEmail("")
          setCustomProviderPhone("")
          setCustomProviderAddress("")
          setDiagnosisCode("")
          setDiagnosis("")
          setTreatmentRequested("")
          setMedicalJustification("")
          setPriorTreatments("")
          setUrgency("")
          setModyType("")
          setPatientConditions([{ condition: "", dxAge: "" }])
          setFamilyHistory([{ relative: "", side: "", relationship: "", condition: "", dxAge: "" }])
          setMedicalManagement("")
          setProviderDate("")
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
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-xl text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-pink-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-pink-700 mb-2">Form Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                The Letter of Medical Necessity has been saved to Google Drive and will be processed shortly.
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
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/diabetes-mody-predict">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Diabetes MODY & Predict Forms
            </Link>
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto bg-white shadow-xl">
          {/* Custom Provider Header */}
    <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Letter of Medical Necessity</CardTitle>
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
            <form onSubmit={handleSubmit}>
              {/* Custom Provider Info Section */}
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customProviderName" className="text-sm font-semibold text-pink-700">
                      Provider Name
                    </Label>
                    <Input
                      id="customProviderName"
                      value={customProviderName}
                      onChange={(e) => setCustomProviderName(e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customProviderEmail" className="text-sm font-semibold text-pink-700">
                      Provider Email
                    </Label>
                    <Input
                      id="customProviderEmail"
                      type="email"
                      value={customProviderEmail}
                      onChange={(e) => setCustomProviderEmail(e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customProviderPhone" className="text-sm font-semibold text-pink-700">
                      Provider Phone
                    </Label>
                    <Input
                      id="customProviderPhone"
                      type="tel"
                      value={customProviderPhone}
                      onChange={(e) => setCustomProviderPhone(e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider phone"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customProviderAddress" className="text-sm font-semibold text-pink-700">
                      Provider Address
                    </Label>
                    <Input
                      id="customProviderAddress"
                      value={customProviderAddress}
                      onChange={(e) => setCustomProviderAddress(e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="patientName" className="text-sm font-semibold text-slate-700">
                    Patient Name
                  </Label>
                  <Input
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="mt-1"
                    placeholder="Enter patient name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="patientDOB" className="text-sm font-semibold text-slate-700">
                    Patient Date of Birth
                  </Label>
                  <Input
                    id="patientDOB"
                    type="date"
                    value={patientDOB}
                    onChange={(e) => setPatientDOB(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date" className="text-sm font-semibold text-slate-700">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              {/* Medical Statement */}
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <div className="space-y-4">
                  <p className="text-slate-800 leading-relaxed text-center font-semibold">To whomsoever it may concern:</p>
                  <p className="text-slate-800 leading-relaxed">
                    I am writing on behalf of my patient, <span className="font-bold">{patientName || "Patient Name"}</span>
                    {patientDOB && (
                      <span> (DOB: <span className="font-bold">{new Date(patientDOB).toLocaleDateString()}</span>)</span>
                    )}{" "}
                    to document the medical necessity of genetic testing for MODY & Predict diabetes.
                  </p>
                  <p className="text-slate-800 leading-relaxed">
                    I have determined that this test is medically necessary for the above patient due to the following
                    history, which is strongly indicative of a genetic etiology or a hereditary MODY type: {" "}
                    <Input
                      value={modyType}
                      onChange={(e) => setModyType(e.target.value)}
                      placeholder="Enter MODY type"
                      className="inline-block w-48 mx-1 h-8 text-sm"
                    />
                    consistent with a mutation in multiple genes.
                  </p>
                </div>
              </div>

              {/* Patient Personal History */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Patient Personal History
                </h3>
                <div className="space-y-4">
                  {patientConditions.map((condition, index) => (
                    <div key={index} className="grid md:grid-cols-3 gap-4 items-end p-4 bg-slate-50 rounded-lg">
                      <div>
                        <Label className="text-sm font-semibold text-slate-700">Conditions</Label>
                        <Input
                          value={condition.condition}
                          onChange={(e) => updatePatientCondition(index, "condition", e.target.value)}
                          placeholder="Enter condition"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-700">Dx Age</Label>
                        <Input
                          value={condition.dxAge}
                          onChange={(e) => updatePatientCondition(index, "dxAge", e.target.value)}
                          placeholder="Enter diagnosis age"
                          className="mt-1"
                        />
                      </div>
                      <div className="flex space-x-2">
                        {patientConditions.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => removePatientCondition(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPatientCondition}
                    className="bg-pink-50 hover:bg-pink-100"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Condition
                  </Button>
                </div>
              </div>

              {/* Family History */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">Family History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-300 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-300 p-3 text-left text-sm font-semibold text-slate-700">
                          First-, Second-, or Third-Degree Relative
                        </th>
                        <th className="border border-slate-300 p-3 text-left text-sm font-semibold text-slate-700">
                          (M: Maternal or P: Paternal) Side
                        </th>
                        <th className="border border-slate-300 p-3 text-left text-sm font-semibold text-slate-700">
                          Relationship
                        </th>
                        <th className="border border-slate-300 p-3 text-left text-sm font-semibold text-slate-700">
                          Condition
                        </th>
                        <th className="border border-slate-300 p-3 text-left text-sm font-semibold text-slate-700">
                          Dx Age
                        </th>
                        <th className="border border-slate-300 p-3 text-left text-sm font-semibold text-slate-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {familyHistory.map((history, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="border border-slate-300 p-2">
                            <Input
                              value={history.relative}
                              onChange={(e) => updateFamilyHistory(index, "relative", e.target.value)}
                              placeholder="1st, 2nd, 3rd"
                              className="w-full"
                            />
                          </td>
                          <td className="border border-slate-300 p-2">
                            <Input
                              value={history.side}
                              onChange={(e) => updateFamilyHistory(index, "side", e.target.value)}
                              placeholder="M or P"
                              className="w-full"
                            />
                          </td>
                          <td className="border border-slate-300 p-2">
                            <Input
                              value={history.relationship}
                              onChange={(e) => updateFamilyHistory(index, "relationship", e.target.value)}
                              placeholder="Relationship"
                              className="w-full"
                            />
                          </td>
                          <td className="border border-slate-300 p-2">
                            <Input
                              value={history.condition}
                              onChange={(e) => updateFamilyHistory(index, "condition", e.target.value)}
                              placeholder="Condition"
                              className="w-full"
                            />
                          </td>
                          <td className="border border-slate-300 p-2">
                            <Input
                              value={history.dxAge}
                              onChange={(e) => updateFamilyHistory(index, "dxAge", e.target.value)}
                              placeholder="Age"
                              className="w-full"
                            />
                          </td>
                          <td className="border border-slate-300 p-2">
                            {familyHistory.length > 1 && (
                              <Button type="button" variant="outline" size="sm" onClick={() => removeFamilyHistory(index)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFamilyHistory}
                    className="mt-3 bg-pink-50 hover:bg-pink-100"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Family History
                  </Button>
                </div>
              </div>

              {/* Medical Necessity */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Additional Information & Medical Necessity
                </h3>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <div className="space-y-4 text-slate-800 leading-relaxed">
                    <p>Additional information on patient's examination and assessment can be found on progress notes.</p>
                    <p className="font-semibold">Medical Necessity</p>
                    <p>
                      If a mutation is found in one or more genes on the genetic test, it would provide a
                      diagnosis of a hereditary MODY or related diabetes condition and thereby help clarify the patient's risk
                      and prompt a change in the patient's medical management. Accurate diagnosis will save the patient undue suffering and treatment delays. This information allows healthcare providers to better inform affected individuals and families about prognosis and optimal surveillance strategies and may also guide therapy. Understanding the etiology of the symptoms will enable avoidance of inpatient hospitalization.
                    </p>
                    <p>
                      For this patient, the genetic test results are needed in order to consider the following medical
                      management strategies:
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Management Considerations */}
              <div className="space-y-4">
                <Label htmlFor="medicalManagement" className="text-lg font-semibold text-slate-800">
                  Medical Management Considerations
                </Label>
                <Textarea
                  id="medicalManagement"
                  value={medicalManagement}
                  onChange={(e) => setMedicalManagement(e.target.value)}
                  placeholder="Enter medical management considerations..."
                  className="min-h-[120px]"
                />
              </div>

              {/* Conclusion */}
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <p className="text-slate-800 leading-relaxed">
                  Based on my evaluation and review of the available literature, I believe that the genetic
                  testing is warranted and medically necessary for my patient.
                </p>
              </div>

              {/* Provider Signature Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
                  Provider Signature
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="providerNameSignature" className="text-sm font-semibold text-slate-700">
                      Provider Name
                    </Label>
                    <Input
                      id="providerNameSignature"
                      value={customProviderName}
                      onChange={(e) => setCustomProviderName(e.target.value)}
                      className="mt-1"
                      placeholder="Enter provider name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="providerDate" className="text-sm font-semibold text-slate-700">
                      Date
                    </Label>
                    <Input
                      id="providerDate"
                      type="date"
                      value={providerDate}
                      onChange={(e) => setProviderDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6 border-t border-pink-200">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
                >
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
