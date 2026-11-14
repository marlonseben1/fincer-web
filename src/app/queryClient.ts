import { MutationCache, QueryClient } from '@tanstack/react-query';
import { Loading } from 'shared/ui/loading';

// onMutate/onSettled não compartilham contexto no cache global, então o
// bloqueio é guardado por mutation.
const bloqueios = new WeakMap<object, { hide: () => void }>();

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onMutate: (_variables, mutation) => {
      bloqueios.set(mutation, Loading.show());
    },
    onSettled: (_data, _error, _variables, _context, mutation) => {
      bloqueios.get(mutation)?.hide();
      bloqueios.delete(mutation);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,
    },
  },
});
