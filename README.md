Sure thing bro! Here's a **clean, professional, and technical README.md** for your **SRM BrokeBuy Frontend** project — tailored like a top-tier engineer prepping for recruiters, open-source, or investors.

---

```md
# 🛍️ SRM BrokeBuy - Frontend

Welcome to the **SRM BrokeBuy Frontend**, the official user interface for SRM's student-powered campus marketplace. Built using modern web technologies, this frontend offers a seamless and responsive experience for listing, discovering, and purchasing second-hand items within the SRM community.

---

## 🚀 Tech Stack

| Layer            | Stack                                     |
|------------------|-------------------------------------------|
| Framework        | [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) |
| Language         | TypeScript                                |
| Styling/UI       | Tailwind CSS, ShadCN UI                   |
| Icons            | Lucide Icons                              |
| Routing          | React Router DOM                          |
| API Layer        | Axios with token-based auth               |
| Image Handling   | Cloudinary (via backend)                  |
| State Management | React Hooks + Context (if needed)         |
| Dev Tools        | ESLint, Prettier, VSCode + Dev Tunnels    |

---

## 📂 Project Structure

src/
├── assets/              # Static assets
├── components/          # Reusable UI components (Buttons, Cards, etc.)
├── pages/               # Page-level components (Marketplace, Login, My Listings)
├── layouts/             # Layout wrappers (Sidebar, Nav)
├── lib/                 # Axios instance, utility functions
├── hooks/               # Custom React hooks (useToast, useAuth)
├── types/               # TypeScript interfaces
└── App.tsx              # App entrypoint with routes

````

---

## 🔐 Authentication

- **Token-based auth (JWT)** is used.
- The frontend stores the token in localStorage and attaches it to every authenticated request via Axios interceptors.
- Login is powered via **SRM SSO** integration through the backend.

---

## 🛒 Core Features

### 🧩 General User Flow
- **Marketplace**: Browse/search listings with filters (category, condition)
- **View Details**: View full product info with image carousel, seller info
- **Create Listing**: Upload item with image compression & validation
- **Edit Listing**: Update listing data with preserved image state
- **Buy Flow**: Initiate purchase and transaction
- **My Listings**: Track your listings, toggle availability, delete/edit
- **Messages**: Chat with seller (via backend integration)
- **My Purchases**: See your bought items

---

## 📦 API Integration

- Base URL is environment-controlled (`.env`)
- Uses RESTful APIs powered by a FastAPI backend
- Common endpoints used:
  - `POST /auth/login`
  - `GET /listings/`
  - `GET /listings/{id}`
  - `POST /listings/create`
  - `PUT /listings/{id}`
  - `PATCH /listings/{id}/toggle-status`
  - `GET /listings/my-listings`
  - `POST /upload-image`

---

## 📸 Image Compression

- Uses [`browser-image-compression`](https://www.npmjs.com/package/browser-image-compression)
- Automatically compresses images before upload:
  - Max size: 1MB
  - Max dimension: 1200px
- Improves UX and reduces payload

---

## 🧪 Dev Setup

```bash
# 1. Clone repo
git clone https://github.com/yourusername/srm-brokebuy-frontend.git

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
````

> 🔁 Vite auto-reloads on file changes. Make sure your backend is running on the right port.

---

## 🌐 Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 📱 Mobile Compatibility

* Fully responsive layout
* Port forwarding (`dev tunnels`) is supported for testing on real mobile devices

---

## 🤝 Contributors

* 👨‍💻 [Abishek Rajaram](https://github.com/abishekr03) — Fullstack Dev + DevOps
* 🔧 Lovable AI — Rapid UI builder & Tailwind generator
* ☁️ Cloudinary — Image optimization

---

## 🧠 Future Roadmap

* [ ] Razorpay integration for payment flow
* [ ] Seller reviews & ratings
* [ ] Push notifications (via PWA or OneSignal)
* [ ] Admin dashboard
* [ ] Email alerts for listing offers

---

## 📃 License

MIT License. © SRM BrokeBuy Team — Built with ❤️ at SRMIST.

```
