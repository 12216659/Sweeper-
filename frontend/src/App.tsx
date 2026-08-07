import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackgroundWrapper } from '@/components/layout/BackgroundWrapper'
import { Home } from '@/pages/Home'
import { Services } from '@/pages/Services'
import { ServiceDetails } from '@/pages/ServiceDetails'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { Book } from '@/pages/Book'
import { Dashboard } from '@/pages/Dashboard'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { AdminLayout } from '@/pages/admin/AdminLayout'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { AdminBookings } from '@/pages/admin/AdminBookings'
import { AdminServices } from '@/pages/admin/AdminServices'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white/0">
          <BackgroundWrapper />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book" element={<Book />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="services" element={<AdminServices />} />
                {/* Placeholders for future routes */}
                <Route path="*" element={<div className="flex h-96 items-center justify-center text-slate-500 font-medium text-lg">This module is under construction.</div>} />
              </Route>

              <Route path="*" element={<div className="p-20 text-center text-2xl font-bold">404 - Page Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
