import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import { expireFoods } from './controllers/foodController.js';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Food Redistribution Platform API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/stats', statsRoutes);

const PORT = process.env.PORT || 5000;

const ensureDefaultUsers = async () => {
  const seeds = [
    { name: 'Test Restaurant', email: 'test@restaurant.com', password: '123456', role: 'restaurant' },
    { name: 'NGO One', email: 'NGO1@gmail.com', password: 'NGO1', role: 'ngo' }
  ];

  for (const seed of seeds) {
    const existing = await User.findOne({ email: seed.email });
    if (!existing) {
      await User.create(seed);
      console.log(`Seeded user: ${seed.email} / ${seed.password} (${seed.role})`);
    }
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await ensureDefaultUsers();
    await expireFoods(); // initial sweep to avoid showing stale items
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Server failed to start', err);
    process.exit(1);
  }
};

startServer();
