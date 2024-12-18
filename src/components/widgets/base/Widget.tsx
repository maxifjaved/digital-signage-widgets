import React from 'react'
import { Card } from '@/components/ui/card'

interface WidgetProps {
  children: React.ReactNode
  className?: string
  CustomUI?: React.ComponentType<any>
  data?: any
  config?: any
}

export const Widget: React.FC<WidgetProps> = ({ 
  children, 
  className = '', 
  CustomUI = null, 
  data = {},
  config = {} 
}) => {
  if (CustomUI) {
    return <CustomUI data={data} config={config} />
  }

  return (
    <Card className={`p-6 rounded-lg shadow-lg ${className}`}>
      {children}
    </Card>
  )
}