"use client"

import React, { useEffect } from 'react'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AnimatedFromLeft({ children }: { children: React.ReactNode }) {
    const controls = useAnimation()
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, x: 0 })
        }
    }, [inView, controls])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}

function Caracteristicas() {
    return (
        <div className='bg-[#161b1c]'>
            <AnimatedFromLeft>
                <div className='text-left'>
                    <h1 className="text-6xl text-white py-[50px] mx-10">Preguntas Frecuentes?</h1>
                    <h2 className='mx-10 text-5xl text-white'>Respuestas Rápidas</h2>
                    <p className='mx-10 pt-[30px] lg:w-[650px]'>Encuentra respuestas a las preguntas más comunes sobre el uso de Mark App y sacá el máximo provecho de nuestra aplicación.</p>
                </div>
            </AnimatedFromLeft>
            
            <div className='text-left mx-6 lg:mx-[300px] py-[50px]'>
                {[
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
                    }
                ].map((item, idx) => (
                    <AnimatedFromLeft key={idx}>
                        <div className='py-[40px]'>
                            <h3 className='pb-[25px]'>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    </AnimatedFromLeft>
                ))}
            </div>
        </div>
    )
}

export default Caracteristicas
