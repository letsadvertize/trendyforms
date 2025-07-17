# Google Apps Script Setup Guide

This guide will help you set up individual Google Apps Scripts for each medical form type.

## Overview

Each form type has its own dedicated Google Apps Script:

1. **Letter of Medical Necessity - Immunodeficiency** (`immunodeficiency-letter-fixed.js`)
2. **Letter of Medical Necessity - Neurodegenerative** (`neurodegenerative-letter.js`)
3. **Provider Visit Attestation - Immunodeficiency** (`immunodeficiency-attestation.js`)
4. **Provider Visit Attestation - Neurodegenerative** (`neurodegenerative-attestation.js`)

## Step 1: Create Google Apps Script Projects

For each form type, create a separate Google Apps Script project:

### 1.1 Immunodeficiency Letter of Medical Necessity

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the code from `google-apps-script/immunodeficiency-letter-fixed.js`
4. Save the project with name: "Immunodeficiency Letter Medical Necessity"

### 1.2 Neurodegenerative Letter of Medical Necessity

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the code from `google-apps-script/neurodegenerative-letter.js`
4. Save the project with name: "Neurodegenerative Letter Medical Necessity"

### 1.3 Immunodeficiency Provider Visit Attestation

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the code from `google-apps-script/immunodeficiency-attestation.js`
4. Save the project with name: "Immunodeficiency Provider Visit Attestation"

### 1.4 Neurodegenerative Provider Visit Attestation

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the code from `google-apps-script/neurodegenerative-attestation.js`
4. Save the project with name: "Neurodegenerative Provider Visit Attestation"

## Step 2: Update Folder IDs

In each script, make sure the folder IDs match your Google Drive folders:

**For Immunodeficiency scripts:**
```javascript
const IMMUNODEFICIENCY_FOLDER_ID = "1LlSe35aryD2ZEl5rSPhQMgqQI_o6qkja"
```

**For Neurodegenerative scripts:**
```javascript
const NEURODEGENERATIVE_FOLDER_ID = "1rEAHZCTCL1dHSaT3Z68T2gxRJSBP0836"
```

## Step 3: Deploy Each Script as Web App

For each of the 4 scripts:

1. Click "Deploy" > "New deployment"
2. Choose type: "Web app"
3. Description: Use the script name (e.g., "Immunodeficiency Letter Medical Necessity")
4. Execute as: "Me"
5. Who has access: "Anyone" (this allows your Next.js app to call it)
6. Click "Deploy"
7. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 4: Update Environment Variables

Add all four Web App URLs to your `.env.local` file:

```env
# Letter of Medical Necessity - Immunodeficiency
GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_LETTER=https://script.google.com/macros/s/YOUR_IMMUNODEFICIENCY_LETTER_SCRIPT_ID/exec

# Letter of Medical Necessity - Neurodegenerative
GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_LETTER=https://script.google.com/macros/s/YOUR_NEURODEGENERATIVE_LETTER_SCRIPT_ID/exec

# Provider Visit Attestation - Immunodeficiency
GOOGLE_APPS_SCRIPT_IMMUNODEFICIENCY_ATTESTATION=https://script.google.com/macros/s/YOUR_IMMUNODEFICIENCY_ATTESTATION_SCRIPT_ID/exec

# Provider Visit Attestation - Neurodegenerative
GOOGLE_APPS_SCRIPT_NEURODEGENERATIVE_ATTESTATION=https://script.google.com/macros/s/YOUR_NEURODEGENERATIVE_ATTESTATION_SCRIPT_ID/exec
```

## Step 5: Test Each Form

Test each form type individually:

1. **Immunodeficiency Letter**: http://localhost:3000/immunodeficiency/letter-medical-necessity
2. **Neurodegenerative Letter**: http://localhost:3000/neurodegenerative/letter-medical-necessity
3. **Immunodeficiency Attestation**: http://localhost:3000/immunodeficiency/provider-visit-attestation
4. **Neurodegenerative Attestation**: http://localhost:3000/neurodegenerative/provider-visit-attestation

For each form:
1. Fill out the form with test data
2. Submit the form
3. Check your Google Drive folders to see if the PDF was created
4. Verify the PDF contains all form data with professional formatting

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure the deployment has "Anyone" access
2. **Permission Errors**: The script runs under your Google account, so make sure you have access to the Drive folders
3. **PDF Not Generated**: Check the Apps Script logs in the editor for error messages
4. **Wrong Folder**: Verify the folder IDs in the script match your actual folder IDs

### Getting Folder IDs:

To get a folder ID from a Google Drive URL:
- URL: `https://drive.google.com/drive/folders/1EV0Lf19OyE8ZgL8L0WozvQTdE9I9lEbu`
- Folder ID: `1EV0Lf19OyE8ZgL8L0WozvQTdE9I9lEbu`

### Testing the Script:

You can test the script directly in the Apps Script editor:

1. Go to the Apps Script editor
2. Select the `doPost` function
3. Click "Run" to test (you may need to authorize permissions first)

## Security Notes

- The script runs under your Google account
- Only you can edit the script
- The web app URL is public but doesn't expose sensitive data
- All PDFs are saved to your private Google Drive folders
