import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H18M9 10.5H7.875c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125H9"/>
      </svg>
    ),
    title: 'Fee Management',
    desc: 'Track and manage student fee payments, generate receipts, and monitor outstanding balances in real time.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
      </svg>
    ),
    title: 'Analytics Dashboard',
    desc: 'Visualise revenue trends, class-level breakdowns, and financial performance with interactive charts.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
      </svg>
    ),
    title: 'Secure & Role-Based',
    desc: 'JWT authentication with role-specific access for students, bursars, and administrators.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
];

const stats = [
  { value: '500+', label: 'Students managed' },
  { value: '4', label: 'Form levels' },
  { value: '99.9%', label: 'Uptime' },
  { value: '3', label: 'User roles' },
];

function Home() {
  return (
    <div className="auth-bg min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-20 lg:px-6">
        <div className="fade-in">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-4 py-1.5 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"/>
                <span className="text-xs font-medium text-indigo-300 tracking-wider uppercase">Kigaragara Vocational Secondary School</span>
              </div>
              <h1 className="hero-title font-bold tracking-tight text-white">
                School finance,{' '}
                <span className="text-gradient">simplified</span>.
              </h1>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
                A complete financial management platform for students, bursars, and administrators. Track fees, payments, and analytics — all in one secure place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="btn-primary" to="/signup">
                  Get started free
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
                <Link className="btn-secondary" to="/login">
                  Sign in to account
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-4 gap-4 border-t border-white/5 pt-10">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white">{s.value}</p>
                    <p className="mt-1 text-xs text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="w-72 rounded-2xl border border-indigo-500/15 bg-slate-900/60 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-4">School motto</p>
                <h2 className="text-2xl font-bold text-white leading-tight">Education is our future</h2>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Empowering learners with modern tools and secure financial management.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    { label: 'Fees collected', value: '$128,400', change: '+12%' },
                    { label: 'Active students', value: '482', change: '+3%' },
                    { label: 'Outstanding', value: '$8,200', change: '-5%' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between rounded-xl bg-slate-800/50 px-4 py-2.5">
                      <span className="text-xs text-slate-400">{row.label}</span>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-white">{row.value}</span>
                        <span className={`ml-2 text-xs ${row.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{row.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">What you get</p>
              <h2 className="text-2xl font-bold text-white">Everything you need to manage school finances</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border bg-slate-900/40 p-6 backdrop-blur-sm hover:bg-slate-900/60 transition-all duration-300" style={{borderColor: 'rgba(99,102,241,0.12)'}}>
                  <div className={`inline-flex rounded-xl border p-2.5 mb-4 ${f.bg}`}>
                    <span className={f.color}>{f.icon}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
