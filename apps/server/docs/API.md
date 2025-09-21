# API Reference

## Authentication

### Get Current User

```typescript
type GetCurrentUserResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    // ... other user fields
  } | null;
};

// tRPC Query
const { data } = trpc.user.getCurrentUser.useQuery();
```

## Movies

### Get Popular Movies

```typescript
// tRPC Query
const { data } = trpc.movies.getPopular.useQuery({
  page: 1,
  language: 'en-US',
});
```

### Get Movie Details

```typescript
// tRPC Query
const { data } = trpc.movies.getDetails.useQuery({
  movieId: 123,
  language: 'en-US',
});
```

### Get Movie Videos

```typescript
// tRPC Query
const { data } = trpc.movies.getVideos.useQuery({
  movieId: 123,
  language: 'en-US',
});
```

## TV Shows

### Get Popular TV Shows

```typescript
// tRPC Query
const { data } = trpc.tvShows.getPopular.useQuery({
  page: 1,
  language: 'en-US',
});
```

### Get TV Show Details

```typescript
// tRPC Query
const { data } = trpc.tvShows.getDetails.useQuery({
  tvShowId: 456,
  language: 'en-US',
});
```

## Watchlist

### Add to Watchlist

```typescript
// tRPC Mutation
const addToWatchlist = trpc.watchlist.add.useMutation();

// Usage
addToWatchlist.mutate({
  mediaId: 123,
  mediaType: 'movie', // or 'tv'
  title: 'Movie Title',
  posterPath: '/path/to/poster.jpg',
  releaseDate: '2023-01-01',
});
```

### Remove from Watchlist

```typescript
// tRPC Mutation
const removeFromWatchlist = trpc.watchlist.remove.useMutation();

// Usage
removeFromWatchlist.mutate({
  mediaId: 123,
  mediaType: 'movie',
});
```

### Get User's Watchlist

```typescript
// tRPC Query
const { data } = trpc.watchlist.getAll.useQuery({
  mediaType: 'movie', // or 'tv', or undefined for all
});
```

## Favorites

### Add to Favorites

```typescript
// tRPC Mutation
const addToFavorites = trpc.favorites.add.useMutation();

// Usage
addToFavorites.mutate({
  mediaId: 123,
  mediaType: 'movie', // or 'tv'
  title: 'Movie Title',
  posterPath: '/path/to/poster.jpg',
  releaseDate: '2023-01-01',
});
```

### Remove from Favorites

```typescript
// tRPC Mutation
const removeFromFavorites = trpc.favorites.remove.useMutation();

// Usage
removeFromFavorites.mutate({
  mediaId: 123,
  mediaType: 'movie',
});
```

### Get User's Favorites

```typescript
// tRPC Query
const { data } = trpc.favorites.getAll.useQuery({
  mediaType: 'movie', // or 'tv', or undefined for all
});
```

## Error Responses

All API errors follow this format:

```typescript
{
  "error": {
    "code": string;      // Error code (e.g., "UNAUTHORIZED", "NOT_FOUND")
    "message": string;   // Human-readable error message
    "details"?: any;     // Additional error details (optional)
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `BAD_REQUEST` - Invalid request data
- `INTERNAL_SERVER_ERROR` - Server error

## Rate Limiting

- All endpoints are rate limited
- Default: 100 requests per minute per IP
- Authentication endpoints have stricter limits

## Authentication

- Add `Authorization: Bearer <token>` header to authenticated requests
- Tokens are obtained through Firebase Authentication
- Refresh tokens are managed automatically by the client SDK

## Pagination

List endpoints support pagination:

```typescript
{
  page: number;     // Current page number (1-based)
  totalPages: number;
  totalResults: number;
  results: any[];   // Array of items
}
```

## Filtering and Sorting

Most list endpoints support:

- `sortBy`: Field to sort by
- `sortOrder`: 'asc' or 'desc'
- `filter`: Object with filter criteria

Example:
```typescript
const { data } = trpc.movies.getPopular.useQuery({
  page: 1,
  sortBy: 'release_date',
  sortOrder: 'desc',
  filter: {
    year: 2023,
    genre: 28, // Action genre ID
  },
});
```
