//use client
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
        {/* bg-background */}
        <div className={"flex h-dvh flex-col bg-background"}>
          <SiteHeader />
          <div className={"flex-1 w-full flex flex-row"}>
            <SiteLeft />
            <div className={"h-full flex-1 flex flex-col"}>
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
