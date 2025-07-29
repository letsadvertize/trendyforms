// Google Apps Script Code - Letter of Medical Necessity (Other Providers)
// Deploy this at scripts.google.com

// (Optional) Set your Google Drive folder ID for "Other Providers" letters
const OTHER_PROVIDERS_FOLDER_ID = ""; // Set to your folder ID or leave blank for root

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let formData = data.formData || data;

    // Remove non-form fields if they exist at the top level
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data;
      formData = cleanFormData;
    }

    // Compose document name
    const docName = `Letter_Medical_Necessity_Other_Providers_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`;
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

    // REMOVE these lines to omit the Hospital in Your Home header
    // logoCell.appendParagraph("🏥 Hospital in Your Home")
    //   .setFontSize(14).setBold(true).setForegroundColor("#1e293b");
    // logoCell.appendParagraph("Comprehensive Healthcare Solutions")
    //   .setFontSize(10).setForegroundColor("#64748b");

    // Optionally, leave logoCell blank or add a different header if needed
    logoCell.appendParagraph(""); // leave blank

    const titlePara = titleCell.appendParagraph("Letter of Medical Necessity");
    titlePara.setHeading(DocumentApp.ParagraphHeading.TITLE)
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(18).setBold(true).setForegroundColor("#1e293b");
    titleCell.appendParagraph("Other Provider Specialty")
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(12).setForegroundColor("#64748b");
    titleCell.appendParagraph("📞 1-844-MY-HIYH")
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(10).setForegroundColor("#64748b");
    titleCell.appendParagraph("✉️ info@hiyh.us")
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(10).setForegroundColor("#64748b");
    headerTable.setBorderWidth(0);

    body.appendParagraph(""); // Space

    // PROVIDER INFORMATION
    body.appendParagraph("PROVIDER INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setFontSize(14).setBold(true).setForegroundColor("#1e293b");
    const providerTable = body.appendTable();
    const providerRow1 = providerTable.appendTableRow();
    providerRow1.appendTableCell("Provider Name:").editAsText().setBold(true);
    providerRow1.appendTableCell(formData.customProviderName || "N/A");
    providerRow1.appendTableCell("Provider Email:").editAsText().setBold(true);
    providerRow1.appendTableCell(formData.customProviderEmail || "N/A");
    const providerRow2 = providerTable.appendTableRow();
    providerRow2.appendTableCell("Provider Phone:").editAsText().setBold(true);
    providerRow2.appendTableCell(formData.customProviderPhone || "N/A");
    providerRow2.appendTableCell("Provider Address:").editAsText().setBold(true);
    providerRow2.appendTableCell(formData.customProviderAddress || "N/A");
    providerTable.setBorderWidth(1);
    providerTable.setBorderColor("#e2e8f0");

    body.appendParagraph(""); // Space

    // PATIENT INFORMATION
    body.appendParagraph("PATIENT INFORMATION")
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .setFontSize(14).setBold(true).setForegroundColor("#1e293b");
    const patientTable = body.appendTable();
    const patientRow1 = patientTable.appendTableRow();
    patientRow1.appendTableCell("Patient Name:").editAsText().setBold(true);
    patientRow1.appendTableCell(formData.patientName || "N/A");
    patientRow1.appendTableCell("Date of Birth:").editAsText().setBold(true);
    patientRow1.appendTableCell(formData.patientDOB || "N/A");
    const patientRow2 = patientTable.appendTableRow();
    patientRow2.appendTableCell("Insurance Company:").editAsText().setBold(true);
    patientRow2.appendTableCell(formData.insuranceCompany || "N/A");
    patientRow2.appendTableCell("Policy Number:").editAsText().setBold(true);
    patientRow2.appendTableCell(formData.policyNumber || "N/A");
    patientTable.setBorderWidth(1);
    patientTable.setBorderColor("#e2e8f0");

    body.appendParagraph(""); // Space

    // MEDICAL STATEMENT
    body.appendParagraph("To whomsoever it may concern:")
      .setFontSize(12).setBold(true)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setSpacingAfter(12);
    body.appendParagraph(`I am writing on behalf of my patient, ${formData.patientName || "Patient Name"}${formData.patientDOB ? " (DOB: " + formData.patientDOB + ")" : ""}, to document the medical necessity of genetic testing.`)
      .setFontSize(11).setSpacingAfter(8);
    body.appendParagraph(`I have determined that this test is medically necessary for the above patient due to the following history, which is strongly indicative of genetic etiology or a hereditary ${formData.hereditaryCondition || "condition"} consistent with a mutation in multiple genes.`)
      .setFontSize(11).setSpacingAfter(12);

    // PATIENT PERSONAL HISTORY
    body.appendParagraph("Patient Personal History")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .setFontSize(14).setBold(true).setForegroundColor("#1e293b")
      .setSpacingBefore(16).setSpacingAfter(8);
    if (formData.patientConditions && Array.isArray(formData.patientConditions) && formData.patientConditions.length > 0) {
      const conditionsTable = body.appendTable();
      const header = conditionsTable.appendTableRow();
      header.appendTableCell("Condition").editAsText().setBold(true);
      header.appendTableCell("Dx Age").editAsText().setBold(true);
      formData.patientConditions.forEach(cond => {
        if (cond && (cond.condition || cond.dxAge)) {
          const row = conditionsTable.appendTableRow();
          row.appendTableCell(cond.condition || "");
          row.appendTableCell(cond.dxAge || "");
        }
      });
      conditionsTable.setBorderWidth(1);
      conditionsTable.setBorderColor("#cbd5e1");
    }

    body.appendParagraph(""); // Space

    // FAMILY HISTORY
    body.appendParagraph("Family History")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .setFontSize(14).setBold(true).setForegroundColor("#1e293b")
      .setSpacingBefore(16).setSpacingAfter(8);
    if (formData.familyHistory && Array.isArray(formData.familyHistory) && formData.familyHistory.length > 0) {
      const familyTable = body.appendTable();
      const header = familyTable.appendTableRow();
      header.appendTableCell("Relative").editAsText().setBold(true);
      header.appendTableCell("Side").editAsText().setBold(true);
      header.appendTableCell("Relationship").editAsText().setBold(true);
      header.appendTableCell("Condition").editAsText().setBold(true);
      header.appendTableCell("Dx Age").editAsText().setBold(true);
      formData.familyHistory.forEach(hist => {
        if (hist && (hist.relative || hist.side || hist.relationship || hist.condition || hist.dxAge)) {
          const row = familyTable.appendTableRow();
          row.appendTableCell(hist.relative || "");
          row.appendTableCell(hist.side || "");
          row.appendTableCell(hist.relationship || "");
          row.appendTableCell(hist.condition || "");
          row.appendTableCell(hist.dxAge || "");
        }
      });
      familyTable.setBorderWidth(1);
      familyTable.setBorderColor("#cbd5e1");
    }

    body.appendParagraph(""); // Space

    // DIAGNOSIS & TREATMENT
    body.appendParagraph("Diagnosis & Treatment")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .setFontSize(14).setBold(true).setForegroundColor("#1e293b")
      .setSpacingBefore(16).setSpacingAfter(8);
    body.appendParagraph(`Diagnosis Code: ${formData.diagnosisCode || "N/A"}`);
    body.appendParagraph(`Diagnosis: ${formData.diagnosis || "N/A"}`);
    body.appendParagraph(`Treatment Requested: ${formData.treatmentRequested || "N/A"}`);
    body.appendParagraph(`Medical Justification: ${formData.medicalJustification || "N/A"}`);
    body.appendParagraph(`Prior Treatments: ${formData.priorTreatments || "N/A"}`);
    body.appendParagraph(`Urgency: ${formData.urgency || "N/A"}`);

    body.appendParagraph(""); // Space

    // ADDITIONAL INFORMATION & MEDICAL NECESSITY
    body.appendParagraph("Additional Information & Medical Necessity")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .setFontSize(14).setBold(true).setForegroundColor("#1e293b")
      .setSpacingBefore(16).setSpacingAfter(8);
    body.appendParagraph("Additional information on patient's examination and assessment can be found on progress notes.")
      .setFontSize(11).setSpacingAfter(8);
    body.appendParagraph("Medical Necessity")
      .setFontSize(12).setBold(true).setSpacingAfter(8);
    body.appendParagraph("If a mutation is found in one or more genes on the genetic test, it would provide a diagnosis of a hereditary condition and thereby help clarify the patient's risk and prompt a change in the patient's medical management. Accurate diagnosis will save the patient undue suffering and treatment delays. This information allows healthcare providers to better inform affected individuals and families about prognosis and optimal surveillance strategies and may also guide therapy. Understanding the etiology of the symptoms will enable avoidance of inpatient hospitalization.")
      .setFontSize(11).setSpacingAfter(8);
    body.appendParagraph("For this patient, the genetic test results are needed in order to consider the following medical management strategies:")
      .setFontSize(11).setSpacingAfter(8);

    // MEDICAL MANAGEMENT CONSIDERATIONS
    if (formData.medicalManagement) {
      body.appendParagraph("Medical Management Considerations")
        .setFontSize(12).setBold(true).setSpacingBefore(8).setSpacingAfter(4);
      body.appendParagraph(formData.medicalManagement)
        .setFontSize(11).setSpacingAfter(12);
    }

    // CONCLUSION
    body.appendParagraph("Based on my evaluation and review of the available literature, I believe that the genetic testing is warranted and medically necessary for my patient.")
      .setFontSize(11).setSpacingBefore(12).setSpacingAfter(16);

    // PROVIDER SIGNATURE
    body.appendParagraph("Provider Signature")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .setFontSize(14).setBold(true).setForegroundColor("#1e293b")
      .setSpacingBefore(16).setSpacingAfter(8);
    const signatureTable = body.appendTable();
    const sigRow = signatureTable.appendTableRow();
    sigRow.appendTableCell("Provider Name:").editAsText().setBold(true);
    sigRow.appendTableCell(formData.customProviderName || "N/A");
    sigRow.appendTableCell("Date:").editAsText().setBold(true);
    sigRow.appendTableCell(formData.providerDate || "N/A");
    signatureTable.setBorderWidth(1);
    signatureTable.setBorderColor("#e2e8f0");

    body.appendParagraph(""); // Space

    // FOOTER
    body.appendParagraph("—————————————————————————————————————————————————————")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(10).setForegroundColor("#64748b").setSpacingBefore(24);
    body.appendParagraph(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(8).setForegroundColor("#64748b");
    body.appendParagraph(`© ${new Date().getFullYear()} Hospital in Your Home. All rights reserved.`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(8).setForegroundColor("#64748b");

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
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-");
    const patientName = (formData.patientName || "Unknown").replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `Letter_Medical_Necessity_Other_Providers_${patientName}_${date}_${time}.pdf`;

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
    const formId = "LMNOP-" + Utilities.getUuid();
    const submittedAt = new Date().toLocaleString();

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "Letter of Medical Necessity (Other Providers) submitted successfully",
        fileName: fileName,
        fileId: pdfFile.getId(),
        driveUrl: pdfFile.getUrl(),
        docId: doc.getId(),
        formId: formId,
        submittedAt: submittedAt
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: "Failed to process Letter of Medical Necessity (Other Providers)"
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "Letter of Medical Necessity (Other Providers) Script is running",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions() {
  return ContentService.createTextOutput("");
}
