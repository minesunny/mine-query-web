"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "@/lib/i18n";
export function Providers({ children, ...props }: ThemeProviderProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <NextThemesProvider {...props}>
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </I18nextProvider>
    </NextThemesProvider>
  );
}
