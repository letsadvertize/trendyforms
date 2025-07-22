import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formType, specialty, timestamp, formData } = body

    // Debug: Log the received data
    console.log("Received form submission:")
    console.log("Form Type:", formType)
    console.log("Specialty:", specialty)
    console.log("Form Data:", JSON.stringify(formData, null, 2))

    // Get the form-specific Google Apps Script URL from environment variables
    let googleAppsScriptUrl = null
    
    // Progress Forms - Handle both explicit and pattern-based matching
    if (formType === "patient-progress-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_PROGRESS
      console.log("Matched immunodeficiency progress form:", googleAppsScriptUrl)
    } else if (formType === "patient-progress-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_PROGRESS
      console.log("Matched neurodegenerative progress form:", googleAppsScriptUrl)
    }
    // Attestation Forms
    else if (formType === "provider-visit-attestation-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_ATTESTATION
      console.log("Matched immunodeficiency attestation form:", googleAppsScriptUrl)
    } else if (formType === "provider-visit-attestation-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_ATTESTATION
      console.log("Matched neurodegenerative attestation form:", googleAppsScriptUrl)
    }
    // Letter Forms
    else if (formType === "letter-medical-necessity-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_LETTER
    } else if (formType === "letter-medical-necessity-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_LETTER
    }
    // Add this block for generic formType + specialty
    else if (formType === "letter-medical-necessity" && specialty === "immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_LETTER
    } else if (formType === "letter-medical-necessity" && specialty === "neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_LETTER
    }
    // Medication Reconciliation Forms
    else if (formType === "medication-reconciliation-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_MEDICATION_RECONCILIATION
    } else if (formType === "medication-reconciliation-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_MEDICATION_RECONCILIATION
    }
    // Legacy pattern matching for backward compatibility
    else if ((formType === "progress" || formType === "progress-note") && specialty === "immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_PROGRESS
    } else if ((formType === "progress" || formType === "progress-note") && specialty === "neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_PROGRESS
    }
    
    console.log("Selected Google Apps Script URL:", googleAppsScriptUrl)
    
    if (!googleAppsScriptUrl) {
      console.error("No Google Apps Script URL found for:", formType, specialty)
      return NextResponse.json({
        success: false,
        error: `No Google Apps Script configured for ${formType} (${specialty})`,
        details: "Please check your environment variables and ensure the correct script URL is set"
      }, { status: 400 })
    }

    console.log("Calling Google Apps Script:", googleAppsScriptUrl)

    // Call Google Apps Script
    const response = await fetch(googleAppsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType,
        specialty,
        formData,
        timestamp,
      }),
    })

    console.log("Google Apps Script response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Google Apps Script error:", errorText)
      throw new Error(`Google Apps Script HTTP error ${response.status}: ${errorText.substring(0, 200)}`)
    }
    
    const responseText = await response.text()
    console.log("Google Apps Script response:", responseText.substring(0, 200))
    
    let result
    try {
      result = JSON.parse(responseText)
    } catch (parseError) {
      console.error("Failed to parse Google Apps Script response:", parseError)
      // Check if it's an HTML error page
      if (responseText.includes('<!DOCTYPE') || responseText.includes('<html>')) {
        throw new Error("Google Apps Script returned an HTML error page instead of JSON. Check the script URL and deployment.")
      } else {
        throw new Error(`Google Apps Script returned invalid JSON: ${responseText.substring(0, 200)}`)
      }
    }

    if (result.success) {
      console.log("Form submission successful:", result.fileName)
      return NextResponse.json({
        success: true,
        fileId: result.fileId,
        fileName: result.fileName,
        driveUrl: result.driveUrl,
        message: result.message || "Form submitted and saved to Google Drive successfully",
      })
    } else {
      console.error("Google Apps Script returned error:", result.error)
      throw new Error(result.error || "Google Apps Script returned an error")
    }
  } catch (error) {
    console.error("Form submission error:", error)
    // Return a user-friendly error
    return NextResponse.json(
      {
        success: false,
        error: "Form submission failed. Please try again or contact support.",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
