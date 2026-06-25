import { useEffect, useState } from 'react';
import FeePayment from './FeePayment';
import Transactions from './Transactions';
import FeeSummary from './FeeSummary';

function StudentDashboard() {
  const [userName, setUserName] = useState('');
  const [latestPayment, setLatestPayment] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserName(JSON.parse(storedUser).name || 'Student');
      } catch {
        setUserName('Student');
      }
    }
  }, []);

  const handlePaymentSuccess = (paymentData) => {
    setLatestPayment(paymentData);
  };

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/35">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Student portal</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Your account</h1>
            <p className="mt-2 text-sm text-slate-400">Welcome back, {userName}</p>
          </div>
        </div>

        <FeeSummary role="student" />

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <FeePayment onSuccess={handlePaymentSuccess} />
            {latestPayment && (
              <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-100 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Last payment</p>
                <p className="mt-3 text-slate-200">Reference: {latestPayment.transaction.reference}</p>
                <p className="mt-2 text-slate-200">Amount paid: ${Number(latestPayment.amount).toFixed(2)}</p>
              </div>
            )}
          </div>

          <Transactions />
        </div>
      </div>
    </section>
  );
}

export default StudentDashboard;
