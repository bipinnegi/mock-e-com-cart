
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productsRouter from './products.js';
import cartRouter from './cart.js';
import checkoutRouter from './checkout.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mockuser:Mock12345@cluster0.7o5poup.mongodb.net/mockecom?retryWrites=true&w=majority&appName=Cluster0';

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use((req, res, next) => {
  if (!req.cookies || !req.cookies.userId) {
    res.cookie('userId', 'mock-user-1', { httpOnly: false, sameSite: 'Lax' });
    req.userId = 'mock-user-1';
  } else {
    req.userId = req.cookies.userId;
  }
  next();
});

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

async function start() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'mockecom' });
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 API ready on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

start();
