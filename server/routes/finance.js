import { Router } from 'express';
import pool from '../db.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

const FEE_AMOUNTS = { s1: 2100, s2: 2200, s3: 2300, s4: 2400, s5: 2500, s6: 2600 };

router.get('/summary', verifyToken, requireRole('admin', 'bursar'), async (req, res) => {
  try {
    const revenueRes = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) AS revenue
      FROM transactions WHERE status = 'completed'
    `);

    const studentsRes = await pool.query(`
      SELECT COUNT(*) AS students FROM users WHERE role = 'student'
    `);

    const paidRes = await pool.query(`
      SELECT u.id, u.class_level, COALESCE(SUM(t.amount), 0) AS paid
      FROM users u
      LEFT JOIN transactions t ON t.user_id = u.id AND t.status = 'completed'
      WHERE u.role = 'student' AND u.class_level IS NOT NULL
      GROUP BY u.id, u.class_level
    `);

    let outstanding = 0;
    for (const row of paidRes.rows) {
      const total = FEE_AMOUNTS[row.class_level] || 0;
      const diff = total - Number(row.paid);
      if (diff > 0) outstanding += diff;
    }

    const chartRes = await pool.query(`
      SELECT TO_CHAR(DATE_TRUNC('month', created_at), 'Mon') AS name,
             COALESCE(SUM(amount), 0) AS value
      FROM transactions
      WHERE status = 'completed'
        AND created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at), name
      ORDER BY DATE_TRUNC('month', created_at)
    `);

    return res.json({
      revenue: Number(revenueRes.rows[0].revenue),
      students: Number(studentsRes.rows[0].students),
      outstanding: Math.round(outstanding),
      chart: chartRes.rows.map(r => ({ name: r.name, value: Number(r.value) })),
    });
  } catch (err) {
    console.error('Summary error:', err.message);
    return res.status(500).json({ message: 'Failed to load financial summary.' });
  }
});

router.get('/fees', verifyToken, async (req, res) => {
  const { role, id } = req.user;

  try {
    if (role === 'student') {
      const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      const user = userRes.rows[0];
      const classLevel = user?.class_level || null;
      const totalFees = classLevel ? (FEE_AMOUNTS[classLevel] || 0) : 0;

      const paidRes = await pool.query(
        `SELECT COALESCE(SUM(amount), 0) AS paid FROM transactions WHERE user_id = $1 AND status = 'completed'`,
        [id]
      );
      const paid = Number(paidRes.rows[0].paid);
      const outstandingFees = Math.max(0, totalFees - paid);

      return res.json({
        student: { classLevel, totalFees, outstandingFees, paid },
      });
    }

    const classLevels = ['s1', 's2', 's3', 's4', 's5', 's6'];
    const classTotals = [];

    for (const cl of classLevels) {
      const r = await pool.query(
        `SELECT COUNT(u.id) AS total_students,
                COALESCE(SUM(t.amount), 0) AS collected
         FROM users u
         LEFT JOIN transactions t ON t.user_id = u.id AND t.status = 'completed'
         WHERE u.role = 'student' AND u.class_level = $1
         GROUP BY u.class_level`,
        [cl]
      );
      const totalStudents = r.rows[0] ? Number(r.rows[0].total_students) : 0;
      const feePerStudent = FEE_AMOUNTS[cl];
      const totalFees = totalStudents * feePerStudent;
      const collected = r.rows[0] ? Number(r.rows[0].collected) : 0;
      const outstandingFees = Math.max(0, totalFees - collected);
      classTotals.push({ classLevel: cl, totalStudents, totalFees, outstandingFees });
    }

    const studentsRes = await pool.query(`
      SELECT u.id, u.name, u.class_level,
             COALESCE(SUM(t.amount), 0) AS paid
      FROM users u
      LEFT JOIN transactions t ON t.user_id = u.id AND t.status = 'completed'
      WHERE u.role = 'student'
      GROUP BY u.id, u.name, u.class_level
      ORDER BY u.name
    `);

    const studentBalances = studentsRes.rows.map(s => {
      const totalFees = s.class_level ? (FEE_AMOUNTS[s.class_level] || 0) : 0;
      const paid = Number(s.paid);
      return {
        id: s.id,
        name: s.name,
        classLevel: s.class_level,
        totalFees,
        outstandingFees: Math.max(0, totalFees - paid),
      };
    });

    return res.json({ classTotals, studentBalances });
  } catch (err) {
    console.error('Fees error:', err.message);
    return res.status(500).json({ message: 'Failed to load fee data.' });
  }
});

export default router;
