import React from 'react'
import Image from 'next/image'

function Down() {
    return (
        <div className='bg-[#effe8a] h-[900px] pt-10'>
            <div className="w-[1000px] mr-10 ml-auto text-right">
                <div className='flex items-center'>
                    <div>
                        <h2 className="text-black my-6 text-[14px] text-left">Diseño Responsivo</h2>
                        <h2 className="text-black my-6 text-[22px] text-left">Accedé desde Cualquier Dispositivo</h2>
                        <p className="text-black text-[18px] mb-12 text-left w-[800px]">
                            Mark App está disponible en todos tus dispositivos. Trabajá desde tu computadora, teléfono o tablet sin perderte de nada. Mark App te brinda la libertad de acceder a tus notas cuando las necesitás, estés donde estés.
                        </p>
                    </div>
                    <div className='pl-10'>
                        <Image
                            src="/logo.png"
                            alt="Logo de Mark App"
                            width={110}
                            height={110}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
                <hr className="border-t border-black  h-1 pt-10" />
            </div>
            <div className="w-[1000px] mr-10 ml-auto text-right">
                <div className='flex items-center'>
                    <div>
                        <h2 className="text-black my-6 text-[14px] text-left">Seguridad de Datos</h2>
                        <h2 className="text-black my-6 text-[22px] text-left">Protegemos tu Información</h2>
                        <p className="text-black text-[18px] mb-12 text-left w-[800px]">
                            La seguridad de tus datos es nuestra prioridad. Mark App garantiza la protección de tus notas con encriptación avanzada y medidas de seguridad sólidas. Puedes confiar en que tu información estará segura y privada en todo momento.
                        </p>
                    </div>
                    <div className='pl-10'>
                        <Image
                            src="/logo.png"
                            alt="Logo de Mark App"
                            width={110}
                            height={110}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
                <hr className="border-t border-black  h-1 pt-10" />
            </div>
            <div className="w-[1000px] mr-10 ml-auto text-right">
                <div className='flex items-center'>
                    <div>
                        <h2 className="text-black my-6 text-[14px] text-left">Personalización</h2>
                        <h2 className="text-black my-6 text-[22px] text-left">Hazlo a tu Estilo</h2>
                        <p className="text-black text-[18px] mb-12 text-left w-[800px]">
                            Personaliza tus notas con diferentes temas, fuentes y estilos para reflejar tu personalidad y preferencias. Con Mark App, puedes adaptar tu entorno de escritura a tu gusto y hacer que tus notas sean únicas y atractivas.
                        </p>
                    </div>
                    <div className='pl-10'>
                        <Image
                            src="/logo.png"
                            alt="Logo de Mark App"
                            width={110}
                            height={110}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Down