// Google Apps Script Code - Patient Progress Note (Immunodeficiency)
// Deploy this at scripts.google.com

// Immunodeficiency folder ID from your Google Drive
const IMMUNODEFICIENCY_FOLDER_ID = "1LlSe35aryD2ZEl5rSPhQMgqQI_o6qkja"

function doPost(e) {
  try {
    console.log('POST request received');
    console.log('Request body:', e.postData.contents);
    
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', data);
    
    // Handle both nested formData and flat data structures
    let formData = data.formData || data;
    
    // Remove non-form fields if they exist at the top level
    if (!data.formData) {
      const { formType, specialty, timestamp, ...cleanFormData } = data;
      formData = cleanFormData;
    }

    console.log("Processed form data:", JSON.stringify(formData, null, 2));
    
    // Create a new Google Doc
    const docName = `Progress_Note_Immunodeficiency_${formData.patientName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}_${new Date().toLocaleTimeString().replace(/:/g, '-')}`;
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();
    
    // Set document margins for better formatting
    body.setMarginTop(36);    // 0.5 inch
    body.setMarginBottom(36); // 0.5 inch
    body.setMarginLeft(54);   // 0.75 inch
    body.setMarginRight(54);  // 0.75 inch
    
    // Clear the document
    body.clear();
    
    // HEADER SECTION - Hospital Branding
    const headerTable = body.appendTable();
    const headerRow = headerTable.appendTableRow();
    const logoCell = headerRow.appendTableCell();
    const titleCell = headerRow.appendTableCell();
    
    // Logo cell
    logoCell.appendParagraph("🏥 Hospital in Your Home")
      .setFontSize(14)
      .setBold(true)
      .setForegroundColor("#1e293b");
    logoCell.appendParagraph("Comprehensive Healthcare Solutions")
      .setFontSize(10)
      .setForegroundColor("#64748b");
    
    // Title cell - right aligned
    const titlePara = titleCell.appendParagraph("PROGRESS NOTE - IMMUNODEFICIENCY PATIENT");
    titlePara.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
    titlePara.setFontSize(18);
    titlePara.setBold(true);
    titlePara.setForegroundColor("#1e293b");
    
    titleCell.appendParagraph('Hospital In Your Home - Comprehensive Healthcare Solutions')
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(12)
      .setForegroundColor("#64748b");
    
    // Contact info - right aligned
    titleCell.appendParagraph("📞 1-844-MY-HIYH")
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(10)
      .setForegroundColor("#64748b");
    titleCell.appendParagraph("✉️ info@hiyh.us")
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
      .setFontSize(10)
      .setForegroundColor("#64748b");
    
    // Remove borders from header table
    headerTable.setBorderWidth(0);
    
    body.appendParagraph(''); // Space
    
    // Patient Information Section
    body.appendParagraph('PATIENT INFORMATION')
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .editAsText().setBold(true).setFontSize(14)
      .setForegroundColor("#1e293b");
    
    const patientTable = body.appendTable();
    
    // Patient Name and DOB
    const patientRow1 = patientTable.appendTableRow();
    patientRow1.appendTableCell('Patient Name:').editAsText().setBold(true);
    patientRow1.appendTableCell(formData.patientName || 'N/A');
    patientRow1.appendTableCell('Date of Birth:').editAsText().setBold(true);
    patientRow1.appendTableCell(formData.dateOfBirth || 'N/A');
    
    // MRN and Visit Date
    const patientRow2 = patientTable.appendTableRow();
    patientRow2.appendTableCell('Medical Record Number:').editAsText().setBold(true);
    patientRow2.appendTableCell(formData.medicalRecordNumber || 'N/A');
    patientRow2.appendTableCell('Date of Visit:').editAsText().setBold(true);
    patientRow2.appendTableCell(formData.dateOfVisit || 'N/A');
    
    // Style patient info table
    patientTable.setBorderWidth(1);
    patientTable.setBorderColor("#e2e8f0");
    
    body.appendParagraph(''); // Space
    
    // Clinical Information Section
    body.appendParagraph('CLINICAL INFORMATION')
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .editAsText().setBold(true).setFontSize(14)
      .setForegroundColor("#1e293b");
    
    // Chief Complaint
    body.appendParagraph('Chief Complaint:').editAsText().setBold(true);
    body.appendParagraph(formData.chiefComplaint || 'N/A');
    body.appendParagraph('');
    
    // History of Present Illness
    body.appendParagraph('History of Present Illness:').editAsText().setBold(true);
    body.appendParagraph(formData.historyOfPresentIllness || 'N/A');
    body.appendParagraph('');
    
    // Review of Systems
    if (formData.reviewOfSystems && formData.reviewOfSystems.trim() !== '') {
      body.appendParagraph('Review of Systems:').editAsText().setBold(true);
      body.appendParagraph(formData.reviewOfSystems);
      body.appendParagraph('');
    }
    
    // Physical Examination
    body.appendParagraph('Physical Examination:').editAsText().setBold(true);
    body.appendParagraph(formData.physicalExamination || 'N/A');
    body.appendParagraph('');
    
    // Assessment and Plan Section
    body.appendParagraph('ASSESSMENT AND PLAN')
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .editAsText().setBold(true).setFontSize(14)
      .setForegroundColor("#1e293b");
    
    // Assessment
    body.appendParagraph('Assessment:').editAsText().setBold(true);
    body.appendParagraph(formData.assessment || 'N/A');
    body.appendParagraph('');
    
    // Plan
    body.appendParagraph('Plan:').editAsText().setBold(true);
    body.appendParagraph(formData.plan || 'N/A');
    body.appendParagraph('');
    
    // Provider Information Section
    body.appendParagraph('PROVIDER INFORMATION')
      .setHeading(DocumentApp.ParagraphHeading.HEADING2)
      .editAsText().setBold(true).setFontSize(14)
      .setForegroundColor("#1e293b");
    
    const providerTable = body.appendTable();
    
    // Provider Name and Title
    const providerRow1 = providerTable.appendTableRow();
    providerRow1.appendTableCell('Provider Name:').editAsText().setBold(true);
    providerRow1.appendTableCell(formData.providerName || 'N/A');
    providerRow1.appendTableCell('Provider Title:').editAsText().setBold(true);
    providerRow1.appendTableCell(formData.providerTitle || 'N/A');
    
    // Date and Signature
    const providerRow2 = providerTable.appendTableRow();
    providerRow2.appendTableCell('Date:').editAsText().setBold(true);
    providerRow2.appendTableCell(formData.providerDate || 'N/A');
    providerRow2.appendTableCell('Electronic Signature:').editAsText().setBold(true);
    providerRow2.appendTableCell(formData.providerSignature || 'N/A');
    
    // Style provider table
    providerTable.setBorderWidth(1);
    providerTable.setBorderColor("#e2e8f0");
    
    body.appendParagraph('');
    
    // FOOTER SECTION
    body.appendParagraph("—————————————————————————————————————————————————————")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(10)
      .setForegroundColor("#64748b")
      .setSpacingBefore(24);

    body.appendParagraph(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(8)
      .setForegroundColor("#64748b");

    body.appendParagraph(`© ${new Date().getFullYear()} Hospital in Your Home. All rights reserved.`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(8)
      .setForegroundColor("#64748b");
    
    // Save and close the document
    doc.saveAndClose();
    
    // Convert to PDF
    const docFile = DriveApp.getFileById(doc.getId());
    const pdfBlob = docFile.getAs('application/pdf');

    // Get the target folder
    const folder = DriveApp.getFolderById(IMMUNODEFICIENCY_FOLDER_ID);

    // Create filename for PDF
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-");
    const patientName = (formData.patientName || "Unknown").replace(/[^a-zA-Z0-9]/g, "_");
    const fileName = `Progress_Note_Immunodeficiency_${patientName}_${date}_${time}.pdf`;

    // Save PDF to Google Drive
    const pdfFile = folder.createFile(pdfBlob.setName(fileName));

    // Move the Google Doc to the folder as well
    docFile.moveTo(folder);

    // Make PDF shareable
    pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    console.log('PDF created successfully:', pdfFile.getId());
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Progress Note (Immunodeficiency) submitted successfully',
        fileName: fileName,
        fileId: pdfFile.getId(),
        driveUrl: pdfFile.getUrl()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Failed to process Progress Note (Immunodeficiency)'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'Patient Progress Note - Immunodeficiency Script is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
