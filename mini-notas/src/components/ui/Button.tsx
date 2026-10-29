import React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "glass" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
    primary: "bg-lime text-ink hover:bg-lime-strong",
    dark: "bg-ink text-lime-soft hover:bg-ink-soft",
    glass: "bg-white/20 text-white backdrop-blur-md hover:bg-white/30",
    ghost: "text-foreground hover:bg-foreground/10",
};

const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-7 py-3 text-lg",
};

// Exportado para estilizar un <Link> como botón sin anidar <button> dentro de <a>
export function buttonStyles({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
    return cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-strong",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
    );
}

type ButtonProps = React.ComponentProps<"button"> & { variant?: Variant; size?: Size };

function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
    return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

export default Button;
