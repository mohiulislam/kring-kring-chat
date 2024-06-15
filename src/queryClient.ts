import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';

// Define global query and mutation cache options
const queryCache = new QueryCache({
  onError: (error, query) => {
    if (query.state.data !== undefined) {
      // Handle query errors globally
      console.error('Query Cache Error:', error);
    }
  }
});

const mutationCache = new MutationCache({
  onError: (error, variables, context, mutation) => {
    // Handle mutation errors globally
    console.error('Mutation Cache Error:', error);
  }
});

// Create a QueryClient instance with configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Automatically refetch data in the background every 5 minutes
      staleTime: 5 * 60 * 1000,
      // Retry failed queries up to 3 times before showing an error
      retry: 3,
      // Use exponential backoff delay for retries
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Enable data prefetching on hover or focus
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      // Automatically retry failed mutations once
      retry: 1,
      // Enable exponential backoff for mutations
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  },
  queryCache,
  mutationCache,
});

export default queryClient;
