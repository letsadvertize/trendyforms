// Google Apps Script Code - Medication Reconciliation (Neurodegenerative)
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
    
    // Validate we have the required data
    if (!formData || typeof formData !== 'object') {
      throw new Error("Invalid form data structure")
    }
    
    // Extract and validate all required fields
    const fields = {
      patientName: formData.patientName || '',
      patientDOB: formData.patientDOB || '',
      patientAddress: formData.patientAddress || '',
      currentMedications: formData.currentMedications || [],
      pastMedicalHistory: formData.pastMedicalHistory || []
    }
    
    console.log("Extracted fields:", JSON.stringify(fields, null, 2))

    // Create a Google Doc with the form content
    const docName = `Medication_Reconciliation_Neurodegenerative_${fields.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`
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
    const titlePara = titleCell.appendParagraph("Medication Reconciliation")
    titlePara.setHeading(DocumentApp.ParagraphHeading.TITLE)
    titlePara.setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
    titlePara.setFontSize(18)
    titlePara.setBold(true)
    titlePara.setForegroundColor("#1e293b")
    
    const subtitlePara = titleCell.appendParagraph("Neurodegenerative Specialty")
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
    dobCell.appendParagraph("Date of Birth: " + (fields.patientDOB || "___________________"))
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

    // CURRENT MEDICATIONS SECTION
    body.appendParagraph("CURRENT MEDICATION LIST")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    const medicationsTable = body.appendTable()
    
    // Header row for medications
    const medHeaderRow = medicationsTable.appendTableRow()
    const medNameHeader = medHeaderRow.appendTableCell()
    medNameHeader.appendParagraph("Medication Name")
      .setFontSize(11)
      .setBold(true)
    
    const medDosageHeader = medHeaderRow.appendTableCell()
    medDosageHeader.appendParagraph("Dosage")
      .setFontSize(11)
      .setBold(true)
    
    const medFrequencyHeader = medHeaderRow.appendTableCell()
    medFrequencyHeader.appendParagraph("Frequency")
      .setFontSize(11)
      .setBold(true)
    
    // Add medication rows
    if (fields.currentMedications && fields.currentMedications.length > 0) {
      fields.currentMedications.forEach(medication => {
        const medRow = medicationsTable.appendTableRow()
        
        const nameCell = medRow.appendTableCell()
        nameCell.appendParagraph(medication.name || "")
          .setFontSize(11)
        
        const dosageCell = medRow.appendTableCell()
        dosageCell.appendParagraph(medication.dosage || "")
          .setFontSize(11)
        
        const frequencyCell = medRow.appendTableCell()
        frequencyCell.appendParagraph(medication.frequency || "")
          .setFontSize(11)
      })
    } else {
      // Add empty rows if no medications
      const emptyRow = medicationsTable.appendTableRow()
      emptyRow.appendTableCell("No medications listed").setFontSize(11)
      emptyRow.appendTableCell("").setFontSize(11)
      emptyRow.appendTableCell("").setFontSize(11)
    }
    
    // Style medications table
    medicationsTable.setBorderWidth(1)
    medicationsTable.setBorderColor("#e2e8f0")

    body.appendParagraph("") // Add spacing

    // PAST MEDICAL HISTORY SECTION
    body.appendParagraph("PAST MEDICAL HISTORY")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true)

    const historyTable = body.appendTable()
    
    // Header row for medical history
    const histHeaderRow = historyTable.appendTableRow()
    const conditionHeader = histHeaderRow.appendTableCell()
    conditionHeader.appendParagraph("Medical Condition")
      .setFontSize(11)
      .setBold(true)
    
    const diagnosisHeader = histHeaderRow.appendTableCell()
    diagnosisHeader.appendParagraph("Diagnosis Date")
      .setFontSize(11)
      .setBold(true)
    
    const statusHeader = histHeaderRow.appendTableCell()
    statusHeader.appendParagraph("Current Status")
      .setFontSize(11)
      .setBold(true)
    
    // Add medical history rows
    if (fields.pastMedicalHistory && fields.pastMedicalHistory.length > 0) {
      fields.pastMedicalHistory.forEach(history => {
        const histRow = historyTable.appendTableRow()
        
        const conditionCell = histRow.appendTableCell()
        conditionCell.appendParagraph(history.condition || "")
          .setFontSize(11)
        
        const diagnosisCell = histRow.appendTableCell()
        diagnosisCell.appendParagraph(history.diagnosisDate || "")
          .setFontSize(11)
        
        const statusCell = histRow.appendTableCell()
        statusCell.appendParagraph(history.status || "")
          .setFontSize(11)
      })
    } else {
      // Add empty rows if no history
      const emptyRow = historyTable.appendTableRow()
      emptyRow.appendTableCell("No medical history listed").setFontSize(11)
      emptyRow.appendTableCell("").setFontSize(11)
      emptyRow.appendTableCell("").setFontSize(11)
    }
    
    // Style history table
    historyTable.setBorderWidth(1)
    historyTable.setBorderColor("#e2e8f0")

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

    body.appendParagraph(`Form ID: MRN-${Date.now()}`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(9)
      .setForegroundColor("#9ca3af")

    body.appendParagraph(`© ${new Date().getFullYear()} Hospital in Your Home. All rights reserved.`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(8)
      .setForegroundColor("#9ca3af")

    // Save and close the document - CRITICAL for PDF generation
    doc.saveAndClose()

    // Convert to PDF using the same method as working scripts
    const docFile = DriveApp.getFileById(doc.getId())
    const pdfBlob = docFile.getAs('application/pdf')

    // Get the target folder
    const folder = DriveApp.getFolderById(NEURODEGENERATIVE_FOLDER_ID)

    // Create filename for PDF
    const date = new Date().toISOString().split("T")[0]
    const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-")
    const patientName = (fields.patientName || "Unknown").replace(/[^a-zA-Z0-9]/g, "_")
    const pdfName = `Medication_Reconciliation_Neurodegenerative_${patientName}_${date}_${time}.pdf`

    // Save PDF to Google Drive
    const pdfFile = folder.createFile(pdfBlob.setName(pdfName))

    // Move the Google Doc to the folder as well
    docFile.moveTo(folder)

    // Generate shareable link for the PDF
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
    const driveUrl = pdfFile.getUrl()

    console.log("Medication Reconciliation (Neurodegenerative) processed successfully")
    console.log("Document ID:", doc.getId())
    console.log("PDF File ID:", pdfFile.getId())
    console.log("Drive URL:", driveUrl)

    // Return success response
    const response = {
      success: true,
      fileId: pdfFile.getId(),
      fileName: pdfName,
      driveUrl: driveUrl,
      docId: doc.getId(),
      message: "Medication Reconciliation (Neurodegenerative) submitted and saved to Google Drive successfully"
    }

    const output = ContentService.createTextOutput(JSON.stringify(response))
    output.setMimeType(ContentService.MimeType.JSON)
    return output

  } catch (error) {
    console.error("Error processing Medication Reconciliation (Neurodegenerative):", error)
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      message: "Failed to process Medication Reconciliation (Neurodegenerative)",
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
    message: "Neurodegenerative Medication Reconciliation Google Apps Script is running",
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
        formType: "medication-reconciliation-neurodegenerative",
        specialty: "neurodegenerative",
        formData: {
          patientName: "Jane Smith",
          patientDOB: "1970-05-20",
          patientAddress: "456 Oak Ave, Somewhere, SW 67890",
          currentMedications: [
            { name: "Donepezil", dosage: "5mg", frequency: "Once daily" },
            { name: "Memantine", dosage: "10mg", frequency: "Twice daily" }
          ],
          pastMedicalHistory: [
            { condition: "Alzheimer's Disease", diagnosisDate: "2022-03-15", status: "Progressive" },
            { condition: "Hypertension", diagnosisDate: "2018-01-10", status: "Controlled" }
          ]
        },
        timestamp: new Date().toISOString()
      })
    }
  }
  
  console.log("Testing Medication Reconciliation (Neurodegenerative) script...")
  const result = doPost(testData)
  console.log("Test result:", result.getContent())
  
  return result
}
