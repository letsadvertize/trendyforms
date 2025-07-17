"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestForm() {
  const [formData, setFormData] = useState({
    testField: "",
  })

  const handleInputChange = (field: string, value: string) => {
    console.log(`Field ${field} changed to:`, value)
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Test form submission:", formData)
    alert(`Form data: ${JSON.stringify(formData)}`)
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Test Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="testField">Test Field:</Label>
          <Input
            id="testField"
            value={formData.testField}
            onChange={(e) => handleInputChange("testField", e.target.value)}
            placeholder="Type something..."
          />
        </div>
        
        <Button type="submit">Submit Test</Button>
        
        <div className="mt-4">
          <h3 className="font-semibold">Current Form Data:</h3>
          <pre className="bg-gray-100 p-2 rounded text-sm">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </form>
    </div>
  )
}
