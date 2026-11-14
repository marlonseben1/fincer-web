import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { ScreenLoadingGlobal } from 'shared/ui/loading';
import { Toaster } from 'sonner';
import { queryClient } from './queryClient';
import { router } from './routes/Router';
import { theme } from './theme/theme';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <ScreenLoadingGlobal />
        <Toaster position="bottom-right" richColors />
        {import.meta.env.DEV && <ReactQueryDevtools />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
