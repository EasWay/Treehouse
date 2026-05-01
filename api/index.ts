import express from 'express';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
const DB_PATH = path.join(process.cwd(), 'db.json');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

app.use(express.json());
app.use(cookieParser());

// Helper to read DB
const readDB = async () => {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { name: "Treehouse", menu: [] };
    }
    const data = await fs.promises.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { error: 'Failed to read database' };
  }
};

// --- API Routes ---

// Get data
app.get('/api/data', async (req, res) => {
  const data = await readDB();
  res.json(data);
});

// Admin Login
app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASS) {
    const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 86400000 // 1 day
    });
    return res.json({ success: true });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true });
});

// For Vercel Serverless
export default app;
