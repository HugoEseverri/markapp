import React from 'react'
import Reveal from '@/components/ui/Reveal'

function LowBody() {
    return (
        <section className='pt-10 pb-10 bg-lime text-ink'>
            <Reveal from="left">
                <h2 className='mx-10 text-4xl lg:text-6xl'>Características</h2>
            </Reveal>
            <div className="lg:w-[1000px] mx-10 mt-20 mb-30">
                <Reveal from="left">
                    <h3 className="my-6 text-[14px]">Lo que nos destaca</h3>
                    <p className="text-[25px]">
                        Mark App ofrece una interfaz intuitiva para escribir notas con Markdown, vista previa en tiempo real, opciones de personalización y organización de notas. Con sincronización en la nube, seguridad de datos y facilidad de uso, Mark App es la elección perfecta para usuarios que buscan eficiencia y practicidad en la gestión de sus notas.
                    </p>
                </Reveal>
            </div>
            <hr className="border-t border-gray-800 mx-[20px]" />
        </section>
    )
}

export default LowBody
