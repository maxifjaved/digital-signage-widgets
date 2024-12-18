import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

interface UICustomizerProps {
  onCustomUIChange: (component: React.ComponentType<any>) => void
  initialCode?: string
}

export const UICustomizer: React.FC<UICustomizerProps> = ({ 
  onCustomUIChange, 
  initialCode = '' 
}) => {
  const defaultCustomUI = `
function CustomClockUI({ data, config }) {
  return (
    <div style={{ 
      padding: '20px',
      background: 'linear-gradient(to right, #4a90e2, #50e3c2)',
      borderRadius: '10px',
      color: 'white'
    }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        {data.formattedTime}
      </div>
    </div>
  );
}`.trim()

  const [customCode, setCustomCode] = useState(initialCode || defaultCustomUI)

  const handleCodeChange = (newCode: string) => {
    setCustomCode(newCode)
    try {
      // Evaluate custom component code (in production, you'd want to sandbox this)
      const CustomComponent = new Function('React', 'data', 'config', `
        return ${newCode}
      `)
      onCustomUIChange(CustomComponent)
    } catch (error) {
      console.error('Error in custom UI code:', error)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        className="font-mono text-sm h-64"
        value={customCode}
        onChange={(e) => handleCodeChange(e.target.value)}
        placeholder="Enter custom UI component code..."
      />
      <div className="text-sm text-gray-600">
        Available props: data (time, formattedTime), config (all widget settings)
      </div>
    </div>
  )
}