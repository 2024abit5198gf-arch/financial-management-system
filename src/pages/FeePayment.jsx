import { useState } from 'react';
import api from '../api';

const classOptions = [
  { value: 'form1', label: 'Form 1' },
  { value: 'form2', label: 'Form 2' },
  { value: 'form3', label: 'Form 3' },
  { value: 'form4', label: 'Form 4' },
];

const feeAmounts = {
  form1: 2100,
  form2: 2200,
  form3: 2300,
  form4: 2400,
};

function FeePayment({ onSuccess }) {
  const [classLevel, setClassLevel] = useState('form1');
  const [paymentOption, setPaymentOption] = useState('full');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [transactionRef, setTransactionRef] = useState('');

  const totalFee = feeAmounts[classLevel] || 0;
  const displayAmount = paymentOption === 'full' ? totalFee : totalFee / 2;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.post('/transactions/pay', { classLevel, paymentOption });
      setTransactionRef(response.data.transaction.reference);
      setMessage(`Payment successful. Reference: ${response.data.transaction.reference}`);
      onSuccess?.(response.data);
    } catch (error) {
      const err = error.response?.data?.message || 'Payment failed. Please try again.';
      setMessage(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/20">
      <h3 className="text-xl font-semibold text-white">Pay school fees</h3>
      <p className="mt-2 text-slate-400">Choose your class and payment option below.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <label className="block text-sm text-slate-300">
          Class level
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          >
            {classOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-slate-300">
          Payment option
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          >
            <option value="full">Full fees</option>
            <option value="half">Half fees</option>
          </select>
        </label>

        <div className="rounded-3xl bg-slate-900 p-5 text-slate-100">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Fee summary</p>
          <p className="mt-3 text-lg">Class fee: ${totalFee.toLocaleString()}</p>
          <p className="mt-2 text-2xl font-semibold">Amount due: ${displayAmount.toLocaleString()}</p>
        </div>

        {message && (
          <div className="rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center rounded-3xl px-6 py-3"
        >
          {loading ? 'Processing...' : `Pay ${paymentOption === 'full' ? 'full' : 'half'} fees`}
        </button>
      </form>
    </div>
  );
}

export default FeePayment;
