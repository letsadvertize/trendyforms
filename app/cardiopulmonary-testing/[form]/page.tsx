import type React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import { LetterMedicalNecessityCardiopulmonaryTesting } from "@/components/forms/letter-medical-necessity-cardiopulmonary-testing"
import { ProviderVisitAttestationCardiopulmonaryTesting } from "@/components/forms/provider-visit-attestation-cardiopulmonary-testing"
import { MedicationReconciliationCardiopulmonaryTesting } from "@/components/forms/medication-reconciliation-cardiopulmonary-testing"
import { ProgressNoteCardiopulmonaryTesting } from "@/components/forms/progress-note-cardiopulmonary-testing"

const formTitles: Record<string, string> = {
  "letter-medical-necessity": "Letter of Medical Necessity",
  "provider-visit-attestation": "Provider Visit Attestation",
  "medication-reconciliation": "Medication Reconciliation",
  "progress-note": "Progress Note",
  // Add more as needed
}

const formComponents: Record<string, React.ComponentType> = {
  "letter-medical-necessity": LetterMedicalNecessityCardiopulmonaryTesting,
  "provider-visit-attestation": ProviderVisitAttestationCardiopulmonaryTesting,
  "medication-reconciliation": MedicationReconciliationCardiopulmonaryTesting,
  "progress-note": ProgressNoteCardiopulmonaryTesting,
  // Add more as needed
}

export default async function CardiopulmonaryTestingFormPage(props: any) {
  const { form } = props.params
  const formTitle = formTitles[form]
  const FormComponent = formComponents[form]

  if (!formTitle) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/cardiopulmonary-testing">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cardiopulmonary Testing Forms
            </Button>
          </Link>
        </div>
        <div className="max-w-4xl mx-auto">
          {FormComponent ? (
            <FormComponent />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-2xl font-bold text-center mb-8">{formTitle}</h1>
              <p className="text-center text-gray-600">Form content area - ready for implementation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
