// components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Asegúrate de tener esta función para combinar clases

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "py-2 px-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
