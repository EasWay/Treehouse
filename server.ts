import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const DB_PATH = path.join(process.cwd(), 'db.json');
  const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

  app.use(express.json());
  app.use(cookieParser());

  // Helper to read DB
  const readDB = async () => {
    try {
      console.log('Attempting to read DB from:', DB_PATH);
      if (!fs.existsSync(DB_PATH)) {
        console.error('DB file missing at:', DB_PATH);
        // Create initial DB if it doesn't exist
        const initialData = { name: "Treehouse", menu: [] };
        await fs.promises.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
        return initialData;
      }
      const data = await fs.promises.readFile(DB_PATH, 'utf-8');
      console.log('DB read successful. Data length:', data.length);
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading DB:', err);
      return { error: 'Failed to read database' };
    }
  };

  // Helper to write DB
  const writeDB = async (data: any) => {
    try {
      await fs.promises.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error('Error writing DB:', err);
    }
  };

  // --- API Routes ---
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  // Get data
  app.get('/api/data', async (req, res) => {
    console.log('API Request: GET /api/data');
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
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400000 // 1 day
      });
      return res.json({ success: true });
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  });

  // Auth Middleware
  const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
      jwt.verify(token, JWT_SECRET);
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };

  // Update data
  app.post('/api/data', authMiddleware, async (req, res) => {
    const newData = req.body;
    await writeDB(newData);
    res.json({ success: true, data: newData });
  });

  // Logout
  app.post('/api/logout', (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
