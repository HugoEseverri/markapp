import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function GitHubIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
            <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
        </svg>
    )
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
            <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13.1H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
        </svg>
    )
}

const socials = [
    { href: "https://github.com/HugoEseverri/", label: "GitHub", Icon: GitHubIcon },
    { href: "https://www.linkedin.com/in/hugo-omar-eseverri/", label: "LinkedIn", Icon: LinkedInIcon },
]

const navLinks = [
    { href: "/#funciones", label: "Funciones" },
    { href: "/#demo", label: "Probalo" },
    { href: "/#preguntas", label: "Preguntas" },
    { href: "/app", label: "Abrir la app" },
]

const contactLinks = [
    { href: "https://wa.me/542284521180", label: "WhatsApp" },
    { href: "https://portfoliohugoeseverri.netlify.app/", label: "Portfolio" },
]

function Footer() {
    return (
        <footer className='text-white bg-ink'>
            <div className="grid gap-12 px-6 py-16 mx-auto max-w-6xl sm:px-10 md:grid-cols-[2fr_1fr_1fr]">

                <div className="flex flex-col gap-5">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
                        <Image src="/logo.png" alt="" width={32} height={32} className="object-contain" />
                        Mark App
                    </Link>
                    <p className="max-w-sm text-white/70">
                        Proyecto diseñado y desarrollado por{" "}
                        <span className="text-white">Hugo Omar Eseverri</span>.
                    </p>
                    <div className="flex gap-3">
                        {socials.map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex items-center justify-center transition-colors border rounded-full size-11 border-white/20 text-white/80 hover:border-lime hover:text-lime"
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>

                <nav aria-label="Secciones">
                    <h2 className="mb-4 text-sm font-semibold tracking-wider uppercase text-lime">Navegación</h2>
                    <ul className="space-y-3 text-white/70">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <Link href={href} className="transition-colors hover:text-lime">{label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <h2 className="mb-4 text-sm font-semibold tracking-wider uppercase text-lime">Contacto</h2>
                    <ul className="space-y-3 text-white/70">
                        {contactLinks.map(({ href, label }) => (
                            <li key={label}>
                                <a href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-lime">
                                    {label} ↗
                                </a>
                            </li>
                        ))}
                        <li>
                            <a href="tel:+542284521180" className="transition-colors hover:text-lime">2284521180</a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="border-t border-white/10">
                <p className='max-w-6xl px-6 py-5 mx-auto text-sm sm:px-10 text-white/50'>
                    ©{new Date().getFullYear()} Mark App · Hugo Omar Eseverri
                </p>
            </div>
        </footer>
    )
}

export default Footer
