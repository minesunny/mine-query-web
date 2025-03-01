"use client";

import * as React from "react";
import Link from "next/link";

import { Icons } from "@/components/ui/Icons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog-content",
    description:
      "A modal dialog-content that interrupts the user with important content and expects a response.",
  },
];

export function MainNav() {
  return (
    <div className={"container flex h-14 items-center bg-secondary"}>
      <div className={"mr-4 hidden md:flex"}>
        <Link href="" className={"mr-6 flex items-center space-x-2"}>
          {/*<Icons.logo className="h-6 w-6" />*/}
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
