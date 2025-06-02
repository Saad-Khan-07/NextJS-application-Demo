# 🚀 Next.js Dashboard Template

A comprehensive Next.js application template showcasing modern web development concepts including JWT-based authentication, role-based access control, and dynamic UI components with enterprise-level security features.

## ✨ Features

- 🔐 **JWT-Based Authentication** - Secure token-based authentication with HTTP-only cookies
- 🛡️ **Role-Based Access Control (RBAC)** - Fine-grained permissions for Admin, Manager, Client roles
- 🎛️ **Dynamic Sidebar Navigation** - Collapsible sidebar with role-based menu items
- 📊 **Analytics Dashboard** - Admin-only analytics with data visualization
- 🛡️ **Multi-Layer Route Protection** - Client and server-side route guards with middleware
- 📱 **Responsive Design** - Mobile-friendly interface with smooth animations
- 🔑 **Secure Session Management** - JWT tokens with configurable expiration
- 🔒 **Password Security** - Bcrypt hashing with strength validation
- 📧 **Email Domain Validation** - Custom email format restrictions
- 🚪 **Unified Authentication Flow** - Consistent login/signup/logout experience

## 🎯 Learning Objectives

This template is perfect for understanding key Next.js and security concepts:

### **Next.js & Architecture**
- **Next.js App Router** - Modern routing with the new app directory structure
- **Dynamic Route Groups** - Role-based routing with `(users)` folder structure
- **Client vs Server Components** - Understanding when to use 'use client' directive
- **API Routes** - RESTful endpoints with proper error handling
- **TypeScript Integration** - Type-safe development throughout

### **Security & Authentication**
- **JWT Implementation** - Token generation, verification, and refresh
- **HTTP-Only Cookies** - Secure token storage preventing XSS attacks
- **Password Hashing** - Bcrypt with configurable salt rounds
- **Input Validation** - Email regex and password strength requirements
- **Route Protection** - Multi-level authentication guards
- **Session Management** - Secure token lifecycle management

### **Database & Backend**
- **Prisma ORM** - Type-safe database operations with migrations
- **User Management** - CRUD operations with role management
- **Database Schema Design** - Proper indexing and relationships
- **Error Handling** - Comprehensive error catching and logging

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Authentication:** JWT with jose library
- **Security:** bcryptjs for password hashing
- **Database:** Prisma ORM with PostgreSQL/SQLite
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** Lucide React
- **Charts:** Custom BarChart component
- **Validation:** Custom regex patterns and middleware

## 🔒 Security Features

### **JWT Implementation**
- **Secure Token Generation** - Using `jose` library with HS256 algorithm
- **HTTP-Only Cookies** - Prevents client-side script access
- **Configurable Expiration** - Environment-based token lifetime
- **Token Refresh** - Automatic token renewal functionality
- **Issuer Validation** - Prevents token misuse across applications

### **Password Security**
- **Bcrypt Hashing** - Industry-standard password protection with 12 salt rounds
- **Strength Requirements** - Minimum 8 characters with letters, numbers, and symbols
- **Input Sanitization** - Trim whitespace and validate formats

### **Access Control**
- **Role-Based Permissions** - Admin, Manager, Client hierarchies
- **Route Middleware** - Automatic authentication checks
- **API Protection** - All endpoints secured with JWT verification
- **Session Validation** - Real-time token verification

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
│   │   │   ├── login/             # JWT-based login
│   │   │   ├── signup/            # User registration with validation
│   │   │   ├── logout/            # Secure token cleanup
│   │   │   └── check/             # Session validation
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
│   ├── auth-middleware.ts         # 🆕 Unified authentication module
│   ├── jwt.ts                     # 🆕 JWT token management
│   ├── prisma.ts                  # Database client
│   └── checkuserexists.ts         # User validation utilities
├── prisma/
│   ├── migrations/                # Database migrations
│   ├── dev.db                     # SQLite database file
│   └── schema.prisma              # Database schema
├── public/                        # Static assets
├── types/                         # TypeScript type definitions
│   └── auth.ts                    # 🆕 Authentication types
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

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following variables:
   ```env
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
   JWT_EXPIRATION="24h"
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
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

### 🛡️ Authentication System
- **Unified Auth Middleware** - Single source of truth for all authentication logic
- **JWT Token Management** - Secure generation, verification, and refresh
- **Role-Based Access** - Fine-grained permission system
- **Automatic Session Validation** - Real-time authentication status checks
- **Secure Cookie Handling** - HTTP-only cookies with proper security flags

### 🏠 Sidebar Navigation
- **Dynamic Menu Items** - Role-based visibility with intelligent filtering
- **Collapsible Design** - Space-efficient hamburger menu integration
- **Active Route Highlighting** - Visual indicators with blue accent colors
- **Access Control Tooltips** - Clear "Admin Only" notifications
- **User Role Badges** - Visual permission level indicators

### 🛡️ Route Protection
- **Multi-Layer Security** - Client-side guards + server-side middleware
- **Route Groups** - Organized access control using `(users)` folder structure
- **Automatic Redirects** - Seamless unauthorized access prevention
- **Role-Specific Dashboards** - Customized layouts per user type
- **API Endpoint Protection** - JWT verification on all secured routes

### 📊 Analytics Dashboard
- **Admin-Exclusive Access** - Multiple validation layers with proper error handling
- **Real-Time Data** - Database aggregation with efficient queries
- **Interactive Visualizations** - Custom chart components with animations
- **Performance Optimized** - Efficient data fetching and caching strategies

### 🗃️ Database Integration
- **Type-Safe Operations** - Prisma ORM with full TypeScript support
- **Migration System** - Version-controlled database schema management
- **User Management** - Complete CRUD operations with role assignments
- **Data Validation** - Schema-level constraints and application-level checks

## 🎨 UI/UX Features

- **Modern Design System** - Consistent color palette and typography
- **Smooth Animations** - Tailwind transitions with performance optimization
- **Gradient Backgrounds** - Eye-catching visual elements
- **Mobile-First Responsive** - Seamless experience across all devices
- **Interactive Feedback** - Hover effects and loading states
- **Accessibility Ready** - Semantic HTML and keyboard navigation support

## 🔧 API Endpoints

### Authentication Routes
```
POST /api/auth/login      # JWT-based user authentication
POST /api/auth/signup     # User registration with validation
POST /api/auth/logout     # Secure token cleanup
GET  /api/auth/check      # Session validation endpoint
```

### Protected Routes
```
GET  /api/users           # User management (Admin only)
GET  /api/analytics       # Dashboard analytics (Admin only)
POST /api/profile/update  # Profile management (Authenticated)
```

## 🏗️ Architecture Highlights

### **Authentication Flow**
1. **Registration/Login** → Input validation → Password hashing/verification
2. **JWT Generation** → Secure token creation with user payload
3. **Cookie Storage** → HTTP-only cookie with security flags
4. **Request Validation** → Middleware verification on protected routes
5. **Token Refresh** → Automatic renewal before expiration

### **Security Layers**
1. **Input Validation** - Email format and password strength
2. **Authentication** - JWT token verification
3. **Authorization** - Role-based access control
4. **Data Protection** - Encrypted passwords and secure cookies
5. **Session Management** - Proper token lifecycle handling

## 🚨 Security Best Practices Implemented

- ✅ **JWT with HTTP-Only Cookies** - Prevents XSS attacks
- ✅ **Password Hashing** - Bcrypt with high salt rounds
- ✅ **Input Validation** - Regex patterns and sanitization
- ✅ **Role-Based Access Control** - Granular permissions
- ✅ **Secure Cookie Flags** - SameSite, Secure, HttpOnly
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **Error Handling** - No information leakage
- ✅ **Token Expiration** - Configurable session timeouts

## 📚 Learning Resources

This template demonstrates practical implementation of:
- **Modern Authentication Patterns**
- **JWT Best Practices**
- **Next.js Security Features** 
- **TypeScript in Full-Stack Applications**
- **Database Design with Prisma**
- **Role-Based Access Control**
- **Responsive Design Principles**

Perfect for developers looking to understand enterprise-level authentication and authorization in modern web applications.

---

**Built with ❤️ using Next.js 14, TypeScript, and modern security practices.**
