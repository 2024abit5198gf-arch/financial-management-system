import { Router } from 'express';
import pool from '../db.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

const FEE_AMOUNTS = { s1: 2100, s2: 2200, s3: 2300, s4: 2400, s5: 2500, s6: 2600 };

function generateRef() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `KVX-${ts}-${rand}`;
}

router.get('/', verifyToken, async (req, res) => {
  try {
    let result;
    if (req.user.role === 'student') {
      result = await pool.query(
        `SELECT t.*, u.name AS student_name
         FROM transactions t
         JOIN users u ON u.id = t.user_id
         WHERE t.user_id = $1
         ORDER BY t.created_at DESC
         LIMIT 50`,
        [req.user.id]
      );
    } else {
      result = await pool.query(
        `SELECT t.*, u.name AS student_name
         FROM transactions t
         JOIN users u ON u.id = t.user_id
         ORDER BY t.created_at DESC
         LIMIT 100`
      );
    }
    return res.json(result.rows);
  } catch (err) {
    console.error('Get transactions error:', err.message);
    return res.status(500).json({ message: 'Failed to load transactions.' });
  }
});

router.post('/pay', verifyToken, async (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can make fee payments.' });
  }

  const { classLevel, paymentOption } = req.body;
  if (!classLevel || !paymentOption) {
    return res.status(400).json({ message: 'Class level and payment option are required.' });
  }

  const validClasses = ['s1', 's2', 's3', 's4', 's5', 's6'];
  if (!validClasses.includes(classLevel)) {
    return res.status(400).json({ message: 'Invalid class level.' });
  }

  const totalFee = FEE_AMOUNTS[classLevel];
  const amount = paymentOption === 'full' ? totalFee : totalFee / 2;
  const reference = generateRef();
  const description = `${paymentOption === 'full' ? 'Full' : 'Half'} term fees — ${classLevel.toUpperCase()}`;

  try {
    await pool.query('UPDATE users SET class_level = $1 WHERE id = $2', [classLevel, req.user.id]);

    const txResult = await pool.query(
      `INSERT INTO transactions (user_id, amount, type, description, reference, status, class_level)
       VALUES ($1, $2, 'fee_payment', $3, $4, 'completed', $5)
       RETURNING *`,
      [req.user.id, amount, description, reference, classLevel]
    );

    const transaction = txResult.rows[0];
    return res.status(201).json({
      message: 'Payment recorded successfully.',
      amount,
      transaction: {
        id: transaction.id,
        reference: transaction.reference,
        amount: transaction.amount,
        description: transaction.description,
        status: transaction.status,
        createdAt: transaction.created_at,
      },
    });
  } catch (err) {
    console.error('Payment error:', err.message);
    return res.status(500).json({ message: 'Payment failed. Please try again.' });
  }
});

export default router;
