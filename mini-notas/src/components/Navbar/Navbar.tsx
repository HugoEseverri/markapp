import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
    return (
        <div className="bg-gray-50 h-[75px] text-gray-800">
            <div className="h-full relative flex items-center justify-between px-4">

                {/* Logo y título */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Logo de Mark App"
                        width={40}
                        height={40}
                        className="object-contain"
                        priority
                    />
                    <h1 className="text-xl">Mark App</h1>
                </div>

                {/* Navegación centrada */}
                <ul className="absolute left-1/2 -translate-x-1/2 flex gap-8">
                    <Link href={"/"} className="transition-transform duration-300 ease-in-out transform hover:scale-110 motion-reduce:transform-none">
                        <li>Inicio</li>
                    </Link>
                    <Link href={"/"} className="transition-transform duration-300 ease-in-out transform hover:scale-110 motion-reduce:transform-none">
                        <li>Blog</li>
                    </Link>
                </ul>
            </div>
        </div>



    )
}

export default Navbar