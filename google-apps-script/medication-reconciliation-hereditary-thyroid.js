// Google Apps Script - Medication Reconciliation (Hereditary Thyroid)
// Deploy as Web App (Anyone), set HEREDITARY_THYROID_FOLDER_ID below

const HEREDITARY_THYROID_FOLDER_ID = "YOUR_HEREDITARY_THYROID_FOLDER_ID"; // <-- Set your folder ID here

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let formData = data.formData || data;
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data;
      formData = cleanFormData;
    }

    // Document name
    const docName = `Medication_Reconciliation_Hereditary_Thyroid_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`;
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();

    // Set document margins for better formatting
    body.setMarginTop(36);    // 0.5 inch
    body.setMarginBottom(36); // 0.5 inch
    body.setMarginLeft(54);   // 0.75 inch
    body.setMarginRight(54);  // 0.75 inch

    // PROVIDER INFORMATION SECTION
    body.appendParagraph("PROVIDER INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true);
    const providerTable = body.appendTable();
    providerTable.appendTableRow().appendTableCell("Name: " + (formData.providerName || "__________")).setFontSize(11);
    providerTable.appendTableRow().appendTableCell("Phone: " + (formData.providerPhone || "__________")).setFontSize(11);
    providerTable.appendTableRow().appendTableCell("Email: " + (formData.providerEmail || "__________")).setFontSize(11);
    providerTable.appendTableRow().appendTableCell("Address: " + (formData.providerAddress || "__________")).setFontSize(11);
    providerTable.setBorderWidth(1).setBorderColor("#e2e8f0");
    body.appendParagraph("");

    // PATIENT INFORMATION SECTION
    body.appendParagraph("PATIENT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true);
    const patientTable = body.appendTable();
    patientTable.appendTableRow().appendTableCell("Name: " + (formData.patientName || "__________")).setFontSize(11);
    patientTable.appendTableRow().appendTableCell("DOB: " + (formData.patientDOB || "__________")).setFontSize(11);
    patientTable.appendTableRow().appendTableCell("Address: " + (formData.patientAddress || "__________")).setFontSize(11);
    patientTable.setBorderWidth(1).setBorderColor("#e2e8f0");
    body.appendParagraph("");

    // CURRENT MEDICATIONS SECTION
    body.appendParagraph("CURRENT MEDICATIONS")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true);
    if (Array.isArray(formData.currentMedications) && formData.currentMedications.length > 0) {
      const medsTable = body.appendTable([["Medication Name", "Dosage", "Frequency"]]);
      medsTable.setBorderWidth(1).setBorderColor("#e2e8f0");
      formData.currentMedications.forEach(med => {
        const row = medsTable.appendTableRow();
        row.appendTableCell(med.name || "").setFontSize(10);
        row.appendTableCell(med.dosage || "").setFontSize(10);
        row.appendTableCell(med.frequency || "").setFontSize(10);
      });
    } else {
      body.appendParagraph("No current medications listed.").setFontSize(10);
    }
    body.appendParagraph("");

    // PAST MEDICAL HISTORY SECTION
    body.appendParagraph("PAST MEDICAL HISTORY")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true);
    if (Array.isArray(formData.pastMedicalHistory) && formData.pastMedicalHistory.length > 0) {
      const historyTable = body.appendTable([["Condition", "Diagnosis Date", "Status"]]);
      historyTable.setBorderWidth(1).setBorderColor("#e2e8f0");
      formData.pastMedicalHistory.forEach(hist => {
        const row = historyTable.appendTableRow();
        row.appendTableCell(hist.condition || "").setFontSize(10);
        row.appendTableCell(hist.diagnosisDate || "").setFontSize(10);
        row.appendTableCell(hist.status || "").setFontSize(10);
      });
    } else {
      body.appendParagraph("No past medical history listed.").setFontSize(10);
    }
    body.appendParagraph("");

    // Save and move to folder
    doc.saveAndClose();
    const docFile = DriveApp.getFileById(doc.getId());
    const pdfBlob = docFile.getAs('application/pdf');
    const folder = DriveApp.getFolderById(HEREDITARY_THYROID_FOLDER_ID);
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-");
    const patientName = (formData.patientName || "Unknown").replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `Medication_Reconciliation_Hereditary_Thyroid_${patientName}_${date}_${time}.pdf`;
    const pdfFile = folder.createFile(pdfBlob.setName(fileName));
    docFile.moveTo(folder);
    const response = {
      success: true,
      fileId: pdfFile.getId(),
      fileName: fileName,
      driveUrl: pdfFile.getUrl(),
      docId: doc.getId(),
      message: "Medication Reconciliation (Hereditary Thyroid) submitted and saved to Google Drive successfully"
    };
    const output = ContentService.createTextOutput(JSON.stringify(response));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  } catch (error) {
    const errorResponse = {
      success: false,
      error: error.toString(),
      message: "Failed to process Medication Reconciliation (Hereditary Thyroid)",
      stack: error.stack
    };
    const errorOutput = ContentService.createTextOutput(JSON.stringify(errorResponse));
    errorOutput.setMimeType(ContentService.MimeType.JSON);
    return errorOutput;
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    message: "Hereditary Thyroid Medication Reconciliation Google Apps Script is running",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doOptions() {
  return ContentService.createTextOutput("");
}
