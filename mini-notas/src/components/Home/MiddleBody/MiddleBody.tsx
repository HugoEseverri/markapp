import React from 'react'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'

const posts = [
    {
        image: "/noticia2.jpg",
        title: "Cómo mejorar la productividad con Mark App",
        text: "Consejos útiles para sacarle el máximo provecho a tus notas.",
    },
    {
        image: "/nota2.jpg",
        title: "Anotá fácil en Mark App",
        text: "Una interfaz simple para que nunca olvides nada importante.",
    },
    {
        image: "/nota3.jpg",
        title: "Guardá todas tus anotaciones en Mark App",
        text: "Organizá tus ideas de forma rápida y eficiente.",
    },
]

function MiddleBody() {
    return (
        <section className="text-ink bg-paper">
            <Reveal>
                <h2 className="mx-[20px] sm:text-8xl text-4xl py-[50px]">Blog</h2>
            </Reveal>

            <hr className="border-t border-gray-800 mx-[20px]" />

            <Reveal>
                <div className="flex flex-wrap gap-4 justify-center px-[10px] py-8">
                    {posts.map((post) => (
                        <article key={post.title} className="w-[600px] max-w-full">
                            <div className="relative w-full h-[350px]">
                                <Image
                                    src={post.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 640px) 100vw, 600px"
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="mt-4 text-lg">{post.title}</h3>
                            <p className="pb-4 text-gray-700 border-b border-black">{post.text}</p>
                        </article>
                    ))}
                </div>
            </Reveal>
        </section>
    )
}

export default MiddleBody
