import React from "react";
import { cn } from "@/lib/cn";

type Props = React.ComponentProps<"button"> & { label: string; active?: boolean };

// Botón cuadrado solo con ícono; label es obligatorio para accesibilidad y tooltip
function IconButton({ label, active, className, type = "button", ...props }: Props) {
    return (
        <button
            type={type}
            aria-label={label}
            title={label}
            aria-pressed={active}
            className={cn(
                "flex items-center justify-center shrink-0 rounded-lg size-9 transition-colors cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-lime-strong",
                active ? "bg-lime text-ink" : "text-muted hover:text-foreground hover:bg-foreground/10",
                className,
            )}
            {...props}
        />
    );
}

export default IconButton;
