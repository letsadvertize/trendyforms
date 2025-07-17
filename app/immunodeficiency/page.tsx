import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, ClipboardList, Pill, NotebookPen, Shield } from "lucide-react"
import { FormHeader } from "@/components/form-header"
import { FormFooter } from "@/components/form-footer"
import { appTheme, getSpecialtyTheme } from "@/lib/theme"

const specialty = "immunodeficiency"
const specialtyTheme = getSpecialtyTheme(specialty)

const forms = [
  {
    id: "letter-medical-necessity",
    title: "Letter of Medical Necessity",
    description: "Medical necessity documentation for immunodeficiency treatments",
    icon: FileText,
  },
  {
    id: "provider-visit-attestation",
    title: "Provider Visit Attestation",
    description: "Provider visit documentation and attestation",
    icon: ClipboardList,
  },
  {
    id: "medication-reconciliation",
    title: "Medication Reconciliation",
    description: "Comprehensive medication reconciliation form",
    icon: Pill,
  },
  {
    id: "progress-note",
    title: "Progress Note",
    description: "Patient progress assessment and documentation",
    icon: NotebookPen,
  },
]

export default function ImunodeficiencyPage() {
  return (
    <div className={`${appTheme.layout.pageContainer} bg-gradient-to-br ${specialtyTheme.gradient}`}>
      <FormHeader />

      <div className={`${appTheme.layout.contentContainer} py-8`}>
        <div className={appTheme.layout.backButton}>
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>

          <div className="flex items-center mb-6">
            <div className={`p-3 bg-${specialtyTheme.primary}-100 rounded-full mr-4`}>
              <Shield className={`h-8 w-8 text-${specialtyTheme.accent}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Immunodeficiency Forms</h1>
              <p className="text-gray-600 mt-2">
                Select a form to begin documentation for immunodeficiency-related care
              </p>
              <div className="mt-2 text-sm text-gray-500">
                <p>{appTheme.branding.tagline}</p>
                <div className="flex space-x-4 mt-1">
                  <span>{appTheme.branding.contact.phone}</span>
                  <span>{appTheme.branding.contact.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={appTheme.navigation.cardGrid}>
          {forms.map((form) => {
            const IconComponent = form.icon
            return (
              <Card key={form.id} className={appTheme.navigation.card}>
                <CardHeader className={appTheme.navigation.cardHeader}>
                  <div className="flex items-start space-x-3">
                    <div className={`${appTheme.navigation.iconContainer} bg-${specialtyTheme.primary}-50`}>
                      <IconComponent className={`h-5 w-5 text-${specialtyTheme.accent}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className={appTheme.navigation.title}>{form.title}</CardTitle>
                      <CardDescription className={appTheme.navigation.description}>{form.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={`/immunodeficiency/${form.id}`}>
                    <Button className={`${appTheme.navigation.button} bg-${specialtyTheme.accent} hover:bg-${specialtyTheme.primary}-700`}>
                      Open Form
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <FormFooter />
    </div>
  )
}
