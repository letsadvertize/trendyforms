import type React from "react"
import { ProviderVisitAttestationCardiopulmonaryTesting } from "@/components/forms/provider-visit-attestation-cardiopulmonary-testing"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CardiopulmonaryTestingProviderVisitAttestationPage() {
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
          <ProviderVisitAttestationCardiopulmonaryTesting />
        </div>
      </div>
    </div>
  )
}
