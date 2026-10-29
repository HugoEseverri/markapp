import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { buttonStyles } from '@/components/ui/Button'

const links = [
    { href: "/#funciones", label: "Funciones" },
    { href: "/#demo", label: "Probalo" },
    { href: "/#preguntas", label: "Preguntas" },
]

function Navbar() {
    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
            <nav className="flex items-center justify-between h-16 max-w-6xl gap-4 px-4 mx-auto sm:px-6">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                    <Image
                        src="/logo.png"
                        alt=""
                        width={32}
                        height={32}
                        className="object-contain dark:invert"
                        priority
                    />
                    Mark App
                </Link>

                <ul className="items-center hidden gap-8 text-sm md:flex">
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <Link href={href} className="transition-colors text-muted hover:text-foreground">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Link href="/app" className={buttonStyles({ size: "sm" })}>
                        Abrir la app
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
