import React from 'react'

function LowBody() {
    return (
        <div className='bg-[#effe8a] h-auto pt-10 pb-10'>
            <div>
                <h1 className='mx-10 text-4xl text-black lg:text-6xl'>Características</h1>
            </div>
            <div className="lg:w-[1000px] mx-10 mt-20 mb-30 ">
                <h3 className="text-black my-6 text-[14px]">Lo que nos destaca</h3>
                <p className="text-black text-[25px]">
                    Mark App ofrece una interfaz intuitiva para escribir notas con Markdown, vista previa en tiempo real, opciones de personalización y organización de notas. Con sincronización en la nube, seguridad de datos y facilidad de uso, Mark App es la elección perfecta para usuarios que buscan eficiencia y practicidad en la gestión de sus notas.
                </p>
            </div>
            <hr className="border-t border-gray-800 mx-[20px] h-1 pt-10" />
        </div>
    )
}

export default LowBody