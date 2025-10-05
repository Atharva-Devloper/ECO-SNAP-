# EcoSnap Lite 🌱

A full-stack civic-tech web platform for reporting waste issues in local communities. Built with React frontend, Node.js/Express backend, and MongoDB database.

## 🚀 Features

- **Full-Stack Architecture** - React frontend with Node.js/Express backend
- **User Authentication** - JWT-based auth with role-based access (admin/user)
- **Waste Reporting** - Photo upload, description, and location tracking with geolocation
- **Dashboard Management** - View and manage reports with status updates
- **Real-time Updates** - Instant status changes and report tracking
- **Map Integration** - Location-based reporting and nearby waste visualization
- **Image Upload** - Secure file handling with validation
- **RESTful API** - Clean, well-documented endpoints

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Maps**: Leaflet + React-Leaflet
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Security**: bcryptjs for password hashing
- **CORS**: Cross-origin resource sharing

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ecosnap-lite
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Set up environment variables:**

   Copy the server environment file and configure it:
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

   Example `.env` configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecosnap-lite
   JWT_SECRET=your-super-secure-jwt-secret-key
   JWT_EXPIRE=30d
   ```

5. **Start MongoDB** (if running locally)

6. **Start the development servers:**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   # In the root directory
   npm run dev
   ```

7. **Open your browser:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - API Health Check: `http://localhost:5000/api/health`

## 🔐 Demo Accounts

- **Admin**: `admin` / `admin123`
- **User 1**: `user1` / `user123`
- **User 2**: `user2` / `user123`

## 📱 Pages & Features

### Public Pages
- **Home** (`/`) - Landing page with hero section and features
- **About** (`/about`) - Project information and mission
- **Contact** (`/contact`) - Contact form and information
- **Login** (`/login`) - Authentication form

### Protected Pages (Requires Login)
- **Report** (`/report`) - Submit new waste reports with photo upload and location
- **Dashboard** (`/dashboard`) - View and manage reports
  - **Users**: See their own reports with status tracking
  - **Admins**: See all reports and can update statuses

## 🔧 Development Workflow

### Running Both Servers
1. Start the backend server first: `cd server && npm run dev`
2. In a new terminal, start the frontend: `npm run dev`
3. Both servers will run concurrently on different ports

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start development server with nodemon (port 5000)
- `npm start` - Start production server
- `npm test` - Run tests (placeholder)

## 📁 Project Structure

```
ecosnap-lite/
├── public/                    # Static assets
├── src/                      # Frontend source code
│   ├── components/           # React components
│   ├── contexts/             # React contexts
│   ├── pages/               # Page components
│   └── App.jsx              # Main app component
├── server/                  # Backend source code
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── uploads/             # Image storage
│   └── server.js           # Main server file
├── index.html              # Frontend entry point
├── package.json            # Frontend dependencies
├── server/package.json     # Backend dependencies
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
```

## 📡 API Documentation

For detailed API documentation, see [server/README.md](server/README.md). The backend provides RESTful endpoints for:

- **Authentication** - User registration, login, profile management
- **Reports** - CRUD operations for waste reports
- **File Upload** - Image handling for reports
- **Geolocation** - Location-based queries and nearby search

## 🎨 Design System

- **Colors**: Green-focused palette for environmental theme
- **Components**: Reusable card, button, and form components
- **Typography**: Clean, readable fonts with proper hierarchy
- **Icons**: SVG icons for consistent visual language
- **Maps**: Interactive mapping with location markers

## 🌍 Mission

EcoSnap empowers citizens to report waste issues in their neighborhoods, creating cleaner and healthier communities through civic engagement and technology.

## 📄 License

This project is for demonstration purposes. © 2025 EcoSnap.
