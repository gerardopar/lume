# API Integration

Lume uses tRPC for type-safe API communication between the client and server.

## tRPC Setup

### Client Configuration

```typescript
// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@my/api';

export const trpc = createTRPCReact<AppRouter>();

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${import.meta.env.VITE_API_URL}/trpc`,
          // Optional: Add auth token to requests
          headers: () => {
            const token = getToken();
            return token ? { Authorization: `Bearer ${token}` } : {};
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

## API Hooks

### Custom Query Hook

```typescript
// hooks/use-movies.ts
import { trpc } from '../utils/trpc';

export function usePopularMovies() {
  return trpc.movies.getPopular.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  });
}
```

### Custom Mutation Hook

```typescript
// hooks/use-watchlist.ts
import { trpc } from '../utils/trpc';

export function useAddToWatchlist() {
  const utils = trpc.useContext();
  
  return trpc.watchlist.add.useMutation({
    onSuccess: () => {
      // Invalidate and refetch
      utils.watchlist.getAll.invalidate();
    },
    onError: (error) => {
      // Handle error
      console.error('Failed to add to watchlist:', error);
    },
  });
}
```

## Error Handling

### Global Error Handling

```typescript
// utils/trpc.ts
trpc.createClient({
  links: [
    httpBatchLink({
      // ...
      async fetch(url, options) {
        const response = await fetch(url, {
          ...options,
          credentials: 'include',
        });
        
        if (response.status === 401) {
          // Handle unauthorized
          window.location.href = '/login';
          return Promise.reject('Unauthorized');
        }
        
        return response;
      },
    }),
  ],
});
```

### Local Error Handling

```typescript
function MyComponent() {
  const { data, error, isLoading } = usePopularMovies();
  
  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;
  
  return <MovieList movies={data} />;
}
```

## Testing API Integration

### Mocking tRPC

```typescript
// __tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { trpc } from '../../utils/trpc';
import MyComponent from '../MyComponent';

// Mock tRPC hook
jest.mock('../../utils/trpc', () => ({
  trpc: {
    movies: {
      getPopular: {
        useQuery: jest.fn(),
      },
    },
  },
}));

describe('MyComponent', () => {
  it('displays movies', () => {
    // Mock the response
    (trpc.movies.getPopular.useQuery as jest.Mock).mockReturnValue({
      data: [{ id: 1, title: 'Test Movie' }],
      isLoading: false,
      error: null,
    });

    render(<MyComponent />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });
});
```

## Performance Optimization

### Request Batching

tRPC automatically batches requests made within the same event loop tick.

### Caching Strategies

- Use `staleTime` to prevent unnecessary refetches
- Use `cacheTime` to control how long data remains in the cache
- Implement optimistic updates for better UX

### Code Splitting

Split your tRPC routers for better code splitting:

```typescript
// server/routers/_app.ts
import { mergeRouters } from '../trpc';
import { movieRouter } from './movie';
import { userRouter } from './user';

export const appRouter = mergeRouters(movieRouter, userRouter);
```

## Authentication

### Protected Procedures

```typescript
// server/routers/protected-router.ts
import { protectedProcedure, router } from '../trpc';

export const protectedRouter = router({
  getSecretData: protectedProcedure.query(({ ctx }) => {
    // ctx.user is guaranteed to be non-null here
    return { secret: 'This is protected data' };
  }),
});
```

### Client-Side Auth

```typescript
function useProtectedData() {
  return trpc.protected.getSecretData.useQuery(undefined, {
    retry: false, // Don't retry on 401
    onError: (error) => {
      if (error.data?.code === 'UNAUTHORIZED') {
        // Handle unauthorized
      }
    },
  });
}
```
