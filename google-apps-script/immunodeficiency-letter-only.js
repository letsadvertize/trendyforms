// Google Apps Script Code - Letter of Medical Necessity (Immunodeficiency)
// Deploy this at scripts.google.com

// Immunodeficiency folder ID from your Google Drive
const IMMUNODEFICIENCY_FOLDER_ID = "1LlSe35aryD2ZEl5rSPhQMgqQI_o6qkja"

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents)
    const { formData } = data

    console.log("Received immunodeficiency letter data for:", formData.patientName)

    // Create a Google Doc with the form content
    const docName = `Letter_Medical_Necessity_Immunodeficiency_${formData.patientName || 'Unknown'}_${new Date().toISOString().split('T')[0]}`
    const doc = DocumentApp.create(docName)
    const body = doc.getBody()

    // Add header
    const header = body.appendParagraph("Letter of Medical Necessity")
    header.setHeading(DocumentApp.ParagraphHeading.TITLE)
    header.setAlignment(DocumentApp.HorizontalAlignment.CENTER)

    body.appendParagraph("Immunodeficiency Services")
    body.appendParagraph(`Generated: ${new Date().toLocaleDateString()}`)
    body.appendParagraph("") // Empty line

    // Hospital Information
    body.appendParagraph("Hospital in Your Home")
    body.appendParagraph("📞 1-844-MY-HIYH")
    body.appendParagraph("✉️ info@hiyh.us")
    body.appendParagraph("") // Empty line

    // Patient Information
    body.appendParagraph("PATIENT INFORMATION").setHeading(DocumentApp.ParagraphHeading.HEADING1)
    body.appendParagraph(`Patient Name: ${formData.patientName || 'N/A'}`)
    body.appendParagraph(`Date: ${formData.date || 'N/A'}`)
    body.appendParagraph("") // Empty line

    // Medical Statement
    body.appendParagraph("MEDICAL STATEMENT").setHeading(DocumentApp.ParagraphHeading.HEADING1)
    body.appendParagraph("To whomsoever it may concern:")
    body.appendParagraph(`I am writing on behalf of my patient, ${formData.patientName || 'the patient'} to document the medical necessity of Immunodeficiency genetic testing.`)
    body.appendParagraph("I have determined that this test is medically necessary for the above patient due to the following history, which is strongly indicative of genetic etiology or a hereditary immunodeficiency condition consistent with a mutation in multiple genes.")
    body.appendParagraph("") // Empty line

    // Patient Conditions
    if (formData.patientConditions && Array.isArray(formData.patientConditions) && formData.patientConditions.length > 0) {
      body.appendParagraph("PATIENT CONDITIONS").setHeading(DocumentApp.ParagraphHeading.HEADING1)
      formData.patientConditions.forEach(condition => {
        if (condition.condition) {
          body.appendParagraph(`• ${condition.condition}${condition.dxAge ? ` (Diagnosis Age: ${condition.dxAge})` : ''}`)
        }
      })
      body.appendParagraph("") // Empty line
    }

    // Family History
    if (formData.familyHistory && Array.isArray(formData.familyHistory) && formData.familyHistory.length > 0) {
      body.appendParagraph("FAMILY HISTORY").setHeading(DocumentApp.ParagraphHeading.HEADING1)
      formData.familyHistory.forEach(history => {
        if (history.relative || history.condition) {
          const historyText = []
          if (history.relative) historyText.push(`Relative: ${history.relative}`)
          if (history.side) historyText.push(`Side: ${history.side}`)
          if (history.relationship) historyText.push(`Relationship: ${history.relationship}`)
          if (history.condition) historyText.push(`Condition: ${history.condition}`)
          if (history.dxAge) historyText.push(`Diagnosis Age: ${history.dxAge}`)
          body.appendParagraph(`• ${historyText.join(', ')}`)
        }
      })
      body.appendParagraph("") // Empty line
    }

    // Medical Management
    if (formData.medicalManagement) {
      body.appendParagraph("MEDICAL MANAGEMENT CONSIDERATIONS").setHeading(DocumentApp.ParagraphHeading.HEADING1)
      body.appendParagraph("For this patient, the genetic test results are needed in order to consider the following medical management strategies:")
      body.appendParagraph(formData.medicalManagement)
      body.appendParagraph("") // Empty line
    }

    // Hereditary Condition
    if (formData.hereditaryCondition) {
      body.appendParagraph("HEREDITARY CONDITION").setHeading(DocumentApp.ParagraphHeading.HEADING1)
      body.appendParagraph(formData.hereditaryCondition)
      body.appendParagraph("") // Empty line
    }

    // Medical Necessity Statement
    body.appendParagraph("MEDICAL NECESSITY").setHeading(DocumentApp.ParagraphHeading.HEADING1)
    body.appendParagraph("If a mutation is found in one or more genes on the Immunodeficiency genetic test, it would provide a diagnosis of a hereditary Immunodeficiency condition and thereby helping to clarify the patient's risk and prompting a change in the patient's medical management.")
    body.appendParagraph("")
    body.appendParagraph("Accurate diagnosis will undoubtedly save the patient undue suffering and treatment delays. This information allows healthcare providers to better inform affected individuals and families about prognosis and optimal surveillance strategies and may also guide therapy.")
    body.appendParagraph("")
    body.appendParagraph("Understanding the etiology of the symptoms will enable avoidance of inpatient hospitalization. Patients with severe combined immunodeficiency might have similar phenotypes even though they have variants in different genes. Knowing which gene is affected helps determine whether the best treatment option might be enzyme replacement therapy, gene therapy, or a stem cell transplant.")
    body.appendParagraph("")
    body.appendParagraph("In addition, once the molecular diagnosis is established, healthcare providers can better define the risk of recurrence and decide whether to screen unaffected family members for carrier status, to identify a suitable stem cell donor, or for other purposes.")
    body.appendParagraph("") // Empty line

    // Conclusion
    body.appendParagraph("CONCLUSION").setHeading(DocumentApp.ParagraphHeading.HEADING1)
    body.appendParagraph("Based on my evaluation and review of the available literature, I believe that the Immunodeficiency genetic testing offered by Hospital In Your Home HIYH is warranted and medically necessary for my patient.")
    body.appendParagraph("") // Empty line

    // Provider Information
    body.appendParagraph("PROVIDER INFORMATION").setHeading(DocumentApp.ParagraphHeading.HEADING1)
    body.appendParagraph(`Provider Name: ${formData.providerName || 'N/A'}`)
    body.appendParagraph(`Date: ${formData.providerDate || 'N/A'}`)
    body.appendParagraph("") // Empty line

    // Footer
    body.appendParagraph("—————————————————————————————————————————————————————")
    body.appendParagraph(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`)
    body.appendParagraph(`© ${new Date().getFullYear()} Hospital in Your Home. All rights reserved.`)

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

    // Return success response (simplified - no method chaining)
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
    output.setHeader("Access-Control-Allow-Origin", "*")
    output.setHeader("Access-Control-Allow-Methods", "POST")
    output.setHeader("Access-Control-Allow-Headers", "Content-Type")
    return output

  } catch (error) {
    console.error("Error processing immunodeficiency letter:", error)
    
    const errorResponse = {
      success: false,
      error: error.toString(),
      message: "Failed to process Letter of Medical Necessity (Immunodeficiency)"
    }

    const errorOutput = ContentService.createTextOutput(JSON.stringify(errorResponse))
    errorOutput.setMimeType(ContentService.MimeType.JSON)
    errorOutput.setHeader("Access-Control-Allow-Origin", "*")
    return errorOutput
  }
}

function doOptions() {
  const optionsOutput = ContentService.createTextOutput("")
  optionsOutput.setHeader("Access-Control-Allow-Origin", "*")
  optionsOutput.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  optionsOutput.setHeader("Access-Control-Allow-Headers", "Content-Type")
  return optionsOutput
}
