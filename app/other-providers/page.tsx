'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText, ClipboardCheck, UserCheck, TrendingUp, Stethoscope } from 'lucide-react'
import { appTheme, getSpecialtyTheme } from '@/lib/theme'

const specialty = 'otherProviders'
const theme = getSpecialtyTheme(specialty)

const forms = [
	{
		id: 'letter-medical-necessity',
		title: 'Letter of Medical Necessity',
		description: 'Documentation required for insurance approval and medical justification',
		icon: FileText,
		path: '/other-providers/letter-medical-necessity'
	},
	{
		id: 'medication-reconciliation',
		title: 'Medication Reconciliation',
		description: 'Comprehensive medication and treatment reconciliation form',
		icon: ClipboardCheck,
		path: '/other-providers/medication-reconciliation'
	},
	{
		id: 'provider-visit-attestation',
		title: 'Provider Visit Attestation',
		description: 'Healthcare provider visit verification and attestation documentation',
		icon: UserCheck,
		path: '/other-providers/provider-visit-attestation'
	},
	{
		id: 'patient-progress-other-providers',
		title: 'Patient Progress Form',
		description: 'Track patient progress, outcomes, and treatment effectiveness',
		icon: TrendingUp,
		path: '/other-providers/patient-progress-other-providers'
	}
]

export default function OtherProvidersPage() {
	return (
		<div className={`${appTheme.layout.pageContainer} bg-gradient-to-br ${theme.gradient}`}>
			<div className={appTheme.layout.contentContainer}>
				<Link href="/" className={appTheme.layout.backButton}>
					<Button variant="outline">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Home
					</Button>
				</Link>

				<div className="text-center mb-8">
					<div className={`${appTheme.navigation.iconLarge} bg-green-100`}>
						<Stethoscope className="h-8 w-8 text-green-600" />
					</div>
					<h1 className={`${appTheme.navigation.titleLarge} mb-4`}>
						Other Healthcare Providers
					</h1>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						Access specialized medical forms designed for healthcare providers. Each form ensures proper documentation and care coordination.
					</p>
				</div>

				<div className={`${appTheme.hospitalInfo.base} bg-green-50 border-green-200`}>
					<div className={appTheme.hospitalInfo.content}>
						<div className={appTheme.hospitalInfo.leftSection}>
							<div className="text-green-800">
								Healthcare Provider Portal
							</div>
							<div className="text-gray-600 text-xs mt-1">
								Professional Medical Documentation Services
							</div>
						</div>
						<div className={appTheme.hospitalInfo.rightSection}>
							<div className="text-gray-700">
								{appTheme.branding.contact.phone}
							</div>
							<div className="text-gray-600">
								{appTheme.branding.contact.email}
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
									<div className={`${appTheme.navigation.iconContainer} bg-green-50`}>
										<IconComponent className="h-6 w-6 text-green-600" />
									</div>
									<CardTitle className={`${appTheme.navigation.title} text-green-800`}>
										{form.title}
									</CardTitle>
									<CardDescription className={appTheme.navigation.description}>
										{form.description}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Link href={form.path}>
										<Button className={`${appTheme.navigation.button} bg-green-600 hover:bg-green-700`}>
											Open Form
										</Button>
									</Link>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		</div>
	)
}
