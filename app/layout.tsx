import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Trendy Communications Medical Forms',
  description:
    'Streamline your medical practice with our comprehensive collection of digital medical forms. Access immunodeficiency forms, patient progress notes, medication reconciliation, and provider attestations - all designed for modern healthcare professionals.',
  keywords:
    'medical forms, healthcare documentation, immunodeficiency forms, patient progress notes, medication reconciliation, provider attestation, medical necessity letters, trendy communications',
  authors: [{ name: 'Trendy Communications' }],
  creator: 'Trendy Communications',
  publisher: 'Trendy Communications',
  robots: 'index, follow',
  openGraph: {
    title: 'Trendy Communications Medical Forms',
    description:
      'Professional medical forms and documentation tools for healthcare providers',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trendy Communications Medical Forms',
    description:
      'Professional medical forms and documentation tools for healthcare providers',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
