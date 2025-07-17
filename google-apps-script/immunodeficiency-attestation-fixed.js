// Google Apps Script Code - Provider Visit Attestation (Immunodeficiency) - FIXED VERSION
// Deploy this at scripts.google.com

// Immunodeficiency folder ID from your Google Drive
const IMMUNODEFICIENCY_FOLDER_ID = "1LlSe35aryD2ZEl5rSPhQMgqQI_o6qkja"

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents)
    console.log("Received data:", JSON.stringify(data, null, 2))
    
    // Handle both nested formData and flat data structures
    let formData = data.formData || data
    
    // Remove non-form fields if they exist at the top level
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data
      formData = cleanFormData
    }

    console.log("Processed form data:", JSON.stringify(formData, null, 2))
    
    // Validate we have the required data
    if (!formData || typeof formData !== 'object') {
      throw new Error("Invalid form data structure")
    }
    
    // Extract and validate all required fields
    const fields = {
      providerName: formData.providerName || '',
      providerAddress: formData.providerAddress || '',
      npiNumber: formData.npiNumber || '',
      phoneNumber: formData.phoneNumber || '',
      faxNumber: formData.faxNumber || '',
      patientName: formData.patientName || '',
      patientAddress: formData.patientAddress || '',
      patientDOB: formData.patientDOB || '',
      dateOfConsult: formData.dateOfConsult || '',
      icdCodes: formData.icdCodes || '',
      dateOfService: formData.dateOfService || '',
      providerSignature: formData.providerSignature || '',
      providerNameSignature: formData.providerNameSignature || '',
      signatureDate: formData.signatureDate || ''
    }
    
    console.log("Extracted fields:", JSON.stringify(fields, null, 2))

    // Create a Google Doc with the form content
    const docName = `Provider_Visit_Attestation_Immunodeficiency_${fields.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`
    const doc = DocumentApp.create(docName)
    const body = doc.getBody()

    // Set document margins for better formatting
    body.setMarginTop(36)    // 0.5 inch
    body.setMarginBottom(36) // 0.5 inch
    body.setMarginLeft(54)   // 0.75 inch
    body.setMarginRight(54)  // 0.75 inch

    // HEADER SECTION - Hospital Branding
    const headerTable = body.appendTable()
    const headerRow = headerTable.appendTableRow()
    const logoCell = headerRow.appendTableCell()
    const titleCell = headerRow.appendTableCell()
    
    // Logo cell - left side
    logoCell.appendParagraph("🏥 Hospital in Your Home")
      .setFontSize(14)
      .setBold(true)
      .setForegroundColor("#1e293b")
    logoCell.appendParagraph("Comprehensive Healthcare Solutions")
      .setFontSize(10)
      .setForegroundColor("#64748b")
    
    // Title cell - right aligned
    const titlePara = titleCell.appendParagraph("Provider Visit Attestation")
    titlePara.setHeading(DocumentApp.ParagraphHeading.TITLE)
    titlePara.setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
    titlePara.setFontSize(18)
    titlePara.setBold(true)
    titlePara.setForegroundColor("#1e293b")
    
    const subtitlePara = titleCell.appendParagraph("Immunodeficiency Genetic Testing")
    subtitlePara.setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
    subtitlePara.setFontSize(12)
    subtitlePara.setForegroundColor("#64748b")
    
    // Contact info - right aligned
    titleCell.appendParagraph("📞 1-844-MY-HIYH")
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(10)
      .setForegroundColor("#64748b")
    titleCell.appendParagraph("✉️ info@hiyh.us")
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(10)
      .setForegroundColor("#64748b")

    // Style the header table
    headerTable.setBorderWidth(0)
    
    body.appendParagraph("") // Space after header

    // REFERRING PROVIDER INFORMATION SECTION
    body.appendParagraph("REFERRING PROVIDER INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    const providerInfoTable = body.appendTable()
    
    // Provider Name and NPI
    const providerRow1 = providerInfoTable.appendTableRow()
    const providerNameCell = providerRow1.appendTableCell()
    providerNameCell.appendParagraph("Name: " + (fields.providerName || "___________________"))
      .setFontSize(11)
    
    const npiCell = providerRow1.appendTableCell()
    npiCell.appendParagraph("NPI#: " + (fields.npiNumber || "___________________"))
      .setFontSize(11)
    
    // Provider Address (spans both columns)
    const providerRow2 = providerInfoTable.appendTableRow()
    const addressCell = providerRow2.appendTableCell()
    addressCell.appendParagraph("Address: " + (fields.providerAddress || "___________________"))
      .setFontSize(11)
    
    // Merge the second cell for address
    const addressCell2 = providerRow2.appendTableCell()
    addressCell2.appendParagraph("")
      .setFontSize(11)
    
    // Phone and Fax
    const providerRow3 = providerInfoTable.appendTableRow()
    const phoneCell = providerRow3.appendTableCell()
    phoneCell.appendParagraph("Phone #: " + (fields.phoneNumber || "___________________"))
      .setFontSize(11)
    
    const faxCell = providerRow3.appendTableCell()
    faxCell.appendParagraph("Fax #: " + (fields.faxNumber || "___________________"))
      .setFontSize(11)
    
    // Style provider info table
    providerInfoTable.setBorderWidth(1)
    providerInfoTable.setBorderColor("#e2e8f0")

    body.appendParagraph("") // Add spacing

    // PATIENT INFORMATION SECTION
    body.appendParagraph("PATIENT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    const patientInfoTable = body.appendTable()
    
    // Patient Name and DOB
    const patientRow1 = patientInfoTable.appendTableRow()
    const patientNameCell = patientRow1.appendTableCell()
    patientNameCell.appendParagraph("Patient Name: " + (fields.patientName || "___________________"))
      .setFontSize(11)
    
    const dobCell = patientRow1.appendTableCell()
    dobCell.appendParagraph("Patient DOB: " + (fields.patientDOB || "___________________"))
      .setFontSize(11)
    
    // Patient Address (spans both columns)
    const patientRow2 = patientInfoTable.appendTableRow()
    const patientAddressCell = patientRow2.appendTableCell()
    patientAddressCell.appendParagraph("Patient Address: " + (fields.patientAddress || "___________________"))
      .setFontSize(11)
    
    const patientAddressCell2 = patientRow2.appendTableCell()
    patientAddressCell2.appendParagraph("")
      .setFontSize(11)
    
    // Style patient info table
    patientInfoTable.setBorderWidth(1)
    patientInfoTable.setBorderColor("#e2e8f0")

    body.appendParagraph("") // Add spacing

    // TEST INFORMATION SECTION
    body.appendParagraph("TEST INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    const testInfoTable = body.appendTable()
    
    // Date of Consult and Date of Service
    const testRow1 = testInfoTable.appendTableRow()
    const consultDateCell = testRow1.appendTableCell()
    consultDateCell.appendParagraph("Date of Consult: " + (fields.dateOfConsult || "___________________"))
      .setFontSize(11)
    
    const serviceDateCell = testRow1.appendTableCell()
    serviceDateCell.appendParagraph("Date of Service: " + (fields.dateOfService || "___________________"))
      .setFontSize(11)
    
    // ICD-10 Codes (spans both columns)
    const testRow2 = testInfoTable.appendTableRow()
    const icdCodesCell = testRow2.appendTableCell()
    icdCodesCell.appendParagraph("ICD-10 Codes: " + (fields.icdCodes || "___________________"))
      .setFontSize(11)
    
    const icdCodesCell2 = testRow2.appendTableCell()
    icdCodesCell2.appendParagraph("")
      .setFontSize(11)
    
    // Style test info table
    testInfoTable.setBorderWidth(1)
    testInfoTable.setBorderColor("#e2e8f0")

    body.appendParagraph("") // Add spacing

    // ATTESTATION SECTION
    body.appendParagraph("ATTESTATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    // Build the attestation statement with actual data
    const patientNameText = fields.patientName || "[PATIENT NAME]"
    const consultDateText = fields.dateOfConsult ? new Date(fields.dateOfConsult).toLocaleDateString() : "[DATE OF CONSULT]"
    const icdCodesText = fields.icdCodes || "[ICD 10-CODES]"
    
    const attestationText = `I am the treating physician for ${patientNameText}. I have ordered a Comprehensive Immunodeficiency genetic test on ${consultDateText}. The original requisition form signed by myself and the patient is attached for review.

The test was ordered based on the following diagnosis as identified on the requisition (${icdCodesText})

The specimen was provided via a saliva swab test as of the actual date of service by the patient and sent directly to the lab.

Test results will be processed by the lab and returned to CLINIC/OFFICE. The results will be added to the patient's electronic medical record and will be included as part of the patient's ongoing treatment plan.

I hereby attest that the medical record entry for ${consultDateText} accurately reflects my signature and the notations that I made in my capacity when I treated and diagnosed the above-listed patient.

I do hereby attest that this information is true, accurate and complete to the best of my knowledge.`

    const attestationParagraph = body.appendParagraph(attestationText)
    attestationParagraph.setForegroundColor("#374151")
    attestationParagraph.setLineSpacing(1.5)
    attestationParagraph.setFontSize(11)

    body.appendParagraph("") // Add spacing

    // SIGNATURE SECTION
    body.appendParagraph("Sincerely,")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    const signatureTable = body.appendTable()
    
    // Provider Signature (spans both columns)
    const signatureRow1 = signatureTable.appendTableRow()
    const providerSignatureCell = signatureRow1.appendTableCell()
    providerSignatureCell.appendParagraph("Provider Signature: " + (fields.providerSignature || "___________________"))
      .setFontSize(11)
    
    const providerSignatureCell2 = signatureRow1.appendTableCell()
    providerSignatureCell2.appendParagraph("")
      .setFontSize(11)
    
    // Provider Name (spans both columns)
    const signatureRow2 = signatureTable.appendTableRow()
    const providerNameSignatureCell = signatureRow2.appendTableCell()
    providerNameSignatureCell.appendParagraph("Provider Name: " + (fields.providerNameSignature || "___________________"))
      .setFontSize(11)
    
    const providerNameSignatureCell2 = signatureRow2.appendTableCell()
    providerNameSignatureCell2.appendParagraph("")
      .setFontSize(11)
    
    // Date (spans both columns)
    const signatureRow3 = signatureTable.appendTableRow()
    const dateCell = signatureRow3.appendTableCell()
    dateCell.appendParagraph("Date: " + (fields.signatureDate || "___________________"))
      .setFontSize(11)
    
    const dateCell2 = signatureRow3.appendTableCell()
    dateCell2.appendParagraph("")
      .setFontSize(11)
    
    // Style signature table
    signatureTable.setBorderWidth(1)
    signatureTable.setBorderColor("#e2e8f0")

    body.appendParagraph("") // Add spacing

    // FOOTER SECTION
    body.appendParagraph("—————————————————————————————————————————————————————")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(10)
      .setForegroundColor("#6b7280")
      .setSpacingBefore(24)

    body.appendParagraph(`Form submitted on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(10)
      .setForegroundColor("#6b7280")

    body.appendParagraph(`Form ID: PVAI-${Date.now()}`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(9)
      .setForegroundColor("#9ca3af")

    body.appendParagraph(`© ${new Date().getFullYear()} Hospital in Your Home. All rights reserved.`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(8)
      .setForegroundColor("#9ca3af")

    // Save and close the document - CRITICAL for PDF generation
    doc.saveAndClose()

    // Convert to PDF using the same method as working Letter script
    const docFile = DriveApp.getFileById(doc.getId())
    const pdfBlob = docFile.getAs('application/pdf')

    // Get the target folder
    const folder = DriveApp.getFolderById(IMMUNODEFICIENCY_FOLDER_ID)

    // Create filename for PDF (matching working script pattern)
    const date = new Date().toISOString().split("T")[0]
    const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-")
    const patientName = (fields.patientName || "Unknown").replace(/[^a-zA-Z0-9]/g, "_")
    const pdfName = `Provider_Visit_Attestation_Immunodeficiency_${patientName}_${date}_${time}.pdf`

    // Save PDF to Google Drive
    const pdfFile = folder.createFile(pdfBlob.setName(pdfName))

    // Move the Google Doc to the folder as well
    docFile.moveTo(folder)

    // Generate shareable link for the PDF
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
    const driveUrl = pdfFile.getUrl()

    console.log("Provider Visit Attestation (Immunodeficiency) processed successfully")
    console.log("Document ID:", doc.getId())
    console.log("PDF File ID:", pdfFile.getId())
    console.log("Drive URL:", driveUrl)

    // Return success response (matching working script format)
    const response = {
      success: true,
      fileId: pdfFile.getId(),
      fileName: pdfName,
      driveUrl: driveUrl,
      docId: doc.getId(),
      message: "Provider Visit Attestation (Immunodeficiency) submitted and saved to Google Drive successfully"
    }

    const output = ContentService.createTextOutput(JSON.stringify(response))
    output.setMimeType(ContentService.MimeType.JSON)
    return output

  } catch (error) {
    console.error("Error processing Provider Visit Attestation (Immunodeficiency):", error)
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      message: "Failed to process Provider Visit Attestation (Immunodeficiency)",
      stack: error.stack
    }

    const errorOutput = ContentService.createTextOutput(JSON.stringify(errorResponse))
    errorOutput.setMimeType(ContentService.MimeType.JSON)
    return errorOutput
  }
}

// Handle GET requests for testing
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    message: "Immunodeficiency Attestation Google Apps Script is running",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON)
}

// Handle CORS preflight requests
function doOptions() {
  return ContentService.createTextOutput("")
}

// Test function to verify the script works
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
  
  console.log("Testing Provider Visit Attestation script...")
  const result = doPost(testData)
  console.log("Test result:", result.getContent())
  
  return result
}
