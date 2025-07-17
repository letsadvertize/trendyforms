// Google Apps Script Code - Provider Visit Attestation (Immunodeficiency) - DEBUG VERSION
// Deploy this at scripts.google.com

// Immunodeficiency folder ID from your Google Drive
const IMMUNODEFICIENCY_FOLDER_ID = "1LlSe35aryD2ZEl5rSPhQMgqQI_o6qkja"

function doPost(e) {
  try {
    console.log("Raw event data:", e)
    console.log("Raw postData:", e.postData)
    console.log("Raw contents:", e.postData.contents)
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents)
    console.log("Parsed data:", JSON.stringify(data, null, 2))
    
    // Handle both nested formData and flat data structures
    let formData = data.formData || data
    
    // Remove non-form fields if they exist at the top level
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data
      formData = cleanFormData
    }

    console.log("Final form data:", JSON.stringify(formData, null, 2))

    // Create a simple Google Doc with just the raw data
    const docName = `DEBUG_Provider_Visit_Attestation_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`
    const doc = DocumentApp.create(docName)
    const body = doc.getBody()

    // Add title
    body.appendParagraph("DEBUG: Provider Visit Attestation Form Data")
      .setHeading(DocumentApp.ParagraphHeading.TITLE)

    // Add raw data dump
    body.appendParagraph("Raw Form Data:")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
    
    body.appendParagraph(JSON.stringify(formData, null, 2))

    // Add individual field values
    body.appendParagraph("Individual Field Values:")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
    
    for (const [key, value] of Object.entries(formData)) {
      body.appendParagraph(`${key}: ${value || 'EMPTY'}`)
    }

    // Save and close the document
    doc.saveAndClose()

    // Create PDF version
    const pdfBlob = doc.getAs('application/pdf')
    const pdfName = docName.replace(/\s+/g, '_') + '.pdf'
    
    let pdfFile
    if (IMMUNODEFICIENCY_FOLDER_ID) {
      try {
        const targetFolder = DriveApp.getFolderById(IMMUNODEFICIENCY_FOLDER_ID)
        pdfFile = targetFolder.createFile(pdfBlob.setName(pdfName))
      } catch (error) {
        console.error("Error creating PDF in folder:", error)
        pdfFile = DriveApp.createFile(pdfBlob.setName(pdfName))
      }
    } else {
      pdfFile = DriveApp.createFile(pdfBlob.setName(pdfName))
    }

    // Generate shareable link for the PDF
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
    const driveUrl = pdfFile.getUrl()

    console.log("DEBUG version processed successfully")
    console.log("PDF File ID:", pdfFile.getId())
    console.log("Drive URL:", driveUrl)

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        fileId: pdfFile.getId(),
        fileName: pdfName,
        driveUrl: driveUrl,
        message: "DEBUG Provider Visit Attestation processed successfully"
      }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (error) {
    console.error("Error in DEBUG version:", error)
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: "Failed to process DEBUG version"
      }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function doOptions() {
  return ContentService.createTextOutput("")
}

// Test function
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        formType: "provider-visit-attestation-immunodeficiency",
        specialty: "immunodeficiency",
        formData: {
          providerName: "Dr. John Smith",
          providerAddress: "123 Medical Center Dr, Suite 100, Healthcare City, HC 12345",
          npiNumber: "1234567890",
          phoneNumber: "(555) 123-4567",
          faxNumber: "(555) 123-4568",
          patientName: "Jane Doe",
          patientAddress: "456 Patient St, Patient City, PC 67890",
          patientDOB: "1990-01-15",
          dateOfConsult: "2025-07-10",
          icdCodes: "D80.1, D84.1",
          dateOfService: "2025-07-17",
          providerSignature: "Dr. John Smith",
          providerNameSignature: "Dr. John Smith, MD",
          signatureDate: "2025-07-17"
        },
        timestamp: new Date().toISOString()
      })
    }
  }
  
  console.log("Testing DEBUG Provider Visit Attestation script...")
  const result = doPost(testData)
  console.log("Test result:", result.getContent())
  
  return result
}
