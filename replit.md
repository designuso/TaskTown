# Overview

TaskFlow is a modern task management web application built with React and Express. It provides users with comprehensive task organization capabilities including task creation, categorization, progress tracking, and team performance analytics. The application features user authentication via Replit Auth, a clean dashboard interface, and real-time data visualization for productivity insights.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Shadcn/UI component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth with OpenID Connect for secure user authentication
- **Session Management**: Express sessions with PostgreSQL session store
- **API Design**: RESTful endpoints with structured error handling and logging middleware

## Database Design
- **ORM**: Drizzle with PostgreSQL dialect for schema management and migrations
- **Schema Structure**: 
  - Users table for authentication (required for Replit Auth)
  - Tasks with priority levels, status tracking, and category relationships
  - Categories for task organization
  - Performance stats for analytics
  - Sessions table for user session persistence
- **Data Validation**: Zod schemas for runtime type checking and API validation

## Authentication & Authorization
- **Provider**: Replit Auth with Google OAuth integration
- **Session Storage**: Server-side sessions stored in PostgreSQL
- **Security**: HTTP-only cookies, CSRF protection, and secure session configuration
- **Authorization**: Route-level protection with authentication middleware

## Development Environment
- **Monorepo Structure**: Shared TypeScript types between client and server
- **Development Server**: Vite dev server with Express API proxy
- **Hot Reload**: Full-stack hot reloading in development
- **Error Handling**: Runtime error overlays and comprehensive error boundaries

# External Dependencies

## Database & Hosting
- **Neon Database**: Serverless PostgreSQL database with connection pooling
- **Replit**: Development environment and hosting platform with integrated authentication

## UI & Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library for consistent iconography

## Data & State Management
- **TanStack Query**: Server state management with caching and background updates
- **React Hook Form**: Performant form library with validation
- **Zod**: TypeScript-first schema validation library

## Development Tools
- **TypeScript**: Static type checking across the entire stack
- **ESBuild**: Fast JavaScript bundler for production builds
- **Drizzle Kit**: Database migration and schema management tools