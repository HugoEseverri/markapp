import React from 'react'
import Reveal from '@/components/ui/Reveal'

const faqs = [
    {
        title: "Problemas Técnicos",
        text: "Si experimentas algún problema técnico con Mark App, nuestro equipo de soporte está acá para ayudarte. Contactanos para recibir asistencia inmediata y resolver cualquier inconveniente que puedas enfrentar.",
    },
    {
        title: "Compatibilidad de Dispositivos",
        text: "Mark App es compatible con una amplia gama de dispositivos, incluyendo computadoras, teléfonos y tabletas. Asegúrate de tener la última versión de la aplicación para disfrutar de todas las funciones en tu dispositivo preferido.",
    },
    {
        title: "Actualizaciones de funciones",
        text: "Mantente al día con las últimas actualizaciones y nuevas funciones de Mark App. Nuestro equipo trabaja constantemente para mejorar la aplicación y brindarte una experiencia aún mejor en la gestión de tus notas.",
    },
]

function Caracteristicas() {
    return (
        <section className='text-white bg-ink-soft'>
            <Reveal from="left">
                <div className='text-left'>
                    <h2 className="text-6xl py-[50px] mx-10">¿Preguntas frecuentes?</h2>
                    <h3 className='mx-10 text-5xl'>Respuestas rápidas</h3>
                    <p className='mx-10 pt-[30px] lg:w-[650px] text-white/80'>Encuentra respuestas a las preguntas más comunes sobre el uso de Mark App y sacá el máximo provecho de nuestra aplicación.</p>
                </div>
            </Reveal>

            <div className='text-left mx-6 lg:mx-[300px] py-[50px]'>
                {faqs.map((item) => (
                    <Reveal key={item.title} from="left">
                        <div className='py-[40px]'>
                            <h4 className='pb-[25px] text-lg font-semibold text-lime'>{item.title}</h4>
                            <p className='text-white/80'>{item.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

export default Caracteristicas
