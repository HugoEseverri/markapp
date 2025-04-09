import React from 'react'
import Image from 'next/image'

function MiddleBody() {
    return (
        <div className="bg-gray-50">
            <div className="mx-[20px]">
                <h1 className="sm:text-8xl text-4xl text-black py-[50px]">Blog</h1>
            </div>

            <hr className="border-t border-gray-800 mx-[20px] h-1 pb-4" />

            <div className="flex flex-wrap gap-4 justify-center px-[10px] py-8">
                <div className="w-[600px]">
                    <div className="relative w-full h-[350px]">
                        <Image
                            src="/noticia2.jpg"
                            alt="Fondo"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    <h2 className="mt-4 text-lg text-black">
                        Cómo mejorar la productividad con Mark App
                    </h2>
                    <p className="text-gray-700">
                        Consejos útiles para sacarle el máximo provecho a tus notas.
                    </p>
                    <hr className="h-1 pb-4 border-t border-black" />
                </div>

                <div className="w-[600px]">
                    <div className="relative w-full h-[350px]">
                        <Image
                            src="/nota2.jpg"
                            alt="Fondo"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    <h2 className="mt-4 text-lg text-black">
                        Anotá fácil en Mark App
                    </h2>
                    <p className="text-gray-700">
                        Una interfaz simple para que nunca olvides nada importante.
                    </p>
                    <hr className="h-1 pb-4 border-t border-black" />
                </div>

                <div className="w-[600px]">
                    <div className="relative w-full h-[350px]">
                        <Image
                            src="/nota3.jpg"
                            alt="Fondo"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    <h2 className="mt-4 text-lg text-black">
                        Guardá todas tus anotaciones en Mark App
                    </h2>
                    <p className="text-gray-700">
                        Organizá tus ideas de forma rápida y eficiente.
                    </p>
                    <hr className="h-1 pb-4 border-t border-black" />
                </div>
            </div>

        </div>


    )
}

export default MiddleBody