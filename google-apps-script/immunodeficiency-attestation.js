// Google Apps Script Code - Provider Visit Attestation (Immunodeficiency)
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
    
    // Debug: Check if we have any actual data
    if (!formData) {
      console.error("ERROR: No formData found!")
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "No form data received"
      })).setMimeType(ContentService.MimeType.JSON)
    }
    
    // Debug: Check specific fields
    console.log("Patient name:", formData.patientName)
    console.log("Provider name:", formData.providerName)
    console.log("Date of consult:", formData.dateOfConsult)

    // Create a Google Doc with the form content
    const docName = `Provider_Visit_Attestation_Immunodeficiency_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`
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
    providerRow1.appendTableCell("Name: " + (formData.providerName || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    providerRow1.appendTableCell("NPI#: " + (formData.npiNumber || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    
    // Provider Address (spans both columns)
    const providerRow2 = providerInfoTable.appendTableRow()
    const addressCell = providerRow2.appendTableCell("Address: " + (formData.providerAddress || "___________________"))
    addressCell.setFontSize(11)
    addressCell.setPaddingBottom(6)
    const addressCell2 = providerRow2.appendTableCell("")
    addressCell2.setFontSize(11)
    addressCell2.setPaddingBottom(6)
    
    // Phone and Fax
    const providerRow3 = providerInfoTable.appendTableRow()
    providerRow3.appendTableCell("Phone #: " + (formData.phoneNumber || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    providerRow3.appendTableCell("Fax #: " + (formData.faxNumber || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    
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
    patientRow1.appendTableCell("Patient Name: " + (formData.patientName || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    patientRow1.appendTableCell("Patient DOB: " + (formData.patientDOB || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    
    // Patient Address (spans both columns)
    const patientRow2 = patientInfoTable.appendTableRow()
    const patientAddressCell = patientRow2.appendTableCell("Patient Address: " + (formData.patientAddress || "___________________"))
    patientAddressCell.setFontSize(11)
    patientAddressCell.setPaddingBottom(6)
    const patientAddressCell2 = patientRow2.appendTableCell("")
    patientAddressCell2.setFontSize(11)
    patientAddressCell2.setPaddingBottom(6)
    
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
    testRow1.appendTableCell("Date of Consult: " + (formData.dateOfConsult || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    testRow1.appendTableCell("Date of Service: " + (formData.dateOfService || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    
    // ICD-10 Codes (spans both columns)
    const testRow2 = testInfoTable.appendTableRow()
    const icdCodesCell = testRow2.appendTableCell("ICD-10 Codes: " + (formData.icdCodes || "___________________"))
    icdCodesCell.setFontSize(11)
    icdCodesCell.setPaddingBottom(6)
    const icdCodesCell2 = testRow2.appendTableCell("")
    icdCodesCell2.setFontSize(11)
    icdCodesCell2.setPaddingBottom(6)
    
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
    const patientNameText = formData.patientName || "[PATIENT NAME]"
    const consultDateText = formData.dateOfConsult ? new Date(formData.dateOfConsult).toLocaleDateString() : "[DATE OF CONSULT]"
    const icdCodesText = formData.icdCodes || "[ICD 10-CODES]"
    
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
    const providerSignatureCell = signatureRow1.appendTableCell("Provider Signature: " + (formData.providerSignature || "___________________"))
    providerSignatureCell.setFontSize(11)
    providerSignatureCell.setPaddingBottom(12)
    const providerSignatureCell2 = signatureRow1.appendTableCell("")
    providerSignatureCell2.setFontSize(11)
    providerSignatureCell2.setPaddingBottom(12)
    
    // Provider Name (spans both columns)
    const signatureRow2 = signatureTable.appendTableRow()
    const providerNameCell = signatureRow2.appendTableCell("Provider Name: " + (formData.providerNameSignature || "___________________"))
    providerNameCell.setFontSize(11)
    providerNameCell.setPaddingBottom(12)
    const providerNameCell2 = signatureRow2.appendTableCell("")
    providerNameCell2.setFontSize(11)
    providerNameCell2.setPaddingBottom(12)
    
    // Date (spans both columns)
    const signatureRow3 = signatureTable.appendTableRow()
    const dateCell = signatureRow3.appendTableCell("Date: " + (formData.signatureDate || "___________________"))
    dateCell.setFontSize(11)
    dateCell.setPaddingBottom(12)
    const dateCell2 = signatureRow3.appendTableCell("")
    dateCell2.setFontSize(11)
    dateCell2.setPaddingBottom(12)
    
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

    // Move document to the Immunodeficiency folder
    const docFile = DriveApp.getFileById(doc.getId())
    if (IMMUNODEFICIENCY_FOLDER_ID) {
      try {
        const targetFolder = DriveApp.getFolderById(IMMUNODEFICIENCY_FOLDER_ID)
        docFile.moveTo(targetFolder)
        console.log("Document moved to Immunodeficiency folder successfully")
      } catch (error) {
        console.error("Error moving document to folder:", error)
        // Continue execution even if folder move fails
      }
    }

    // Create PDF version
    const pdfBlob = doc.getAs('application/pdf')
    const pdfName = docName.replace(/\s+/g, '_') + '.pdf'
    
    let pdfFile
    if (IMMUNODEFICIENCY_FOLDER_ID) {
      try {
        const targetFolder = DriveApp.getFolderById(IMMUNODEFICIENCY_FOLDER_ID)
        pdfFile = targetFolder.createFile(pdfBlob.setName(pdfName))
        console.log("PDF created in Immunodeficiency folder successfully")
      } catch (error) {
        console.error("Error creating PDF in folder:", error)
        // Fallback: create in root
        pdfFile = DriveApp.createFile(pdfBlob.setName(pdfName))
      }
    } else {
      pdfFile = DriveApp.createFile(pdfBlob.setName(pdfName))
    }

    // Generate shareable link for the PDF
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
    const driveUrl = pdfFile.getUrl()

    console.log("Provider Visit Attestation (Immunodeficiency) processed successfully")
    console.log("Document ID:", doc.getId())
    console.log("PDF File ID:", pdfFile.getId())
    console.log("Drive URL:", driveUrl)

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        fileId: pdfFile.getId(),
        fileName: pdfName,
        driveUrl: driveUrl,
        docId: doc.getId(),
        message: "Provider Visit Attestation (Immunodeficiency) submitted and saved to Google Drive successfully"
      }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (error) {
    console.error("Error processing Provider Visit Attestation (Immunodeficiency):", error)
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: "Failed to process Provider Visit Attestation (Immunodeficiency)"
      }))
      .setMimeType(ContentService.MimeType.JSON)
  }
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
