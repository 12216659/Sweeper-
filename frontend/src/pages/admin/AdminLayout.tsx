import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  LayoutDashboard, Users, Calendar, Settings, FileText, 
  DollarSign, Sparkles, LogOut, ChevronLeft, ChevronRight,
  Shield, Tags, Star, Mail, ShieldAlert, Database, HelpCircle
} from 'lucide-react';
import api from '@/utils/api';
import { Button } from '@/components/ui/Button';

export const AdminLayout = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuGroups = [
    {
      title: 'DASHBOARD',
      items: [
        { name: 'Analytics', icon: LayoutDashboard, path: '/admin' },
        { name: 'Reports', icon: FileText, path: '/admin/reports' },
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { name: 'Bookings', icon: Calendar, path: '/admin/bookings' },
        { name: 'Services', icon: Sparkles, path: '/admin/services' },
        { name: 'Categories', icon: Tags, path: '/admin/categories' },
      ]
    },
    {
      title: 'PEOPLE',
      items: [
        { name: 'Customers', icon: Users, path: '/admin/customers' },
        { name: 'Employees', icon: Users, path: '/admin/employees' },
        { name: 'Roles & Perms', icon: Shield, path: '/admin/roles' },
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { name: 'Payments', icon: DollarSign, path: '/admin/payments' },
        { name: 'Coupons', icon: Star, path: '/admin/coupons' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
        { name: 'CMS', icon: FileText, path: '/admin/cms' },
        { name: 'Notifications', icon: Mail, path: '/admin/notifications' },
        { name: 'Audit Logs', icon: ShieldAlert, path: '/admin/audit' },
        { name: 'Backup/Restore', icon: Database, path: '/admin/backup' },
      ]
    }
  ];

  const handleMakeAdmin = async () => {
    try {
      const res = await api.post('/admin/make-me-admin');
      alert(res.data.message);
      window.location.href = '/login'; // Force re-login
    } catch (err) {
      alert('Failed to upgrade role');
    }
  };

  if (user?.role !== 'admin' && user?.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-slate-700 text-white">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-slate-400 mb-8">You do not have administrative privileges to view this portal.</p>
          <div className="space-y-4">
            <Button onClick={() => window.location.href = '/'} variant="outline" className="w-full text-slate-800">Return to Website</Button>
            
            {/* Dev tool to easily upgrade the test account */}
            <div className="border-t border-slate-700 pt-4 mt-4">
              <p className="text-xs text-slate-500 mb-2">DEVELOPER TOOL</p>
              <Button onClick={handleMakeAdmin} className="w-full bg-red-600 hover:bg-red-500">Upgrade my Account to Admin</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-72'} fixed h-full z-50 overflow-y-auto hidden md:flex`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800 shrink-0 sticky top-0 bg-slate-900 z-10">
          {!isCollapsed && (
            <Link to="/admin" className="flex items-center gap-2 text-white">
              <Sparkles className="w-6 h-6 text-orange-500" />
              <span className="font-bold text-xl tracking-tight">Admin<span className="text-orange-500">OS</span></span>
            </Link>
          )}
          {isCollapsed && <Sparkles className="w-6 h-6 text-orange-500 mx-auto" />}
        </div>

        <div className="flex-1 py-6 px-4 space-y-8">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              {!isCollapsed && <p className="text-xs font-bold text-slate-500 mb-3 px-2 tracking-wider">{group.title}</p>}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path || (location.pathname !== '/admin' && location.pathname.startsWith(item.path) && item.path !== '/admin');
                  return (
                    <Link 
                      key={item.name} 
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-orange-500 text-white font-medium shadow-md shadow-zinc-900/20' : 'hover:bg-slate-800 hover:text-white'}`}
                      title={isCollapsed ? item.name : ''}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 shrink-0 sticky bottom-0 bg-slate-900">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors mb-4"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={() => { logout(); window.location.href = '/login'; }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full ${isCollapsed ? 'justify-center' : ''}`}
            title="Log Out"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-72'} flex flex-col min-h-screen`}>
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
          <h1 className="text-xl font-bold text-slate-900 capitalize">
            {location.pathname === '/admin' ? 'Dashboard Overview' : location.pathname.split('/').pop()?.replace('-', ' ')}
          </h1>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden sm:flex" onClick={() => window.open('/', '_blank')}>View Website</Button>
            <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content (Injected via Outlet) */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
};
