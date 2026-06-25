import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import BursarDashboard from './pages/BursarDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/bursar-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['bursar', 'admin']}>
                <BursarDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/unauthorized"
            element={
              <div className="auth-bg min-h-[60vh] flex items-center justify-center px-4">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-white mb-3">Access Denied</h1>
                  <p className="text-slate-400">You do not have permission to view this page.</p>
                </div>
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
