import { Link } from 'react-router-dom';
import { Building2, GraduationCap, ArrowRight, ShieldCheck, CalendarCheck, MessageSquare } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col font-sans">
      <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">CampusConnect</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle className="h-10 w-10 sm:w-auto px-2 sm:px-3" />
            <Link to="/login" className="text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white font-medium">Log in</Link>
            <Link to="/register" className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 text-center px-4">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto">
            The Modern Way to Coordinate <span className="text-primary">Campus Placements</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Connect top companies with premier colleges. Streamline recruitment drives, schedule interviews, and manage the entire placement lifecycle in one unified platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/30">
              <Building2 size={20} /> I'm a Company
            </Link>
            <Link to="/register" className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-3 rounded-xl font-semibold text-lg flex items-center gap-2 transition-colors shadow-sm">
              <GraduationCap size={20} /> I'm a College
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How CampusConnect Works</h2>
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2"></div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-4 ring-8 ring-white">
                  <span className="font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Send Request</h3>
                <p className="text-gray-500 text-sm">Companies browse colleges and send targeted recruitment requests.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-4 ring-8 ring-white">
                  <span className="font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">TPO Review</h3>
                <p className="text-gray-500 text-sm">Colleges review requirements and accept requests if they match.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-4 ring-8 ring-white">
                  <span className="font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Collaborate</h3>
                <p className="text-gray-500 text-sm">Secure chat unlocks for both parties to discuss drive details.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-primary mb-4 ring-8 ring-white">
                  <span className="font-bold text-xl">4</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Schedule Drive</h3>
                <p className="text-gray-500 text-sm">Propose dates and finalize the recruitment drive calendar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <ShieldCheck className="text-primary w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-3">Verified Profiles</h3>
                <p className="text-gray-600">All companies and colleges are vetted by admins. Look for the blue tick to ensure trust and authenticity.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <MessageSquare className="text-primary w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-3">Contextual Chat</h3>
                <p className="text-gray-600">Keep all communication organized. Every chat thread is tied to a specific recruitment request.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <CalendarCheck className="text-primary w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold mb-3">Drive Scheduling</h3>
                <p className="text-gray-600">Easily propose, negotiate, and confirm dates for various rounds of interviews and assessments.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-8 border-t border-gray-100 text-center text-gray-500 text-sm">
        <p>&copy; 2026 CampusConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}
