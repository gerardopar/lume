# Lume Client Application

Lume is a modern web application for discovering and managing movies and TV shows. This documentation covers the client-side implementation of the Lume application.

## Features

- Movie and TV show discovery
- User authentication and profiles
- Watchlist and favorites management
- Responsive design for all devices
- Real-time updates and notifications

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query + Zustand
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **API Client**: tRPC
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + TypeScript
- **Formatting**: Prettier

## Project Structure

```
/src
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── stores/          # State management
├── styles/          # Global styles and themes
├── types/           # TypeScript type definitions
├── utils/           # Utility functions and helpers
└── App.tsx          # Main application component
```

## Getting Started

1. **Prerequisites**

   - Node.js 18+
   - pnpm
   - Lume API server running locally

2. **Installation**

   ```bash
   # Install dependencies
   pnpm i
   ```

3. **Environment Setup**
   Copy `.env.example` to `.env` and update the environment variables:

   ```bash
   cp .env.example .env
   ```

4. **Development**

   ```bash
   # Start development server
   pnpm run dev
   ```

5. **Building for Production**
   ```bash
   # Build the application
   pnpm run build
   ```

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
