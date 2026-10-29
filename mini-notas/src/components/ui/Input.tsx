import React from "react";
import { cn } from "@/lib/cn";

const fieldStyles =
    "w-full rounded-lg border border-border bg-surface p-3 text-foreground placeholder:text-muted " +
    "focus:border-lime-strong focus:outline-none focus:ring-2 focus:ring-lime/60";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
    return <input className={cn(fieldStyles, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return <textarea className={cn(fieldStyles, "resize-y", className)} {...props} />;
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
    return <label className={cn("block mb-1.5 text-sm font-semibold", className)} {...props} />;
}
