// Only import what we need
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

interface TimeConfig {
  format24Hour?: boolean
  showSeconds?: boolean
}

const ClockWidget = ({ config = {} }: { config: TimeConfig }) => {
  const { format24Hour = false, showSeconds = true } = config
  const time = new Date()
  const hours = format24Hour ? time.getHours() : time.getHours() % 12 || 12
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const seconds = time.getSeconds().toString().padStart(2, '0')
  const ampm = format24Hour ? '' : time.getHours() >= 12 ? ' PM' : ' AM'
  
  return createElement('div', { 
    className: 'widget-clock',
    style: { fontFamily: 'monospace', fontSize: '24px' }
  }, `${hours}:${minutes}${showSeconds ? ':' + seconds : ''}${ampm}`)
}

const widgets = {
  clock: ClockWidget,
}

// Minimal initialize function
function initializeWidget({ type, containerId = 'widget-container', config = {} }) {
  const container = document.getElementById(containerId)
  if (!container) return
  
  const Widget = widgets[type]
  if (!Widget) return
  
  const root = createRoot(container)
  setInterval(() => {
    root.render(createElement(Widget, { config }))
  }, 1000)
}

// Make it available globally
window.initializeWidget = initializeWidget