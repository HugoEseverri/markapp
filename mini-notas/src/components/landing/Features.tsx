import React from "react";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import {
    BoldIcon, ChecklistIcon, CodeIcon, DownloadIcon, EyeIcon, HashIcon, ItalicIcon,
    KeyboardIcon, LinkIcon, MoonIcon, PinIcon, SaveIcon, SearchIcon,
} from "@/components/ui/icons";

type Feature = {
    title: string;
    text: string;
    Icon: React.ComponentType<{ className?: string }>;
    className?: string;
    visual?: React.ReactNode;
};

function Kbd({ children }: { children: React.ReactNode }) {
    return (
        <kbd className="inline-flex items-center justify-center min-w-8 h-8 px-2 text-sm font-semibold border-b-2 rounded-md border-border bg-background shadow-sm">
            {children}
        </kbd>
    );
}

function Checkbox({ checked = false }: { checked?: boolean }) {
    return (
        <span className={cn("flex items-center justify-center rounded size-4 border shrink-0", checked ? "bg-lime border-lime-strong text-ink" : "border-border")}>
            {checked && <svg viewBox="0 0 12 12" className="size-2.5"><path d="m2.5 6 2.5 2.5 4.5-5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>}
        </span>
    );
}

// Mini ventanas de la app en cada tema, con colores fijos para que se vean igual en ambos
function ThemePreview({ dark }: { dark?: boolean }) {
    return (
        <div className={cn("flex-1 p-3 border rounded-lg", dark ? "bg-ink border-white/10" : "bg-white border-black/10")}>
            <div className={cn("h-2 w-1/2 rounded-full mb-2", dark ? "bg-white/80" : "bg-ink/80")} />
            <div className={cn("h-1.5 w-full rounded-full mb-1.5", dark ? "bg-white/20" : "bg-ink/15")} />
            <div className={cn("h-1.5 w-4/5 rounded-full mb-3", dark ? "bg-white/20" : "bg-ink/15")} />
            <div className="w-10 h-3 rounded-full bg-lime" />
        </div>
    );
}

const features: Feature[] = [
    {
        title: "Vista previa en vivo",
        text: "Escribí a la izquierda y mirá el resultado a la derecha mientras tipeás. O elegí solo editor o solo lectura.",
        Icon: EyeIcon,
        className: "lg:col-span-2",
        visual: (
            <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
                <div className="p-3 font-mono text-xs leading-6 border rounded-lg border-border bg-background text-muted">
                    <p className="font-bold text-foreground">## Reunión</p>
                    <p>- [x] Definir fecha</p>
                    <p>- [ ] Enviar **agenda**</p>
                </div>
                <div className="p-3 border rounded-lg border-border bg-background">
                    <p className="mb-1 font-bold">Reunión</p>
                    <p className="flex items-center gap-2 line-through text-muted"><Checkbox checked /> Definir fecha</p>
                    <p className="flex items-center gap-2"><Checkbox /> <span>Enviar <strong>agenda</strong></span></p>
                </div>
            </div>
        ),
    },
    {
        title: "Encontrá todo al instante",
        text: "Buscá en títulos y contenido desde cualquier lugar, sin importar tildes ni mayúsculas.",
        Icon: SearchIcon,
        visual: (
            <div className="flex items-center gap-2 mt-6">
                <Kbd>Ctrl</Kbd><span className="text-muted">+</span><Kbd>K</Kbd>
            </div>
        ),
    },
    {
        title: "Tags sin configurar nada",
        text: "Escribí #algo en una nota y aparece como filtro en la barra lateral.",
        Icon: HashIcon,
        visual: (
            <div className="flex flex-wrap gap-2 mt-6">
                {["trabajo", "ideas", "facultad", "recetas"].map((tag, i) => (
                    <span
                        key={tag}
                        className={cn(
                            "rounded-full border px-2.5 py-0.5 text-sm",
                            i === 0 ? "bg-lime text-ink border-lime" : "border-border text-muted",
                        )}
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        ),
    },
    {
        title: "Formato con un click o con atajos",
        text: "Barra de herramientas para negrita, listas, checklists, código y links. Y si preferís el teclado, Ctrl+B, Ctrl+I y Ctrl+E.",
        Icon: KeyboardIcon,
        className: "lg:col-span-2",
        visual: (
            <div className="flex flex-wrap gap-1 p-1.5 mt-6 border rounded-lg w-fit border-border bg-background text-muted">
                {[BoldIcon, ItalicIcon, ChecklistIcon, CodeIcon, LinkIcon].map((Icon, i) => (
                    <span key={i} className={cn("flex items-center justify-center rounded-md size-9", i === 0 && "bg-lime text-ink")}>
                        <Icon />
                    </span>
                ))}
            </div>
        ),
    },
    {
        title: "Se guarda solo",
        text: "Cada cambio se guarda mientras escribís. No hay botón de guardar que olvidarse de apretar.",
        Icon: SaveIcon,
    },
    {
        title: "Tablas, tareas y código",
        text: "Markdown con extensiones de GitHub: tablas, checklists, tachado y bloques de código con colores.",
        Icon: CodeIcon,
    },
    {
        title: "Tus archivos, siempre tuyos",
        text: "Descargá cualquier nota como .md e importá tus archivos de otras apps. Sin formatos cerrados.",
        Icon: DownloadIcon,
    },
    {
        title: "Fijadas y papelera",
        text: "Fijá arriba lo importante. Lo que borrás va a la papelera, por si te arrepentís.",
        Icon: PinIcon,
    },
    {
        title: "Claro u oscuro",
        text: "Sigue el tema de tu sistema, o elegilo vos. Se recuerda para la próxima.",
        Icon: MoonIcon,
        className: "lg:col-span-2",
        visual: (
            <div className="flex max-w-sm gap-3 mt-6">
                <ThemePreview />
                <ThemePreview dark />
            </div>
        ),
    },
];

function Features() {
    return (
        <section id="funciones" className="py-24 scroll-mt-16">
            <div className="max-w-6xl px-4 mx-auto sm:px-6">
                <Reveal className="max-w-2xl mb-12">
                    <p className="mb-3 text-sm font-semibold tracking-wider uppercase text-accent-text">Funciones</p>
                    <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">Todo lo que necesitás para escribir, nada que te distraiga</h2>
                </Reveal>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(({ title, text, Icon, className, visual }) => (
                        <Reveal key={title} className={cn("flex", className)}>
                            <article className="flex flex-col w-full p-6 transition-colors border rounded-2xl border-border bg-surface hover:border-foreground/20">
                                <span className="flex items-center justify-center mb-4 rounded-xl size-10 bg-lime text-ink">
                                    <Icon className="size-5" />
                                </span>
                                <h3 className="text-lg font-semibold">{title}</h3>
                                <p className="mt-2 text-muted">{text}</p>
                                {visual}
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
