"use client"

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type From = "left" | "right" | "up";

const offsets: Record<From, { x?: number; y?: number }> = {
    left: { x: -50 },
    right: { x: 50 },
    up: { y: 50 },
};

// Aparece con un desplazamiento suave cuando entra en pantalla
function Reveal({ children, from = "up", className }: { children: React.ReactNode; from?: From; className?: string }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, ...offsets[from] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

export default Reveal;
