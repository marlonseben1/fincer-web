import type { ApiError } from 'shared/lib/httpClient';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError;
  }
}
