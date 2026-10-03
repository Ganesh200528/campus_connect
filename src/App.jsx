import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';

// Phase 2 Pages
import CompanyDashboard from './pages/CompanyDashboard';
import CollegeDashboard from './pages/CollegeDashboard';
import FindColleges from './pages/FindColleges';
import CompanyProfile from './pages/CompanyProfile';
import CollegeProfile from './pages/CollegeProfile';

// Phase 3 Pages
import CompanyRequests from './pages/CompanyRequests';
import CollegeRequests from './pages/CollegeRequests';
import ChatView from './pages/ChatView';
import DriveScheduling from './pages/DriveScheduling';

// Phase 4 Pages
import AdminDashboard from './pages/AdminDashboard';

// Placeholder imports for pages
const Placeholder = ({ name }) => <div className="p-8 text-2xl font-bold">{name} Page</div>;

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children, roles }) => {
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login isRegister />} />

        {/* Dashboard Routes wrapped in MainLayout */}
        <Route path="/app" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          {/* Company Routes */}
          <Route path="company/dashboard" element={<ProtectedRoute roles={['company']}><CompanyDashboard /></ProtectedRoute>} />
          <Route path="company/profile" element={<ProtectedRoute roles={['company']}><CompanyProfile /></ProtectedRoute>} />
          <Route path="company/colleges" element={<ProtectedRoute roles={['company']}><FindColleges /></ProtectedRoute>} />
          <Route path="company/requests" element={<ProtectedRoute roles={['company']}><CompanyRequests /></ProtectedRoute>} />
          <Route path="company/drives" element={<ProtectedRoute roles={['company']}><DriveScheduling /></ProtectedRoute>} />
          
          {/* Shared Profile Views & Chat */}
          <Route path="companies/:id" element={<CompanyProfile />} />
          <Route path="colleges/:id" element={<CollegeProfile />} />
          <Route path="chat/:requestId" element={<ChatView />} />

          {/* College Routes */}
          <Route path="college/dashboard" element={<ProtectedRoute roles={['college']}><CollegeDashboard /></ProtectedRoute>} />
          <Route path="college/profile" element={<ProtectedRoute roles={['college']}><CollegeProfile /></ProtectedRoute>} />
          <Route path="college/requests" element={<ProtectedRoute roles={['college']}><CollegeRequests /></ProtectedRoute>} />
          <Route path="college/drives" element={<ProtectedRoute roles={['college']}><DriveScheduling /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="admin/companies" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="admin/colleges" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
