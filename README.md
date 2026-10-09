# AGRIMART — Digital Agriculture Marketplace MVP

> **Tagline:** Fresh from farms. Fair for everyone.
> Rebranded and redesigned from KisanBazar MVP with a modern agricultural aesthetic, floating pill navigation, premium typography, and seamless producer-to-consumer marketplace flow.

---

## 1. Features Included

1. **Brand Identity & Aesthetic:**
   - Visual identity inspired by agricultural landscapes and modern editorial design.
   - Deep forest green (`#123D2A`), primary leaf green (`#4F8A3D`), bright CTA green (`#5C963F`), soft sage (`#E8F0E5`), and warm off-white (`#F7F8F3`).
   - Clean dual-font system: **Manrope** for display headlines, **Inter** for body text, navigation, and forms.
   - Original AGRIMART geometric sprout emblem and responsive floating pill navigation.

2. **Homepage Composition:**
   - High-contrast aerial farm hero section with layered content and deep-green gradient protection.
   - Interactive sourcing model feature card (`Closer to the source`).
   - Three trust and value pillars (Local Farmers, Transparent Pricing, Peak Freshness).
   - API-powered Live Harvest preview with automated loading skeletons and error fallbacks.
   - "How AGRIMART Works" step-by-step guides for consumers and producers.
   - Direct call-to-action for regional farmers.

3. **Marketplace:**
   - Real-time produce directory fetched from the backend API.
   - Produce keyword recognition mapping crops (tomatoes, potatoes, onions, rice, leafy greens) to authentic photography with robust image fallbacks.
   - Client-side search and filtering by produce or farmer name.
   - Interactive "Contact Farmer" modal with product specifications.

4. **Authentication & Role-Based Access:**
   - User Registration with visual role selection (`Farmer` or `Consumer`).
   - User Sign-in with validation, password visibility toggles, and clear error banners.
   - JWT authentication stored securely in client state and `localStorage`.

5. **Farmer Management Dashboard:**
   - Restricted to authenticated farmers.
   - KPI metrics: Active listings count and total stock in units.
   - Form to add new produce (`name`, `price`, `unit` [kg, dozen, piece], and `quantityInStock`).
   - Visual listing cards displaying inventory and pricing.

---

## 2. Setup Instructions

### Prerequisites
- Node.js (v16+) and npm installed
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/kisanbazar_mvp`) or a MongoDB Atlas URI

### 1. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (do NOT commit this file):
```dotenv
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/kisanbazar_mvp
JWT_SECRET=supersecretjwtkey123
```

Start the API server:
```bash
npm run dev
# or: npm start
```
The API runs at `http://localhost:5000`.

### 2. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
```

Optionally create `frontend/.env` to configure the backend API origin (see `frontend/.env.example`):
```dotenv
REACT_APP_API_URL=http://localhost:5000
```

Start the React development server:
```bash
npm start
```
The application opens at `http://localhost:3000`.

To build for production:
```bash
npm run build
```

---

## 3. Technology Stack

- **Frontend:** React 18, React Router DOM 6, Axios, Tailwind CSS 3, Google Fonts (Manrope & Inter)
- **Backend:** Node.js, Express 4, MongoDB with Mongoose 7, bcryptjs, jsonwebtoken, cors, dotenv
