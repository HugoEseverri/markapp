import React from 'react'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'

const items = [
    {
        title1: 'Diseño Responsivo',
        title2: 'Accedé desde Cualquier Dispositivo',
        text: 'Mark App está disponible en todos tus dispositivos. Trabajá desde tu computadora, teléfono o tablet sin perderte de nada. Mark App te brinda la libertad de acceder a tus notas cuando las necesitás, estés donde estés.',
    },
    {
        title1: 'Seguridad de Datos',
        title2: 'Protegemos tu Información',
        text: 'La seguridad de tus datos es nuestra prioridad. Mark App garantiza la protección de tus notas con encriptación avanzada y medidas de seguridad sólidas. Puedes confiar en que tu información estará segura y privada en todo momento.',
    },
    {
        title1: 'Personalización',
        title2: 'Hazlo a tu Estilo',
        text: 'Personaliza tus notas con diferentes temas, fuentes y estilos para reflejar tu personalidad y preferencias. Con Mark App, puedes adaptar tu entorno de escritura a tu gusto y hacer que tus notas sean únicas y atractivas.',
    },
]

function Down() {
    return (
        <section className='bg-lime text-ink min-h-[900px] pt-10'>
            {items.map((item) => (
                <Reveal key={item.title1} from="right">
                    <div className="w-full lg:w-[1000px] px-6 lg:mr-10 lg:ml-auto">
                        <div className='flex flex-col items-center lg:flex-row lg:items-start'>
                            <div className="text-left">
                                <h3 className="my-6 text-[14px]">{item.title1}</h3>
                                <h4 className="my-6 text-[22px]">{item.title2}</h4>
                                <p className="text-[18px] mb-12 max-w-full lg:max-w-[800px]">
                                    {item.text}
                                </p>
                            </div>
                            <div className='pl-0 mb-8 lg:pl-10 lg:mb-0 shrink-0'>
                                <Image
                                    src="/logo.png"
                                    alt=""
                                    width={110}
                                    height={110}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <hr className="pb-10 border-t border-black" />
                    </div>
                </Reveal>
            ))}
        </section>
    )
}

export default Down
