# Debug Steps for Blank PDF Issue

## Problem
The form submits successfully but the generated PDF is blank.

## Debug Process

### Step 1: Deploy Debug Script
1. Go to [script.google.com](https://script.google.com)
2. Create a new project or open your existing attestation project
3. Replace the entire code with the content from `immunodeficiency-attestation-debug.js`
4. Save the script
5. Deploy as a new web app
6. Copy the new URL

### Step 2: Update Environment Variable
1. Open `.env.local`
2. Replace the current immunodeficiency attestation URL with the debug version URL
3. Save the file

### Step 3: Test the Debug Version
1. Run the test script: `node test-pdf-content.js`
2. Check the generated PDF URL
3. Open the PDF and examine the content

### Step 4: Analyze Results
The debug PDF should show:
- Raw form data as JSON
- Individual field values
- Any empty or missing fields

### Expected Debug Output
If working correctly, the PDF should contain:
```
DEBUG: Provider Visit Attestation Form Data

Raw Form Data:
{
  "providerName": "Dr. Test Provider",
  "providerAddress": "123 Test St, Test City, TC 12345",
  "npiNumber": "1234567890",
  ...
}

Individual Field Values:
providerName: Dr. Test Provider
providerAddress: 123 Test St, Test City, TC 12345
npiNumber: 1234567890
...
```

### Possible Issues to Look For
1. **All fields showing "EMPTY"** - Data parsing problem
2. **Missing fields** - Field name mismatch
3. **Malformed JSON** - Serialization issue
4. **Error in PDF** - Script execution error

### Step 5: Fix and Redeploy
Based on the debug results, we can identify the exact issue and fix the original script.

### Step 6: Restore Original Script
Once fixed, deploy the corrected version and restore the proper URL in `.env.local`
