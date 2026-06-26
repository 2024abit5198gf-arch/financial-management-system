import { Router } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';
import { signToken, verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

const safeUser = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, classLevel: u.class_level });

router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }
  const allowedRole = 'student';
  try {
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }
    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name.trim(), email.toLowerCase(), hash, allowedRole]
    );
    const user = result.rows[0];
    return res.status(201).json({ token: signToken(user), user: safeUser(user) });
  } catch (err) {
    console.error('Signup error:', err.message);
    return res.status(500).json({ message: 'Server error during signup.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    const user = result.rows[0];
    if (!user || !user.password_hash) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    return res.json({ token: signToken(user), user: safeUser(user) });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: 'Server error during login.' });
  }
});

router.post('/google', async (req, res) => {
  const { access_token, role } = req.body;
  if (!access_token) {
    return res.status(400).json({ message: 'Google access token is required.' });
  }
  try {
    const gRes = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`);
    if (!gRes.ok) {
      return res.status(401).json({ message: 'Google token verification failed.' });
    }
    const googleUser = await gRes.json();
    if (!googleUser.email) {
      return res.status(401).json({ message: 'Could not retrieve email from Google.' });
    }

    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [googleUser.email.toLowerCase()]);
    let user;
    if (existing.rows.length > 0) {
      user = existing.rows[0];
      await pool.query('UPDATE users SET google_id = $1, name = COALESCE(name, $2) WHERE id = $3', [googleUser.id, googleUser.name, user.id]);
    } else {
      const assignedRole = role === 'student' ? 'student' : 'student';
      const result = await pool.query(
        'INSERT INTO users (name, email, role, google_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [googleUser.name, googleUser.email.toLowerCase(), assignedRole, googleUser.id]
      );
      user = result.rows[0];
    }
    return res.json({ token: signToken(user), user: safeUser(user) });
  } catch (err) {
    console.error('Google auth error:', err.message);
    return res.status(500).json({ message: 'Google sign-in failed. Please try again.' });
  }
});

router.post('/admin/create-user', verifyToken, requireRole('admin'), async (req, res) => {
  const { name, email, role, password } = req.body;
  if (!name || !email || !role || !password) {
    return res.status(400).json({ message: 'Name, email, role and password are all required.' });
  }
  const allowedRoles = ['admin', 'bursar', 'student'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Must be admin, bursar, or student.' });
  }
  try {
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ message: 'A user with this email already exists.' });
    }
    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name.trim(), email.toLowerCase(), hash, role]
    );
    const user = result.rows[0];
    return res.status(201).json({ message: `${role} account created successfully.`, user: safeUser(user) });
  } catch (err) {
    console.error('Create user error:', err.message);
    return res.status(500).json({ message: 'Failed to create user.' });
  }
});

export default router;
