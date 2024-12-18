import { Link } from 'react-router-dom'
import { Clock, Cloud } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const widgets = [
  {
    id: 'clock',
    title: 'Clock Widget',
    description: 'Customizable digital clock with various display options',
    icon: Clock
  },
  {
    id: 'weather',
    title: 'Weather Widget',
    description: 'Real-time weather updates with customizable UI',
    icon: Cloud
  },
]

export default function WidgetLibrary() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Widget Library</h1>
        <Link to="/builder">
          <Button>Create New Widget</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget) => (
          <Card key={widget.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <widget.icon className="w-6 h-6" />
                <CardTitle>{widget.title}</CardTitle>
              </div>
              <CardDescription>{widget.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Link to={`/builder?widget=${widget.id}`}>
                  <Button variant="outline">Customize</Button>
                </Link>
                <Link to={`/preview/${widget.id}`}>
                  <Button variant="secondary">Preview</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}