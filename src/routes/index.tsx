import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import WidgetBuilder from '@/pages/widget-builder'
import WidgetPreview from '@/pages/widget-preview'
import WidgetLibrary from '@/pages/widget-library'
import NotFound from '@/pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <WidgetLibrary />,
      },
      {
        path: 'builder',
        element: <WidgetBuilder />,
      },
      {
        path: 'preview/:widgetId',
        element: <WidgetPreview />,
      }
    ],
  },
])