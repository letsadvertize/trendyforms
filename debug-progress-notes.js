// This file should be deleted - it's a debug script that's no longer needed
const testProgressNotes = async () => {
  console.log("Testing Progress Note Forms...");
  
  // Test data
  const testData = {
    patientName: "John Doe Test",
    dateOfBirth: "1980-01-01",
    medicalRecordNumber: "MRN123456",
    dateOfVisit: "2025-01-17",
    chiefComplaint: "Recurrent respiratory infections",
    historyOfPresentIllness: "Patient reports increasing frequency of respiratory infections over the past 6 months",
    reviewOfSystems: "Constitutional: Fatigue, weight loss. Respiratory: Cough, dyspnea",
    physicalExamination: "General: Alert, oriented. Respiratory: Decreased breath sounds bilaterally",
    assessment: "Primary immunodeficiency with recurrent respiratory infections",
    plan: "Continue current immunoglobulin therapy, monitor for infections",
    providerName: "Dr. Jane Smith",
    providerTitle: "MD",
    providerDate: "2025-01-17",
    providerSignature: "Dr. Jane Smith"
  };

  // Test Immunodeficiency Progress Note
  try {
    const immunoResponse = await fetch("/api/forms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "patient-progress-immunodeficiency",
        formData: testData,
        timestamp: new Date().toISOString()
      })
    });
    
    const immunoResult = await immunoResponse.json();
    console.log("Immunodeficiency Progress Note:", immunoResult);
  } catch (error) {
    console.error("Immunodeficiency Progress Note Error:", error);
  }

  // Test Neurodegenerative Progress Note
  try {
    const neuroResponse = await fetch("/api/forms/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "patient-progress-neurodegenerative",
        formData: testData,
        timestamp: new Date().toISOString()
      })
    });
    
    const neuroResult = await neuroResponse.json();
    console.log("Neurodegenerative Progress Note:", neuroResult);
  } catch (error) {
    console.error("Neurodegenerative Progress Note Error:", error);
  }
};

// Run in browser console
testProgressNotes();
