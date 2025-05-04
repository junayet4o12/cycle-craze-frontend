# Cycle Craze Frontend

![React](https://img.shields.io/badge/react-19.0.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-5.7.2-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-6.2.0-646CFF?logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/redux-9.2.0-764ABC?logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-4.0.14-06B6D4?logo=tailwindcss&logoColor=white)

A modern, responsive e-commerce frontend for the Bi-Cycle Store built with React 19, TypeScript, and Vite. Features a sleek UI with Tailwind CSS, state management with Redux Toolkit, and integration with our secure backend API.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Live Demo](#live-demo)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [UI Components](#ui-components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Overview

Cycle Craze is a comprehensive bicycle e-commerce platform providing an intuitive shopping experience for cycling enthusiasts. This repository contains the frontend application that interfaces with our [Bi-Cycle Store Backend](https://github.com/junayet4o12/bi-cicle-backend).

# Key Features

| Category | Feature | Description |
|----------|---------|-------------|
| **User Experience** | 🌓 Theme System | Toggle between light, dark, and system themes for optimal viewing in any environment. Enhances accessibility and reduces eye strain. |
| | 📱 Mobile Optimization | Responsive design with intuitive bottom navigation for mobile users, ensuring seamless experience across all device sizes. |
| | ⚡ Performance | Optimized load times and rendering with efficient resource management for lightning-fast interactions on all devices. |
| **Shopping Experience** | 🔍 Advanced Product Discovery | Comprehensive filtering, search capabilities, and interactive product galleries with zoom functionality for detailed product examination. |
| | ❤️ Wishlist Management | Personalized collections where users can save products for future consideration with one-click transfer to shopping cart. |
| | 🛒 Streamlined Checkout | Intuitive, multi-step checkout process designed to minimize friction and maximize conversion rates. |
| **Payment & Fulfillment** | 💳 Payment Options | SSLCommerz integration for secure online transactions with multiple payment methods, plus cash on delivery support. |
| | 📦 Order Management | Real-time order tracking and comprehensive order history accessible through user accounts. |
| **Administration** | 📊 Powerful Dashboard | Centralized control center with analytics, inventory management, and user administration capabilities. |
| | 🖼️ Content Management | Drag-and-drop product gallery management with visual reordering and batch operations for efficient catalog maintenance. |
| | 📈 Sales Analytics | Detailed reporting on sales performance, customer behavior, and inventory metrics to guide business decisions. |
| **Security** | 🔐 Authentication System | JWT-based secure authentication with role-based access control and protected routes. |
| | 🛡️ Data Protection | Implementation of security best practices for handling sensitive customer and payment information. |

## Live Demo

Experience the application: [Cycle Craze](https://cycle-craze-frontend.vercel.app)

## Technology Stack

### Core
- <img src="https://reactjs.org/favicon.ico" width="16" height="16" /> **React 19** - Latest React with improved performance
- <img src="https://www.typescriptlang.org/favicon-32x32.png" width="16" height="16" /> **TypeScript** - Type-safe development
- <img src="https://vitejs.dev/logo.svg" width="16" height="16" /> **Vite** - Next generation frontend tooling

### UI/UX
- <img src="https://tailwindcss.com/favicons/favicon-16x16.png" width="16" height="16" /> **Tailwind CSS 4** - Utility-first CSS framework
- <img src="https://www.radix-ui.com/favicon.ico" width="16" height="16" /> **Radix UI** - Accessible component primitives
- <img src="https://framer.com/favicon.ico" width="16" height="16" /> **Framer Motion** - Animation library
- <img src="https://embla-carousel.vercel.app/favicon.ico" width="16" height="16" /> **Embla Carousel** - Touch-friendly carousel
- <img src="https://swiperjs.com/images/favicon.png" width="16" height="16" /> **Swiper** - Modern mobile touch slider
- <img src="https://sonner.emilkowal.ski/favicon.ico" width="16" height="16" /> **Sonner** - Toast notifications

### State Management
- <img src="https://redux.js.org/img/favicon/favicon.ico" width="16" height="16" /> **Redux Toolkit** - Modern Redux with simplified logic
- <img src="https://redux.js.org/img/favicon/favicon.ico" width="16" height="16" /> **Redux Persist** - Persist and rehydrate Redux store

### Data Fetching
- <img src="https://axios-http.com/assets/favicon.ico" width="16" height="16" /> **Axios** - Promise-based HTTP client

### Form Handling
- <img src="https://react-hook-form.com/favicon.ico" width="16" height="16" /> **React Hook Form** - Performant form handling
- <img src="https://zod.dev/logo.svg" width="16" height="16" /> **Zod** - TypeScript-first schema validation

### Additional Tools
- <img src="https://date-fns.org/favicon.ico" width="16" height="16" /> **date-fns** - Date manipulation library
- <img src="https://jwt.io/img/favicon/favicon-16x16.png" width="16" height="16" /> **jwt-decode** - JWT token decoder
- <img src="https://reactrouter.com/favicon.ico" width="16" height="16" /> **React Router DOM** - Routing solution
- <img src="https://recharts.org/favicon.ico" width="16" height="16" /> **Recharts** - Composable charting library
- <img src="https://react-dropzone.js.org/favicon.ico" width="16" height="16" /> **React Dropzone** - File upload utility
- <img src="https://quilljs.com/assets/images/favicon.ico" width="16" height="16" /> **React Quill** - Rich text editor

## Project Architecture

```
cycle-craze/
├── public/            # Static assets (images, icons, etc.)
│   └── ...            # Public files accessible via URL

├── src/
│   ├── assets/        # Project-specific assets (icons, images, etc.)
│   ├── components/    # Reusable UI components
│   │   ├── layout/    
│   │   └── ui/        
│   ├── config/        
│   ├── constant/      
│   ├── hooks/         
│   ├── lib/           
│   ├── modules/       # Feature-specific modules
│   │   ├── 404/
│   │   ├── analytics/
│   │   ├── badge/
│   │   ├── bottom-navbar/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   ├── editor/
│   │   ├── footer/
│   │   ├── home/
│   │   ├── navbar/
│   │   ├── Order_Success/
│   │   ├── order-details/
│   │   ├── product-details/
│   │   ├── services/
│   │   ├── shop/
│   │   ├── wishlist/
│   ├── pages/         
│   ├── private.routes/
│   ├── profile/       
│   ├── providers/     
│   ├── redux/         
│   ├── api/           
│   │   └── features/  
│   ├── routes/        
│   ├── schemas/       
│   ├── styles/        
│   ├── types/         
│   ├── utils/         
│   ├── fonts.css
│   ├── index.css
│   ├── main.tsx
│   ├── quill-better-table.d.ts
│   ├── swiper.d.ts
│   └── vite-env.d.ts

├── .env.local         
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html         
├── package.json       
├── package-lock.json  
├── README.md          
├── tsconfig.json       
├── tsconfig.app.json
├── tsconfig.node.json
├── vercel.json        
├── vite.config.ts     

```

## Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/junayet4o12/cycle-craze-frontend.git
   cd cycle-craze-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   Create a `.env.local` file in the project root with the following variables:
   ```
   VITE_CLOUDINARY_CLOUD_NAME=Your Cloudinary Cloud Name
   VITE_CLOUDINARY_IMAGE_PRESET=Your Cloudinary Image Preset
   VITE_BACKEND_API=Your Backend Api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Lint the codebase |
| `npm run preview` | Preview production build locally |

### Code Style

The project uses ESLint for code quality and follows modern React best practices. TypeScript is configured for strict type checking to enhance code reliability.

## UI Components

Cycle Craze utilizes a component-based architecture with Radix UI primitives for accessible, customizable UI elements. The design system is built on Tailwind CSS with consistent theming across the application.

Key UI component categories:
- **Layout components** - Page structures, grids, containers
- **Navigation components** - Menus, tabs, breadcrumbs
- **Form components** - Inputs, selectors, buttons
- **Feedback components** - Alerts, notifications, modals
- **Data display components** - Cards, tables, lists

## State Management

Redux Toolkit is used for global state management with a focus on simplicity and performance:

- **Authentication state** - User sessions and permissions
- **Cart state** - Shopping cart items and totals
- **UI state** - Theme preferences, sidebar visibility
- **Product state** - Product listings and filters
- **Checkout state** - Order process and payment flow

Redux Persist ensures that relevant state (like cart items) persists across browser sessions.

## API Integration

The frontend integrates with the Bi-Cycle Store Backend API using Axios for HTTP requests. API services are organized by domain:

- **Auth Service** - Login, registration, password management
- **Product Service** - Product catalog and inventory
- **Order Service** - Order processing and history
- **User Service** - User profile management
- **Admin Service** - Administrative operations and analytics

## Authentication

The application implements JWT-based authentication with:
- **Access tokens** for API requests
- **Refresh tokens** for session persistence
- **Protected routes** with authentication guards
- **Role-based access control** for admin features

## Deployment

The application is optimized for deployment on Vercel:

1. Build the application:
   ```bash
   npm run build
   ```

2. Test the production build locally:
   ```bash
   npm run preview
   ```

3. Deploy to Vercel:
   Connect your GitHub repository to Vercel and configure environment variables in the Vercel dashboard.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

© 2025 Cycle Craze | Built with 💙 for cycling enthusiasts