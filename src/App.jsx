import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <main className="mx-auto max-w-6xl px-4 py-8">
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
          <Route path="/unauthorized" element={
            <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 text-center">
              <h1 className="text-2xl font-semibold text-white">Access Denied</h1>
              <p className="mt-3 text-slate-400">You do not have permission to access this page.</p>
            </div>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
