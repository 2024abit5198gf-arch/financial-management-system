import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import GoogleSignInButton from '../components/GoogleSignInButton';

const roles = [
  {
    value: 'student',
    label: 'Student',
    desc: 'Pay fees, view balance, and track transactions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
      </svg>
    ),
    color: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    selectedColor: 'border-blue-400 bg-blue-500/20 ring-2 ring-blue-500/30',
  },
  {
    value: 'bursar',
    label: 'Bursar',
    desc: 'Manage all student finances and generate reports',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H18M9 10.5H7.875c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125H9"/>
      </svg>
    ),
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    selectedColor: 'border-emerald-400 bg-emerald-500/20 ring-2 ring-emerald-500/30',
  },
];

function Signup() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('student');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const response = await api.post('/auth/signup', { ...data, role });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('authChange'));
      const userRole = response.data.user.role;
      navigate(userRole === 'admin' ? '/admin-dashboard' : userRole === 'bursar' ? '/bursar-dashboard' : '/student-dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const selectedRole = roles.find(r => r.value === role);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background image */}
      <img
        src="/kivox2.jpg"
        alt="School background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,20,50,0.65) 0%, rgba(10,20,50,0.45) 100%)' }} />

      <div className="relative z-10 w-full max-w-md fade-in">
        {/* Header above card */}
        <div className="mb-6 text-center">
          <img src="/school-badge.jpg" alt="Badge" className="h-16 w-16 rounded-xl object-cover mx-auto mb-3 shadow-xl ring-2 ring-white/30" />
          <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow">Create your account</h1>
          <p className="mt-1 text-sm text-white/75">Join the Kigaragara Finance System</p>
        </div>

        {/* Cream form card */}
        <div className="rounded-3xl p-8 shadow-2xl" style={{ background: 'rgba(255,252,242,0.97)', border: '1px solid rgba(255,255,255,0.6)' }}>
          <div className="mb-5">
            <p className="text-sm font-semibold text-stone-700 mb-3">I am a...</p>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                    role === r.value ? r.selectedColor : 'border-amber-200 bg-white text-stone-400 hover:border-amber-300'
                  }`}
                >
                  <span className={role === r.value ? (r.value === 'student' ? 'text-blue-500' : 'text-emerald-500') : 'text-stone-400'}>{r.icon}</span>
                  <div>
                    <p className={`text-sm font-semibold ${role === r.value ? 'text-stone-800' : 'text-stone-600'}`}>{r.label}</p>
                    <p className="text-[10px] text-stone-400 leading-tight mt-0.5">{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <GoogleSignInButton role={role} label={`Sign up as ${selectedRole?.label} with Google`} />
          </div>

          <div className="flex items-center gap-3 mb-5 text-amber-800/50 text-xs">
            <div className="flex-1 h-px bg-amber-900/20" />
            <span className="font-medium">or register with email</span>
            <div className="flex-1 h-px bg-amber-900/20" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Full name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-stone-800 text-sm placeholder-stone-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                placeholder="John Doe"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email address</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-stone-800 text-sm placeholder-stone-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                placeholder="you@gmail.com"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-stone-700">Password</label>
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-xs text-indigo-500 hover:text-indigo-700 transition font-medium">
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPass ? 'text' : 'password'}
                {...register('password', { required: true, minLength: 6 })}
                className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-stone-800 text-sm placeholder-stone-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                placeholder="Min. 6 characters"
                autoComplete="new-password"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                </svg>
                {errorMessage}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-1" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}>
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating account...
                </>
              ) : `Create ${selectedRole?.label} account`}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-stone-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-800 transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
