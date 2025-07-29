// Google Apps Script - Medication Reconciliation (Other Providers)
// Deploy as Web App (Anyone), set FOLDER_ID below

const OTHER_PROVIDERS_FOLDER_ID = "YOUR_OTHER_PROVIDERS_FOLDER_ID" // <-- Set your folder ID here

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    let formData = data.formData || data

    // Remove non-form fields if not nested
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data
      formData = cleanFormData
    }

    // Document name
    const docName = `Medication_Reconciliation_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`
    const doc = DocumentApp.create(docName)
    const body = doc.getBody()

    // Header
    body.appendParagraph("Medication Reconciliation")
      .setHeading(DocumentApp.ParagraphHeading.TITLE)
      .setForegroundColor("#166534")
      .setBold(true)
      .setFontSize(18)
    body.appendParagraph("Other Provider Specialty")
      .setFontSize(12)
      .setForegroundColor("#4ade80")
    body.appendParagraph("")

    // Provider Info
    body.appendParagraph("PROVIDER INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#166534")
      .setBold(true)
    const providerTable = body.appendTable()
    providerTable.appendTableRow()
      .appendTableCell("Name: " + (formData.providerName || "__________"))
      .setFontSize(11)
    providerTable.appendTableRow()
      .appendTableCell("Phone: " + (formData.providerPhone || "__________"))
      .setFontSize(11)
    providerTable.appendTableRow()
      .appendTableCell("Email: " + (formData.providerEmail || "__________"))
      .setFontSize(11)
    providerTable.appendTableRow()
      .appendTableCell("Address: " + (formData.providerAddress || "__________"))
      .setFontSize(11)
    providerTable.setBorderWidth(1).setBorderColor("#bbf7d0")
    body.appendParagraph("")

    // Patient Info
    body.appendParagraph("PATIENT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#166534")
      .setBold(true)
    const patientTable = body.appendTable()
    patientTable.appendTableRow()
      .appendTableCell("Name: " + (formData.patientName || "__________"))
      .setFontSize(11)
    patientTable.appendTableRow()
      .appendTableCell("DOB: " + (formData.patientDOB || "__________"))
      .setFontSize(11)
    patientTable.appendTableRow()
      .appendTableCell("Address: " + (formData.patientAddress || "__________"))
      .setFontSize(11)
    patientTable.setBorderWidth(1).setBorderColor("#bbf7d0")
    body.appendParagraph("")

    // Current Medications
    body.appendParagraph("CURRENT MEDICATIONS")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#166534")
      .setBold(true)
    if (Array.isArray(formData.currentMedications) && formData.currentMedications.length > 0) {
      const medsTable = body.appendTable([["Medication Name", "Dosage", "Frequency"]])
      medsTable.setBorderWidth(1).setBorderColor("#bbf7d0")
      formData.currentMedications.forEach(med => {
        medsTable.appendTableRow()
          .appendTableCell(med.name || "")
          .appendTableCell(med.dosage || "")
          .appendTableCell(med.frequency || "")
      })
    } else {
      body.appendParagraph("No medications listed.")
    }
    body.appendParagraph("")

    // Past Medical History
    body.appendParagraph("PAST MEDICAL HISTORY")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#166534")
      .setBold(true)
    if (Array.isArray(formData.pastMedicalHistory) && formData.pastMedicalHistory.length > 0) {
      const histTable = body.appendTable([["Condition", "Diagnosis Date", "Status"]])
      histTable.setBorderWidth(1).setBorderColor("#bbf7d0")
      formData.pastMedicalHistory.forEach(hist => {
        histTable.appendTableRow()
          .appendTableCell(hist.condition || "")
          .appendTableCell(hist.diagnosisDate || "")
          .appendTableCell(hist.status || "")
      })
    } else {
      body.appendParagraph("No past medical history listed.")
    }
    body.appendParagraph("")

    // Footer
    body.appendParagraph("Form submitted on: " + (new Date().toLocaleString()))
      .setFontSize(9)
      .setForegroundColor("#6ee7b7")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
    body.appendParagraph("© " + new Date().getFullYear() + " Other Providers. All rights reserved.")
      .setFontSize(8)
      .setForegroundColor("#a7f3d0")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)

    doc.saveAndClose()

    // Move doc to folder
    const docFile = DriveApp.getFileById(doc.getId())
    if (OTHER_PROVIDERS_FOLDER_ID) {
      try {
        const folder = DriveApp.getFolderById(OTHER_PROVIDERS_FOLDER_ID)
        docFile.moveTo(folder)
      } catch (err) {
        // Continue if move fails
      }
    }

    // Create PDF
    const pdfBlob = doc.getAs('application/pdf')
    const pdfName = docName.replace(/\s+/g, '_') + '.pdf'
    let pdfFile
    if (OTHER_PROVIDERS_FOLDER_ID) {
      try {
        const folder = DriveApp.getFolderById(OTHER_PROVIDERS_FOLDER_ID)
        pdfFile = folder.createFile(pdfBlob.setName(pdfName))
      } catch (err) {
        pdfFile = DriveApp.createFile(pdfBlob.setName(pdfName))
      }
    } else {
      pdfFile = DriveApp.createFile(pdfBlob.setName(pdfName))
    }
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
    const driveUrl = pdfFile.getUrl()

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      fileId: pdfFile.getId(),
      fileName: pdfName,
      driveUrl: driveUrl,
      docId: doc.getId(),
      message: "Medication Reconciliation (Other Providers) submitted and saved to Google Drive successfully"
    })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: "Failed to process Medication Reconciliation (Other Providers)"
    })).setMimeType(ContentService.MimeType.JSON)
  }
}

function doOptions() {
  return ContentService.createTextOutput("")
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Medication Reconciliation (Other Providers) Script is running",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions() {
  return ContentService.createTextOutput("");
}
