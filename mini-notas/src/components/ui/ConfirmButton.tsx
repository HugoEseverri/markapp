"use client"

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Props = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
    onConfirm: () => void;
    confirmLabel?: string;
};

// Acción destructiva en dos pasos, sin diálogos del navegador: el primer click pide confirmación
function ConfirmButton({ onConfirm, confirmLabel = "¿Seguro? Click para confirmar", children, className, ...props }: Props) {
    const [armed, setArmed] = useState(false);

    useEffect(() => {
        if (!armed) return;
        const timeout = setTimeout(() => setArmed(false), 3000);
        return () => clearTimeout(timeout);
    }, [armed]);

    return (
        <Button
            {...props}
            className={cn(className, armed && "bg-red-500/15 text-red-600 dark:text-red-400 hover:bg-red-500/25")}
            onClick={() => {
                if (armed) {
                    setArmed(false);
                    onConfirm();
                } else {
                    setArmed(true);
                }
            }}
            onBlur={() => setArmed(false)}
        >
            {armed ? confirmLabel : children}
        </Button>
    );
}

export default ConfirmButton;
