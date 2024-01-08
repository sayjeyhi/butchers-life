import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { DEBUG_MODE } from '../constants';
import { queryClient } from '../queryClient';

export function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="pointer-events-auto fixed inset-0 flex h-full w-full flex-col items-stretch justify-between gap-4">
        <Outlet />
        {DEBUG_MODE && (
          <>
            <ReactQueryDevtools buttonPosition="top-right" />
            <TanStackRouterDevtools position="bottom-right" />
          </>
        )}
      </main>
    </QueryClientProvider>
  );
}
