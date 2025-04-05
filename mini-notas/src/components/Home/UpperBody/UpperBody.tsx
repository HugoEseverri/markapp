import React from 'react'
import Image from 'next/image'

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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
        <h1 className="text-4xl font-bold mb-4">Descubre Mark App</h1>
        <h2 className="text-2xl mb-6">La mejor herramienta para notas</h2>
        <button className="bg-white/30 backdrop-blur-md hover:bg-white/40 text-gray-100 px-6 py-3 rounded-4xl shadow-md transition duration-300 cursor-pointer">
          ¡Anotá acá!
        </button>

      </div>
    </div>
  )
}

export default UpperBody