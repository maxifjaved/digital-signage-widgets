import { Link } from 'react-router-dom'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

export function NavBar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            Widget Studio
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Library</Button>
            </Link>
            <Link to="/builder">
              <Button variant="ghost">Builder</Button>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}