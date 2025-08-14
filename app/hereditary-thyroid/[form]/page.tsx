import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

import { LetterMedicalNecessityHereditaryThyroid } from "@/components/forms/letter-medical-necessity-hereditary-thyroid"
import { ProviderVisitAttestationHereditaryThyroid } from "@/components/forms/provider-visit-attestation-hereditary-thyroid"

import { MedicationReconciliationHereditaryThyroid } from "@/components/forms/medication-reconciliation-hereditary-thyroid"
import { ProgressNoteHereditaryThyroid } from "@/components/forms/progress-note-hereditary-thyroid"


const formTitles: Record<string, string> = {
  "letter-medical-necessity": "Letter of Medical Necessity",
  "provider-visit-attestation": "Provider Visit Attestation",
  "medication-reconciliation": "Medication Reconciliation",
  "progress-note": "Progress Note",
}


const formComponents: Record<string, React.ComponentType> = {
  "letter-medical-necessity": LetterMedicalNecessityHereditaryThyroid,
  "provider-visit-attestation": ProviderVisitAttestationHereditaryThyroid,
  "medication-reconciliation": MedicationReconciliationHereditaryThyroid,
  "progress-note": ProgressNoteHereditaryThyroid,
}


interface HereditaryThyroidFormPageProps {
  params: { form: string }
}

export default async function HereditaryThyroidFormPage({ params }: HereditaryThyroidFormPageProps) {
  const { form } = params;
  const formTitle = formTitles[form];
  const FormComponent = formComponents[form];

  if (!formTitle) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/hereditary-thyroid">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Hereditary Thyroid Forms
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
  );
}
