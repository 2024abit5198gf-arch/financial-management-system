import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import GoogleSignInButton from '../components/GoogleSignInButton';

function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [alreadySignedIn, setAlreadySignedIn] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAlreadySignedIn(true);
      const timer = setTimeout(() => navigate('/dashboard'), 1200);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('authChange'));
      const role = response.data.user.role;
      navigate(role === 'admin' ? '/admin-dashboard' : role === 'bursar' ? '/bursar-dashboard' : '/student-dashboard');
    } catch {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-bg min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md fade-in">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-5 shadow-lg shadow-indigo-500/25">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to your Kigaragara Finance account</p>
        </div>

        <div className="rounded-2xl border border-indigo-500/12 bg-slate-900/70 p-8 backdrop-blur-sm shadow-2xl shadow-slate-950/50 glow-indigo">
          {alreadySignedIn ? (
            <div className="flex items-center gap-3 rounded-xl border border-indigo-500/25 bg-indigo-500/10 px-4 py-3.5 text-sm text-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Already signed in. Redirecting to your dashboard...
            </div>
          ) : (
            <>
              <div className="mb-6">
                <GoogleSignInButton label="Sign in with Google" />
              </div>

              <div className="divider mb-6">or sign in with email</div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    className="input-field"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-300">Password</label>
                    <button type="button" onClick={() => setShowPass(!showPass)} className="text-xs text-indigo-400 hover:text-indigo-300 transition">
                      {showPass ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    {...register('password', { required: true })}
                    className="input-field"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2 rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                    </svg>
                    {errorMessage}
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Signing in...
                    </>
                  ) : 'Sign in'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300 transition">
                  Create one free
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
