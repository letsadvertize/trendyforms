// Google Apps Script - Provider Visit Attestation (Hereditary Thyroid)
// Deploy this at scripts.google.com

// Set your Google Drive folder ID for Hereditary Thyroid
const HEREDITARY_THYROID_FOLDER_ID = "YOUR_FOLDER_ID_HERE"; // <-- Set your folder ID here


function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let formData = data.formData || data;
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data;
      formData = cleanFormData;
    }

    const docName = `Provider_Visit_Attestation_Hereditary_Thyroid_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`;
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();

    // Set document margins for better formatting
    body.setMarginTop(36);    // 0.5 inch
    body.setMarginBottom(36); // 0.5 inch
    body.setMarginLeft(54);   // 0.75 inch
    body.setMarginRight(54);  // 0.75 inch

  // No header section per user request

    // PROVIDER INFORMATION SECTION
    body.appendParagraph("PROVIDER INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true);
    const providerTable = body.appendTable();
    const providerRow1 = providerTable.appendTableRow();
    providerRow1.appendTableCell("Name: " + (formData.providerName || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    providerRow1.appendTableCell("Email: " + (formData.providerEmail || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    const providerRow2 = providerTable.appendTableRow();
    providerRow2.appendTableCell("Address: " + (formData.providerAddress || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    providerRow2.appendTableCell("Phone: " + (formData.phoneNumber || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    providerTable.setBorderWidth(1);
    providerTable.setBorderColor("#e2e8f0");
    body.appendParagraph("");

    // REFERRING PROVIDER INFORMATION SECTION
    body.appendParagraph("REFERRING PROVIDER INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true);
    const referringTable = body.appendTable();
    const referringRow1 = referringTable.appendTableRow();
    referringRow1.appendTableCell("Name: " + (formData.referringProviderName || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    referringRow1.appendTableCell("NPI Number: " + (formData.referringNpiNumber || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    const referringRow2 = referringTable.appendTableRow();
    referringRow2.appendTableCell("Address: " + (formData.referringProviderAddress || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    referringRow2.appendTableCell("Phone: " + (formData.referringPhoneNumber || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    const referringRow3 = referringTable.appendTableRow();
    referringRow3.appendTableCell("Fax: " + (formData.referringFaxNumber || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    referringRow3.appendTableCell("");
    referringTable.setBorderWidth(1);
    referringTable.setBorderColor("#e2e8f0");
    body.appendParagraph("");

    // PATIENT INFORMATION SECTION
    body.appendParagraph("PATIENT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true);
    const patientTable = body.appendTable();
    const patientRow1 = patientTable.appendTableRow();
    patientRow1.appendTableCell("Name: " + (formData.patientName || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    patientRow1.appendTableCell("Date of Birth: " + (formData.patientDOB || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    const patientRow2 = patientTable.appendTableRow();
    patientRow2.appendTableCell("Address: " + (formData.patientAddress || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    patientRow2.appendTableCell("");
    patientTable.setBorderWidth(1);
    patientTable.setBorderColor("#e2e8f0");
    body.appendParagraph("");

    // TEST INFORMATION SECTION
    body.appendParagraph("TEST INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true);
    const testTable = body.appendTable();
    const testRow1 = testTable.appendTableRow();
    testRow1.appendTableCell("Date of Consult: " + (formData.dateOfConsult || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    testRow1.appendTableCell("Date of Service: " + (formData.dateOfService || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    const testRow2 = testTable.appendTableRow();
    testRow2.appendTableCell("ICD-10 Codes: " + (formData.icdCodes || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(6);
    testRow2.appendTableCell("");
    testTable.setBorderWidth(1);
    testTable.setBorderColor("#e2e8f0");
    body.appendParagraph("");

    // ATTESTATION SECTION
    body.appendParagraph("ATTESTATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true);
    const attestationText = [
      `I am the treating provider for ${formData.patientName || "[PATIENT NAME]"}. I have ordered a genetic test on ${formData.dateOfConsult || "[DATE OF CONSULT]"}. The original requisition form signed by myself and the patient is attached for review.`,
      `The test was ordered based on the following diagnosis as identified on the requisition (${formData.icdCodes || "[ICD 10-CODES]"})`,
      "The specimen was provided via a saliva swab test as of the actual date of service by the patient and sent directly to the lab.",
      "Test results will be processed by the lab and returned to CLINIC/OFFICE. The results will be added to the patient's electronic medical record and will be included as part of the patient's ongoing treatment plan.",
      `I hereby attest that the medical record entry for ${formData.dateOfConsult || "[DATE OF CONSULT]"} accurately reflects my signature and the notations that I made in my capacity when I treated and diagnosed the above-listed patient.`,
      "I do hereby attest that this information is true, accurate and complete to the best of my knowledge."
    ];
    attestationText.forEach(line => {
      const para = body.appendParagraph(line);
      para.setFontSize(11);
      para.setLineSpacing(1.2);
      para.setSpacingAfter(3);
    });
    body.appendParagraph("");

    // SIGNATURE SECTION
    body.appendParagraph("Sincerely,")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setForegroundColor("#1e293b")
      .setBold(true);
    const signatureTable = body.appendTable();
    const sigRow1 = signatureTable.appendTableRow();
    sigRow1.appendTableCell("Provider Signature: " + (formData.providerSignature || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(12);
    sigRow1.appendTableCell("Provider Name: " + (formData.providerNameSignature || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(12);
    const sigRow2 = signatureTable.appendTableRow();
    sigRow2.appendTableCell("Date: " + (formData.signatureDate || "___________________"))
      .setFontSize(11)
      .setPaddingBottom(12);
    sigRow2.appendTableCell("");
    signatureTable.setBorderWidth(1);
    signatureTable.setBorderColor("#e2e8f0");
    body.appendParagraph("");

  // No footer section per user request

    // Save and move to folder
    doc.saveAndClose();
    const docFile = DriveApp.getFileById(doc.getId());
    const pdfBlob = docFile.getAs('application/pdf');
    const folder = DriveApp.getFolderById(HEREDITARY_THYROID_FOLDER_ID);
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-");
    const patientName = (formData.patientName || "Unknown").replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `Provider_Visit_Attestation_Hereditary_Thyroid_${patientName}_${date}_${time}.pdf`;
    const pdfFile = folder.createFile(pdfBlob.setName(fileName));
    docFile.moveTo(folder);
    const response = {
      success: true,
      fileId: pdfFile.getId(),
      fileName: fileName,
      driveUrl: pdfFile.getUrl(),
      docId: doc.getId(),
      message: "Provider Visit Attestation (Hereditary Thyroid) submitted and saved to Google Drive successfully"
    };
    const output = ContentService.createTextOutput(JSON.stringify(response));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  } catch (error) {
    const errorResponse = {
      success: false,
      error: error.toString(),
      message: "Failed to process Provider Visit Attestation (Hereditary Thyroid)",
      stack: error.stack
    };
    const errorOutput = ContentService.createTextOutput(JSON.stringify(errorResponse));
    errorOutput.setMimeType(ContentService.MimeType.JSON);
    return errorOutput;
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    message: "Hereditary Thyroid Provider Visit Attestation Google Apps Script is running",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doOptions() {
  return ContentService.createTextOutput("");
}
