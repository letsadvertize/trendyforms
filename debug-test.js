// This file should be deleted - it's a debug script that's no longer needed
const testFormData = {
  providerName: "Dr. Debug Test",
  providerAddress: "123 Debug St, Debug City, DC 12345",
  npiNumber: "9876543210",
  phoneNumber: "555-DEBUG-1",
  faxNumber: "555-DEBUG-2",
  patientName: "Debug Patient",
  patientAddress: "456 Patient Debug Ave, Patient City, PC 67890",
  patientDOB: "1985-01-01",
  dateOfConsult: "2025-07-17",
  icdCodes: "D80.1, D84.1",
  dateOfService: "2025-07-17",
  providerSignature: "Dr. Debug Test",
  providerNameSignature: "Dr. Debug Test, MD",
  signatureDate: "2025-07-17"
}

const requestBody = {
  formType: "provider-visit-attestation-immunodeficiency",
  specialty: "immunodeficiency",
  formData: testFormData,
  timestamp: new Date().toISOString(),
}

console.log("DEBUG test request body:", JSON.stringify(requestBody, null, 2))

// Test the API endpoint with debug script
fetch("http://localhost:3000/api/forms/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(requestBody),
})
.then(response => response.json())
.then(data => {
  console.log("DEBUG API Response:", data)
  if (data.success && data.driveUrl) {
    console.log("DEBUG PDF URL:", data.driveUrl)
    console.log("Open this URL to see the debug PDF with raw form data")
  }
})
.catch(error => console.error("DEBUG Error:", error))
