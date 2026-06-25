import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Login() {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [alreadySignedIn, setAlreadySignedIn] = useState(false);
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
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('authChange'));
      const role = response.data.user.role;
      const redirectTo =
        role === 'admin'
          ? '/admin-dashboard'
          : role === 'bursar'
          ? '/bursar-dashboard'
          : '/student-dashboard';
      navigate(redirectTo);
    } catch (error) {
      setErrorMessage('Login failed. Please check your email and password.');
      console.error('Login failed', error);
    }
  };

  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Sign in</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Secure student access</h1>
        <p className="mt-3 text-slate-300">Use your school credentials to access finance dashboards and reports.</p>
        {alreadySignedIn && (
          <p className="mt-3 rounded-3xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
            You are already signed in. Redirecting to your dashboard...
          </p>
        )}
      </div>

      {!alreadySignedIn && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <label className="block text-sm text-slate-300">
            Email address
            <input
              type="email"
              {...register('email', { required: true })}
              className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="you@kigaragara.edu"
            />
          </label>

          <label className="block text-sm text-slate-300">
            Password
            <input
              type="password"
              {...register('password', { required: true })}
              className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
              placeholder="••••••••"
            />
          </label>

          {errorMessage && <p className="text-sm text-rose-400">{errorMessage}</p>}

          <button type="submit" className="btn-primary w-full justify-center">
            Sign in
          </button>

          <p className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-cyan-300 hover:text-cyan-200">
              Create one
            </Link>
          </p>
        </form>
      )}
    </section>
  );
}

export default Login;
