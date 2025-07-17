import Image from "next/image"
import { appTheme } from "@/lib/theme"

export function FormFooter() {
  return (
    <footer className="bg-gray-50 border-t-2 border-gray-200 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/hosp-in-home.png"
              alt="Hospital in Your Home Logo"
              width={150}
              height={45}
              className="h-8 w-auto"
            />
            <div className="text-sm text-gray-600">
              <p className="font-semibold">Hospital in Your Home</p>
              <p>{appTheme.branding.tagline}</p>
            </div>
          </div>

          <div className="text-center md:text-right text-sm text-gray-600">
            <div className="space-y-1">
              <p className="font-medium">Contact Information</p>
              <p>Phone: 1-844-MY-HIYH</p>
              <p>Email: info@hiyh.us</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Hospital in Your Home. All rights reserved.</p>
          <p className="mt-1">Professional medical forms portal for comprehensive healthcare documentation</p>
        </div>
      </div>
    </footer>
  )
}
