import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api';
import Transactions from './Transactions';
import FeeSummary from './FeeSummary';

const fetchSummary = async () => {
  const { data } = await api.get('/finance/summary');
  return data;
};

function BursarDashboard() {
  const [userName, setUserName] = useState('');
  const { data, isLoading, error } = useQuery(['financeSummary'], fetchSummary, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserName(JSON.parse(storedUser).name || 'Bursar');
      } catch {
        setUserName('Bursar');
      }
    }
  }, []);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/35">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Bursar dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Finance management</h1>
            <p className="mt-2 text-sm text-slate-400">Welcome, {userName}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-10 text-slate-300">Loading finance data...</div>
        ) : error ? (
          <div className="mt-10 text-rose-400">Unable to load data. Check API connection.</div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Total revenue</p>
              <p className="mt-4 text-4xl font-semibold">${data?.revenue.toLocaleString() || 0}</p>
              <p className="mt-3 text-slate-400">Fees collected this term.</p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Active students</p>
              <p className="mt-4 text-4xl font-semibold">{data?.students || 0}</p>
              <p className="mt-3 text-slate-400">Registered learners.</p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-6 text-slate-100 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Outstanding balance</p>
              <p className="mt-4 text-4xl font-semibold">${data?.outstanding.toLocaleString() || 0}</p>
              <p className="mt-3 text-slate-400">Unpaid fees.</p>
            </div>
          </div>
        )}
      </div>

      <FeeSummary role="admin" />

      <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/35">
        <h2 className="text-2xl font-semibold text-white">Quick actions</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <button className="btn-primary rounded-3xl px-4 py-3 text-sm">Record deposit</button>
          <button className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 transition hover:bg-slate-800">
            View transactions
          </button>
          <button className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 transition hover:bg-slate-800">
            Generate report
          </button>
        </div>
      </div>

      <Transactions />
    </section>
  );
}

export default BursarDashboard;
