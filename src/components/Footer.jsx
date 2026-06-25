import { Link } from 'react-router-dom';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Sign In' },
  { to: '/signup', label: 'Register' },
  { to: '/student-dashboard', label: 'Student Dashboard' },
  { to: '/bursar-dashboard', label: 'Bursar Dashboard' },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-indigo-500/10 bg-slate-950/80 backdrop-blur-sm mt-auto">
      <div className="mx-auto max-w-6xl px-4 lg:px-6 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8v8M9 12l6-4M9 12l6 4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none">Kivox FMS</p>
                <p className="text-[10px] text-slate-500 leading-none mt-0.5">Financial Management System</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Kigaragara Vocational Secondary School's official financial management system. Managing payments, tracking fees and performing analytics.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-500 hover:text-indigo-300 transition-colors flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Location & Contact</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-start gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={2} className="mt-0.5 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="leading-relaxed">
                  Kitanda Village, Bukanga North County,<br />
                  Isingiro District, Uganda
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth={2} className="flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                </svg>
                <span>P.O.Box 481, Isingiro</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {year} Kivox Financial Management System · Kigaragara Vocational Secondary School
          </p>
          <p className="text-xs text-slate-600">
            Education is our future
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
