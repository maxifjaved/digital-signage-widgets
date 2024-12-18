import { useParams } from 'react-router-dom'
import { ClockWidget } from '@/components/widgets/clock/ClockWidget'

export default function WidgetPreview() {
  const { widgetId } = useParams()

  const renderWidget = () => {
    switch (widgetId) {
      case 'clock':
        return <ClockWidget />
      // Add more widget cases here
      default:
        return <div>Widget not found</div>
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Widget Preview</h1>
      <div className="max-w-xl mx-auto">
        {renderWidget()}
      </div>
    </div>
  )
}