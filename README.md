# Lume - Modern Media Discovery Platform

Lume is a modern media discovery platform that helps users explore and discover movies and TV shows. Built with a modern tech stack, Lume provides an intuitive interface for browsing trending and popular content across different media types.

## 🚀 Features

- **Media Discovery**: Browse trending and popular movies and TV shows
- **Detailed Media Information**: View comprehensive details about each title
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean and intuitive user interface built with modern design principles
- **Real-time Data**: Up-to-date media information from TMDB API

## 🛠 Tech Stack

### Frontend

- **React 18** - Frontend library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next Generation Frontend Tooling
- **React Query** - Data fetching and state management
- **tRPC** - End-to-end typesafe APIs
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **Zustand** - State management
- **React Router** - Client-side routing

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **Redis** - Caching layer
- **tRPC** - End-to-end typesafe APIs
- **Firebase Admin** - Authentication and user management
- **AWS S3** - File storage

## 📦 Project Structure

```
lume/
├── apps/
│   ├── client/         # Frontend application
│   └── server/         # Backend server
└── packages/
    └── api/            # Shared API types and utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (v8+)
- MongoDB instance
- Redis server
- TMDB API key
- Firebase Admin credentials
- AWS S3 credentials

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/lume.git
   cd lume
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   - Copy `.env.example` to `.env` in both `apps/client` and `apps/server`
   - Fill in the required environment variables

4. Start the development servers:

   ```bash
   # In the root directory
   pnpm --filter @lume/client dev
   pnpm --filter @lume/server dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie and TV show data
