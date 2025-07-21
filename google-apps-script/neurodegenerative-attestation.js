// Google Apps Script Code - Provider Visit Attestation (Neurodegenerative)
// Deploy this at scripts.google.com

// Neurodegenerative folder ID from your Google Drive
const NEURODEGENERATIVE_FOLDER_ID = "1rEAHZCTCL1dHSaT3Z68T2gxRJSBP0836"

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

    // Validate required fields
    const requiredFields = [
      "providerName", "providerAddress", "npiNumber", "phoneNumber", "faxNumber",
      "patientName", "patientAddress", "patientDOB",
      "dateOfConsult", "icdCodes", "dateOfService",
      "providerSignature", "providerNameSignature", "signatureDate"
    ]
    const missingFields = requiredFields.filter(f => !formData[f] || formData[f].toString().trim() === "")
    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields)
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: "Missing required fields: " + missingFields.join(", "),
          message: "Please fill out all required fields."
        }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    // Create a Google Doc with the form content
    const docName = `Provider_Visit_Attestation_Neurodegenerative_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`
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
    
    // Logo cell
    logoCell.appendParagraph("🏥 Hospital in Your Home")
      .setFontSize(14)
      .setBold(true)
      .setForegroundColor("#1e293b")
    logoCell.appendParagraph("Comprehensive Healthcare Solutions")
      .setFontSize(10)
      .setForegroundColor("#64748b")
    
    // Title cell - right aligned
    const titlePara = titleCell.appendParagraph("Provider Visit Attestation")
    titlePara.setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
    titlePara.setFontSize(18)
    titlePara.setBold(true)
    titlePara.setForegroundColor("#1e293b")
    
    const subtitlePara = titleCell.appendParagraph("Neurodegenerative Genetic Testing")
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
    headerRow.getCell(0).setWidth(200)
    headerRow.getCell(1).setWidth(300)
    
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
    
    // Provider Address - spans full width
    const providerRow2 = providerInfoTable.appendTableRow()
    providerRow2.appendTableCell("Address: " + (formData.providerAddress || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    providerRow2.appendTableCell("") // Empty cell
    
    // Phone and Fax
    const providerRow3 = providerInfoTable.appendTableRow()
    providerRow3.appendTableCell("Phone: " + (formData.phoneNumber || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    providerRow3.appendTableCell("Fax: " + (formData.faxNumber || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    
    // Style provider info table
    providerInfoTable.setBorderWidth(1)
    providerInfoTable.setBorderColor("#e2e8f0")

    body.appendParagraph("") // Space

    // PATIENT INFORMATION SECTION
    body.appendParagraph("PATIENT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    const patientInfoTable = body.appendTable()
    
    // Patient Name and DOB
    const patientRow1 = patientInfoTable.appendTableRow()
    patientRow1.appendTableCell("Name: " + (formData.patientName || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    patientRow1.appendTableCell("DOB: " + (formData.patientDOB || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    
    // Patient Address - spans full width
    const patientRow2 = patientInfoTable.appendTableRow()
    patientRow2.appendTableCell("Address: " + (formData.patientAddress || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    patientRow2.appendTableCell("") // Empty cell
    
    // Style patient info table
    patientInfoTable.setBorderWidth(1)
    patientInfoTable.setBorderColor("#e2e8f0")

    body.appendParagraph("") // Space

    // TEST INFORMATION SECTION
    body.appendParagraph("TEST INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    const testInfoTable = body.appendTable()
    
    // Date of Consult and ICD Codes
    const testRow1 = testInfoTable.appendTableRow()
    testRow1.appendTableCell("Date of Consult: " + (formData.dateOfConsult || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    testRow1.appendTableCell("ICD-10 Code(s): " + (formData.icdCodes || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    
    // Date of Service - spans full width
    const testRow2 = testInfoTable.appendTableRow()
    testRow2.appendTableCell("Date of Service: " + (formData.dateOfService || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6)
    testRow2.appendTableCell("") // Empty cell
    
    // Style test info table
    testInfoTable.setBorderWidth(1)
    testInfoTable.setBorderColor("#e2e8f0")

    body.appendParagraph("") // Space

    // ATTESTATION SECTION
    body.appendParagraph("ATTESTATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    const attestationText = [
      "I attest that I am the referring provider for the above-named patient. I have examined the patient",
      "and determined that genetic testing is medically necessary for the diagnosis, treatment, or",
      "management of the patient's condition. The test results will be used to guide clinical",
      "decision-making and patient care. I understand that this test is being performed by a",
      "laboratory certified under the Clinical Laboratory Improvement Amendments (CLIA) and that",
      "the results will be reported to me as the ordering provider.",
      "",
      "I confirm that:",
      "• The patient has been informed about the genetic testing",
      "• Appropriate informed consent has been obtained",
      "• The testing is medically necessary for the patient's care",
      "• I will use the results to guide clinical decision-making"
    ]

    attestationText.forEach(line => {
      const para = body.appendParagraph(line)
      para.setFontSize(11)
      para.setLineSpacing(1.2)
      para.setSpacingAfter(3)
    })

    body.appendParagraph("") // Space

    // SIGNATURE SECTION
    body.appendParagraph("PROVIDER SIGNATURE")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    const signatureTable = body.appendTable()
    
    // Signature and Date
    const sigRow1 = signatureTable.appendTableRow()
    sigRow1.appendTableCell("Provider Signature: " + (formData.providerSignature || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(12)
    sigRow1.appendTableCell("Date: " + (formData.signatureDate || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(12)
    
    // Printed name - spans full width
    const sigRow2 = signatureTable.appendTableRow()
    sigRow2.appendTableCell("Printed Name: " + (formData.providerNameSignature || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(12)
    sigRow2.appendTableCell("") // Empty cell
    
    // Style signature table
    signatureTable.setBorderWidth(1)
    signatureTable.setBorderColor("#e2e8f0")

    body.appendParagraph("") // Space

    // FOOTER SECTION
    body.appendParagraph("") // Extra space before footer
    body.appendParagraph("Thank you for choosing Hospital in Your Home for your genetic testing needs.")
      .setFontSize(10)
      .setForegroundColor("#64748b")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
    
    body.appendParagraph("For questions or support, please contact us at 1-844-MY-HIYH or info@hiyh.us")
      .setFontSize(10)
      .setForegroundColor("#64748b")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)

    // FORM SUBMISSION INFO
    body.appendHorizontalRule()
    const footerParagraph = body.appendParagraph(`Form submitted on: ${new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })} EST`)
    footerParagraph.setAlignment(DocumentApp.HorizontalAlignment.CENTER)
    footerParagraph.setFontSize(10)
    footerParagraph.setForegroundColor("#6b7280")

    const formIdParagraph = body.appendParagraph(`Form ID: PVAN-${Date.now()}`)
    formIdParagraph.setAlignment(DocumentApp.HorizontalAlignment.CENTER)
    formIdParagraph.setFontSize(9)
    formIdParagraph.setForegroundColor("#9ca3af")

    // Save and close the document
    doc.saveAndClose()

    // Create PDF version
    const pdfBlob = doc.getAs('application/pdf')
    const pdfName = docName.replace(/\s+/g, '_') + '.pdf'
    
    let pdfFile
    if (NEURODEGENERATIVE_FOLDER_ID) {
      try {
        const targetFolder = DriveApp.getFolderById(NEURODEGENERATIVE_FOLDER_ID)
        pdfFile = targetFolder.createFile(pdfBlob.setName(pdfName))
        console.log("PDF created in Neurodegenerative folder successfully")
      } catch (error) {
        console.error("Error creating PDF in folder:", error)
        // Fallback: create in root
        pdfFile = DriveApp.createFile(pdfBlob.setName(pdfName))
      }
    } else {
      pdfFile = DriveApp.createFile(pdfBlob.setName(pdfName))
    }

    // Set sharing permissions
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
    const driveUrl = pdfFile.getUrl()

    console.log("Provider Visit Attestation (Neurodegenerative) processed successfully")
    console.log("Document ID:", doc.getId())
    console.log("PDF File ID:", pdfFile.getId())
    console.log("Drive URL:", driveUrl)

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "Provider Visit Attestation (Neurodegenerative) submitted successfully",
        fileName: pdfName,
        fileId: pdfFile.getId(),
        driveUrl: driveUrl,
        docId: doc.getId()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      
  } catch (error) {
    console.error("Error in doPost:", error)
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: "Failed to submit Provider Visit Attestation (Neurodegenerative)"
      }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Test function to validate the script
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        formType: "provider-visit-attestation-neurodegenerative",
        specialty: "neurodegenerative",
        formData: {
          // Referring Provider Information
          providerName: "Dr. Jane Smith",
          providerAddress: "123 Medical Center Dr, Healthcare City, HC 12345",
          npiNumber: "1234567890",
          phoneNumber: "(555) 123-4567",
          faxNumber: "(555) 123-4568",
          
          // Patient Information
          patientName: "John Doe",
          patientAddress: "456 Patient St, Patient City, PC 67890",
          patientDOB: "1980-01-15",
          
          // Test Information
          dateOfConsult: "2025-07-17",
          icdCodes: "G30.9, G20",
          dateOfService: "2025-07-17",
          
          // Attestation and Signature
          providerSignature: "Dr. Jane Smith",
          providerNameSignature: "Dr. Jane Smith",
          signatureDate: "2025-07-17"
        },
        timestamp: new Date().toISOString()
      })
    }
  }
  
  console.log("Testing script with sample data...")
  const result = doPost(testData)
  console.log("Test result:", result.getContent())
  return result
}
