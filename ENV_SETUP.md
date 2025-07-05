# Environment Setup Guide

## 📋 Overview

This project supports both **Demo** and **Production** modes with separate environment configurations.

## 🗂️ Environment Files Structure

```
restauran-full/
├── .env.example              # Template for all environment variables
├── client/
│   ├── .env.local           # Current active client config
│   ├── .env.demo            # Demo mode client config
│   └── .env.production      # Production mode client config
└── server/
    ├── .env                 # Current active server config
    ├── .env.demo            # Demo mode server config
    └── .env.production      # Production mode server config
```

## 🚀 Quick Start

### 1. Demo Mode (For Client Presentations)

```bash
# Start demo mode
npm run dev:demo    # Client: http://localhost:3100
cd server && npm run dev:demo  # Server: http://localhost:3001
```

### 2. Production Mode (For Real Restaurants)

```bash
# Start production mode
npm run dev:prod    # Client: http://localhost:3200
cd server && npm run dev:prod  # Server: http://localhost:3001
```

## ⚙️ Environment Variables Explained

### Client Variables (NEXT*PUBLIC*\*)

| Variable                           | Demo    | Production   | Description          |
| ---------------------------------- | ------- | ------------ | -------------------- |
| `NEXT_PUBLIC_APP_MODE`             | `demo`  | `production` | App mode             |
| `NEXT_PUBLIC_DEMO_MODE`            | `true`  | `false`      | Enable demo features |
| `NEXT_PUBLIC_ENABLE_MOCK_PAYMENTS` | `true`  | `false`      | Use mock payments    |
| `NEXT_PUBLIC_ENABLE_DEMO_RESET`    | `true`  | `false`      | Show reset button    |
| `NEXT_PUBLIC_CLOUDINARY_ENABLED`   | `false` | `true`       | Enable image uploads |
| `NEXT_PUBLIC_ADMIN_AUTH_ENABLED`   | `false` | `true`       | Require admin login  |

### Server Variables

| Variable         | Demo         | Production    | Description          |
| ---------------- | ------------ | ------------- | -------------------- |
| `APP_MODE`       | `demo`       | `production`  | Server mode          |
| `MONGO_URI`      | Demo DB      | Production DB | Database connection  |
| `JWT_SECRET`     | Demo key     | Strong key    | JWT signing key      |
| `QPAY_CLIENT_ID` | Demo/Sandbox | Production    | QPay credentials     |
| `EBARIMT_*`      | Sandbox      | Production    | Tax invoice settings |

## 🔧 Configuration Steps

### 1. First Time Setup

```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
nano .env.local
```

### 2. Demo Mode Setup

- Uses separate demo database (`food-delivery-demo`)
- Mock payment processing
- No admin authentication
- Cloudinary disabled
- Demo reset functionality enabled

### 3. Production Mode Setup

- Uses production database (`food-delivery`)
- Real QPay & eBarimt integration
- Admin authentication required
- Full Cloudinary support
- All security features enabled

## 🔒 Security Notes

### Demo Mode

- Uses weak JWT secrets (safe for demos)
- No real payment processing
- Separate database to prevent data mixing
- No sensitive data exposure

### Production Mode

- **IMPORTANT**: Change all default passwords and secrets
- Use strong JWT secrets (64+ characters)
- Enable HTTPS in production
- Use production QPay/eBarimt credentials
- Set up proper SMTP for emails

## 📝 Required Updates for Production

1. **JWT Secret**: Generate strong secret key
2. **Database**: Update MongoDB connection string
3. **QPay**: Add production QPay credentials
4. **eBarimt**: Add production tax invoice settings
5. **Cloudinary**: Verify production API keys
6. **SMTP**: Configure email settings
7. **Domain**: Update CLIENT_URL to production domain

## 🛠️ Scripts Reference

### Client Scripts

```bash
npm run dev:demo      # Demo development
npm run dev:prod      # Production development
npm run build:demo    # Demo build
npm run build:prod    # Production build
npm run start:demo    # Demo start
npm run start:prod    # Production start
```

### Server Scripts

```bash
npm run dev:demo      # Demo development
npm run dev:prod      # Production development
npm run start:demo    # Demo start
npm run start:prod    # Production start
```

## 🐛 Troubleshooting

### Environment Not Loading

- Check if `.env.local` exists in client folder
- Check if `.env` exists in server folder
- Verify environment variables are properly set

### Mode Not Switching

- Clear browser cache
- Restart development servers
- Check console for environment variable logs

### Database Issues

- Verify MongoDB connection string
- Check if demo/production databases are accessible
- Ensure proper network access

## 📞 Support

If you encounter issues:

1. Check environment variables are correctly set
2. Verify all required services are running
3. Check console logs for detailed error messages
4. Ensure proper network connectivity for external services
