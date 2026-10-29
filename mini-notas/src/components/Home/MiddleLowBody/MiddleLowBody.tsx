import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { buttonStyles } from '@/components/ui/Button'

function MiddleLowBody() {
    return (
        <section className="min-h-screen bg-lime text-ink py-15">
            <Reveal from="left">
                <h2 className="mx-[30px] text-6xl py-[30px]">Acerca de</h2>
            </Reveal>

            <div className="flex flex-col items-start pb-10 xl:flex-row">
                <div className="relative w-full max-w-[400px] aspect-[4/5] mx-auto mt-10 px-4">
                    <Image
                        src="/mark2.png"
                        alt=""
                        fill
                        sizes="400px"
                        className="object-cover rounded-xl"
                    />
                </div>
                <Reveal from="left">
                    <div className="lg:w-[650px] mt-10 xl:ml-[450px] mx-10">
                        <h3 className="mb-3 text-[14px]">Nuestra misión</h3>
                        <p className="text-[25px]">
                            Mark App es una aplicación innovadora que facilita la creación, visualización y gestión de notas en formato Markdown de manera eficiente y en tiempo real. Nuestro objetivo es proporcionar a los usuarios una experiencia fluida al redactar contenido con Markdown y obtener una vista previa instantánea del formato final. Descubrí cómo Mark App puede mejorar tu flujo de trabajo y aumentar tu productividad.
                        </p>
                        <Link href="/app" className={buttonStyles({ variant: "dark", className: "mt-10" })}>
                            Empezar a escribir
                        </Link>
                    </div>
                </Reveal>
            </div>
            <hr className="border-t border-gray-800 mx-[20px]" />
        </section>
    )
}

export default MiddleLowBody
