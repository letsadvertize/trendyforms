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
    
    // =============================================================================
    // PROGRESS NOTE FORMS
    // =============================================================================
    if (formType === "patient-progress-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_PROGRESS
      console.log("Matched immunodeficiency progress form:", googleAppsScriptUrl)
    } else if (formType === "patient-progress-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_PROGRESS
      console.log("Matched neurodegenerative progress form:", googleAppsScriptUrl)
    } else if (formType === "patient-progress-other-providers") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_PROGRESS
      console.log("Matched other providers progress form:", googleAppsScriptUrl)
    } else if (formType === "progress-note-hereditary-thyroid") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_HEREDITARY_THYROID_PROGRESS_NOTE_URL
      console.log("Matched hereditary thyroid progress form:", googleAppsScriptUrl)
    } else if (formType === "progress-note-diabetes-mody-predict") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_DIABETES_MODY_PREDICT_PROGRESS_NOTE_URL
      console.log("Matched diabetes mody predict progress form:", googleAppsScriptUrl)
    } else if (formType === "progress-note-cardiopulmonary-testing") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_CARDIOPULMONARY_TESTING_PROGRESS_NOTE_URL
      console.log("Matched cardiopulmonary testing progress form:", googleAppsScriptUrl)
    }
    
    // =============================================================================
    // PROVIDER VISIT ATTESTATION FORMS
    // =============================================================================
    else if (formType === "provider-visit-attestation-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_ATTESTATION
      console.log("Matched immunodeficiency attestation form:", googleAppsScriptUrl)
    } else if (formType === "provider-visit-attestation-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_ATTESTATION
      console.log("Matched neurodegenerative attestation form:", googleAppsScriptUrl)
    } else if (formType === "provider-visit-attestation-other-providers") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_ATTESTATION
      console.log("Matched other providers attestation form:", googleAppsScriptUrl)
    } else if (formType === "provider-visit-attestation-hereditary-thyroid") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_HEREDITARY_THYROID_PROVIDER_VISIT_ATTESTATION_URL
      console.log("Matched hereditary thyroid attestation form:", googleAppsScriptUrl)
    } else if (formType === "provider-visit-attestation-diabetes-mody-predict") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_DIABETES_MODY_PREDICT_PROVIDER_VISIT_ATTESTATION_URL
      console.log("Matched diabetes mody predict attestation form:", googleAppsScriptUrl)
    } else if (formType === "provider-visit-attestation-cardiopulmonary-testing") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_CARDIOPULMONARY_TESTING_PROVIDER_VISIT_ATTESTATION_URL
      console.log("Matched cardiopulmonary testing attestation form:", googleAppsScriptUrl)
    }
    
    // =============================================================================
    // LETTER OF MEDICAL NECESSITY FORMS
    // =============================================================================
    else if (formType === "letter-medical-necessity-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_LETTER
      console.log("Matched immunodeficiency letter form:", googleAppsScriptUrl)
    } else if (formType === "letter-medical-necessity-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_LETTER
      console.log("Matched neurodegenerative letter form:", googleAppsScriptUrl)
    } else if (formType === "letter-medical-necessity-other-providers") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_LETTER
      console.log("Matched other providers letter form:", googleAppsScriptUrl)
    } else if (formType === "letter-medical-necessity-hereditary-thyroid") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_HEREDITARY_THYROID_LETTER_URL
      console.log("Matched hereditary thyroid letter form:", googleAppsScriptUrl)
    } else if (formType === "letter-medical-necessity-diabetes-mody-predict") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_DIABETES_MODY_PREDICT_LETTER_URL
      console.log("Matched diabetes mody predict letter form:", googleAppsScriptUrl)
    } else if (formType === "letter-medical-necessity-cardiopulmonary-testing") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_CARDIOPULMONARY_TESTING_LETTER_URL
      console.log("Matched cardiopulmonary testing letter form:", googleAppsScriptUrl)
    }
    
    // =============================================================================
    // MEDICATION RECONCILIATION FORMS
    // =============================================================================
    else if (formType === "medication-reconciliation-immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_MEDICATION_RECONCILIATION
      console.log("Matched immunodeficiency medication reconciliation form:", googleAppsScriptUrl)
    } else if (formType === "medication-reconciliation-neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_MEDICATION_RECONCILIATION
      console.log("Matched neurodegenerative medication reconciliation form:", googleAppsScriptUrl)
    } else if (formType === "medication-reconciliation-other-providers") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_MEDICATION_RECONCILIATION
      console.log("Matched other providers medication reconciliation form:", googleAppsScriptUrl)
    } else if (formType === "medication-reconciliation-hereditary-thyroid") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_HEREDITARY_THYROID_MEDICATION_RECONCILIATION_URL
      console.log("Matched hereditary thyroid medication reconciliation form:", googleAppsScriptUrl)
    } else if (formType === "medication-reconciliation-diabetes-mody-predict") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_DIABETES_MODY_PREDICT_MEDICATION_RECONCILIATION_URL
      console.log("Matched diabetes mody predict medication reconciliation form:", googleAppsScriptUrl)
    } else if (formType === "medication-reconciliation-cardiopulmonary-testing") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_CARDIOPULMONARY_TESTING_MEDICATION_RECONCILIATION_URL
      console.log("Matched cardiopulmonary testing medication reconciliation form:", googleAppsScriptUrl)
    }
    
    // =============================================================================
    // LEGACY PATTERN MATCHING (for backward compatibility)
    // =============================================================================
    // Generic formType + specialty combinations
    else if (formType === "letter-medical-necessity" && specialty === "immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_LETTER
    } else if (formType === "letter-medical-necessity" && specialty === "neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_LETTER
    } else if (formType === "letter-medical-necessity" && specialty === "hereditary-thyroid") {
      googleAppsScriptUrl = process.env.NEXT_PUBLIC_HEREDITARY_THYROID_LETTER_URL
    } else if ((formType === "progress" || formType === "progress-note") && specialty === "immunodeficiency") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_PROGRESS
    } else if ((formType === "progress" || formType === "progress-note") && specialty === "neurodegenerative") {
      googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_PROGRESS
    }
    
    console.log("Selected Google Apps Script URL:", googleAppsScriptUrl)
    
    if (!googleAppsScriptUrl) {
      console.error("No Google Apps Script URL found for:", formType, specialty)
      
      // Create helpful error message with missing environment variable name
      const missingEnvVar = getMissingEnvironmentVariable(formType, specialty)
      
      return withCORS(NextResponse.json({
        success: false,
        error: `No Google Apps Script configured for ${formType} (${specialty})`,
        details: `Missing environment variable: ${missingEnvVar}`,
        suggestion: "Please add the Google Apps Script URL to your .env.local file"
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

// Helper function to identify missing environment variables
function getMissingEnvironmentVariable(formType: string, specialty: string): string {
  // Progress Notes
  if (formType === "patient-progress-immunodeficiency" || (formType === "progress-note" && specialty === "immunodeficiency")) {
    return "GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_PROGRESS"
  }
  if (formType === "patient-progress-neurodegenerative" || (formType === "progress-note" && specialty === "neurodegenerative")) {
    return "GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_PROGRESS"
  }
  if (formType === "patient-progress-other-providers") {
    return "GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_PROGRESS"
  }
  if (formType === "progress-note-hereditary-thyroid") {
    return "NEXT_PUBLIC_HEREDITARY_THYROID_PROGRESS_NOTE_URL"
  }
  if (formType === "progress-note-diabetes-mody-predict") {
    return "NEXT_PUBLIC_DIABETES_MODY_PREDICT_PROGRESS_NOTE_URL"
  }
  if (formType === "progress-note-cardiopulmonary-testing") {
    return "NEXT_PUBLIC_CARDIOPULMONARY_TESTING_PROGRESS_NOTE_URL"
  }
  
  // Provider Visit Attestations
  if (formType === "provider-visit-attestation-immunodeficiency") {
    return "GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_ATTESTATION"
  }
  if (formType === "provider-visit-attestation-neurodegenerative") {
    return "GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_ATTESTATION"
  }
  if (formType === "provider-visit-attestation-other-providers") {
    return "GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_ATTESTATION"
  }
  if (formType === "provider-visit-attestation-hereditary-thyroid") {
    return "NEXT_PUBLIC_HEREDITARY_THYROID_PROVIDER_VISIT_ATTESTATION_URL"
  }
  if (formType === "provider-visit-attestation-diabetes-mody-predict") {
    return "NEXT_PUBLIC_DIABETES_MODY_PREDICT_PROVIDER_VISIT_ATTESTATION_URL"
  }
  if (formType === "provider-visit-attestation-cardiopulmonary-testing") {
    return "NEXT_PUBLIC_CARDIOPULMONARY_TESTING_PROVIDER_VISIT_ATTESTATION_URL"
  }
  
  // Letters of Medical Necessity
  if (formType === "letter-medical-necessity-immunodeficiency" || (formType === "letter-medical-necessity" && specialty === "immunodeficiency")) {
    return "GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_LETTER"
  }
  if (formType === "letter-medical-necessity-neurodegenerative" || (formType === "letter-medical-necessity" && specialty === "neurodegenerative")) {
    return "GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_LETTER"
  }
  if (formType === "letter-medical-necessity-other-providers") {
    return "GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_LETTER"
  }
  if (formType === "letter-medical-necessity-hereditary-thyroid") {
    return "NEXT_PUBLIC_HEREDITARY_THYROID_LETTER_URL"
  }
  if (formType === "letter-medical-necessity-diabetes-mody-predict") {
    return "NEXT_PUBLIC_DIABETES_MODY_PREDICT_LETTER_URL"
  }
  if (formType === "letter-medical-necessity-cardiopulmonary-testing") {
    return "NEXT_PUBLIC_CARDIOPULMONARY_TESTING_LETTER_URL"
  }
  
  // Medication Reconciliations
  if (formType === "medication-reconciliation-immunodeficiency") {
    return "GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_MEDICATION_RECONCILIATION"
  }
  if (formType === "medication-reconciliation-neurodegenerative") {
    return "GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_MEDICATION_RECONCILIATION"
  }
  if (formType === "medication-reconciliation-other-providers") {
    return "GOOGLE_APPS_SCRIPT_OTHER_PROVIDERS_MEDICATION_RECONCILIATION"
  }
  if (formType === "medication-reconciliation-hereditary-thyroid") {
    return "NEXT_PUBLIC_HEREDITARY_THYROID_MEDICATION_RECONCILIATION_URL"
  }
  if (formType === "medication-reconciliation-diabetes-mody-predict") {
    return "NEXT_PUBLIC_DIABETES_MODY_PREDICT_MEDICATION_RECONCILIATION_URL"
  }
  if (formType === "medication-reconciliation-cardiopulmonary-testing") {
    return "NEXT_PUBLIC_CARDIOPULMONARY_TESTING_MEDICATION_RECONCILIATION_URL"
  }
  
  return `UNKNOWN_ENV_VAR_FOR_${formType.toUpperCase()}_${specialty?.toUpperCase() || 'UNKNOWN'}`
}
