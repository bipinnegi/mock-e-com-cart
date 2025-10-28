
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
}, { timestamps: true });

const CartItemSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, default: 1, min: 1 },
}, { timestamps: true });

export const Product = mongoose.model('Product', ProductSchema);
export const CartItem = mongoose.model('CartItem', CartItemSchema);
