import React from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

function CallToAction() {
    return (
        <section className="px-4 pb-24 sm:px-6">
            <Reveal>
                <div className="relative max-w-6xl px-6 py-16 mx-auto overflow-hidden text-center rounded-3xl bg-lime text-ink sm:py-20">
                    {/* Un # gigante de fondo, guiño a la sintaxis de Markdown */}
                    <span
                        className="absolute font-bold leading-none pointer-events-none select-none -right-6 -bottom-16 text-[16rem] text-ink/[0.06]"
                        aria-hidden="true"
                    >
                        #
                    </span>
                    <h2 className="max-w-2xl mx-auto text-3xl font-bold tracking-tight text-balance sm:text-5xl">
                        Tu próxima idea empieza con un #
                    </h2>
                    <p className="max-w-lg mx-auto mt-4 text-lg text-ink/70">
                        Abrí Mark App y escribí tu primera nota. Es gratis y no necesitás cuenta.
                    </p>
                    <Link href="/app" className={buttonStyles({ variant: "dark", size: "lg", className: "mt-8" })}>
                        Empezar a escribir <ArrowRightIcon />
                    </Link>
                </div>
            </Reveal>
        </section>
    );
}

export default CallToAction;
