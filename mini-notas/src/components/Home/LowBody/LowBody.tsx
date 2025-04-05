import React from 'react'

function LowBody() {
    return (
        <div className='bg-[#effe8a] h-[500px] pt-10'>
            
            <div>
                <h1 className='text-black text-6xl ml-20'>Caracteristicas</h1>
            </div>
            <div className="w-[650px] ml-20 mt-10">
                    <h3 className="text-black mb-3 text-[14px]">Nuestra misión</h3>
                    <p className="text-black text-[25px]">
                        Mark App es una aplicación innovadora que facilita la creación, visualización y gestión de notas en formato Markdown de manera eficiente y en tiempo real. Nuestro objetivo es proporcionar a los usuarios una experiencia fluida al redactar contenido con Markdown y obtener una vista previa instantánea del formato final. Descubrí cómo Mark App puede mejorar tu flujo de trabajo y aumentar tu productividad.
                    </p>
                    <button className='rounded-4xl text-[#e2ed95] bg-black p-3 mt-10 transition-transform duration-300 ease-in-out transform hover:scale-110 motion-reduce:transform-none cursor-pointer'>Más información</button>

                </div>
        </div>
    )
}

export default LowBody