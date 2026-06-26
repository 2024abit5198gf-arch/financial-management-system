import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import financeRoutes from './routes/finance.js';
import transactionRoutes from './routes/transactions.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'Kivox FMS Backend', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/transactions', transactionRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found.` });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal server error.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Kivox FMS Backend running on port ${PORT}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL ? 'PostgreSQL connected' : 'No DATABASE_URL found!'}`);
});
