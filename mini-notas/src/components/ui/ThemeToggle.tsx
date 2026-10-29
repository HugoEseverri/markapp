"use client"

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

function resolveTheme(): Theme {
    const explicit = document.documentElement.dataset.theme;
    if (explicit === "light" || explicit === "dark") return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeToggle({ className }: { className?: string }) {
    // null hasta montar: en el servidor no se sabe qué tema tiene el usuario
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => setTheme(resolveTheme()), []);

    const toggle = () => {
        const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem("theme", next);
        } catch {
            // Sin storage el tema igual cambia, solo no se recuerda
        }
        setTheme(next);
    };

    const label = theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro";

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={label}
            title={label}
            className={cn("flex items-center justify-center rounded-lg size-9 text-muted hover:text-foreground hover:bg-foreground/10 transition-colors", className)}
        >
            {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </svg>
            )}
        </button>
    );
}

export default ThemeToggle;
