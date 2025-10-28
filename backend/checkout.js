
import express from 'express';
import { CartItem } from './models.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body || {};
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });

    const userId = req.userId;
    const items = await CartItem.find({ userId }).populate('productId');
    const total = items.reduce((sum, it) => sum + it.productId.price * it.qty, 0);
    const rounded = Math.round(total * 100) / 100;

    const receipt = {
      orderId: 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      name,
      email,
      total: rounded,
      itemCount: items.reduce((s, it) => s + it.qty, 0),
      timestamp: new Date().toISOString()
    };

    await CartItem.deleteMany({ userId });

    res.json({ receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

export default router;
