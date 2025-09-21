# State Management

Lume uses a combination of React Query and Zustand for state management, following these principles:

- **Server State**: Managed by React Query
- **UI State**: Managed by React's built-in state or Zustand
- **Form State**: Managed by React Hook Form

## React Query (Server State)

### Key Concepts

- **Queries**: For fetching data
- **Mutations**: For creating/updating data
- **Query Invalidation**: For refetching data after mutations

### Example Query

```typescript
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../utils/trpc';

function useMovieDetails(movieId: string) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => trpc.movies.getMovieDetails({ movieId }),
    enabled: !!movieId,
  });
}
```

### Example Mutation

```typescript
function useAddToWatchlist() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (mediaId: string) => 
      trpc.watchlist.addItem.mutate({ mediaId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });
}
```

## Zustand (Client State)

### Store Example

```typescript
import { create } from 'zustand';
import type { User } from '../types';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

## Authentication Flow

1. User logs in via Auth0
2. On success, user data is stored in Zustand
3. Protected routes check auth state
4. API calls include auth token

## Optimistic Updates

For a better UX, implement optimistic updates:

```typescript
function useOptimisticLike() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: string) => api.likePost(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] });
      const previousPost = queryClient.getQueryData(['post', postId]);
      
      queryClient.setQueryData(['post', postId], (old: Post) => ({
        ...old,
        likes: old.likes + 1,
        isLiked: true,
      }));
      
      return { previousPost };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['post', postId], context?.previousPost);
    },
    onSettled: (postId) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
}
```

## State Persistence

For persisting state across page refreshes:

1. Use `zustand/middleware` for persistence
2. Store only essential data
3. Encrypt sensitive information

```typescript
import { persist } from 'zustand/middleware';

export const usePersistedStore = create(
  persist(
    (set) => ({
      // state
    }),
    {
      name: 'app-storage',
      getStorage: () => localStorage,
    }
  )
);
```

## Performance Considerations

- Use `select` option in React Query to subscribe to only needed data
- Implement proper loading and error states
- Use React.memo for expensive components
- Implement infinite queries for large lists
