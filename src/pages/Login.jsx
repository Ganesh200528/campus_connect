import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import { Building2, GraduationCap, Shield } from 'lucide-react';

export default function Login({ isRegister = false }) {
  const [role, setRole] = useState('company'); // company, college, admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic
    const mockUser = {
      id: role === 'company' ? 'c1' : role === 'college' ? 'col1' : 'admin1',
      name: role === 'company' ? 'Acme Corp HR' : role === 'college' ? 'State Univ TPO' : 'System Admin',
      email,
      role
    };
    login(mockUser);
    
    if (role === 'admin') navigate('/app/admin/dashboard');
    else if (role === 'company') navigate('/app/company/dashboard');
    else navigate('/app/college/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle className="h-10 w-10 sm:w-auto px-2 sm:px-3" />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
            C
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-slate-100">
          {isRegister ? 'Create your account' : 'Sign in to your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-slate-300">
          Or <Link to={isRegister ? "/login" : "/register"} className="font-medium text-primary hover:text-blue-500">
            {isRegister ? 'sign in to your existing account' : 'create a new account'}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-slate-800">
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select your role</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setRole('company')}
                className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all ${
                  role === 'company' ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Building2 size={20} className="mb-1" />
                <span className="text-xs font-semibold">Company</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('college')}
                className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all ${
                  role === 'college' ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <GraduationCap size={20} className="mb-1" />
                <span className="text-xs font-semibold">College</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex flex-col items-center justify-center p-3 border rounded-xl transition-all ${
                  role === 'admin' ? 'border-primary bg-blue-50 text-primary ring-1 ring-primary' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Shield size={20} className="mb-1" />
                <span className="text-xs font-semibold">Admin</span>
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder={`Enter ${role} email`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Enter any password (mock)"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                {isRegister ? 'Create Account' : 'Sign in'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
             <p className="text-xs text-gray-500">Note: This is a demo. Any email/password will log you in as the selected role using mock data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
