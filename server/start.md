# Quick Start Guide for EcoSnap Lite Backend

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Start MongoDB:**
   - Install MongoDB locally OR use MongoDB Atlas
   - Make sure MongoDB is running on `mongodb://localhost:27017`

3. **Start the Server:**
   ```bash
   npm run dev
   ```

4. **Test the API:**
   ```bash
   # Health check
   curl http://localhost:5000/api/health
   
   # Or visit in browser: http://localhost:5000
   ```

## 📋 Default Admin User

After starting the server, you can create an admin user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@ecosnap.com",
    "password": "admin123",
    "name": "Admin User",
    "role": "admin"
  }'
```

## 🔧 Environment Setup

Make sure your `.env` file has:
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecosnap-lite
JWT_SECRET=ecosnap_jwt_secret_key_2025_very_secure_random_string
JWT_EXPIRE=30d
```

## 📡 API Endpoints Ready

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/me` - Get current user
- `POST /api/reports` - Create report (with image upload)
- `GET /api/reports` - Get reports
- `GET /api/reports/nearby` - Get nearby reports for map
- `PATCH /api/reports/:id` - Update report status (admin)

## 🗺️ Map Integration Ready

All report responses include:
- `coordinates.lat` and `coordinates.lng` for map positioning
- `imageUrl` for displaying images
- `status` for color coding markers
- `description` and `category` for popup content
