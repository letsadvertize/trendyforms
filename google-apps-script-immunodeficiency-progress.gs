function doPost(e) {
  const FOLDER_ID = '1N-_741ZPSiZL6RrWqlFU5Pj9u8dcxxke';
  
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Create the document content
    const content = createProgressNotesContent(data);
    
    // Get the folder where we want to save the document
    const folder = DriveApp.getFolderById(FOLDER_ID);
    
    // Create the document
    const fileName = `Immunodeficiency_Progress_Notes_${data.patientName}_${new Date().toISOString().split('T')[0]}`;
    const doc = DocumentApp.create(fileName);
    
    // Add content to the document
    const body = doc.getBody();
    body.clear();
    body.appendParagraph(content);
    
    // Move the document to the specified folder
    const file = DriveApp.getFileById(doc.getId());
    file.moveTo(folder);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Progress notes created successfully',
        documentId: doc.getId(),
        documentUrl: doc.getUrl()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error creating progress notes: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function createProgressNotesContent(data) {
  const currentDate = new Date().toLocaleDateString();
  
  return `IMMUNODEFICIENCY PROGRESS NOTES

Date: ${currentDate}

PATIENT INFORMATION:
Name: ${data.patientName || ''}
Date of Birth: ${data.dateOfBirth || ''}
Medical Record Number: ${data.medicalRecordNumber || ''}

PROVIDER INFORMATION:
Provider Name: ${data.providerName || ''}
Provider Title: ${data.providerTitle || ''}
Clinic/Institution: ${data.clinicName || ''}

CHIEF COMPLAINT:
${data.chiefComplaint || ''}

HISTORY OF PRESENT ILLNESS:
${data.historyOfPresentIllness || ''}

REVIEW OF SYSTEMS:
${data.reviewOfSystems || ''}

PHYSICAL EXAMINATION:
${data.physicalExamination || ''}

IMMUNODEFICIENCY SPECIFIC ASSESSMENT:
Current Immunodeficiency Diagnosis: ${data.immunodeficiencyDiagnosis || ''}
Immunoglobulin Levels: ${data.immunoglobulinLevels || ''}
Infection History: ${data.infectionHistory || ''}
Current Treatments: ${data.currentTreatments || ''}

ASSESSMENT AND PLAN:
${data.assessmentAndPlan || ''}

MEDICATIONS:
${data.medications || ''}

FOLLOW-UP:
${data.followUp || ''}

Provider Signature: ${data.providerName || ''}
Date: ${currentDate}`;
}
