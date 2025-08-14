// Google Apps Script Code - Provider Visit Attestation (Diabetes MODY & Predict)
// Deploy this at scripts.google.com

// Set your Google Drive folder ID for Diabetes MODY & Predict
const DIABETES_MODY_PREDICT_FOLDER_ID = "YOUR_DIABETES_MODY_PREDICT_FOLDER_ID"; // <-- Set your folder ID here

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let formData = data.formData || data;
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data;
      formData = cleanFormData;
    }

    // Compose document name
    const docName = `Provider_Visit_Attestation_Diabetes_MODY_Predict_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`;
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();

    // Header
    body.appendParagraph("Provider Visit Attestation")
      .setHeading(DocumentApp.ParagraphHeading.TITLE)
      .setForegroundColor("#166534")
      .setBold(true)
      .setFontSize(18);
    body.appendParagraph("Diabetes MODY & Predict Specialty")
      .setFontSize(12)
      .setForegroundColor("#4ade80");
    body.appendParagraph("");

    // Provider Info
    body.appendParagraph("PROVIDER INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#166534")
      .setBold(true);
    const providerTable = body.appendTable();
    providerTable.appendTableRow()
      .appendTableCell("Name: " + (formData.providerName || "__________"))
      .setFontSize(11);
    providerTable.appendTableRow()
      .appendTableCell("NPI#: " + (formData.npiNumber || "__________"))
      .setFontSize(11);
    providerTable.appendTableRow()
      .appendTableCell("Address: " + (formData.providerAddress || "__________"))
      .setFontSize(11);
    providerTable.appendTableRow()
      .appendTableCell("Phone: " + (formData.phoneNumber || "__________"))
      .setFontSize(11);
    providerTable.appendTableRow()
      .appendTableCell("Fax: " + (formData.faxNumber || "__________"))
      .setFontSize(11);
    providerTable.setBorderWidth(1).setBorderColor("#bbf7d0");
    body.appendParagraph("");

    // Referring Provider Info
    body.appendParagraph("REFERRING PROVIDER INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#166534")
      .setBold(true);
    const referringTable = body.appendTable();
    referringTable.appendTableRow()
      .appendTableCell("Name: " + (formData.referringProviderName || "__________"))
      .setFontSize(11);
    referringTable.appendTableRow()
      .appendTableCell("NPI#: " + (formData.referringNpiNumber || "__________"))
      .setFontSize(11);
    referringTable.appendTableRow()
      .appendTableCell("Address: " + (formData.referringProviderAddress || "__________"))
      .setFontSize(11);
    referringTable.appendTableRow()
      .appendTableCell("Phone: " + (formData.referringPhoneNumber || "__________"))
      .setFontSize(11);
    referringTable.appendTableRow()
      .appendTableCell("Fax: " + (formData.referringFaxNumber || "__________"))
      .setFontSize(11);
    referringTable.setBorderWidth(1).setBorderColor("#bbf7d0");
    body.appendParagraph("");

    // Patient Info
    body.appendParagraph("PATIENT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#166534")
      .setBold(true);
    const patientTable = body.appendTable();
    patientTable.appendTableRow()
      .appendTableCell("Name: " + (formData.patientName || "__________"))
      .setFontSize(11);
    patientTable.appendTableRow()
      .appendTableCell("DOB: " + (formData.patientDOB || "__________"))
      .setFontSize(11);
    patientTable.appendTableRow()
      .appendTableCell("Address: " + (formData.patientAddress || "__________"))
      .setFontSize(11);
    patientTable.setBorderWidth(1).setBorderColor("#bbf7d0");
    body.appendParagraph("");

    // Test Info
    body.appendParagraph("TEST INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#166534")
      .setBold(true);
    const testTable = body.appendTable();
    testTable.appendTableRow()
      .appendTableCell("Date of Consult: " + (formData.dateOfConsult || "__________"))
      .setFontSize(11);
    testTable.appendTableRow()
      .appendTableCell("Date of Service: " + (formData.dateOfService || "__________"))
      .setFontSize(11);
    testTable.appendTableRow()
      .appendTableCell("ICD-10 Codes: " + (formData.icdCodes || "__________"))
      .setFontSize(11);
    testTable.setBorderWidth(1).setBorderColor("#bbf7d0");
    body.appendParagraph("");

    // Attestation
    body.appendParagraph("ATTESTATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#166534")
      .setBold(true);
    const attestationText = [
      `I am the treating provider for ${formData.patientName || "[PATIENT NAME]"}. I have ordered a genetic test on ${formData.dateOfConsult || "[DATE OF CONSULT]"}. The original requisition form signed by myself and the patient is attached for review.`,
      `The test was ordered based on the following diagnosis as identified on the requisition (${formData.icdCodes || "[ICD 10-CODES]"})`,
      "The specimen was provided via a saliva swab test as of the actual date of service by the patient and sent directly to the lab.",
      "Test results will be processed by the lab and returned to CLINIC/OFFICE. The results will be added to the patient's electronic medical record and will be included as part of the patient's ongoing treatment plan.",
      `I hereby attest that the medical record entry for ${formData.dateOfConsult || "[DATE OF CONSULT]"} accurately reflects my signature and the notations that I made in my capacity when I treated and diagnosed the above-listed patient.`,
      "I do hereby attest that this information is true, accurate and complete to the best of my knowledge."
    ];
    attestationText.forEach(line => body.appendParagraph(line).setFontSize(11));
    body.appendParagraph("");

    // Signature
    body.appendParagraph("Sincerely,")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#166534")
      .setBold(true);
    const sigTable = body.appendTable();
    sigTable.appendTableRow()
      .appendTableCell("Provider Signature: " + (formData.providerSignature || "__________"))
      .setFontSize(11);
    sigTable.appendTableRow()
      .appendTableCell("Provider Name: " + (formData.providerNameSignature || "__________"))
      .setFontSize(11);
    sigTable.appendTableRow()
      .appendTableCell("Date: " + (formData.signatureDate || "__________"))
      .setFontSize(11);
    sigTable.setBorderWidth(1).setBorderColor("#bbf7d0");
    body.appendParagraph("");

    // Footer
    body.appendParagraph("Form submitted on: " + (new Date().toLocaleString()))
      .setFontSize(9)
      .setForegroundColor("#6ee7b7")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    body.appendParagraph("© " + new Date().getFullYear() + " Diabetes MODY & Predict. All rights reserved.")
      .setFontSize(8)
      .setForegroundColor("#a7f3d0")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    doc.saveAndClose();

    // Move doc to folder
    const docFile = DriveApp.getFileById(doc.getId());
    if (DIABETES_MODY_PREDICT_FOLDER_ID && DIABETES_MODY_PREDICT_FOLDER_ID !== "YOUR_DIABETES_MODY_PREDICT_FOLDER_ID") {
      try {
        const folder = DriveApp.getFolderById(DIABETES_MODY_PREDICT_FOLDER_ID);
        docFile.moveTo(folder);
      } catch (err) {
        // Continue if move fails
      }
    }

    // Create PDF
    const pdfBlob = doc.getAs('application/pdf');
    const pdfName = docName.replace(/\s+/g, '_') + '.pdf';
    let pdfFile;
    if (DIABETES_MODY_PREDICT_FOLDER_ID && DIABETES_MODY_PREDICT_FOLDER_ID !== "YOUR_DIABETES_MODY_PREDICT_FOLDER_ID") {
      try {
        const folder = DriveApp.getFolderById(DIABETES_MODY_PREDICT_FOLDER_ID);
        pdfFile = folder.createFile(pdfBlob.setName(pdfName));
      } catch (err) {
        pdfFile = DriveApp.createFile(pdfBlob.setName(pdfName));
      }
    } else {
      pdfFile = DriveApp.createFile(pdfBlob.setName(pdfName));
    }
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    const driveUrl = pdfFile.getUrl();

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      fileId: pdfFile.getId(),
      fileName: pdfName,
      driveUrl: driveUrl,
      docId: doc.getId(),
      message: "Provider Visit Attestation (Diabetes MODY & Predict) submitted and saved to Google Drive successfully"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: "Failed to process Provider Visit Attestation (Diabetes MODY & Predict)"
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions() {
  return ContentService.createTextOutput("");
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Provider Visit Attestation (Diabetes MODY & Predict) Script is running",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
