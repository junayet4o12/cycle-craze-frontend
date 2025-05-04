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

## Key Features

- **Responsive Design** - Optimized for all device sizes
- **User Authentication** - Secure login/signup with JWT
- **Product Catalog** - Advanced filtering and search capabilities
- **Shopping Cart** - Real-time cart management with Redux
- **Checkout Process** - Seamless payment integration with SSLCommerz
- **Order Management** - Track and manage order history
- **Admin Dashboard** - Comprehensive admin tools with analytics
- **Dark/Light Mode** - Theme customization with next-themes
- **Drag and Drop** - Intuitive interfaces with dnd-kit
- **Form Handling** - Robust forms with React Hook Form and Zod validation

## Live Demo

Experience the application: [Cycle Craze](https://cycle-craze.vercel.app)

## Technology Stack

### Core
- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **Vite** - Next generation frontend tooling

### UI/UX
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Embla Carousel** - Touch-friendly carousel
- **Swiper** - Modern mobile touch slider
- **Sonner** - Toast notifications
- **SweetAlert2** - Beautiful alerts and modals

### State Management
- **Redux Toolkit** - Modern Redux with simplified logic
- **Redux Persist** - Persist and rehydrate Redux store

### Data Fetching
- **Axios** - Promise-based HTTP client

### Form Handling
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### Additional Tools
- **date-fns** - Date manipulation library
- **jwt-decode** - JWT token decoder
- **React Router DOM** - Routing solution
- **Recharts** - Composable charting library
- **React Dropzone** - File upload utility
- **React Quill** - Rich text editor

## Project Architecture

```
cycle-craze/
├── public/            # Static assets
├── src/
│   ├── assets/        # Images, fonts, and static resources
│   ├── components/    # Reusable UI components
│   │   ├── ui/        # Base UI components
│   │   └── common/    # Higher-level shared components
│   ├── features/      # Feature-based modules
│   │   ├── auth/      # Authentication related components
│   │   ├── products/  # Product catalog components
│   │   ├── cart/      # Shopping cart functionality
│   │   ├── checkout/  # Checkout process
│   │   └── admin/     # Admin dashboard components
│   ├── hooks/         # Custom React hooks
│   ├── layouts/       # Page layout components
│   ├── lib/           # Utility functions and libraries
│   ├── pages/         # Route-level page components
│   ├── redux/         # Redux state management
│   │   ├── slices/    # Redux Toolkit slices
│   │   └── store.ts   # Redux store configuration
│   ├── services/      # API service integrations
│   ├── styles/        # Global styles and themes
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Helper functions
│   ├── App.tsx        # Root application component
│   ├── main.tsx       # Entry point
│   └── routes.tsx     # Application routes
├── .env.local         # Environment variables
├── index.html         # HTML entry point
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cycle-craze.git
   cd cycle-craze
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
   VITE_CLOUDINARY_CLOUD_NAME=doc50jlhc
   VITE_CLOUDINARY_IMAGE_PRESET=cycle-craze-image
   VITE_BACKEND_API=https://bi-cicle-backend.vercel.app/api
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