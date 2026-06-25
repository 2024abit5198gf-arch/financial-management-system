import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Signup() {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/signup', {
        ...data,
        role,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('authChange'));
      const userRole = response.data.user.role;
      const redirectTo =
        userRole === 'admin'
          ? '/admin-dashboard'
          : userRole === 'bursar'
          ? '/bursar-dashboard'
          : '/student-dashboard';
      navigate(redirectTo);
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed. Please try again.';
      setErrorMessage(message);
      console.error('Signup failed', error);
    }
  };

  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Create account</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Join Kigaragara Finance System</h1>
        <p className="mt-3 text-slate-300">Create your account to manage school finances securely.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <label className="block text-sm text-slate-300">
          Full name
          <input
            type="text"
            {...register('name', { required: true })}
            className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            placeholder="John Doe"
          />
        </label>

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

        <label className="block text-sm text-slate-300">
          Account type
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="student">Student</option>
            <option value="bursar">Bursar</option>
          </select>
        </label>

        {errorMessage && <p className="text-sm text-rose-400">{errorMessage}</p>}

        <button type="submit" className="btn-primary w-full justify-center">
          Create account
        </button>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-300 hover:text-cyan-200">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;
