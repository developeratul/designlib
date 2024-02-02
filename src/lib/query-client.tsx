import { AppProps } from "@/types";
import { DefaultOptions, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export function TanStackQueryProvider(props: AppProps) {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <React.Suspense fallback={<></>}>
        <ReactQueryDevtools initialIsOpen={false} />
      </React.Suspense>
    </QueryClientProvider>
  );
}
