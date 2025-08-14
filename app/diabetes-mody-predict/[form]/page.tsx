import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { LetterMedicalNecessityDiabetesModyPredict } from "@/components/forms/letter-medical-necessity-diabetes-mody-predict"
import { MedicationReconciliationDiabetesModyPredict } from "@/components/forms/medication-reconciliation-diabetes-mody-predict"
import { ProgressNoteDiabetesModyPredict } from "@/components/forms/progress-note-diabetes-mody-predict"


const formTitles: Record<string, string> = {
  "letter-medical-necessity": "Letter of Medical Necessity",
  "provider-visit-attestation": "Provider Visit Attestation",
  "medication-reconciliation": "Medication Reconciliation",
  "progress-note": "Progress Note",
}

const formComponents: Record<string, React.ComponentType> = {
  "letter-medical-necessity": LetterMedicalNecessityDiabetesModyPredict,
  "medication-reconciliation": MedicationReconciliationDiabetesModyPredict,
  "progress-note": ProgressNoteDiabetesModyPredict,
}

export default async function DiabetesModyPredictFormPage({ params }: { params: Promise<{ form: string }> }) {
  const { form } = await params;
  const formTitle = formTitles[form];
  const FormComponent = formComponents[form];

  if (!formTitle) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/diabetes-mody-predict">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Diabetes MODY & Predict Forms
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
