import Image from "next/image"
import { appTheme } from "@/lib/theme"

export function FormHeader() {
  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/hosp-in-home.png"
              alt="Hospital in Your Home Logo"
              width={200}
              height={60}
              className="h-12 w-auto brightness-0 invert"
            />
          </div>

          <div className="text-center md:text-right">
            <h1 className="text-xl font-bold text-white mb-1">{appTheme.branding.name}</h1>
            <p className="text-sm text-slate-100 mb-2">{appTheme.branding.tagline}</p>
            <div className="text-sm text-slate-200 space-y-1">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-1 md:space-y-0">
                <span className="font-medium">{appTheme.branding.contact.phone}</span>
                <span className="font-medium">{appTheme.branding.contact.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
