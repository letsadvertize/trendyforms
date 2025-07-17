"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Download, Printer, CheckCircle, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface PatientCondition {
  condition: string
  dxAge: string
}

interface FamilyHistory {
  relative: string
  side: string
  relationship: string
  condition: string
  dxAge: string
}

export function LetterMedicalNecessityImmunodeficiency() {
  const [patientName, setPatientName] = useState("")
  const [date, setDate] = useState("")
  const [patientConditions, setPatientConditions] = useState<PatientCondition[]>([{ condition: "", dxAge: "" }])
  const [familyHistory, setFamilyHistory] = useState<FamilyHistory[]>([
    { relative: "", side: "", relationship: "", condition: "", dxAge: "" },
  ])
  const [medicalManagement, setMedicalManagement] = useState("")
  const [providerName, setProviderName] = useState("")
  const [providerDate, setProviderDate] = useState("")
  const [hereditaryCondition, setHereditaryCondition] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { toast } = useToast()

  const addPatientCondition = () => {
    setPatientConditions([...patientConditions, { condition: "", dxAge: "" }])
  }

  const removePatientCondition = (index: number) => {
    setPatientConditions(patientConditions.filter((_, i) => i !== index))
  }

  const updatePatientCondition = (index: number, field: keyof PatientCondition, value: string) => {
    const updated = patientConditions.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setPatientConditions(updated)
  }

  const addFamilyHistory = () => {
    setFamilyHistory([...familyHistory, { relative: "", side: "", relationship: "", condition: "", dxAge: "" }])
  }

  const removeFamilyHistory = (index: number) => {
    setFamilyHistory(familyHistory.filter((_, i) => i !== index))
  }

  const updateFamilyHistory = (index: number, field: keyof FamilyHistory, value: string) => {
    const updated = familyHistory.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setFamilyHistory(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log("Form submission started...")
    console.log("Form data:", {
      patientName,
      date,
      patientConditions,
      familyHistory,
      medicalManagement,
      providerName,
      providerDate,
      hereditaryCondition,
    })

    try {
      const payload = {
        formType: "letter-medical-necessity",
        specialty: "immunodeficiency",
        formData: {
          patientName,
          date,
          patientConditions,
          familyHistory,
          medicalManagement,
          providerName,
          providerDate,
          hereditaryCondition,
        },
        timestamp: new Date().toISOString(),
      }

      console.log("Sending payload:", payload)

      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)

      const result = await response.json()
      console.log("Response result:", result)

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-xl text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                The Letter of Medical Necessity has been saved to Google Drive and will be processed shortly.
              </p>
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="/immunodeficiency">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Immunodeficiency Forms
                  </Link>
                </Button>
                <div className="text-sm text-gray-500">
                  <p>Form ID: LMN-I-{Date.now()}</p>
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
                  <CardTitle className="text-xl font-bold">Letter of Medical Necessity</CardTitle>
                  <p className="text-blue-100 text-sm">Immunodeficiency Genetic Testing</p>
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
        {/* Hospital Information Bar */}
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
          {/* Patient Name and Date */}
          <div className="grid md:grid-cols-2 gap-6">
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
              />
            </div>
          </div>

          {/* Medical Statement */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <div className="space-y-4">
              <p className="text-slate-800 leading-relaxed text-center font-semibold">To whomsoever it may concern:</p>
              <p className="text-slate-800 leading-relaxed">
                I am writing on behalf of my patient, <span className="font-bold">{patientName || "Patient Name"}</span>{" "}
                to document the medical necessity of Immunodeficiency genetic testing.
              </p>
              <p className="text-slate-800 leading-relaxed">
                I have determined that this test is medically necessary for the above patient due to the following
                history, which is strongly indicative of genetic etiology or a hereditary{" "}
                <Input
                  value={hereditaryCondition}
                  onChange={(e) => setHereditaryCondition(e.target.value)}
                  placeholder="Enter hereditary condition"
                  className="inline-block w-48 mx-1 h-8 text-sm"
                />{" "}
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
                    <Label className="text-sm font-semibold text-slate-700">Immunodeficiency Conditions</Label>
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
                className="bg-slate-50 hover:bg-slate-100"
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
                className="mt-3 bg-slate-50 hover:bg-slate-100"
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
                  If a mutation is found in one or more genes on the Immunodeficiency genetic test, it would provide a
                  diagnosis of a hereditary Immunodeficiency condition and thereby helping to clarify the patient's risk
                  and prompting a change in the patient's medical management. Accurate diagnosis will undoubtedly save
                  the patient undue suffering and treatment delays. This information allows healthcare providers to
                  better inform affected individuals and families about prognosis and optimal surveillance strategies
                  and may also guide therapy. Understanding the etiology of the symptoms will enable avoidance of
                  inpatient hospitalization. Patients with severe combined immunodeficiency might have similar
                  phenotypes even though they have variants in different genes. Knowing which gene is affected helps
                  determine whether the best treatment option might be enzyme replacement therapy, gene therapy, or a
                  stem cell transplant. In addition, once the molecular diagnosis is established, healthcare providers
                  can better define the risk of recurrence and decide whether to screen unaffected family members for
                  carrier status, to identify a suitable stem cell donor, or for other purposes.
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
              Based on my evaluation and review of the available literature, I believe that the Immunodeficiency genetic
              testing offered by <strong>Hospital In Your Home HIYH</strong> is warranted and medically necessary for my
              patient.
            </p>
          </div>

          {/* Provider Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800 border-b-2 border-slate-200 pb-2">
              Provider Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="providerName" className="text-sm font-semibold text-slate-700">
                  Provider Name
                </Label>
                <Input
                  id="providerName"
                  value={providerName}
                  onChange={(e) => setProviderName(e.target.value)}
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
          <div className="flex justify-center pt-6 border-t border-blue-200">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
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
