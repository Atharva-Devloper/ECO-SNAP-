# EcoSnap Lite Backend API 🌱

A robust Node.js + Express.js backend API for the EcoSnap Lite civic-tech platform, featuring JWT authentication, MongoDB storage, image uploads, and geolocation support.

## 🚀 Features

- **JWT Authentication** - Secure user registration and login
- **Role-based Access** - Admin and user roles with different permissions
- **Image Upload** - Multer-powered image handling with validation
- **Geolocation Support** - MongoDB geospatial queries for map integration
- **RESTful API** - Clean, well-documented endpoints
- **Error Handling** - Comprehensive error handling and validation
- **File Management** - Automatic image cleanup and storage

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Security**: bcryptjs for password hashing
- **Logging**: Morgan
- **CORS**: Cross-origin resource sharing enabled

## 📦 Installation

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. **Start MongoDB** (make sure MongoDB is running locally or use MongoDB Atlas)

5. **Run the server:**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔧 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecosnap-lite
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRE=30d
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | User login | Public |
| GET | `/me` | Get current user | Private |
| PUT | `/profile` | Update user profile | Private |

### Report Routes (`/api/reports`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get reports (all for admin, own for users) | Private |
| POST | `/` | Create new report with image | Private |
| GET | `/stats` | Get report statistics | Private |
| GET | `/nearby` | Get reports near location | Private |
| GET | `/:id` | Get single report | Private |
| PATCH | `/:id` | Update report status | Admin |
| DELETE | `/:id` | Delete report | Admin |

### Utility Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | API welcome message | Public |
| GET | `/api/health` | Health check | Public |
| GET | `/uploads/:filename` | Serve uploaded images | Public |

## 📋 Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "user"
}
```

### Create Report
```bash
POST /api/reports
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data

{
  "description": "Overflowing trash bin on Main Street",
  "category": "Overflowing Bin",
  "location": "Main Street & 5th Avenue",
  "coordinates": {
    "lat": 40.7128,
    "lng": -74.0060
  },
  "image": <file>
}
```

### Get Nearby Reports
```bash
GET /api/reports/nearby?lat=40.7128&lng=-74.0060&radius=5000
Authorization: Bearer <jwt-token>
```

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String (enum: ['user', 'admin']),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
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
  priority: String (enum: ['Low', 'Medium', 'High', 'Critical']),
  adminNotes: String,
  resolvedAt: Date,
  resolvedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── reportController.js   # Report management logic
├── middleware/
│   ├── authMiddleware.js     # JWT authentication & authorization
│   └── uploadMiddleware.js   # Multer file upload configuration
├── models/
│   ├── userModel.js         # User schema
│   └── reportModel.js       # Report schema
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   └── reportRoutes.js      # Report routes
├── uploads/                 # Image storage directory
├── .env                     # Environment variables
├── server.js               # Main server file
└── package.json            # Dependencies and scripts
```

## 🌍 Geolocation Features

- **Coordinate Storage**: Reports store lat/lng coordinates
- **Nearby Search**: Find reports within a specified radius
- **Map Integration Ready**: All responses include coordinates and image URLs
- **Geospatial Indexing**: MongoDB 2dsphere index for efficient location queries

## 📸 Image Upload

- **File Types**: JPEG, JPG, PNG, GIF, WebP
- **Size Limit**: 5MB per image
- **Storage**: Local filesystem in `/uploads` directory
- **Naming**: Unique filenames with user ID and timestamp
- **Serving**: Static file serving at `/uploads/:filename`

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure authentication with expiration
- **Input Validation**: Comprehensive request validation
- **File Upload Security**: File type and size restrictions
- **CORS Configuration**: Controlled cross-origin access
- **Error Handling**: Secure error messages without sensitive data

## 🚀 Deployment

1. **Set production environment variables**
2. **Use a production MongoDB instance**
3. **Configure CORS for your frontend domain**
4. **Set up file storage (consider cloud storage for production)**
5. **Use PM2 or similar for process management**

## 📊 API Response Format

All API responses follow this consistent format:

```javascript
{
  "success": boolean,
  "data": object | array,
  "message": string,
  "pagination": object (for paginated responses)
}
```

## 🧪 Testing

Test the API using tools like Postman, Insomnia, or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","name":"Test User"}'
```

## 📄 License

This project is for demonstration purposes. © 2025 EcoSnap.
