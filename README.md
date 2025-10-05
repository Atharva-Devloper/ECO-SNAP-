# EcoSnap Lite 🌱

A clean, modern civic-tech web platform for reporting waste issues in local communities. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **User Authentication** - Role-based access (admin/user) with localStorage
- **Waste Reporting** - Photo upload, description, and location tracking
- **Dashboard Management** - View and manage reports with status updates
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Real-time Updates** - Instant status changes and report tracking

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API
- **Storage**: localStorage (for demo purposes)

## 📦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser and navigate to `http://localhost:3000`**

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
- **Report** (`/report`) - Submit new waste reports with photo upload
- **Dashboard** (`/dashboard`) - View and manage reports
  - **Users**: See their own reports with status tracking
  - **Admins**: See all reports and can update statuses

## 🎨 Design System

- **Colors**: Green-focused palette for environmental theme
- **Components**: Reusable card, button, and form components
- **Typography**: Clean, readable fonts with proper hierarchy
- **Icons**: SVG icons for consistent visual language

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation component
│   ├── Footer.jsx          # Footer component
│   └── ProtectedRoute.jsx  # Route protection wrapper
├── contexts/
│   └── AuthContext.jsx     # Authentication context
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Login.jsx          # Authentication page
│   ├── Report.jsx         # Report submission form
│   ├── Dashboard.jsx      # Reports management
│   ├── About.jsx          # About page
│   └── Contact.jsx        # Contact page
├── App.jsx                # Main app component
├── main.jsx              # App entry point
└── index.css             # Global styles & Tailwind
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌍 Mission

EcoSnap empowers citizens to report waste issues in their neighborhoods, creating cleaner and healthier communities through civic engagement and technology.

## 📄 License

This project is for demonstration purposes. © 2025 EcoSnap.
