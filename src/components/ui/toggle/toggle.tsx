"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import "./theme.css";
import { cn } from "@/lib/utils";
import { SVG } from "@/components/ui/Icons";
import { Separator } from "@/components/ui/separator";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "toggle-default",
      },
      size: {
        default: "h-6 w-6",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
      name?: string;
      split?: boolean;
    }
>(({ className, variant, size, name, split, ...props }, ref) => {
  if (name) {
    const { children, ..._props } = props;
    return (
      <div className={"flex h-fit w-fit items-center"}>
        <TogglePrimitive.Root
          ref={ref}
          className={cn(toggleVariants({ variant, size, className }))}
          {..._props}
        >
          <SVG name={name} />
        </TogglePrimitive.Root>
        {split && (
          <Separator
            orientation="vertical"
            className={`toggle-default-split mx-2 h-5`}
          />
        )}
      </div>
    );
  } else {
    return (
      <TogglePrimitive.Root
        ref={ref}
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
});

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
