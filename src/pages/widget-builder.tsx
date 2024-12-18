import React from 'react'
import { WidgetCustomizer } from '@/components/customizer/WidgetCustomizer'

export default function WidgetBuilder() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Widget Builder</h1>
      <WidgetCustomizer />
    </div>
  )
}