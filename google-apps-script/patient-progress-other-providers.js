// Google Apps Script Code - Patient Progress (Other Providers)
// Deploy this at scripts.google.com

// (Optional) Set your Google Drive folder ID for "Other Providers" progress notes
const OTHER_PROVIDERS_FOLDER_ID = ""; // Set to your folder ID or leave blank for root

function doPost(e) {
  try {
    // Log the incoming request for debugging
    Logger.log("Received POST: " + JSON.stringify(e));

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No post data received");
    }

    const data = JSON.parse(e.postData.contents);
    let formData = data.formData || data;

    // Remove non-form fields if they exist at the top level
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data;
      formData = cleanFormData;
    }

    // Compose document name
    const now = new Date();
    const dateStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");
    const docName = `Patient_Progress_Other_Providers_${formData.patientName || 'Unknown'}_${dateStr}`;
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();

    // Set document margins
    body.setMarginTop(36);
    body.setMarginBottom(36);
    body.setMarginLeft(54);
    body.setMarginRight(54);

    // HEADER
    const headerTable = body.appendTable();
    const headerRow = headerTable.appendTableRow();
    const logoCell = headerRow.appendTableCell();
    const titleCell = headerRow.appendTableCell();

    logoCell.appendParagraph(""); // leave blank or add your own branding

    const titlePara = titleCell.appendParagraph("Patient Progress Report");
    titlePara.setHeading(DocumentApp.ParagraphHeading.TITLE)
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(18).setBold(true).setForegroundColor("#166534");
    titleCell.appendParagraph("Other Provider Specialty")
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(12).setForegroundColor("#4ade80");
    titleCell.appendParagraph("📞 1-844-MY-HIYH")
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(10).setForegroundColor("#4ade80");
    titleCell.appendParagraph("✉️ info@hiyh.us")
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(10).setForegroundColor("#4ade80");
    headerTable.setBorderWidth(0);

    body.appendParagraph(""); // Space

    // PROVIDER INFORMATION
    body.appendParagraph("PROVIDER INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setFontSize(14).setBold(true).setForegroundColor("#166534");
    const providerTable = body.appendTable();
    const providerRow1 = providerTable.appendTableRow();
    providerRow1.appendTableCell("Provider Name:").editAsText().setBold(true);
    providerRow1.appendTableCell(formData.providerName || "N/A");
    providerRow1.appendTableCell("Provider Email:").editAsText().setBold(true);
    providerRow1.appendTableCell(formData.providerEmail || "N/A");
    const providerRow2 = providerTable.appendTableRow();
    providerRow2.appendTableCell("Provider Phone:").editAsText().setBold(true);
    providerRow2.appendTableCell(formData.providerPhone || "N/A");
    providerRow2.appendTableCell("Provider Address:").editAsText().setBold(true);
    providerRow2.appendTableCell(formData.providerAddress || "N/A");
    providerTable.setBorderWidth(1);
    providerTable.setBorderColor("#bbf7d0");

    body.appendParagraph(""); // Space

    // PATIENT INFORMATION
    body.appendParagraph("PATIENT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setFontSize(14).setBold(true).setForegroundColor("#166534");
    const patientTable = body.appendTable();
    const patientRow1 = patientTable.appendTableRow();
    patientRow1.appendTableCell("Patient Name:").editAsText().setBold(true);
    patientRow1.appendTableCell(formData.patientName || "N/A");
    patientRow1.appendTableCell("Date of Birth:").editAsText().setBold(true);
    patientRow1.appendTableCell(formData.patientDOB || "N/A");
    const patientRow2 = patientTable.appendTableRow();
    patientRow2.appendTableCell("Patient ID:").editAsText().setBold(true);
    patientRow2.appendTableCell(formData.patientID || "N/A");
    patientRow2.appendTableCell("Report Date:").editAsText().setBold(true);
    patientRow2.appendTableCell(formData.reportDate || "N/A");
    patientTable.setBorderWidth(1);
    patientTable.setBorderColor("#bbf7d0");

    body.appendParagraph(""); // Space

    // VISIT INFORMATION
    body.appendParagraph("VISIT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setFontSize(14).setBold(true).setForegroundColor("#166534");
    const visitTable = body.appendTable();
    const visitRow = visitTable.appendTableRow();
    visitRow.appendTableCell("Last Visit Date:").editAsText().setBold(true);
    visitRow.appendTableCell(formData.visitDate || "N/A");
    visitTable.setBorderWidth(1);
    visitTable.setBorderColor("#bbf7d0");

    body.appendParagraph(""); // Space

    // CLINICAL ASSESSMENT
    body.appendParagraph("CLINICAL ASSESSMENT")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setFontSize(14).setBold(true).setForegroundColor("#166534");
    body.appendParagraph("Chief Complaint:").editAsText().setBold(true);
    body.appendParagraph(formData.chiefComplaint || "N/A");
    body.appendParagraph("Current Symptoms:").editAsText().setBold(true);
    body.appendParagraph(formData.currentSymptoms || "N/A");
    body.appendParagraph("Treatment Response:").editAsText().setBold(true);
    body.appendParagraph(formData.treatmentResponse || "N/A");
    body.appendParagraph("Functional Status:").editAsText().setBold(true);
    body.appendParagraph(formData.functionalStatus || "N/A");

    body.appendParagraph(""); // Space

    // MEDICATIONS AND CARE PLAN
    body.appendParagraph("MEDICATIONS AND CARE PLAN")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setFontSize(14).setBold(true).setForegroundColor("#166534");
    body.appendParagraph("Current Medications:").editAsText().setBold(true);
    body.appendParagraph(formData.currentMedications || "N/A");
    body.appendParagraph("Adverse Events/Side Effects:").editAsText().setBold(true);
    body.appendParagraph(formData.adverseEvents || "N/A");
    body.appendParagraph("Plan of Care:").editAsText().setBold(true);
    body.appendParagraph(formData.planOfCare || "N/A");
    body.appendParagraph("Next Appointment:").editAsText().setBold(true);
    body.appendParagraph(formData.nextAppointment || "N/A");

    body.appendParagraph(""); // Space

    // FOOTER
    body.appendParagraph("—————————————————————————————————————————————————————")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(10).setForegroundColor("#6ee7b7").setSpacingBefore(24);
    body.appendParagraph(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(8).setForegroundColor("#6ee7b7");
    body.appendParagraph(`© ${new Date().getFullYear()} Hospital in Your Home. All rights reserved.`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(8).setForegroundColor("#a7f3d0");

    // Save and close the document
    doc.saveAndClose();

    // Convert to PDF
    const docFile = DriveApp.getFileById(doc.getId());
    const pdfBlob = docFile.getAs('application/pdf');

    // Get the target folder
    let folder = null;
    if (OTHER_PROVIDERS_FOLDER_ID) {
      folder = DriveApp.getFolderById(OTHER_PROVIDERS_FOLDER_ID);
    }

    // Create filename for PDF
    const timeStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "HH-mm-ss");
    const patientName = (formData.patientName || "Unknown").replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `Patient_Progress_Other_Providers_${patientName}_${dateStr}_${timeStr}.pdf`;

    // Save PDF to Google Drive
    let pdfFile;
    if (folder) {
      pdfFile = folder.createFile(pdfBlob.setName(fileName));
      docFile.moveTo(folder);
    } else {
      pdfFile = DriveApp.createFile(pdfBlob.setName(fileName));
      docFile.moveTo(DriveApp.getRootFolder());
    }

    // Make PDF shareable
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    // Generate formId and submittedAt for frontend display
    const formId = "PPO-" + Utilities.getUuid();
    const submittedAt = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

    // Prepare JSON response
    const jsonResponse = JSON.stringify({
      success: true,
      message: "Patient Progress (Other Providers) submitted successfully",
      fileName: fileName,
      fileId: pdfFile.getId(),
      driveUrl: pdfFile.getUrl(),
      docId: doc.getId(),
      formId: formId,
      submittedAt: submittedAt
    });

    // Add CORS headers if needed
    return ContentService
      .createTextOutput(jsonResponse)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error);
    // Add CORS headers if needed
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: "Failed to process Patient Progress (Other Providers)"
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Patient Progress (Other Providers) Script is running",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions() {
  return ContentService.createTextOutput("");
}
