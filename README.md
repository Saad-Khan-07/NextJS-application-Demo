# 🚀 Next.js Dashboard Template

A comprehensive Next.js application template showcasing modern web development concepts including authentication, role-based access control, and dynamic UI components.

## ✨ Features

- 🔐 **Role-Based Authentication** - Secure login system with different user roles (Admin, Manager, Client)
- 🎛️ **Dynamic Sidebar Navigation** - Collapsible sidebar with role-based menu items
- 📊 **Analytics Dashboard** - Admin-only analytics with data visualization
- 🛡️ **Route Protection** - Client and server-side route guards
- 📱 **Responsive Design** - Mobile-friendly interface with smooth animations
- 🍪 **Session Management** - Cookie-based authentication handling

## 🎯 Learning Objectives

This template is perfect for understanding key Next.js concepts:

- **Next.js App Router** - Modern routing with the new app directory structure
- **Dynamic Route Groups** - Role-based routing with `(users)` folder structure
- **Client vs Server Components** - Understanding when to use 'use client' directive
- **API Routes** - Database endpoints and authentication APIs
- **Prisma ORM** - Database schema and migrations management
- **TypeScript Integration** - Type-safe development with .ts files
- **Protected Routes** - Multi-level authentication guards
- **Role-Based Access Control (RBAC)** - Admin, Manager, Client permissions
- **Database Operations** - User management and analytics queries
- **Session Management** - Cookie-based authentication with auth.ts
- **File Upload/Management** - Profile pictures and assets
- **Custom Components** - Reusable UI elements (Sidebar, BarChart, etc.)
- **Environment Configuration** - Database connections and app settings

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Prisma ORM with PostgreSQL/SQLite
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** Lucide React
- **Charts:** Custom BarChart component
- **Authentication:** Custom session-based auth with cookies
- **File Storage:** Public assets management

## 📁 Project Structure

```
├── app/
│   ├── (users)/                    # Route group for authenticated users
│   │   ├── admin/dashboard/        # Admin-specific dashboard
│   │   ├── client/dashboard/       # Client-specific dashboard  
│   │   └── manager/dashboard/      # Manager-specific dashboard
│   ├── analytics/                  # Admin-only analytics page
│   ├── api/                        # Backend API routes
│   │   ├── auth/                   # Authentication endpoints
│   │   └── db/                     # Database operations
│   ├── dashboard/                  # General dashboard components
│   ├── login/                      # Authentication pages
│   ├── profile/                    # User profile management
│   ├── settings/                   # Application settings
│   └── signup/                     # User registration
├── components/
│   ├── BarChart.tsx               # Data visualization component
│   ├── Profile.tsx                # User profile component
│   └── Sidebar.tsx                # Navigation sidebar
├── lib/
│   ├── auth.ts                    # Authentication utilities
│   ├── checkuserexists.ts         # User validation
│   └── prisma.ts                  # Database client
├── prisma/
│   ├── migrations/                # Database migrations
│   ├── dev.db                     # SQLite database file
│   └── schema.prisma              # Database schema
├── public/                        # Static assets
├── types/                         # TypeScript type definitions
└── .env                          # Environment variables
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd testnextapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and other configs
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Key Components

### 🏠 Sidebar Navigation
- **Collapsible design** with hamburger menu positioned within sidebar
- **Role-based menu items** - Analytics restricted to admin users
- **Active route highlighting** with visual indicators and blue accent
- **Access control tooltips** showing "Admin Only" for restricted features
- **User role badges** displaying current user permissions

### 🛡️ Route Protection
- **Route Groups** using `(users)` folder structure for organized access control  
- **Multi-layer validation** - client-side guards and server-side middleware
- **Automatic redirects** preventing unauthorized access attempts
- **Role-specific dashboards** with different layouts per user type

### 📊 Analytics Dashboard  
- **Admin-exclusive access** with multiple validation layers
- **Database aggregation** fetching user counts across all roles
- **Error handling** with proper loading states and fallbacks
- **Data visualization** using custom chart components

### 🗃️ Database Integration
- **Prisma ORM** for type-safe database operations
- **Migration system** for database schema management  
- **User management** with role-based permissions
- **Session storage** using authentication utilities

## 🎨 UI Features

- **Smooth animations** with Tailwind transitions
- **Gradient backgrounds** and modern styling
- **Mobile-responsive** design patterns
- **Interactive hover effects** and state feedback
- **Role badges** and access level indicators

##
