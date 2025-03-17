import * as React from "react";
import "./theme.css";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, readOnly, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "placeholder:text-muted-foreground input flex h-8 w-full rounded-md pl-1 font-inter text-small outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed " +
            `${readOnly ? "soft-input pointer-events-none" : ""}`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
