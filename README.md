# 🛒 Mock E-Com Cart — Vibe Commerce Screening

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-blue)
![Backend](https://img.shields.io/badge/backend-Express%20%2B%20MongoDB-green)
![Status](https://img.shields.io/badge/status-live-success)

> A modern, minimal **Full-Stack Shopping Cart** built for the *Vibe Commerce* screening.  
> Handles product listing, cart management, and a mock checkout flow — with persistent data via MongoDB Atlas.

---

## 🚀 Tech Stack

| Layer | Technology |
|:------|:------------|
| Frontend | React (Vite), CSS (Modern Dark UI) |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose ORM) |
| API | REST |
| Integration | Fake Store API (fallback to local seed) |

---

## 📁 Folder Structure

```
mock-ecom-cart/
├─ backend/        # Express server + MongoDB models
├─ frontend/       # React + Vite client
├─ assets/
│   └─ screenshots/  # Add demo screenshots here
└─ README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone or Download
```bash
git clone https://github.com/yourusername/mock-ecom-cart.git
cd mock-ecom-cart
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install

# Create .env file (or copy .env.example)
echo "MONGO_URI=mongodb+srv://mockuser:Mock12345@cluster0.7o5poup.mongodb.net/mockecom?retryWrites=true&w=majority&appName=Cluster0" > .env
echo "PORT=4000" >> .env

npm run dev   # http://localhost:4000
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev   # http://localhost:3000
```

> The frontend automatically connects to your backend (`http://localhost:4000`).  
> It uses cookies to persist a mock user (`mock-user-1`) in MongoDB.

---

## 🧠 Features Overview

| Feature | Description |
|:--------|:-------------|
| 🛍️ Product Grid | Displays mock items from Fake Store API (auto-seeded) |
| ➕ Add / Remove | Add to cart, update quantity, remove items |
| 💰 Cart Summary | Shows subtotal and total in real-time |
| ✅ Checkout | Collects name/email → Generates mock receipt |
| 🧩 Persistence | MongoDB-based cart tied to mock user |
| 🧱 Fallback | If Fake Store API fails → uses local `mock-seed.json` |
| 💄 Styling | Responsive, dark-themed modern layout |

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|:-------|:----------|:-------------|
| GET | `/api/products` | Returns product list (auto-seeded) |
| POST | `/api/cart` | Add or update item `{ productId, qty }` |
| GET | `/api/cart` | Returns current cart + total |
| DELETE | `/api/cart/:id` | Remove item from cart |
| POST | `/api/checkout` | Mock checkout `{ name, email }` → receipt |

---

## 📸 Screenshots

### 🖼️ Product Grid & Cart View
![Products & Cart](./assets/screenshots/ss1.png)

### 🧾 Checkout Modal
![Checkout Modal](./assets/screenshots/ss2.png)

---

## 🎥 Demo Video

🎬 Watch the 1–2 minute walkthrough:  
👉 [Unlisted YouTube / Loom Link Here](#)

---

## 🧰 Commands Reference

| Command | Location | Description |
|:--------|:----------|:-------------|
| `npm run dev` | `/backend` | Start Express server with nodemon |
| `npm start` | `/backend` | Run production server |
| `npm run dev` | `/frontend` | Start Vite dev server |
| `npm run build` | `/frontend` | Build static production files |
| `npm run preview` | `/frontend` | Preview build locally |

---

## 🧑‍💻 Author & Credits

**Developed by:** *Anshul Negi*  
For *Vibe Commerce* — Full Stack Developer Screening

---

✨ *Simple. Modern. Complete. — Mock E-Com Cart by Anshul Negi*
