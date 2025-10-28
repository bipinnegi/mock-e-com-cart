
import express from 'express';
import { CartItem, Product } from './models.js';

const router = express.Router();

async function getCartForUser(userId) {
  const items = await CartItem.find({ userId }).populate('productId');
  const mapped = items.map(ci => ({
    _id: ci._id,
    product: { 
      _id: ci.productId._id,
      name: ci.productId.name,
      price: ci.productId.price,
      image: ci.productId.image,
      description: ci.productId.description
    },
    qty: ci.qty
  }));
  const total = mapped.reduce((sum, it) => sum + it.product.price * it.qty, 0);
  return { items: mapped, total: Math.round(total * 100) / 100 };
}

router.get('/', async (req, res) => {
  try {
    const data = await getCartForUser(req.userId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get cart' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty || qty < 1) return res.status(400).json({ error: 'productId and qty >=1 required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const found = await CartItem.findOne({ userId: req.userId, productId });
    if (found) {
      found.qty = qty;
      await found.save();
    } else {
      await CartItem.create({ userId: req.userId, productId, qty });
    }

    const data = await getCartForUser(req.userId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await CartItem.deleteOne({ _id: req.params.id, userId: req.userId });
    const data = await getCartForUser(req.userId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

export default router;
