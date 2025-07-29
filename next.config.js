/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...existing config...
  allowedDevOrigins: [
    "http://192.168.0.218:3000", // Add your dev IP and port here
    // Add more origins if needed
  ],
  // ...existing config...
}

module.exports = nextConfig