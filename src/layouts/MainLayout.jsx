import { useContext, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import { 
  Building2, GraduationCap, LayoutDashboard, 
  Search, MessageSquare, Calendar, ShieldCheck,
  LogOut, Menu, X, User
} from 'lucide-react';

export default function MainLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = {
    company: [
      { name: 'Dashboard', path: '/app/company/dashboard', icon: LayoutDashboard },
      { name: 'Find Colleges', path: '/app/company/colleges', icon: Search },
      { name: 'My Requests', path: '/app/company/requests', icon: MessageSquare },
      { name: 'Scheduled Drives', path: '/app/company/drives', icon: Calendar },
      { name: 'Profile', path: '/app/company/profile', icon: Building2 },
    ],
    college: [
      { name: 'Dashboard', path: '/app/college/dashboard', icon: LayoutDashboard },
      { name: 'Incoming Requests', path: '/app/college/requests', icon: MessageSquare },
      { name: 'Scheduled Drives', path: '/app/college/drives', icon: Calendar },
      { name: 'Profile', path: '/app/college/profile', icon: GraduationCap },
    ],
    admin: [
      { name: 'Verification Panel', path: '/app/admin/dashboard', icon: ShieldCheck },
      { name: 'Companies', path: '/app/admin/companies', icon: Building2 },
      { name: 'Colleges', path: '/app/admin/colleges', icon: GraduationCap },
    ]
  };

  const items = navItems[user?.role] || [];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-slate-800">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2">
            C
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-slate-100">CampusConnect</span>
        </div>
        
        <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-600 dark:text-slate-300">
            <User size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 capitalize">{user?.role}</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-50 text-primary dark:bg-blue-950/40' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-primary' : 'text-gray-400 dark:text-slate-400'} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <div className="mb-3 flex justify-center">
            <ThemeToggle className="w-full justify-center h-10 px-3" />
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle className="h-9 w-9 sm:w-auto px-2" />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 dark:text-slate-300 p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 z-50 shadow-lg">
            <nav className="p-4 space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium ${
                      isActive ? 'bg-blue-50 text-primary dark:bg-blue-950/40' : 'text-gray-600 dark:text-slate-300'
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                )
              })}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-600 w-full"
              >
                <LogOut size={18} />
                Sign out
              </button>
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Mobile Bottom Nav (Optional Alternative to Hamburger) */}
        {/*
        <div className="md:hidden border-t border-gray-200 bg-white flex items-center justify-around p-2 pb-safe">
            // Render a subset of items here for quick access
        </div>
        */}
      </div>
    </div>
  );
}
