import React from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import AppMockup from "@/components/landing/AppMockup";

const highlights = ["Sin registrarte", "Se guarda solo", "Exportás a .md cuando quieras"];

function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Resplandor de marca detrás del titular */}
            <div
                className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgb(239_254_138/0.55),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgb(239_254_138/0.14),transparent)]"
                aria-hidden="true"
            />

            <div className="max-w-6xl px-4 pt-16 pb-20 mx-auto text-center sm:px-6 sm:pt-24">
                <Reveal>
                    <p className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm border rounded-full border-border bg-surface/70 text-muted">
                        <span className="rounded-full size-2 bg-lime-strong" />
                        Editor de notas en Markdown
                    </p>
                    <h1 className="max-w-3xl mx-auto text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-6xl">
                        Tus ideas, claras y ordenadas en{" "}
                        <span className="px-2 rounded-lg bg-lime text-ink [box-decoration-break:clone]">Markdown</span>
                    </h1>
                    <p className="max-w-xl mx-auto mt-6 text-lg text-muted">
                        Escribí con vista previa en vivo, encontrá cualquier nota al instante y organizalas con tags.
                        Abrís la app y empezás: no hace falta crear una cuenta.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <Link href="/app" className={buttonStyles({ size: "lg" })}>
                            Empezar a escribir <ArrowRightIcon />
                        </Link>
                        <Link href="#demo" className={buttonStyles({ variant: "ghost", size: "lg" })}>
                            Probalo acá
                        </Link>
                    </div>

                    <ul className="flex flex-wrap justify-center mt-6 text-sm gap-x-6 gap-y-2 text-muted">
                        {highlights.map((item) => (
                            <li key={item} className="flex items-center gap-1.5">
                                <svg viewBox="0 0 12 12" className="size-3 text-accent-text" aria-hidden="true">
                                    <path d="m2.5 6 2.5 2.5 4.5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </Reveal>

                <Reveal className="mt-16">
                    <AppMockup />
                </Reveal>
            </div>
        </section>
    );
}

export default Hero;
