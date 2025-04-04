import React from 'react'
import Image from 'next/image'

function MiddleLowBody() {
    return (
        <div className="bg-[#effe8a] h-[800px] py-15">
            <div className="mx-[30px]">
                <h2 className="text-6xl text-black py-[30px]">Acerca de</h2>
            </div>

            <div className="flex items-start">
                <div className="relative h-[450px] w-[400px] mx-[30px] mt-30">
                    <Image
                        src="/mark2.png"
                        alt="Fondo"
                        fill
                        className="object-cover "
                        priority
                    />
                </div>

                <div className="w-[650px] ml-[450px] mt-10">
                    <h3 className="text-black mb-3 text-[14px]">Nuestra misión</h3>
                    <p className="text-black text-[25px]">
                        Mark App es una aplicación innovadora que facilita la creación, visualización y gestión de notas en formato Markdown de manera eficiente y en tiempo real. Nuestro objetivo es proporcionar a los usuarios una experiencia fluida al redactar contenido con Markdown y obtener una vista previa instantánea del formato final. Descubrí cómo Mark App puede mejorar tu flujo de trabajo y aumentar tu productividad.
                    </p>
                    <button className='rounded-4xl text-[#e2ed95] bg-black p-3 mt-10 transition-transform duration-300 ease-in-out transform hover:scale-110 motion-reduce:transform-none cursor-pointer'>Más información</button>

                </div>

            </div>
            <hr className="border-t border-gray-800 mx-[20px] h-1 pt-10" />

        </div>

    )
}

export default MiddleLowBody