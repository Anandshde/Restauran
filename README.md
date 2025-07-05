# Restaurant Ordering System - Demo & Production

A full-stack restaurant ordering system with separate demo and production environments.

## 🏗️ Architecture

```
restauran-full/
├── apps/
│   ├── demo/
│   │   ├── frontend/          # Demo Next.js app
│   │   └── backend/           # Demo Express API
│   └── production/
│       ├── frontend/          # Production Next.js app
│       └── backend/           # Production Express API
├── packages/
│   └── shared/                # Shared components, types, utils
└── package.json               # Monorepo workspace
```

## 🎯 Two Versions

### 🧪 Demo Version

- **Purpose**: Client presentations and showcases
- **Features**:
  - Mock data only (no real database)
  - Fake QPay payments
  - No admin authentication required
  - Mongolian i18n enabled
  - Reset functionality
  - Landing page with pricing
  - Seeded demo data

### 🚀 Production Version

- **Purpose**: Real restaurant deployments
- **Features**:
  - Real MongoDB database
  - Real QPay & eBarimt integration
  - Admin authentication required
  - Cloudinary image uploads
  - Full analytics dashboard
  - Kitchen management system

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

1. **Clone and install dependencies**:

```bash
git clone <repo-url>
cd restauran-full
npm run install:all
```

2. **Start demo environment**:

```bash
npm run dev:demo
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

3. **Start production environment**:

```bash
npm run dev:prod
```

- Frontend: http://localhost:3002
- Backend: http://localhost:3003

## 🔧 Configuration

### Demo Environment

```bash
# apps/demo/frontend/.env.local
NEXT_PUBLIC_APP_MODE=demo
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_ENABLE_MOCK_PAYMENTS=true
```

### Production Environment

```bash
# apps/production/frontend/.env.local
NEXT_PUBLIC_APP_MODE=production
NEXT_PUBLIC_API_URL=http://localhost:3003
MONGODB_URI=mongodb://localhost:27017/restaurant
QPAY_USERNAME=your_qpay_username
QPAY_PASSWORD=your_qpay_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## 📝 Available Scripts

### Root Level

```bash
# Development
npm run dev:demo          # Start demo (frontend + backend)
npm run dev:prod          # Start production (frontend + backend)

# Build
npm run build:demo        # Build demo apps
npm run build:prod        # Build production apps

# Production
npm run start:demo        # Start demo in production
npm run start:prod        # Start production apps

# Demo utilities
npm run seed:demo         # Seed demo data
npm run reset:demo        # Reset demo data

# Maintenance
npm run clean             # Clean all node_modules
npm run install:all       # Install all dependencies
```

## 🎨 Shared Package

The `@restaurant/shared` package contains:

- **Types**: TypeScript interfaces and types
- **Components**: Reusable UI components
- **Config**: Environment-aware configuration
- **Data**: Demo seed data and utilities
- **Utils**: Shared utility functions

### Usage in Apps

```typescript
import { isDemo, Food, DEMO_FOODS, config } from "@restaurant/shared";

// Check environment
if (isDemo()) {
  // Use mock data
  const foods = DEMO_FOODS;
} else {
  // Use real API
  const foods = await fetchFoodsFromAPI();
}
```

## 🌐 Deployment

### Demo Deployment (Vercel + Render)

1. **Frontend (Vercel)**:

```bash
# Deploy demo frontend
cd apps/demo/frontend
vercel --prod
```

2. **Backend (Render)**:

```bash
# Deploy demo backend
cd apps/demo/backend
# Connect to Render and deploy
```

### Production Deployment

1. **Frontend (Vercel)**:

```bash
cd apps/production/frontend
vercel --prod
```

2. **Backend (Railway/Render)**:

```bash
cd apps/production/backend
# Configure with real environment variables
# Deploy to your preferred platform
```

## 🔒 Security

### Demo Environment

- No real payment processing
- No sensitive data storage
- Rate limiting enabled
- CORS configured for demo domain

### Production Environment

- Full payment encryption
- Admin authentication required
- Database security configured
- Environment variables protected

## 🧪 Demo Features

### Landing Page (`/demo`)

- Hero section with Mongolian branding
- 3-step demo flow explanation
- Pricing information (₮1,999,000 setup + ₮199,000/month)
- Feature showcase

### Mock Data

- 12 food items (Mongolian + International)
- 5 restaurant tables
- Sample orders and statistics
- Realistic demo scenarios

### Reset Functionality

- Admin can reset all demo data
- Returns to initial state
- Preserves demo flow integrity

## 🏪 Production Features

### Real Integrations

- **QPay**: Real payment processing
- **eBarimt**: Tax invoice generation
- **MongoDB**: Persistent data storage
- **Cloudinary**: Image upload and management
- **Socket.IO**: Real-time order updates

### Admin Dashboard

- Order management
- Menu management
- Analytics and reporting
- Kitchen display system

## 🌍 Internationalization

Full Mongolian language support:

- Customer-facing interface
- Admin dashboard
- Error messages
- Demo content

## 📊 API Endpoints

### Demo API (`localhost:3001`)

```
GET  /api/food           # Get demo foods
GET  /api/orders         # Get demo orders
POST /api/payment/create # Mock payment
POST /api/demo/reset     # Reset demo data
```

### Production API (`localhost:3003`)

```
GET  /api/food           # Get real foods
POST /api/food           # Create food (auth required)
GET  /api/orders         # Get real orders
POST /api/payment/create # Real QPay payment
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@restaurant-system.com or join our Discord channel.

---

**Built with ❤️ for Mongolian restaurants**
