import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Footer() {
    return (
        <div className='h-[500px] bg-[#0e1111]'>
            <hr className="border-t border-white w-full px-10" />

            <div className="flex justify-between items-start">
                <div className="w-1/2 mx-10 py-[60px] flex flex-col justify-between h-[400px]">
                    <Link href="/"><h1 className="text-2xl">Mark App</h1></Link>
                    <h2 className="text-4xl py-5 w-[400px]">Contactanos para más información</h2>
                </div>

                <div className="w-px bg-white h-[400px]"></div>

                <div className="w-1/2 mx-10 py-[60px] h-[400px] flex flex-col justify-center text-left">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex flex-col gap-3 items-start">
                            <p>markapp@mail.com</p>
                            <p>52-1-33-12345678</p>
                            <p>Calle Falsa 123, Prueba.</p>
                        </div>

                        <div className="flex gap-3">
                            <Image
                                src="/camara.png"
                                alt="Instagram"
                                width={100}
                                height={100}
                                className="invert"
                            />
                            <Image
                                src="/facebook.png"
                                alt="Facebook"
                                width={100}
                                height={100}
                                className="invert"
                            />
                        </div>
                    </div>
                </div>


            </div>
            <hr className="border-t border-white w-full px-10" />
            <div className='text-right'>
                <p className='p-5'>©2025. Mark App.</p>
            </div>
        </div>
    )
}

export default Footer