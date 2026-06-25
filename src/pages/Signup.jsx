import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import GoogleSignInButton from '../components/GoogleSignInButton';

function Signup() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const response = await api.post('/auth/signup', { ...data, role: 'student' });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('authChange'));
      navigate('/student-dashboard');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background image */}
      <img
        src="/kivox2.jpg"
        alt="School background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,20,50,0.68) 0%, rgba(10,20,50,0.48) 100%)' }} />

      <div className="relative z-10 w-full max-w-md fade-in">
        {/* Header above card */}
        <div className="mb-6 text-center">
          <img src="/school-badge.jpg" alt="Badge" className="h-16 w-16 rounded-xl object-cover mx-auto mb-3 shadow-xl ring-2 ring-white/30" />
          <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow">Student Registration</h1>
          <p className="mt-1 text-base text-white/80 font-medium">Create your student account below</p>
        </div>

        {/* Cream form card */}
        <div className="rounded-3xl p-8 shadow-2xl" style={{ background: 'rgba(255,252,242,0.97)', border: '1px solid rgba(255,255,255,0.6)' }}>

          {/* Student badge banner */}
          <div className="flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 mb-6">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-100 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-blue-800">Student Account</p>
              <p className="text-xs text-blue-600 leading-tight mt-0.5">Pay fees, view balance &amp; track transactions</p>
            </div>
          </div>

          <div className="mb-5">
            <GoogleSignInButton role="student" label="Sign up with Google" />
          </div>

          <div className="flex items-center gap-3 mb-5 text-stone-400 text-xs">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="font-semibold text-stone-500">or register with email</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1.5">Full Name</label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-800 text-sm font-medium placeholder-stone-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-1.5">Email Address</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-800 text-sm font-medium placeholder-stone-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="you@gmail.com"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-bold text-stone-700">Password</label>
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition">
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPass ? 'text' : 'password'}
                {...register('password', { required: true, minLength: 6 })}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-800 text-sm font-medium placeholder-stone-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                </svg>
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full mt-1 text-base font-bold"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', boxShadow: '0 4px 18px rgba(59,130,246,0.4)' }}
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating account...
                </>
              ) : 'Create Student Account'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm font-medium text-stone-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-800 transition">
              Sign in here
            </Link>
          </p>

          {/* Note for staff */}
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
            <p className="text-xs font-semibold text-amber-700">
              🔒 Staff &amp; Bursar accounts are created by the Administrator only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
