# Lume Server Architecture

## Overview

The Lume server follows a modular architecture with clear separation of concerns. It's built around tRPC for type-safe APIs and integrates with MongoDB for data persistence, Firebase for authentication, and various external services.

## Core Components

### 1. tRPC Routers

Located in `src/routers/`, these handle incoming API requests:

- `movies.ts` - Movie-related endpoints
- `tv-shows.ts` - TV show endpoints
- `user.ts` - User management
- `watchlist.ts` - Watchlist functionality
- `favorites.ts` - Favorites management

### 2. Data Access Layer

Located in `src/accessLayer/`, these modules abstract database operations:

- `user.ts` - User data access
- `watchlist.ts` - Watchlist operations
- `favorites.ts` - Favorites management

### 3. Models

MongoDB schemas in `src/models/`:

- `user.ts` - User model with authentication data
- `watchlist.ts` - Watchlist items
- `favorites.ts` - Favorited items

### 4. Services

External service integrations in `src/services/`:

- `tmdb-service.ts` - TMDB API integration
- `tmdb-tv-shows-service.ts` - TV show specific TMDB endpoints

### 5. Authentication

Firebase Authentication integration in `src/firebase/`:

- `firebase.ts` - Firebase Admin SDK setup
- `firebase.helpers.ts` - Authentication utilities

### 6. Caching

Redis-based caching in `src/cache/`:

- `redisClient.ts` - Redis client configuration

## Data Flow

1. **Request Handling**
   - Request comes in through tRPC
   - Context is created with user authentication
   - Request is validated
   - Appropriate router handles the request

2. **Business Logic**
   - Routers call access layer functions
   - Access layer handles database operations
   - External services are called as needed
   - Results are cached when appropriate

3. **Response**
   - Data is transformed for the client
   - Response is sent back through tRPC

## Security

- Firebase Authentication for user management
- Role-based access control
- Input validation using Zod
- Rate limiting
- Secure environment variables

## Performance

- Redis caching for frequently accessed data
- Database indexing
- Efficient query patterns
- Connection pooling

## Error Handling

- Consistent error responses
- Proper error logging
- Client-friendly error messages
- Error boundaries for unhandled exceptions
