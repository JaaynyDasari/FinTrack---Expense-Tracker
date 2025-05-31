import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/history', label: 'History', icon: '📅' },
    { path: '/analytics', label: 'Analytics', icon: '📈' }
  ]
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  const getPageTitle = () => {
    const currentItem = navItems.find(item => item.path === location.pathname)
    return currentItem ? currentItem.label : 'FinTrack'
  }

  return (
    <header className="sticky top-0 z-20 w-full">
      <div className="bg-white/80 backdrop-blur-md shadow-sm py-4 px-4 md:px-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary hidden md:block">
              FinTrack
            </h1>
            <h1 className="text-xl font-bold text-primary md:hidden">
              {getPageTitle()}
            </h1>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => 
                      `px-4 py-2 rounded-full font-medium transition-all ${
                        isActive 
                        ? 'bg-primary text-white' 
                        : 'text-darkText/70 hover:bg-gray-100'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <button 
            className="md:hidden text-darkText p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <nav className="bg-white shadow-md md:hidden absolute w-full left-0 right-0 z-20">
          <ul className="py-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-6 py-3 ${
                      isActive ? 'bg-primary/10 text-primary font-medium' : ''
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar