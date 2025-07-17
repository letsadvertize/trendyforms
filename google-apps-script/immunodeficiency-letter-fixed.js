// Google Apps Script Code - Letter of Medical Necessity (Immunodeficiency)
// Deploy this at scripts.google.com

// Immunodeficiency folder ID from your Google Drive
const IMMUNODEFICIENCY_FOLDER_ID = "1LlSe35aryD2ZEl5rSPhQMgqQI_o6qkja"

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

    // Create a Google Doc with the form content
    const docName = `Letter_Medical_Necessity_Immunodeficiency_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`
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
    
    // Logo cell
    logoCell.appendParagraph("🏥 Hospital in Your Home")
      .setFontSize(14)
      .setBold(true)
      .setForegroundColor("#1e293b")
    logoCell.appendParagraph("Comprehensive Healthcare Solutions")
      .setFontSize(10)
      .setForegroundColor("#64748b")
    
    // Title cell - right aligned
    const titlePara = titleCell.appendParagraph("Letter of Medical Necessity")
    titlePara.setHeading(DocumentApp.ParagraphHeading.TITLE)
    titlePara.setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
    titlePara.setFontSize(18)
    titlePara.setBold(true)
    titlePara.setForegroundColor("#1e293b")
    
    const subtitlePara = titleCell.appendParagraph("Immunodeficiency Genetic Testing")
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
    headerRow.getCell(0).setWidth(200)
    headerRow.getCell(1).setWidth(300)
    
    body.appendParagraph("") // Space after header

    // PATIENT AND DATE SECTION
    const patientDateTable = body.appendTable()
    const patientDateRow = patientDateTable.appendTableRow()
    
    const patientCell = patientDateRow.appendTableCell()
    patientCell.appendParagraph("Patient Name: " + (formData.patientName || "___________________"))
      .setFontSize(12)
      .setBold(false)
    
    const dateCell = patientDateRow.appendTableCell()
    dateCell.appendParagraph("Date: " + (formData.date || formData.providerDate || new Date().toLocaleDateString()))
      .setFontSize(12)
      .setBold(false)
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
    
    patientDateTable.setBorderWidth(0)
    body.appendParagraph("") // Space

    // MEDICAL STATEMENT SECTION
    body.appendParagraph("To whomsoever it may concern:")
      .setFontSize(12)
      .setBold(true)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setSpacingAfter(12)

    body.appendParagraph(`I am writing on behalf of my patient, ${formData.patientName || "Patient Name"}, to document the medical necessity of Immunodeficiency genetic testing.`)
      .setFontSize(11)
      .setSpacingAfter(8)

    const hereditaryText = formData.hereditaryCondition || "immunodeficiency condition"
    body.appendParagraph(`I have determined that this test is medically necessary for the above patient due to the following history, which is strongly indicative of genetic etiology or a hereditary ${hereditaryText} consistent with a mutation in multiple genes.`)
      .setFontSize(11)
      .setSpacingAfter(12)

    // PATIENT PERSONAL HISTORY SECTION
    body.appendParagraph("Patient Personal History")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .setFontSize(14)
      .setBold(true)
      .setForegroundColor("#1e293b")
      .setSpacingBefore(16)
      .setSpacingAfter(8)

    if (formData.patientConditions && Array.isArray(formData.patientConditions) && formData.patientConditions.length > 0) {
      const conditionsTable = body.appendTable()
      
      // Header row for conditions table
      const conditionsHeader = conditionsTable.appendTableRow()
      
      // Create header cells and clear any default content
      const headerCell1 = conditionsHeader.appendTableCell()
      headerCell1.clear()
      headerCell1.appendParagraph("Immunodeficiency Conditions")
        .setFontSize(11)
        .setBold(true)
        .setForegroundColor("#374151")
      
      const headerCell2 = conditionsHeader.appendTableCell()
      headerCell2.clear()
      headerCell2.appendParagraph("Dx Age")
        .setFontSize(11)
        .setBold(true)
        .setForegroundColor("#374151")
      
      // Set header row background
      headerCell1.setBackgroundColor("#f1f5f9")
      headerCell2.setBackgroundColor("#f1f5f9")
      
      // Data rows
      formData.patientConditions.forEach(condition => {
        if (condition && (condition.condition || condition.dxAge)) {
          const row = conditionsTable.appendTableRow()
          
          const dataCell1 = row.appendTableCell()
          dataCell1.clear()
          dataCell1.appendParagraph(condition.condition || "").setFontSize(10)
          
          const dataCell2 = row.appendTableCell()
          dataCell2.clear()
          dataCell2.appendParagraph(condition.dxAge || "").setFontSize(10)
        }
      })
      
      conditionsTable.setBorderWidth(1)
      conditionsTable.setBorderColor("#cbd5e1")
    }

    body.appendParagraph("") // Space

    // FAMILY HISTORY SECTION
    body.appendParagraph("Family History")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .setFontSize(14)
      .setBold(true)
      .setForegroundColor("#1e293b")
      .setSpacingBefore(16)
      .setSpacingAfter(8)

    if (formData.familyHistory && Array.isArray(formData.familyHistory) && formData.familyHistory.length > 0) {
      const familyTable = body.appendTable()
      
      // Header row for family history table
      const familyHeader = familyTable.appendTableRow()
      
      // Create and clear header cells
      const familyHeaderCell1 = familyHeader.appendTableCell()
      familyHeaderCell1.clear()
      familyHeaderCell1.appendParagraph("First-, Second-, or Third-Degree Relative").setFontSize(9).setBold(true)
      
      const familyHeaderCell2 = familyHeader.appendTableCell()
      familyHeaderCell2.clear()
      familyHeaderCell2.appendParagraph("(M: Maternal or P: Paternal) Side").setFontSize(9).setBold(true)
      
      const familyHeaderCell3 = familyHeader.appendTableCell()
      familyHeaderCell3.clear()
      familyHeaderCell3.appendParagraph("Relationship").setFontSize(9).setBold(true)
      
      const familyHeaderCell4 = familyHeader.appendTableCell()
      familyHeaderCell4.clear()
      familyHeaderCell4.appendParagraph("Condition").setFontSize(9).setBold(true)
      
      const familyHeaderCell5 = familyHeader.appendTableCell()
      familyHeaderCell5.clear()
      familyHeaderCell5.appendParagraph("Dx Age").setFontSize(9).setBold(true)
      
      // Set header background
      familyHeaderCell1.setBackgroundColor("#f1f5f9")
      familyHeaderCell2.setBackgroundColor("#f1f5f9")
      familyHeaderCell3.setBackgroundColor("#f1f5f9")
      familyHeaderCell4.setBackgroundColor("#f1f5f9")
      familyHeaderCell5.setBackgroundColor("#f1f5f9")
      
      // Data rows
      formData.familyHistory.forEach(history => {
        if (history && (history.relative || history.side || history.relationship || history.condition || history.dxAge)) {
          const row = familyTable.appendTableRow()
          
          const familyDataCell1 = row.appendTableCell()
          familyDataCell1.clear()
          familyDataCell1.appendParagraph(history.relative || "").setFontSize(9)
          
          const familyDataCell2 = row.appendTableCell()
          familyDataCell2.clear()
          familyDataCell2.appendParagraph(history.side || "").setFontSize(9)
          
          const familyDataCell3 = row.appendTableCell()
          familyDataCell3.clear()
          familyDataCell3.appendParagraph(history.relationship || "").setFontSize(9)
          
          const familyDataCell4 = row.appendTableCell()
          familyDataCell4.clear()
          familyDataCell4.appendParagraph(history.condition || "").setFontSize(9)
          
          const familyDataCell5 = row.appendTableCell()
          familyDataCell5.clear()
          familyDataCell5.appendParagraph(history.dxAge || "").setFontSize(9)
        }
      })
      
      familyTable.setBorderWidth(1)
      familyTable.setBorderColor("#cbd5e1")
    }

    body.appendParagraph("") // Space

    // ADDITIONAL INFORMATION & MEDICAL NECESSITY SECTION
    body.appendParagraph("Additional Information & Medical Necessity")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .setFontSize(14)
      .setBold(true)
      .setForegroundColor("#1e293b")
      .setSpacingBefore(16)
      .setSpacingAfter(8)

    body.appendParagraph("Additional information on patient's examination and assessment can be found on progress notes.")
      .setFontSize(11)
      .setSpacingAfter(8)

    body.appendParagraph("Medical Necessity")
      .setFontSize(12)
      .setBold(true)
      .setSpacingAfter(8)

    const medicalNecessityText = `If a mutation is found in one or more genes on the Immunodeficiency genetic test, it would provide a diagnosis of a hereditary Immunodeficiency condition and thereby helping to clarify the patient's risk and prompting a change in the patient's medical management. Accurate diagnosis will undoubtedly save the patient undue suffering and treatment delays. This information allows healthcare providers to better inform affected individuals and families about prognosis and optimal surveillance strategies and may also guide therapy. Understanding the etiology of the symptoms will enable avoidance of inpatient hospitalization. Patients with severe combined immunodeficiency might have similar phenotypes even though they have variants in different genes. Knowing which gene is affected helps determine whether the best treatment option might be enzyme replacement therapy, gene therapy, or a stem cell transplant. In addition, once the molecular diagnosis is established, healthcare providers can better define the risk of recurrence and decide whether to screen unaffected family members for carrier status, to identify a suitable stem cell donor, or for other purposes.`
    
    body.appendParagraph(medicalNecessityText)
      .setFontSize(11)
      .setSpacingAfter(8)

    body.appendParagraph("For this patient, the genetic test results are needed in order to consider the following medical management strategies:")
      .setFontSize(11)
      .setSpacingAfter(8)

    // MEDICAL MANAGEMENT CONSIDERATIONS
    if (formData.medicalManagement) {
      body.appendParagraph("Medical Management Considerations")
        .setFontSize(12)
        .setBold(true)
        .setSpacingBefore(8)
        .setSpacingAfter(4)
      
      body.appendParagraph(formData.medicalManagement)
        .setFontSize(11)
        .setSpacingAfter(12)
    }

    // CONCLUSION SECTION
    body.appendParagraph("Based on my evaluation and review of the available literature, I believe that the Immunodeficiency genetic testing offered by Hospital In Your Home HIYH is warranted and medically necessary for my patient.")
      .setFontSize(11)
      .setBold(false)
      .setSpacingBefore(12)
      .setSpacingAfter(16)

    // PROVIDER INFORMATION SECTION
    body.appendParagraph("Provider Information")
      .setHeading(DocumentApp.ParagraphHeading.HEADING1)
      .setFontSize(14)
      .setBold(true)
      .setForegroundColor("#1e293b")
      .setSpacingBefore(16)
      .setSpacingAfter(8)

    const providerTable = body.appendTable()
    const providerRow = providerTable.appendTableRow()
    
    const providerNameCell = providerRow.appendTableCell()
    providerNameCell.appendParagraph("Provider Name: " + (formData.providerName || "___________________"))
      .setFontSize(12)
    
    const providerDateCell = providerRow.appendTableCell()
    providerDateCell.appendParagraph("Date: " + (formData.providerDate || "___________________"))
      .setFontSize(12)
      .setAlignment(DocumentApp.HorizontalAlignment.RIGHT)
    
    providerTable.setBorderWidth(0)

    // FOOTER SECTION
    body.appendParagraph("")
    body.appendParagraph("—————————————————————————————————————————————————————")
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(10)
      .setForegroundColor("#64748b")
      .setSpacingBefore(24)

    body.appendParagraph(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(8)
      .setForegroundColor("#64748b")

    body.appendParagraph(`© ${new Date().getFullYear()} Hospital in Your Home. All rights reserved.`)
      .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
      .setFontSize(8)
      .setForegroundColor("#64748b")

    // Save and close the document
    doc.saveAndClose()

    // Convert to PDF
    const docFile = DriveApp.getFileById(doc.getId())
    const pdfBlob = docFile.getAs('application/pdf')

    // Get the target folder
    const folder = DriveApp.getFolderById(IMMUNODEFICIENCY_FOLDER_ID)

    // Create filename for PDF
    const date = new Date().toISOString().split("T")[0]
    const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-")
    const patientName = (formData.patientName || "Unknown").replace(/[^a-zA-Z0-9]/g, "_")
    const fileName = `Letter_Medical_Necessity_Immunodeficiency_${patientName}_${date}_${time}.pdf`

    // Save PDF to Google Drive
    const pdfFile = folder.createFile(pdfBlob.setName(fileName))

    // Move the Google Doc to the folder as well
    docFile.moveTo(folder)

    // Return success response
    const response = {
      success: true,
      fileId: pdfFile.getId(),
      fileName: fileName,
      driveUrl: pdfFile.getUrl(),
      docId: doc.getId(),
      message: "Letter of Medical Necessity (Immunodeficiency) submitted and saved to Google Drive successfully"
    }

    const output = ContentService.createTextOutput(JSON.stringify(response))
    output.setMimeType(ContentService.MimeType.JSON)
    return output

  } catch (error) {
    console.error("Error processing immunodeficiency letter:", error)
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      message: "Failed to process Letter of Medical Necessity (Immunodeficiency)",
      stack: error.stack
    }

    const errorOutput = ContentService.createTextOutput(JSON.stringify(errorResponse))
    errorOutput.setMimeType(ContentService.MimeType.JSON)
    return errorOutput
  }
}

function doGet() {
  // Handle GET requests for testing
  return ContentService.createTextOutput(JSON.stringify({
    message: "Immunodeficiency Letter Google Apps Script is running",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON)
}

function doOptions() {
  return ContentService.createTextOutput("")
}
