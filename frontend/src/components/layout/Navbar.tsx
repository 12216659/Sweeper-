import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Sparkles, LogOut, User, LayoutDashboard, Menu, X } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { motion, AnimatePresence } from 'framer-motion'

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Only apply transparent navbar on the Home page
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const navClasses = `fixed w-full top-0 z-50 transition-all duration-300 ${
    isHome && !isScrolled
      ? 'bg-transparent py-6'
      : 'bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-slate-100'
  }`

  const linkClasses = `font-medium transition-colors ${
    isHome && !isScrolled ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-orange-500'
  }`

  const logoTextClasses = `font-bold text-2xl tracking-tight transition-colors ${
    isHome && !isScrolled ? 'text-white' : 'text-slate-900'
  }`

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-orange-500 to-orange-400 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-lg shadow-orange-500/20">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <span className={logoTextClasses}>Sweepers</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={linkClasses}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant={isHome && !isScrolled ? 'outline' : 'ghost'} className={isHome && !isScrolled ? 'bg-white/10 text-white border-white/20 hover:bg-white/20' : 'text-slate-600 hover:text-orange-500'}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              {user?.role === 'admin' && (
                 <Link to="/admin">
                   <Button variant="ghost" className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700">Admin Panel</Button>
                 </Link>
              )}
              <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login" className={linkClasses}>
                Login
              </Link>
              <Link to="/book">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 rounded-full px-6 transition-all hover:scale-105">
                  Book Now
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={`w-6 h-6 ${isHome && !isScrolled ? 'text-white' : 'text-slate-900'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isHome && !isScrolled ? 'text-white' : 'text-slate-900'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 p-4 flex flex-col gap-4 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-2"></div>
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-start" variant="ghost"><LayoutDashboard className="w-4 h-4 mr-2"/> Dashboard</Button>
                </Link>
                <Button className="w-full justify-start text-red-500" variant="ghost" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2"/> Logout</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/book" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-orange-500">Book Now</Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
