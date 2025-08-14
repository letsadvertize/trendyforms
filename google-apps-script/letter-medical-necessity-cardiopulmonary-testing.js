// Google Apps Script Code - Letter of Medical Necessity (Combined Cardiopulmonary Testing)
// Deploy this at scripts.google.com

// Combined Cardiopulmonary Testing folder ID from your Google Drive
const CARDIOPULMONARY_TESTING_FOLDER_ID = "1k9cXTb0pUerXvsdHxRWGN2kSybjRm5j-"; // Update this with your folder ID

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let formData = data.formData || data;
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data;
      formData = cleanFormData;
    }

    const docName = `Letter_Medical_Necessity_Cardiopulmonary_Testing_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`;
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();

    // HEADER SECTION (Simple Title Only)
    body.appendParagraph("Letter of Medical Necessity: Combined Cardiopulmonary Testing")
      .setHeading(DocumentApp.ParagraphHeading.TITLE)
      .setFontSize(18)
      .setBold(true)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setForegroundColor("#000000");
    body.appendParagraph("");

    // PATIENT AND DATE SECTION
    const patientDateTable = body.appendTable();
    const patientDateRow = patientDateTable.appendTableRow();
    const patientCell = patientDateRow.appendTableCell();
    patientCell.appendParagraph("Patient Name: " + (formData.patientName || "___________________")).setFontSize(12);
    patientCell.appendParagraph("Date of Birth: " + (formData.patientDOB || "___________________")).setFontSize(12);
    const dateCell = patientDateRow.appendTableCell();
    dateCell.appendParagraph("Date: " + (formData.date || formData.providerDate || new Date().toLocaleDateString())).setFontSize(12).setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
    patientDateTable.setBorderWidth(0);
    body.appendParagraph("");

    // MEDICAL STATEMENT SECTION
    body.appendParagraph("To whomsoever it may concern:").setFontSize(12).setBold(true).setAlignment(DocumentApp.HorizontalAlignment.CENTER).setSpacingAfter(12);
    body.appendParagraph(`I am writing on behalf of my patient, ${formData.patientName || "Patient Name"}, to document the medical necessity of combined cardiopulmonary testing.`).setFontSize(11).setSpacingAfter(8);
    body.appendParagraph(`I have determined that this test is medically necessary for the above patient due to the following history, which is strongly indicative of a cardiopulmonary disorder or risk: ${formData.cardiopulmonaryIndication || "[Indication]"}.`).setFontSize(11).setSpacingAfter(12);

    // PATIENT PERSONAL HISTORY SECTION
    body.appendParagraph("Patient Personal History").setHeading(DocumentApp.ParagraphHeading.HEADING1).setFontSize(14).setBold(true).setForegroundColor("#000000").setSpacingBefore(16).setSpacingAfter(8);
    if (formData.patientConditions && Array.isArray(formData.patientConditions) && formData.patientConditions.length > 0) {
      const conditionsTable = body.appendTable();
      const conditionsHeader = conditionsTable.appendTableRow();
      const headerCell1 = conditionsHeader.appendTableCell();
      headerCell1.clear();
      headerCell1.appendParagraph("Cardiopulmonary Conditions").setFontSize(11).setBold(true).setForegroundColor("#000000");
      const headerCell2 = conditionsHeader.appendTableCell();
      headerCell2.clear();
      headerCell2.appendParagraph("Dx Age").setFontSize(11).setBold(true).setForegroundColor("#000000");
      headerCell1.setBackgroundColor("#ffffff");
      headerCell2.setBackgroundColor("#ffffff");
      formData.patientConditions.forEach(condition => {
        if (condition && (condition.condition || condition.dxAge)) {
          const row = conditionsTable.appendTableRow();
          const dataCell1 = row.appendTableCell();
          dataCell1.clear();
          dataCell1.appendParagraph(condition.condition || "").setFontSize(10);
          const dataCell2 = row.appendTableCell();
          dataCell2.clear();
          dataCell2.appendParagraph(condition.dxAge || "").setFontSize(10);
        }
      });
      conditionsTable.setBorderWidth(1);
      conditionsTable.setBorderColor("#000000");
    }
    body.appendParagraph("");

    // FAMILY HISTORY SECTION
    body.appendParagraph("Family History").setHeading(DocumentApp.ParagraphHeading.HEADING1).setFontSize(14).setBold(true).setForegroundColor("#000000").setSpacingBefore(16).setSpacingAfter(8);
    if (formData.familyHistory && Array.isArray(formData.familyHistory) && formData.familyHistory.length > 0) {
      const familyTable = body.appendTable();
      const familyHeader = familyTable.appendTableRow();
      const familyHeaderCell1 = familyHeader.appendTableCell();
      familyHeaderCell1.clear();
      familyHeaderCell1.appendParagraph("First-, Second-, or Third-Degree Relative").setFontSize(9).setBold(true);
      const familyHeaderCell2 = familyHeader.appendTableCell();
      familyHeaderCell2.clear();
      familyHeaderCell2.appendParagraph("(M: Maternal or P: Paternal) Side").setFontSize(9).setBold(true);
      const familyHeaderCell3 = familyHeader.appendTableCell();
      familyHeaderCell3.clear();
      familyHeaderCell3.appendParagraph("Relationship").setFontSize(9).setBold(true);
      const familyHeaderCell4 = familyHeader.appendTableCell();
      familyHeaderCell4.clear();
      familyHeaderCell4.appendParagraph("Condition").setFontSize(9).setBold(true);
      const familyHeaderCell5 = familyHeader.appendTableCell();
      familyHeaderCell5.clear();
      familyHeaderCell5.appendParagraph("Dx Age").setFontSize(9).setBold(true);
      familyHeaderCell1.setBackgroundColor("#ffffff");
      familyHeaderCell2.setBackgroundColor("#ffffff");
      familyHeaderCell3.setBackgroundColor("#ffffff");
      familyHeaderCell4.setBackgroundColor("#ffffff");
      familyHeaderCell5.setBackgroundColor("#ffffff");
      formData.familyHistory.forEach(history => {
        if (history && (history.relative || history.side || history.relationship || history.condition || history.dxAge)) {
          const row = familyTable.appendTableRow();
          const familyDataCell1 = row.appendTableCell();
          familyDataCell1.clear();
          familyDataCell1.appendParagraph(history.relative || "").setFontSize(9);
          const familyDataCell2 = row.appendTableCell();
          familyDataCell2.clear();
          familyDataCell2.appendParagraph(history.side || "").setFontSize(9);
          const familyDataCell3 = row.appendTableCell();
          familyDataCell3.clear();
          familyDataCell3.appendParagraph(history.relationship || "").setFontSize(9);
          const familyDataCell4 = row.appendTableCell();
          familyDataCell4.clear();
          familyDataCell4.appendParagraph(history.condition || "").setFontSize(9);
          const familyDataCell5 = row.appendTableCell();
          familyDataCell5.clear();
          familyDataCell5.appendParagraph(history.dxAge || "").setFontSize(9);
        }
      });
      familyTable.setBorderWidth(1);
      familyTable.setBorderColor("#000000");
    }
    body.appendParagraph("");

    // ADDITIONAL INFORMATION & MEDICAL NECESSITY SECTION
    body.appendParagraph("Additional Information & Medical Necessity").setHeading(DocumentApp.ParagraphHeading.HEADING1).setFontSize(14).setBold(true).setForegroundColor("#000000").setSpacingBefore(16).setSpacingAfter(8);
    body.appendParagraph("Additional information on patient's examination and assessment can be found on progress notes.").setFontSize(11).setSpacingAfter(8);
    body.appendParagraph("Medical Necessity").setFontSize(12).setBold(true).setSpacingAfter(8);
    const medicalNecessityText = `If a combined cardiopulmonary disorder is found, it would provide a diagnosis and help clarify the patient's risk and prompt a change in the patient's medical management. Accurate diagnosis will save the patient undue suffering and treatment delays. This information allows healthcare providers to better inform affected individuals and families about prognosis and optimal surveillance strategies and may also guide therapy. Understanding the etiology of the symptoms will enable avoidance of inpatient hospitalization. In addition, once the diagnosis is established, healthcare providers can better define the risk of recurrence and decide whether to screen unaffected family members, to provide counseling, or for other purposes.`;
    body.appendParagraph(medicalNecessityText).setFontSize(11).setSpacingAfter(8);
    body.appendParagraph("For this patient, the test results are needed in order to consider the following medical management strategies:").setFontSize(11).setSpacingAfter(8);
    if (formData.medicalManagement) {
      body.appendParagraph("Medical Management Considerations").setFontSize(12).setBold(true).setSpacingBefore(8).setSpacingAfter(4);
      body.appendParagraph(formData.medicalManagement).setFontSize(11).setSpacingAfter(12);
    }
    body.appendParagraph("Based on my evaluation and review of the available literature, I believe that combined cardiopulmonary testing is warranted and medically necessary for my patient.").setFontSize(11).setBold(false).setSpacingBefore(12).setSpacingAfter(16);

    // PROVIDER INFORMATION SECTION
    body.appendParagraph("Provider Information").setHeading(DocumentApp.ParagraphHeading.HEADING1).setFontSize(14).setBold(true).setForegroundColor("#000000").setSpacingBefore(16).setSpacingAfter(8);
    const providerTable = body.appendTable();
    const providerRow = providerTable.appendTableRow();
    const providerInfoCell = providerRow.appendTableCell();
    const providerName = formData.providerName || formData.customProviderName || "___________________";
    providerInfoCell.appendParagraph("Provider Name: " + providerName).setFontSize(12);
    providerInfoCell.appendParagraph("Provider Email: " + (formData.providerEmail || formData.customProviderEmail || "___________________")).setFontSize(12);
    providerInfoCell.appendParagraph("Provider Phone: " + (formData.providerPhone || formData.customProviderPhone || "___________________")).setFontSize(12);
    providerInfoCell.appendParagraph("Provider Address: " + (formData.providerAddress || formData.customProviderAddress || "___________________")).setFontSize(12);
    const providerDateCell = providerRow.appendTableCell();
    providerDateCell.appendParagraph("Date: " + (formData.providerDate || "___________________")).setFontSize(12).setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
    providerTable.setBorderWidth(0);

    // (No footer branding)

    doc.saveAndClose();
    const docFile = DriveApp.getFileById(doc.getId());
    const pdfBlob = docFile.getAs('application/pdf');
    const folder = DriveApp.getFolderById(CARDIOPULMONARY_TESTING_FOLDER_ID);
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-");
    const patientName = (formData.patientName || "Unknown").replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `Letter_Medical_Necessity_Cardiopulmonary_Testing_${patientName}_${date}_${time}.pdf`;
    const pdfFile = folder.createFile(pdfBlob.setName(fileName));
    docFile.moveTo(folder);
    const response = {
      success: true,
      fileId: pdfFile.getId(),
      fileName: fileName,
      driveUrl: pdfFile.getUrl(),
      docId: doc.getId(),
      message: "Letter of Medical Necessity (Combined Cardiopulmonary Testing) submitted and saved to Google Drive successfully"
    };
    const output = ContentService.createTextOutput(JSON.stringify(response));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
  } catch (error) {
    const errorResponse = {
      success: false,
      error: error.toString(),
      message: "Failed to process Letter of Medical Necessity (Combined Cardiopulmonary Testing)",
      stack: error.stack
    };
    const errorOutput = ContentService.createTextOutput(JSON.stringify(errorResponse));
    errorOutput.setMimeType(ContentService.MimeType.JSON);
    return errorOutput;
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    message: "Combined Cardiopulmonary Testing Letter Google Apps Script is running",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doOptions() {
  return ContentService.createTextOutput("");
}
