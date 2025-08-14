import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { appTheme } from "@/lib/theme"

import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"

const forms = [
  {
    id: "letter-medical-necessity",
    title: "Letter of Medical Necessity",
    description: "Medical necessity documentation for combined cardiopulmonary testing",
    icon: FileText,
    path: "/cardiopulmonary-testing/letter-medical-necessity"
  },
  {
    id: "provider-visit-attestation",
    title: "Provider Visit Attestation",
    description: "Provider visit documentation and attestation for cardiopulmonary assessment",
    icon: FileText,
    path: "/cardiopulmonary-testing/provider-visit-attestation"
  },
  {
    id: "medication-reconciliation",
    title: "Medication Reconciliation",
    description: "Comprehensive medication reconciliation for cardiopulmonary patients",
    icon: FileText,
    path: "/cardiopulmonary-testing/medication-reconciliation"
  },
  {
    id: "progress-note",
    title: "Progress Note",
    description: "Patient progress assessment and documentation for cardiopulmonary testing",
    icon: FileText,
    path: "/cardiopulmonary-testing/progress-note"
  },
]

export default function CardiopulmonaryTestingPage() {
  return (
    <div className={`${appTheme.layout.pageContainer} bg-gradient-to-br from-red-50 to-red-100`}>
      <div className={appTheme.layout.contentContainer}>
        <Link href="/" className={appTheme.layout.backButton}>
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <FileText className="h-12 w-12 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">Combined Cardiopulmonary Testing</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized forms for combined cardiopulmonary assessment and documentation
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {forms.map((form) => {
            const Icon = form.icon;
            return (
              <Link key={form.id} href={form.path}>
                <Card className={`${appTheme.navigation.card} group transition-all duration-300 hover:shadow-xl hover:scale-105`}>
                  <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 group-hover:from-red-600 group-hover:to-red-700 text-white rounded-t-lg transition-all duration-300">
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
                      Click to access the {form.title.toLowerCase()} form for combined cardiopulmonary testing
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
