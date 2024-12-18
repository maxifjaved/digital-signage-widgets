import React, { useState, useEffect } from 'react'
import { Layout, Paintbrush } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ClockWidget } from '../widgets/clock/ClockWidget'
import { UICustomizer } from './UICustomizer'

interface WidgetSettings {
  format24Hour: boolean
  showSeconds: boolean
  backgroundColor: string
  textColor: string
  size: string
  layout: 'horizontal' | 'vertical'
  useCustomUI: boolean
  customUI: React.ComponentType<any> | null
}

export const WidgetCustomizer: React.FC = () => {
  const [settings, setSettings] = useState<WidgetSettings>({
    format24Hour: false,
    showSeconds: true,
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    size: 'text-4xl',
    layout: 'horizontal',
    useCustomUI: false,
    customUI: null
  })

  const [embedCode, setEmbedCode] = useState('')

  useEffect(() => {
    const code = `
<!-- Widget Container -->
<div id="widget-container"></div>

<!-- Widget Script -->
<script src="your-widget-cdn.js"></script>
<script>
  initializeWidget({
    type: 'clock',
    config: ${JSON.stringify(settings, null, 2)},
    ${settings.useCustomUI ? 'customUI: ' + settings.customUI : ''}
  });
</script>`
    setEmbedCode(code)
  }, [settings])

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold mb-4">Widget Customizer</h2>
      
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">
            <Layout className="w-4 h-4 mr-2" />Preview
          </TabsTrigger>
          <TabsTrigger value="style">
            <Paintbrush className="w-4 h-4 mr-2" />Style
          </TabsTrigger>
          <TabsTrigger value="custom">Custom UI</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="p-4">
          <div className="border rounded-lg p-6">
            <ClockWidget 
              config={settings}
              CustomUI={settings.useCustomUI ? settings.customUI : null}
            />
          </div>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="24hour"
                checked={settings.format24Hour}
                onCheckedChange={(checked) => 
                  setSettings({...settings, format24Hour: checked as boolean})}
              />
              <Label htmlFor="24hour">24-Hour Format</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="seconds"
                checked={settings.showSeconds}
                onCheckedChange={(checked) => 
                  setSettings({...settings, showSeconds: checked as boolean})}
              />
              <Label htmlFor="seconds">Show Seconds</Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Background Color</Label>
              <Select
                value={settings.backgroundColor}
                onValueChange={(value) => setSettings({...settings, backgroundColor: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bg-white">White</SelectItem>
                  <SelectItem value="bg-gray-100">Light Gray</SelectItem>
                  <SelectItem value="bg-blue-50">Light Blue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Text Size</Label>
              <Select
                value={settings.size}
                onValueChange={(value) => setSettings({...settings, size: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text-2xl">Small</SelectItem>
                  <SelectItem value="text-4xl">Medium</SelectItem>
                  <SelectItem value="text-6xl">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="customUI"
              checked={settings.useCustomUI}
              onCheckedChange={(checked) => 
                setSettings({...settings, useCustomUI: checked as boolean})}
            />
            <Label htmlFor="customUI">Use Custom UI</Label>
          </div>

          {settings.useCustomUI && (
            <UICustomizer
              onCustomUIChange={(CustomUI) => setSettings({...settings, customUI: CustomUI})}
            />
          )}
        </TabsContent>
      </Tabs>

      <div className="space-y-4 mt-8">
        <h3 className="font-semibold">Embed Code:</h3>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {embedCode}
        </pre>
      </div>
    </div>
  )
}