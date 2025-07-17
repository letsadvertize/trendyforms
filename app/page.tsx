import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Brain, FileText, ClipboardList, Pill, NotebookPen } from "lucide-react"
import { FormHeader } from "@/components/form-header"
import { FormFooter } from "@/components/form-footer"
import { appTheme } from "@/lib/theme"

const categories = [
  {
    id: "immunodeficiency",
    title: "Immunodeficiency",
    description: "Forms for immunodeficiency genetic testing and treatment",
    icon: Shield,
    gradient: "from-blue-600 to-blue-700",
    hoverGradient: "from-blue-700 to-blue-800",
  },
  {
    id: "neurodegenerative",
    title: "Neurodegenerative",
    description: "Forms for neurodegenerative genetic testing and treatment",
    icon: Brain,
    gradient: "from-purple-600 to-purple-700",
    hoverGradient: "from-purple-700 to-purple-800",
  },
]

const allForms = [
  {
    title: "Letter of Medical Necessity",
    description: "Medical necessity documentation for treatments",
    icon: FileText,
  },
  {
    title: "Provider Visit Attestation",
    description: "Provider visit documentation and attestation",
    icon: ClipboardList,
  },
  {
    title: "Medication Reconciliation",
    description: "Comprehensive medication reconciliation form",
    icon: Pill,
  },
  {
    title: "Progress Note",
    description: "Patient progress assessment and documentation",
    icon: NotebookPen,
  },
]

export default function HomePage() {
  return (
    <div className={`${appTheme.layout.pageContainer} bg-gradient-to-br from-slate-50 to-blue-50`}>
      <FormHeader />

      <div className={`${appTheme.layout.contentContainer} py-8`}>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Medical Forms Management
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamlined digital forms for genetic testing documentation, provider attestations, and patient care management
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.id} href={`/${category.id}`}>
                <Card className={`${appTheme.navigation.card} group transition-all duration-300 hover:shadow-xl hover:scale-105`}>
                  <CardHeader className={`bg-gradient-to-r ${category.gradient} group-hover:bg-gradient-to-r group-hover:${category.hoverGradient} text-white rounded-t-lg transition-all duration-300`}>
                    <div className="flex items-center space-x-4">
                      <Icon className="h-8 w-8" />
                      <div>
                        <CardTitle className="text-xl font-bold">{category.title}</CardTitle>
                        <CardDescription className="text-white/90">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      {allForms.map((form, index) => {
                        const FormIcon = form.icon
                        return (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <FormIcon className="h-4 w-4" />
                            <span>{form.title}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className={appTheme.navigation.card}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span>Digital Forms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Digitized medical forms with automatic PDF generation and Google Drive integration
              </p>
            </CardContent>
          </Card>

          <Card className={appTheme.navigation.card}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Secure Storage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Secure cloud storage with automated backup and document management
              </p>
            </CardContent>
          </Card>

          <Card className={appTheme.navigation.card}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>Smart Workflow</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Streamlined workflows for genetic testing documentation and patient care
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <FormFooter />
    </div>
  )
}
