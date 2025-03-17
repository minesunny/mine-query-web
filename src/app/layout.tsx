//use client
"use client";
import React from "react";
import "./globals.css";

import { Providers } from "@/app/providers";
import { fontSans } from "@/config/fonts";
import { cn } from "@/lib/utils";

import {
  SiteLeft,
  SiteRight,
  SiteFooter,
  SiteHeader,
} from "@/components/site-bar";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        "bg-background text-foreground min-h-screen font-sans antialiased",
        fontSans.className,
      )}
    >
      <Providers
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className={"bg-background flex h-dvh flex-col"}>
          <SiteHeader />
          <div className={"flex w-full flex-1 flex-row"}>
            <SiteLeft />
            <div className={"flex h-full flex-1 flex-col"}>
              <main className="h-full">{children}</main>
            </div>
            <SiteRight />
          </div>
          <SiteFooter />
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
