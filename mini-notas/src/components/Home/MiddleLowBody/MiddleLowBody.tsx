import React from 'react'
import Image from 'next/image'

function MiddleLowBody() {
    return (
        <div className="bg-[#e2ed95] h-[700px]">
            <div className="mx-[20px]">
                <h2 className="text-5xl text-black py-[30px]">Acerca de</h2>
            </div>

            <div className="flex items-start">
                <div className="relative h-[350px] w-[200px] mx-[20px] mt-10">
                    <Image
                        src="/mark2.jpg"
                        alt="Fondo"
                        fill
                        className="object-cover "
                        priority
                    />
                </div>

                <div className="w-[450px] ml-[260px] mt-10">
                    <h3 className="text-black mb-3 text-[14px]">Nuestra misión</h3>
                    <p className="text-black text-justify text-[18px]">
                        Mark App es una aplicación innovadora que facilita la creación, visualización y gestión de notas en formato Markdown de manera eficiente y en tiempo real. Nuestro objetivo es proporcionar a los usuarios una experiencia fluida al redactar contenido con Markdown y obtener una vista previa instantánea del formato final. Descubrí cómo Mark App puede mejorar tu flujo de trabajo y aumentar tu productividad.
                    </p>
                    <button className='rounded-4xl text-[#e2ed95] bg-gray-800 p-1 mt-2'>Conocer más</button>
                </div>
            </div>

        </div>

    )
}

export default MiddleLowBody