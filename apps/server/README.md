# Lume Server

This is the backend server for the Lume application, built with tRPC, MongoDB, and Firebase Authentication.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: tRPC
- **Database**: MongoDB
- **Authentication**: Firebase Auth
- **Caching**: Redis
- **Storage**: AWS S3
- **API**: TMDB API integration

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB instance
- Firebase Admin SDK credentials
- AWS S3 bucket credentials
- TMDB API key
- Redis instance (optional, for caching)

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration.

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Project Structure

```
apps/server/
├── src/
│   ├── accessLayer/    # Database access layer
│   ├── aws/            # AWS S3 configuration
│   ├── cache/          # Redis client and caching
│   ├── firebase/       # Firebase configuration
│   ├── helpers/        # Utility functions
│   ├── models/         # MongoDB models
│   ├── routers/        # tRPC routers
│   ├── services/       # External service integrations
│   ├── types/          # TypeScript types
│   ├── validators/     # Input validation schemas
│   ├── appRouter.ts    # Root router
│   ├── context.ts      # tRPC context
│   ├── index.ts        # Server entry point
│   └── trpc.ts         # tRPC configuration
├── .env.example        # Example environment variables
└── package.json
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build the application
- `pnpm start` - Start production server
- `pnpm test` - Run tests

## Environment Variables

See `.env.example` for required environment variables.

## API Documentation

For detailed API documentation, see the [API Reference](./docs/API.md).

## Deployment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
