import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navigation() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  const [userName, setUserName] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return '';
    try {
      return JSON.parse(storedUser).name || '';
    } catch {
      return '';
    }
  });
  const [userRole, setUserRole] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return '';
    try {
      return JSON.parse(storedUser).role || '';
    } catch {
      return '';
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      setLoggedIn(Boolean(localStorage.getItem('token')));
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUserName(parsed.name || '');
          setUserRole(parsed.role || '');
        } catch {
          setUserName('');
          setUserRole('');
        }
      } else {
        setUserName('');
        setUserRole('');
      }
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  const links = [{ to: '/', label: 'Home' }];
  if (loggedIn) {
    const dashboardLink =
      userRole === 'admin'
        ? { to: '/admin-dashboard', label: 'Admin Dashboard' }
        : userRole === 'bursar'
        ? { to: '/bursar-dashboard', label: 'Bursar Dashboard' }
        : userRole === 'student'
        ? { to: '/student-dashboard', label: 'Student Dashboard' }
        : { to: '/dashboard', label: 'Dashboard' };
    links.push(dashboardLink);
  } else {
    links.push({ to: '/login', label: 'Login' });
  }

  return (
    <header className="border-b border-slate-700 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-slate-100">
        <div>
          <p className="text-lg font-semibold tracking-wide">Kigaragara Vocational Secondary School</p>
          <p className="text-sm text-slate-400">Education is our future</p>
          {userName && <p className="mt-1 text-sm text-cyan-300">Signed in as {userName}</p>}
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition ${
                    isActive ? 'bg-slate-100 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {loggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
