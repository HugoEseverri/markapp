'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function AnimatedCard({ children }: { children: React.ReactNode }) {
    const controls = useAnimation()
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, y: 0 })
        }
    }, [inView, controls])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}

function MiddleBody() {
    return (
        <div className="bg-gray-50">
            <div className="mx-[20px]">
                <h1 className="sm:text-8xl text-4xl text-black py-[50px]">Blog</h1>
            </div>

            <hr className="border-t border-gray-800 mx-[20px] h-1 pb-4" />

            <div className="flex flex-wrap gap-4 justify-center px-[10px] py-8">
                {[{
                    img: "/noticia2.jpg",
                    title: "Cómo mejorar la productividad con Mark App",
                    desc: "Consejos útiles para sacarle el máximo provecho a tus notas."
                }, {
                    img: "/nota2.jpg",
                    title: "Anotá fácil en Mark App",
                    desc: "Una interfaz simple para que nunca olvides nada importante."
                }, {
                    img: "/nota3.jpg",
                    title: "Guardá todas tus anotaciones en Mark App",
                    desc: "Organizá tus ideas de forma rápida y eficiente."
                }].map((item, idx) => (
                    <AnimatedCard key={idx}>
                        <div className="w-[600px]">
                            <div className="relative w-full h-[350px]">
                                <Image
                                    src={item.img}
                                    alt="Fondo"
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                            <h2 className="mt-4 text-lg text-black">{item.title}</h2>
                            <p className="text-gray-700">{item.desc}</p>
                            <hr className="h-1 pb-4 border-t border-black" />
                        </div>
                    </AnimatedCard>
                ))}
            </div>
        </div>
    )
}

export default MiddleBody
