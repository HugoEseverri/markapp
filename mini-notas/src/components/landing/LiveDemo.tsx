"use client"

import React, { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import MarkdownPreview from "@/components/notes/MarkdownPreview";

const initial = `## Probá escribir acá

Esto es **Markdown**: texto común con algunos símbolos que le dan _formato_.

- [x] Leer esta nota
- [ ] Cambiar algo y ver el resultado

| Escribís | Obtenés |
| --- | --- |
| \`**hola**\` | **hola** |
| \`~~chau~~\` | ~~chau~~ |
`;

function LiveDemo() {
    const [text, setText] = useState(initial);

    return (
        <section id="demo" className="py-24 border-y border-border bg-foreground/[0.02] scroll-mt-16">
            <div className="max-w-6xl px-4 mx-auto sm:px-6">
                <Reveal className="max-w-2xl mb-10">
                    <p className="mb-3 text-sm font-semibold tracking-wider uppercase text-accent-text">Demo</p>
                    <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">Probalo sin salir de esta página</h2>
                    <p className="mt-4 text-lg text-muted">
                        Editá el texto de la izquierda. Lo que escribas acá no se guarda: es solo para que veas cómo funciona.
                    </p>
                </Reveal>

                <Reveal>
                    <div className="grid overflow-hidden border md:grid-cols-2 rounded-2xl border-border bg-surface">
                        <label className="flex flex-col border-b md:border-b-0 md:border-r border-border">
                            <span className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase border-b border-border text-muted">Markdown</span>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                spellCheck={false}
                                className="flex-1 min-h-[420px] p-5 font-mono text-sm leading-7 bg-transparent resize-none focus:outline-none"
                            />
                        </label>
                        <div className="flex flex-col">
                            <span className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase border-b border-border text-muted">Resultado</span>
                            <MarkdownPreview content={text} className="p-5 overflow-y-auto max-h-[460px]" />
                        </div>
                    </div>
                </Reveal>

                <div className="mt-8 text-center">
                    <Link href="/app" className={buttonStyles({ variant: "dark", size: "lg", className: "dark:bg-lime dark:text-ink dark:hover:bg-lime-strong" })}>
                        Seguir en la app <ArrowRightIcon />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default LiveDemo;
