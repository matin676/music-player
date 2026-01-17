import React from "react";
import { cn } from "../../features/player/utils/cn";

export const Button = React.forwardRef(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-white text-neutral-900 hover:bg-neutral-200",
      ghost: "bg-transparent text-white hover:bg-white/10",
      icon: "p-2 rounded-full hover:bg-white/10 text-white",
    };

    const sizes = {
      sm: "p-1",
      md: "p-2",
      lg: "p-4",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
