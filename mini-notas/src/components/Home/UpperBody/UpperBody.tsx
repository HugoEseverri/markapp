import React from 'react'
import Image from 'next/image'

function UpperBody() {

  return (
    <div className="relative w-full h-[450px]">
      <Image
        src="/markapp.jpg"
        alt="Fondo"
        fill
        priority
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-black/40">
        <h1 className="text-4xl font-bold mb-4">Descubre Mark App</h1>
        <h2 className="text-2xl mb-6">La mejor herramienta para notas</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg">
          ¡Anotá acá!
        </button>
      </div>
    </div>
  )
}

export default UpperBody