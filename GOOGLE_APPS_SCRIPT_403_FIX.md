# Fix for Google Apps Script 403 Error

## Problem
The Google Apps Script is returning a 403 error with an HTML page instead of JSON, indicating a deployment configuration issue.

## Solution Steps

### Step 1: Check Deployment Settings
1. Go to [script.google.com](https://script.google.com)
2. Open your "Immunodeficiency Provider Visit Attestation Debug" project
3. Click "Deploy" → "Manage deployments"
4. Check the current deployment settings

### Step 2: Correct Deployment Configuration
1. If no deployment exists, click "Deploy" → "New deployment"
2. Set the following settings:
   - **Type**: Web app
   - **Execute as**: Me (your email address)
   - **Who has access**: Anyone
3. Click "Deploy"

### Step 3: Update Permissions
1. The script may prompt for permissions
2. Click "Review permissions"
3. Choose your Google account
4. Click "Advanced" if you see a warning
5. Click "Go to [Script Name] (unsafe)" 
6. Click "Allow"

### Step 4: Test the Script
1. In the Apps Script editor, click "Run" → "testScript"
2. Check the execution log for any errors
3. If successful, you should see a test PDF created in your Google Drive

### Step 5: Get New URL
1. After successful deployment, copy the new web app URL
2. It should look like: `https://script.google.com/macros/s/[SCRIPT_ID]/exec`

## Common Issues and Fixes

### Issue: "Script function not found"
- **Fix**: Make sure the `doPost` function exists in your script

### Issue: "Insufficient permissions"
- **Fix**: Run the script manually once to grant permissions

### Issue: "HTML error page returned"
- **Fix**: Check that deployment is set to "Web app" not "API executable"

### Issue: "Access denied"
- **Fix**: Set "Who has access" to "Anyone"

## After Fixing
1. Update the URL in `.env.local`
2. Restart your Next.js development server
3. Test the form submission again
