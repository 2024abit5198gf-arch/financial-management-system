import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="mx-auto max-w-5xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Kigaragara Vocational Secondary School</p>
          <h1 className="hero-title mt-6 font-semibold tracking-tight text-white">
            Finance dashboard for student operations and school analytics.
          </h1>
          <p className="mt-6 max-w-2xl text-slate-300">
            Education is our future. Monitor fees, enrollment, and school finance insights with React, Tailwind, and JWT-secured APIs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link className="btn-primary" to="/dashboard">
              View dashboard
            </Link>
            <Link className="rounded-full border border-slate-700 px-5 py-3 text-sm text-slate-200 transition hover:bg-slate-800" to="/login">
              Login
            </Link>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950 p-6 text-slate-100 shadow-xl shadow-cyan-500/10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">School motto</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Education is our future</h2>
          <p className="mt-4 text-slate-300">
            Kigaragara Vocational Secondary School empowers learners with modern finance tools, secure auth flows, and dynamic analytics for the next generation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
