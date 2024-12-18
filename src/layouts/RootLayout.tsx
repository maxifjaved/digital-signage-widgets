import { Outlet } from 'react-router-dom'
import { NavBar } from '@/components/layout/NavBar'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  )
}