// Google Apps Script - Progress Note (Diabetes MODY & Predict)
// Deploy as Web App (Anyone), set DIABETES_MODY_PREDICT_FOLDER_ID below

const DIABETES_MODY_PREDICT_FOLDER_ID = "1maJyA59km8sOH9UlAsZuFUDL8hPDVtlw"; // <-- Set your folder ID here

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let formData = data.formData || data;
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data;
      formData = cleanFormData;
    }

    // Document name
    const docName = `Progress_Note_Diabetes_MODY_Predict_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`;
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
      .setForegroundColor("#000000")
      .setBold(true);
    const providerTable = body.appendTable();
    providerTable.appendTableRow().appendTableCell("Name: " + (formData.providerName || "__________")).setFontSize(11);
    providerTable.appendTableRow().appendTableCell("Email: " + (formData.providerEmail || "__________")).setFontSize(11);
    providerTable.appendTableRow().appendTableCell("Phone: " + (formData.providerPhone || "__________")).setFontSize(11);
    providerTable.appendTableRow().appendTableCell("Address: " + (formData.providerAddress || "__________")).setFontSize(11);
    providerTable.setBorderWidth(1).setBorderColor("#000000");
    body.appendParagraph("");

    // PATIENT INFORMATION SECTION
    body.appendParagraph("PATIENT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#000000")
      .setBold(true);
    const patientTable = body.appendTable();
    patientTable.appendTableRow().appendTableCell("Name: " + (formData.patientName || "__________")).setFontSize(11);
    patientTable.appendTableRow().appendTableCell("Date of Birth: " + (formData.patientDOB || "__________")).setFontSize(11);
    patientTable.appendTableRow().appendTableCell("Patient ID: " + (formData.patientID || "__________")).setFontSize(11);
    patientTable.setBorderWidth(1).setBorderColor("#000000");
    body.appendParagraph("");

    // VISIT INFORMATION SECTION
    body.appendParagraph("VISIT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#000000")
      .setBold(true);
    const visitTable = body.appendTable();
    visitTable.appendTableRow().appendTableCell("Report Date: " + (formData.reportDate || "__________")).setFontSize(11);
    visitTable.appendTableRow().appendTableCell("Visit Date: " + (formData.visitDate || "__________")).setFontSize(11);
    visitTable.setBorderWidth(1).setBorderColor("#000000");
    body.appendParagraph("");

    // CLINICAL INFORMATION SECTION
    body.appendParagraph("CLINICAL INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#000000")
      .setBold(true);
    const clinicalFields = [
      { label: "Chief Complaint", value: formData.chiefComplaint },
      { label: "Current Symptoms", value: formData.currentSymptoms },
      { label: "Treatment Response", value: formData.treatmentResponse },
      { label: "Functional Status", value: formData.functionalStatus },
      { label: "Current Medications", value: formData.currentMedications },
      { label: "Adverse Events", value: formData.adverseEvents },
      { label: "Plan of Care", value: formData.planOfCare },
      { label: "Next Appointment", value: formData.nextAppointment },
    ];
    clinicalFields.forEach(field => {
      body.appendParagraph(field.label + ":").setBold(true).setFontSize(11);
      body.appendParagraph(field.value || "__________").setFontSize(11);
      body.appendParagraph("");
    });

    // Save and move to folder
    doc.saveAndClose();
    const docFile = DriveApp.getFileById(doc.getId());
    const pdfBlob = docFile.getAs('application/pdf');
    const folder = DriveApp.getFolderById(DIABETES_MODY_PREDICT_FOLDER_ID);
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-");
    const patientName = (formData.patientName || "Unknown").replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `Progress_Note_Diabetes_MODY_Predict_${patientName}_${date}_${time}.pdf`;
    const pdfFile = folder.createFile(pdfBlob.setName(fileName));
    docFile.moveTo(folder);
    const response = {
      success: true,
      fileId: pdfFile.getId(),
      fileName: fileName,
      driveUrl: pdfFile.getUrl(),
      docId: doc.getId(),
      message: "Progress Note (Diabetes MODY & Predict) submitted and saved to Google Drive successfully"
    };
    const output = ContentService.createTextOutput(JSON.stringify(response));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  } catch (error) {
    const errorResponse = {
      success: false,
      error: error.toString(),
      message: "Failed to process Progress Note (Diabetes MODY & Predict)",
      stack: error.stack
    };
    const errorOutput = ContentService.createTextOutput(JSON.stringify(errorResponse));
    errorOutput.setMimeType(ContentService.MimeType.JSON);
    return errorOutput;
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    message: "Diabetes MODY & Predict Progress Note Google Apps Script is running",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doOptions() {
  return ContentService.createTextOutput("");
}
