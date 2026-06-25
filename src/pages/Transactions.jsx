import { useEffect, useState } from 'react';
import api from '../api';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await api.get('/transactions');
        setTransactions(response.data);
      } catch (err) {
        setError('Unable to load transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Transactions</h2>
          <p className="mt-2 text-slate-400">Recent payments and deposits.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-slate-300">Loading transactions...</div>
      ) : error ? (
        <div className="text-rose-400">{error}</div>
      ) : transactions.length === 0 ? (
        <div className="text-slate-300">No transactions found.</div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-slate-100">{tx.description}</p>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-300">
                  {tx.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-400">Reference: {tx.reference}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-slate-100">
                <span>Amount: ${Number(tx.amount).toFixed(2)}</span>
                <span>Type: {tx.type.replace('_', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Transactions;
