import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function UpperBody() {

  return (
    <div className="relative w-full h-[700px]">
      <Image
        src="/fondo.jpg"
        alt="Fondo"
        fill
        priority
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center text-white justify-evenly">
        <h1 className="mb-4 text-4xl font-bold sm:text-6xl">Descubre Mark App</h1>

        <div className='flex flex-col items-center'>
          <h2 className="mb-6 text-2xl">La mejor herramienta para notas</h2>
          <Link href={"/notes"}>
            <button className="px-6 py-3 text-gray-100 transition duration-300 shadow-md cursor-pointer bg-white/30 backdrop-blur-md hover:bg-white/40 rounded-4xl">
              ¡Anotá acá!
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default UpperBody