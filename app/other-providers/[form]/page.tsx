import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { LetterMedicalNecessityOtherProviders } from "@/components/forms/letter-medical-necessity-other-providers"
import { PatientProgressOtherProviders } from "@/components/forms/patient-progress-other-providers"
import { ProviderVisitAttestationOtherProviders } from "@/components/forms/provider-visit-attestation-other-providers"
import { MedicationReconciliationOtherProviders } from "@/components/forms/medication-reconciliation-other-providers"

const formTitles: Record<string, string> = {
  "letter-medical-necessity": "Letter of Medical Necessity",
  "provider-visit-attestation": "Provider Visit Attestation",
  "medication-reconciliation": "Medication Reconciliation",
  "patient-progress-other-providers": "Patient Progress Form",
}

const formComponents: Record<string, React.ComponentType> = {
  "letter-medical-necessity": LetterMedicalNecessityOtherProviders,
  "provider-visit-attestation": ProviderVisitAttestationOtherProviders,
  "medication-reconciliation": MedicationReconciliationOtherProviders,
  "patient-progress-other-providers": PatientProgressOtherProviders,
}

export default async function OtherProvidersFormPage(props: any) {
  const { form } = props.params
  const formTitle = formTitles[form]
  const FormComponent = formComponents[form]

  if (!formTitle) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/other-providers">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Other Providers Forms
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

export async function generateStaticParams() {
  return [
    { form: 'letter-medical-necessity' },
    { form: 'provider-visit-attestation' },
    { form: 'medication-reconciliation' },
    { form: 'patient-progress-other-providers' },
  ]
}

