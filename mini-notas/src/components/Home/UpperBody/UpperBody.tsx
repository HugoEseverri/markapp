import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonStyles } from '@/components/ui/Button'

function UpperBody() {

  return (
    <section className="relative w-full h-[700px]">
      <Image
        src="/fondo.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 z-10 flex flex-col items-center px-6 text-center text-white justify-evenly">
        <h1 className="mb-4 text-4xl font-bold sm:text-6xl">Descubrí Mark App</h1>

        <div className='flex flex-col items-center'>
          <p className="mb-6 text-2xl">La mejor herramienta para notas</p>
          <Link href="/app" className={buttonStyles({ variant: "glass", size: "lg" })}>
            ¡Anotá acá!
          </Link>
        </div>

      </div>
    </section>
  )
}

export default UpperBody
