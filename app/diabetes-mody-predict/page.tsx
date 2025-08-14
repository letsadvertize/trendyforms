import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { appTheme } from "@/lib/theme"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ClipboardList } from "lucide-react"

const forms = [
  {
    id: "letter-medical-necessity",
    title: "Letter of Medical Necessity",
    description: "Medical necessity documentation for diabetes MODY and prediction",
    icon: ClipboardList,
    path: "/diabetes-mody-predict/letter-medical-necessity"
  },
  {
    id: "provider-visit-attestation",
    title: "Provider Visit Attestation",
    description: "Provider visit documentation and attestation for diabetes care",
    icon: ClipboardList,
    path: "/diabetes-mody-predict/provider-visit-attestation"
  },
  {
    id: "medication-reconciliation",
    title: "Medication Reconciliation",
    description: "Comprehensive medication reconciliation for diabetes patients",
    icon: ClipboardList,
    path: "/diabetes-mody-predict/medication-reconciliation"
  },
  {
    id: "progress-note",
    title: "Progress Note",
    description: "Patient progress assessment and documentation for diabetes prediction",
    icon: ClipboardList,
    path: "/diabetes-mody-predict/progress-note"
  },
]

export default function DiabetesModyPredictPage() {
  return (
    <div className={`${appTheme.layout.pageContainer} bg-gradient-to-br from-pink-50 to-pink-100`}>
      <div className={appTheme.layout.contentContainer}>
        <Link href="/" className={appTheme.layout.backButton}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <ClipboardList className="h-12 w-12 text-pink-600" />
            <h1 className="text-4xl font-bold text-gray-900">Diabetes MODY and Diabetes Predict</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized forms for MODY and diabetes risk prediction and management
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {forms.map((form) => {
            const Icon = form.icon;
            return (
              <Link key={form.id} href={form.path}>
                <Card className={`${appTheme.navigation.card} group transition-all duration-300 hover:shadow-xl hover:scale-105`}>
                  <CardHeader className="bg-gradient-to-r from-pink-500 to-pink-600 group-hover:from-pink-600 group-hover:to-pink-700 text-white rounded-t-lg transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <Icon className="h-8 w-8" />
                      <div>
                        <CardTitle className="text-xl font-bold">{form.title}</CardTitle>
                        <CardDescription className="text-white/90">
                          {form.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 text-sm">
                      Click to access the {form.title.toLowerCase()} form for diabetes MODY and prediction
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
