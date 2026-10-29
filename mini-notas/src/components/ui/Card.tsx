import React from "react";
import { cn } from "@/lib/cn";

function Card({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("rounded-xl border border-border bg-surface p-5 shadow-sm", className)} {...props} />;
}

export default Card;
