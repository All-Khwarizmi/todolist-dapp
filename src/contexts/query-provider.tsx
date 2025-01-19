import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global query configuration
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: false,
      // Reduce stale time since we're dealing with blockchain data
      staleTime: 0,
      // Reduce cache time to ensure fresh data
      gcTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      // Global mutation configuration
      retry: false,
      networkMode: "always",
    },
  },
});

export function QueryProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
