import { NextRequest, NextResponse } from "next/server"

// Helper to add CORS headers to all responses
function withCORS(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type")
  return response
}

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
  console.log("DEBUG: .env.NEXT_PUBLIC_HEREDITARY_THYROID_MEDICATION_RECONCILIATION_URL:", process.env.NEXT_PUBLIC_HEREDITARY_THYROID_MEDICATION_RECONCILIATION_URL);
    
    // Progress Forms - Handle both explicit and pattern-based matching
    if (formType === "patient-progress-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_PROGRESS
      console.log("Matched immunodeficiency progress form:", googleAppsScriptUrl)
    } else if (formType === "patient-progress-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_PROGRESS
      console.log("Matched neurodegenerative progress form:", googleAppsScriptUrl)
    } else if (formType === "patient-progress-other-providers") {
      // Debug: Log the env variable value
      console.log("GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_PROGRESS:", process.env.GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_PROGRESS)
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_PROGRESS
      if (!googleAppsScriptUrl) {
        console.error("Missing GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_PROGRESS environment variable.")
        throw new Error("Missing GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_PROGRESS environment variable.")
      }
      console.log("Matched other providers progress form:", googleAppsScriptUrl)
    }
    // Attestation Forms
    else if (formType === "provider-visit-attestation-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_ATTESTATION
      console.log("Matched immunodeficiency attestation form:", googleAppsScriptUrl)
    } else if (formType === "provider-visit-attestation-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_ATTESTATION
      console.log("Matched neurodegenerative attestation form:", googleAppsScriptUrl)
    } else if (formType === "provider-visit-attestation-hereditary-thyroid") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_HEREDITARY_THYROID_PROVIDER_VISIT_ATTESTATION_URL
      console.log("Matched hereditary thyroid provider visit attestation form:", googleAppsScriptUrl)
    } else if (formType === "provider-visit-attestation-diabetes-mody-predict") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_DIABETES_MODY_PREDICT_PROVIDER_VISIT_ATTESTATION_URL;
      console.log("Matched diabetes mody predict provider visit attestation form:", googleAppsScriptUrl);
    } else if (formType === "provider-visit-attestation-cardiopulmonary-testing") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_CARDIOPULMONARY_TESTING_PROVIDER_VISIT_ATTESTATION_URL;
      console.log("Matched cardiopulmonary testing provider visit attestation form:", googleAppsScriptUrl);
    }
    // Provider Visit Attestation - Other Providers
    else if (formType === "provider-visit-attestation-other-providers") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_ATTESTATION
    }
    // Letter Forms
    else if (formType === "letter-medical-necessity-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_LETTER
    } else if (formType === "letter-medical-necessity-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_LETTER
    } else if (formType === "letter-medical-necessity-other-providers") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_LETTER
    } else if (formType === "letter-medical-necessity-hereditary-thyroid") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_HEREDITARY_THYROID_LETTER_URL
    } else if (formType === "letter-medical-necessity-diabetes-mody-predict") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_DIABETES_MODY_PREDICT_LETTER_URL;
    } else if (formType === "letter-medical-necessity-cardiopulmonary-testing") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_CARDIOPULMONARY_TESTING_LETTER_URL;
    }
    // Add this block for generic formType + specialty
    else if (formType === "letter-medical-necessity" && specialty === "immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_LETTER
    } else if (formType === "letter-medical-necessity" && specialty === "neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_LETTER
    } else if (formType === "letter-medical-necessity" && specialty === "hereditary-thyroid") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_HEREDITARY_THYROID_LETTER_URL
    }
    // Medication Reconciliation Forms
    else if (formType === "medication-reconciliation-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_MEDICATION_RECONCILIATION
    } else if (formType === "medication-reconciliation-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_MEDICATION_RECONCILIATION
    } else if (formType === "medication-reconciliation-other-providers") {
      // Requires GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_MEDICATION_RECONCILIATION in .env.local
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_MEDICATION_RECONCILIATION
    } else if (formType === "medication-reconciliation-hereditary-thyroid") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_HEREDITARY_THYROID_MEDICATION_RECONCILIATION_URL;
    } else if (formType === "medication-reconciliation-diabetes-mody-predict") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_DIABETES_MODY_PREDICT_MEDICATION_RECONCILIATION_URL;
    } else if (formType === "medication-reconciliation-cardiopulmonary-testing") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_CARDIOPULMONARY_TESTING_MEDICATION_RECONCILIATION_URL;
    } else if (formType === "progress-note-hereditary-thyroid") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_HEREDITARY_THYROID_PROGRESS_NOTE_URL;
    } else if (formType === "progress-note-diabetes-mody-predict") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_DIABETES_MODY_PREDICT_PROGRESS_NOTE_URL;
    } else if (formType === "progress-note-cardiopulmonary-testing") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_CARDIOPULMONARY_TESTING_PROGRESS_NOTE_URL;
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
      return withCORS(NextResponse.json({
        success: false,
        error: `No Google Apps Script configured for ${formType} (${specialty})`,
        details: "Please check your environment variables and ensure the correct script URL is set",
        env: process.env
      }, { status: 400 }))
    }

    console.log("Calling Google Apps Script:", googleAppsScriptUrl)

    // Call Google Apps Script
    try {
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
        console.error("Google Apps Script error status:", response.status)
        console.error("Google Apps Script error body:", errorText)
        throw new Error(`Google Apps Script HTTP error ${response.status}: ${errorText}`)
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
        return withCORS(NextResponse.json({
          success: true,
          fileId: result.fileId,
          fileName: result.fileName,
          driveUrl: result.driveUrl,
          message: result.message || "Form submitted and saved to Google Drive successfully",
        }))
      } else {
        console.error("Google Apps Script returned error:", result.error)
        console.error("Full Apps Script response:", result)
        throw new Error(result.error || result.message || "Google Apps Script returned an error")
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
      return withCORS(NextResponse.json({
        success: false,
        error: err instanceof Error ? err.message : String(err),
        details: err,
        googleAppsScriptUrl,
      }, { status: 500 }));
    }
  } catch (error) {
    console.error("Form submission error:", error)
    // Return a user-friendly error
    return withCORS(NextResponse.json(
      {
        success: false,
        error: "Form submission failed. Please try again or contact support.",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    ))
  }
}

export async function OPTIONS() {
  // Always respond with CORS headers for preflight
  return withCORS(new NextResponse(null, { status: 200 }))
}
