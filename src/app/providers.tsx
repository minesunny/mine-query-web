"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export function Providers({ children, ...props }: ThemeProviderProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextThemesProvider>
  );
}
