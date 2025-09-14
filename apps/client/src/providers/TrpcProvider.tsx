import { useState, useEffect, useMemo } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "../utils/trpc";

import { getAuth } from "firebase/auth";
import type { PropsWithChildren } from "react";

export const TrpcProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  const auth = getAuth();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setReady(true);
    });

    return () => unsubscribe();
  }, [auth]);

  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: import.meta.env.DEV
              ? "http://localhost:8080/trpc"
              : "https://api.yourapp.com/trpc",
            async headers() {
              const user = auth.currentUser;
              if (!user) return {};
              try {
                const token = await user.getIdToken();
                return {
                  Authorization: `Bearer ${token}`,
                };
              } catch (err) {
                console.warn("Failed to get Firebase token", err);
                return {};
              }
            },
          }),
        ],
      }),
    [auth]
  );

  if (!ready) return null;

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TrpcProvider;
