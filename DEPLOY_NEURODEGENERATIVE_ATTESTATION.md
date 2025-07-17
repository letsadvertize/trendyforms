# Deploy Neurodegenerative Attestation Script

## Current Issue
The neurodegenerative attestation form is currently using the immunodeficiency script URL. You need to deploy the neurodegenerative script as a separate Google Apps Script project.

## Steps to Deploy

### 1. Create New Google Apps Script Project
1. Go to [scripts.google.com](https://scripts.google.com)
2. Click "New Project" (NOT editing an existing one)
3. Name it: "Provider Visit Attestation - Neurodegenerative"

### 2. Copy the Script Code
Copy the entire content from `google-apps-script/neurodegenerative-attestation.js` into the new project.

### 3. Deploy the Script
1. Click "Deploy" → "New Deployment"
2. Choose "Web app" as the type
3. Set:
   - **Execute as**: "Me" (your Google account)
   - **Who has access**: "Anyone"
4. Click "Deploy"
5. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/SCRIPT_ID_HERE/exec
   ```

### 4. Update Environment Variable
Replace the current neurodegenerative attestation URL in `.env.local`:

```bash
# BEFORE (currently wrong - points to immunodeficiency script):
GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_ATTESTATION=https://script.google.com/macros/s/AKfycbxgCu9Ju2t0r_cwqh5YnLtYN-gZd7zv3YiUftTeF1HNw42BrhF8yTaUnK89SD3qV8BemA/exec

# AFTER (replace with your new deployment URL):
GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_ATTESTATION=https://script.google.com/macros/s/YOUR_NEW_SCRIPT_ID_HERE/exec
```

### 5. Restart Your Development Server
After updating the environment variable, restart your Next.js dev server:
```bash
npm run dev
```

## Testing the Deployment

### Test 1: Direct Script Test
Use this PowerShell command to test the script directly:

```powershell
$testData = @{
  formType = "provider-visit-attestation-neurodegenerative"
  specialty = "neurodegenerative"
  formData = @{
    providerName = "Dr. Jane Smith"
    providerAddress = "123 Medical Center Dr, Healthcare City, HC 12345"
    npiNumber = "1234567890"
    phoneNumber = "(555) 123-4567"
    faxNumber = "(555) 123-4568"
    patientName = "John Doe"
    patientAddress = "456 Patient St, Patient City, PC 67890"
    patientDOB = "1980-01-15"
    dateOfConsult = "2025-07-17"
    icdCodes = "G30.9, G20"
    dateOfService = "2025-07-17"
    providerSignature = "Dr. Jane Smith"
    providerNameSignature = "Dr. Jane Smith"
    signatureDate = "2025-07-17"
  }
  timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
}
$jsonData = $testData | ConvertTo-Json -Depth 10
Invoke-RestMethod -Uri "YOUR_NEW_SCRIPT_URL_HERE" -Method POST -Body $jsonData -ContentType "application/json"
```

**Expected Response:**
- `success: True`
- `message: "Provider Visit Attestation (Neurodegenerative) submitted..."`
- `fileName: "Provider_Visit_Attestation_Neurodegenerative_..."`

### Test 2: Web App Test
After restarting the dev server, test the form through the web interface:
1. Go to `http://localhost:3000/neurodegenerative/provider-visit-attestation`
2. Fill out the form
3. Submit and verify the PDF is created in the Neurodegenerative folder

## Verification Checklist
- [ ] New Google Apps Script project created
- [ ] Script code copied from `neurodegenerative-attestation.js`
- [ ] Script deployed as web app
- [ ] Environment variable updated with new URL
- [ ] Development server restarted
- [ ] Direct script test returns "Neurodegenerative" in message
- [ ] Web form submission works correctly
- [ ] PDF is created in correct Drive folder
- [ ] PDF contains correct form title and data

## Common Issues

### Script Returns HTML Instead of JSON
- Check that the script URL ends with `/exec`
- Verify the script is deployed as a web app, not as an API executable
- Ensure "Who has access" is set to "Anyone"

### Script Returns 404 or Access Denied
- Check that the script URL is correct
- Verify the script is deployed and published
- Try redeploying the script

### PDF is Blank or Missing Data
- Check the Google Apps Script logs for errors
- Verify the folder ID `NEURODEGENERATIVE_FOLDER_ID` is correct
- Test with the internal `testScript()` function

## Next Steps
Once the neurodegenerative script is deployed and working:
1. Test the immunodeficiency attestation script similarly
2. Deploy any remaining scripts (progress notes)
3. Clean up any debug code
4. Document the final deployment for production use
