import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
    return (
        <div className="bg-gray-200 h-[50px] text-gray-800">
            <div className="bg-gray-200 h-[50px] text-gray-800 relative flex items-center px-4">
                <h1 className="text-xl font-semibold">Mark App</h1>

                <ul className="absolute left-1/2 -translate-x-1/2 flex gap-8 ">
                    <Link href={"/"} className='transition-transform duration-300 ease-in-out transform hover:scale-110 motion-reduce:transform-none'><li>Inicio</li></Link>
                    <Link href={"/"} className='transition-transform duration-300 ease-in-out transform hover:scale-110 motion-reduce:transform-none'><li>Blog</li></Link>
                </ul>
            </div>

        </div>


    )
}

export default Navbar