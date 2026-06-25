function NotFound() {
  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 text-center shadow-2xl shadow-slate-950/35">
      <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Page not found</p>
      <h1 className="mt-4 text-3xl font-semibold text-white">Oops — route unavailable</h1>
      <p className="mt-4 text-slate-400">
        The page you're looking for doesn't exist. Please use the navigation to return to the dashboard.
      </p>
    </section>
  );
}

export default NotFound;
