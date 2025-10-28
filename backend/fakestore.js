
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from './models.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function fetchAndSeedProducts(limit = 8) {
  const url = `https://fakestoreapi.com/products?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('FakeStore API error');
  const data = await res.json();
  const mapped = data.map(p => ({
    name: p.title.substring(0, 80),
    price: Number(p.price),
    image: p.image,
    description: p.description?.substring(0, 180) || ''
  }));
  await Product.insertMany(mapped);
  return mapped.length;
}

export async function localSeedIfEmpty() {
  const count = await Product.countDocuments();
  if (count > 0) return 0;
  const file = path.join(__dirname, 'mock-seed.json');
  const json = JSON.parse(await fs.readFile(file, 'utf8'));
  await Product.insertMany(json);
  return json.length;
}
