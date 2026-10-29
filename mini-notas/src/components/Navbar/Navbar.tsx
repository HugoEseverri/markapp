"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import ThemeToggle from '@/components/ui/ThemeToggle'

const links = [
    { href: "/", label: "Inicio" },
    { href: "/app", label: "Notas" },
]

function Navbar() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-40 h-[75px] border-b border-border bg-background/80 backdrop-blur-md">
            <nav className="relative flex items-center justify-between h-full px-4">

                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt=""
                        width={40}
                        height={40}
                        className="object-contain dark:invert"
                        priority
                    />
                    <span className="text-xl font-semibold">Mark App</span>
                </Link>

                <ul className="flex gap-8 sm:-translate-x-1/2 sm:absolute left-1/2">
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                aria-current={pathname === href ? "page" : undefined}
                                className={cn(
                                    "transition-colors hover:text-foreground",
                                    pathname === href ? "text-foreground font-semibold" : "text-muted"
                                )}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ThemeToggle />
            </nav>
        </header>
    )
}

export default Navbar
