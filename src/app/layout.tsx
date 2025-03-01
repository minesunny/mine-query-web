//use client
import React from "react";
import "./globals.css";

import { Providers } from "@/app/providers";
import { fontSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        "min-h-screen bg-background text-foreground font-sans antialiased",
        fontSans.className,
      )}
    >
      <Providers
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative flex h-dvh flex-col bg-background">
          <SiteHeader />
          <main className="h-full">{children}</main>
          <SiteFooter />
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
