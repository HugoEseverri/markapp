import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Footer() {
    return (
        <div className='h-auto bg-[#0e1111]'>
            <hr className="w-full px-10 border-t border-white" />

            <div className="flex flex-col items-start justify-between sm:flex-row">

                <div className="w-1/2 mx-10 py-[60px] flex flex-col justify-between h-[400px]">
                    <Link href="/"><h1 className="text-2xl">Mark App</h1></Link>
                    <h2 className="text-4xl py-5 md:w-[400px]">Contactanos para más información</h2>
                </div>

                <div className="hidden sm:block w-px bg-white h-[400px]"></div>

                <div className="w-1/2 mx-10 py-[60px] h-[400px] flex flex-col justify-center text-left">
                    <div className="flex flex-wrap items-center justify-between w-full">
                        <div className="flex flex-col items-start gap-3">
                            <p>markapp@mail.com</p>
                            <p>52-1-33-12345678</p>
                            <p>Calle Falsa 123, Prueba.</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/camara.png"
                                    alt="Instagram"
                                    width={100}
                                    height={100}
                                    className="invert"
                                />
                            </a>
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src="/facebook.png"
                                    alt="Facebook"
                                    width={100}
                                    height={100}
                                    className="invert"
                                />
                            </a>
                        </div>
                    </div>
                </div>


            </div>
            <hr className="w-full px-10 border-t border-white" />
            <div className='text-right'>
                <p className='p-5'>©2025. Mark App.</p>
            </div>
        </div>
    )
}

export default Footer