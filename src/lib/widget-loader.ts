import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClockWidget } from '@/components/widgets/clock/ClockWidget'

interface WidgetConfig {
  type: string
  config?: any
  customUI?: React.ComponentType<any>
  containerId?: string
}

class WidgetLoader {
  private static widgets = {
    clock: ClockWidget,
    // Add more widgets here
  }

  static initialize(options: WidgetConfig) {
    const {
      type,
      config = {},
      customUI = null,
      containerId = 'widget-container'
    } = options

    const container = document.getElementById(containerId)
    if (!container) {
      console.error(`Container with id "${containerId}" not found`)
      return
    }

    const WidgetComponent = this.widgets[type]
    if (!WidgetComponent) {
      console.error(`Widget type "${type}" not found`)
      return
    }

    const root = ReactDOM.createRoot(container)
    root.render(
      React.createElement(WidgetComponent, {
        config,
        CustomUI: customUI
      })
    )
  }
}

// Make it available globally
declare global {
  interface Window {
    initializeWidget: typeof WidgetLoader.initialize
  }
}

window.initializeWidget = WidgetLoader.initialize.bind(WidgetLoader)