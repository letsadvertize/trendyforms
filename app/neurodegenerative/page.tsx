import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, FileText, ClipboardList, Pill, NotebookPen, ArrowLeft } from "lucide-react"
import { FormHeader } from "@/components/form-header"
import { FormFooter } from "@/components/form-footer"
import { appTheme } from "@/lib/theme"

const forms = [
  {
    id: "letter-medical-necessity",
    title: "Letter of Medical Necessity",
    description: "Medical necessity documentation for neurodegenerative treatments",
    icon: FileText,
  },
  {
    id: "provider-visit-attestation",
    title: "Provider Visit Attestation",
    description: "Provider visit documentation and attestation for neurodegenerative care",
    icon: ClipboardList,
  },
  {
    id: "medication-reconciliation",
    title: "Medication Reconciliation",
    description: "Comprehensive medication reconciliation for neurodegenerative patients",
    icon: Pill,
  },
  {
    id: "progress-note",
    title: "Progress Note",
    description: "Patient progress assessment and documentation for neurodegenerative conditions",
    icon: NotebookPen,
  },
]

export default function NeurodegenerativePage() {
  return (
    <div className={`${appTheme.layout.pageContainer} bg-gradient-to-br from-purple-50 to-indigo-50`}>
      <FormHeader />

      <div className={`${appTheme.layout.contentContainer} py-8`}>
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Brain className="h-12 w-12 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Neurodegenerative Forms</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized forms for neurodegenerative genetic testing documentation and patient care management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {forms.map((form) => {
            const Icon = form.icon
            return (
              <Link key={form.id} href={`/neurodegenerative/${form.id}`}>
                <Card className={`${appTheme.navigation.card} group transition-all duration-300 hover:shadow-xl hover:scale-105`}>
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 group-hover:from-purple-700 group-hover:to-purple-800 text-white rounded-t-lg transition-all duration-300">
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
                      Click to access the {form.title.toLowerCase()} form for neurodegenerative conditions
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      <FormFooter />
    </div>
  )
}
