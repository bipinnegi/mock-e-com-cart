
import express from 'express';
import { Product } from './models.js';
import { fetchAndSeedProducts, localSeedIfEmpty } from './fakestore.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let count = await Product.countDocuments();
    if (count === 0) {
      try {
        await fetchAndSeedProducts(8);
      } catch(e) {
        console.warn('⚠️ FakeStore fetch failed, using local seed:', e.message);
        await localSeedIfEmpty();
      }
    } 
    const items = await Product.find().limit(12);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

export default router;
