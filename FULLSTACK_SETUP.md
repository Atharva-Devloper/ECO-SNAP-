# EcoSnap Lite Full-Stack Setup Guide 🌱

Complete setup guide for the EcoSnap Lite full-stack application with React Leaflet map integration.

## 🏗️ Architecture Overview

```
EcoSnap Lite/
├── Frontend (React + Vite + Tailwind + React Leaflet)
├── Backend (Node.js + Express + MongoDB + JWT)
└── Full-Stack Integration (Axios + Authentication)
```

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start MongoDB (local or Atlas)
# mongod --dbpath /path/to/your/db

# Start backend server
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to project root
cd ..

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

**Frontend runs on:** `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Reports
- `POST /api/reports` - Create report with image upload
- `GET /api/reports` - Get reports (filtered by role)
- `GET /api/reports/nearby` - Get reports near coordinates
- `PATCH /api/reports/:id` - Update report status (admin)
- `DELETE /api/reports/:id` - Delete report (admin)

### Static Files
- `GET /uploads/:filename` - Serve uploaded images

## 🗺️ Map Integration Features

### Frontend Components
- **MapView.jsx** - Interactive Leaflet map with markers
- **Custom Markers** - Color-coded by status (red/yellow/green)
- **Popups** - Show report details with images
- **Geolocation** - Auto-detect user location
- **Responsive Design** - Mobile-friendly map interface

### Backend Support
- **Coordinates Storage** - lat/lng in MongoDB
- **Geospatial Queries** - Find nearby reports
- **Image Serving** - Static file serving for map popups
- **Status Management** - Admin can update report status

## 📱 Pages & Features

### Public Pages
- **Home** (`/`) - Landing page with hero section
- **About** (`/about`) - Project information
- **Contact** (`/contact`) - Contact form
- **Login** (`/login`) - Authentication
- **Register** (`/register`) - User registration

### Protected Pages
- **Dashboard** (`/dashboard`) - Reports list + embedded map
- **Map** (`/map`) - Full-screen interactive map
- **Report** (`/report`) - Submit new reports with geolocation

## 🔐 Authentication Flow

1. **Registration/Login** - JWT token stored in localStorage
2. **API Requests** - Axios interceptor adds Bearer token
3. **Route Protection** - ProtectedRoute component checks auth
4. **Auto-logout** - Token expiry redirects to login

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String (enum: ['user', 'admin']),
  isActive: Boolean
}
```

### Report Model
```javascript
{
  user: ObjectId (ref: User),
  description: String,
  category: String (enum),
  image: String (filename),
  location: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  status: String (enum: ['Pending', 'In Progress', 'Cleaned', 'Rejected']),
  priority: String (enum),
  adminNotes: String,
  resolvedAt: Date,
  resolvedBy: ObjectId (ref: User)
}
```

## 🎨 Map Features

### Interactive Elements
- **Zoom & Pan** - Full map navigation
- **Marker Clustering** - Automatic grouping for performance
- **Status Legend** - Visual guide for marker colors
- **Report Count** - Live count display
- **Filter Controls** - Filter by status/category

### Responsive Design
- **Mobile-First** - Touch-friendly controls
- **Responsive Height** - Adapts to screen size
- **Popup Cards** - Clean, card-based design
- **Loading States** - Smooth loading animations

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecosnap-lite
JWT_SECRET=your-super-secure-jwt-secret
JWT_EXPIRE=30d
```

### Frontend (Vite automatically loads .env files)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📦 Dependencies

### Frontend
```json
{
  "react": "^18.2.0",
  "react-leaflet": "^4.2.1",
  "leaflet": "^1.9.4",
  "axios": "^1.6.0",
  "react-router-dom": "^6.8.0",
  "tailwindcss": "^3.3.0"
}
```

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

## 🧪 Testing the Integration

### 1. Create Test User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### 2. Test Report Creation
1. Login to frontend
2. Navigate to `/report`
3. Allow location access
4. Upload image and submit
5. Check `/dashboard` and `/map` for new report

### 3. Test Map Features
1. View reports on map
2. Click markers to see popups
3. Test admin status updates
4. Verify real-time updates

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use production MongoDB instance
3. Configure CORS for your domain
4. Set up file storage (AWS S3/Cloudinary)
5. Use PM2 for process management

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to Netlify/Vercel/GitHub Pages
3. Update API base URL for production
4. Configure environment variables

## 🔍 Troubleshooting

### Common Issues

**Map not loading:**
- Check Leaflet CSS import in main.jsx
- Verify React Leaflet version compatibility
- Check console for JavaScript errors

**API requests failing:**
- Verify backend server is running
- Check CORS configuration
- Confirm JWT token in localStorage

**Images not displaying:**
- Check uploads directory permissions
- Verify static file serving configuration
- Confirm image paths in API responses

**Geolocation not working:**
- Ensure HTTPS in production
- Check browser permissions
- Provide fallback coordinates

## 📊 Performance Optimization

### Frontend
- **Lazy Loading** - Code splitting for pages
- **Image Optimization** - Compress uploaded images
- **Map Performance** - Marker clustering for large datasets
- **Caching** - Cache API responses where appropriate

### Backend
- **Database Indexing** - Geospatial indexes for location queries
- **Image Processing** - Resize/compress uploads
- **Rate Limiting** - Prevent API abuse
- **Pagination** - Limit large result sets

## 🌟 Features Summary

✅ **Complete Authentication System**
✅ **Interactive Map with React Leaflet**
✅ **Image Upload & Storage**
✅ **Geolocation Integration**
✅ **Real-time Status Updates**
✅ **Role-based Access Control**
✅ **Responsive Mobile Design**
✅ **RESTful API Architecture**
✅ **MongoDB Geospatial Queries**
✅ **JWT Security Implementation**

## 🎯 Next Steps

1. **Start both servers** (backend on :5000, frontend on :3000)
2. **Register a new user** or use demo accounts
3. **Submit test reports** with geolocation
4. **Explore the interactive map** features
5. **Test admin functionality** for status updates

**The full-stack EcoSnap Lite application is now ready for development and testing!** 🚀
