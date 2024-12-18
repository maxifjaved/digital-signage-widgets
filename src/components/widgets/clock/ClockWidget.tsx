import React, { useState, useEffect } from 'react'
import { Clock as ClockIcon } from 'lucide-react'
import { Widget } from '../base/Widget'

interface ClockConfig {
  format24Hour?: boolean
  showSeconds?: boolean
  backgroundColor?: string
  textColor?: string
  size?: string
  layout?: 'horizontal' | 'vertical'
}

interface ClockWidgetProps {
  CustomUI?: React.ComponentType<any>
  config?: ClockConfig
}

const DefaultClockUI = ({ data, config }: { data: any, config: ClockConfig }) => (
  <div className={`flex ${config.layout === 'vertical' ? 'flex-col' : 'flex-row'} items-center justify-center space-x-3`}>
    <ClockIcon className="w-8 h-8" />
    <span className={`font-mono ${config.size}`}>{data.formattedTime}</span>
  </div>
)

export const ClockWidget: React.FC<ClockWidgetProps> = ({ 
  CustomUI = null,
  config = {
    format24Hour: false,
    showSeconds: true,
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    size: 'text-4xl',
    layout: 'horizontal'
  }
}) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = () => {
    const hours = config.format24Hour ? time.getHours() : time.getHours() % 12 || 12
    const minutes = time.getMinutes().toString().padStart(2, '0')
    const seconds = time.getSeconds().toString().padStart(2, '0')
    const ampm = config.format24Hour ? '' : time.getHours() >= 12 ? ' PM' : ' AM'
    
    return `${hours}:${minutes}${config.showSeconds ? ':' + seconds : ''}${ampm}`
  }

  return (
    <Widget 
      className={`${config.backgroundColor} ${config.textColor}`}
      CustomUI={CustomUI}
      data={{ time, formattedTime: formatTime() }}
      config={config}
    >
      <DefaultClockUI data={{ time, formattedTime: formatTime() }} config={config} />
    </Widget>
  )
}