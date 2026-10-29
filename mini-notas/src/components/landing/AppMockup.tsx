import React from "react";
import { PinIcon, SearchIcon } from "@/components/ui/icons";

// Réplica estática de la app: muestra el producto sin depender de capturas que envejecen
const sidebarNotes = [
    { title: "Plan del proyecto", excerpt: "Objetivos de la semana y tareas…", active: true, pinned: true },
    { title: "Ideas para el blog", excerpt: "Escribir sobre productividad…" },
    { title: "Lista de compras", excerpt: "Pan, leche, café…" },
];

const source = [
    { text: "# Plan del proyecto", className: "font-bold text-foreground" },
    { text: "" },
    { text: "Objetivos de la semana #trabajo", className: "text-foreground", tag: true },
    { text: "" },
    { text: "- [x] Diseñar la landing", className: "text-muted" },
    { text: "- [x] Editor con vista previa", className: "text-muted" },
    { text: "- [ ] Sincronizar en la nube", className: "text-muted" },
    { text: "" },
    { text: "> Lo simple escala mejor.", className: "italic text-muted" },
    { text: "" },
    { text: "**Entrega:** viernes", className: "text-foreground" },
];

function AppMockup() {
    return (
        <div
            className="overflow-hidden border shadow-2xl rounded-2xl border-border bg-surface shadow-black/10 dark:shadow-black/50"
            aria-hidden="true"
        >
            <div className="flex items-center gap-1.5 px-4 h-10 border-b border-border">
                <span className="rounded-full size-3 bg-foreground/15" />
                <span className="rounded-full size-3 bg-foreground/15" />
                <span className="rounded-full size-3 bg-foreground/15" />
                <span className="mx-auto text-xs text-muted">markapp / notas</span>
            </div>

            <div className="grid text-left md:grid-cols-2 lg:grid-cols-[220px_1fr_1fr] min-h-[340px]">
                <div className="hidden p-3 border-r lg:block border-border bg-foreground/[0.02]">
                    <div className="flex items-center gap-2 px-3 py-2 mb-3 text-xs border rounded-lg border-border text-muted">
                        <SearchIcon className="size-3.5" /> Buscar
                    </div>
                    <ul className="space-y-1">
                        {sidebarNotes.map((note) => (
                            <li
                                key={note.title}
                                className={`rounded-lg px-3 py-2 border-l-2 ${note.active ? "bg-foreground/[0.06] border-lime-strong" : "border-transparent"}`}
                            >
                                <p className="flex items-center gap-1 text-sm font-semibold">
                                    {note.pinned && <PinIcon className="size-3 text-accent-text" />}
                                    {note.title}
                                </p>
                                <p className="text-xs truncate text-muted">{note.excerpt}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-5 font-mono text-[13px] leading-7 border-r border-border">
                    {source.map((line, i) => (
                        <p key={i} className={line.className}>
                            {line.tag ? (
                                <>Objetivos de la semana <span className="text-accent-text">#trabajo</span></>
                            ) : (
                                line.text || " "
                            )}
                        </p>
                    ))}
                </div>

                <div className="hidden p-5 text-sm md:block">
                    <h3 className="mb-3 text-xl font-bold">Plan del proyecto</h3>
                    <p className="mb-3">
                        Objetivos de la semana <span className="text-accent-text">#trabajo</span>
                    </p>
                    <ul className="mb-3 space-y-1.5">
                        {[
                            { label: "Diseñar la landing", done: true },
                            { label: "Editor con vista previa", done: true },
                            { label: "Sincronizar en la nube", done: false },
                        ].map((task) => (
                            <li key={task.label} className="flex items-center gap-2">
                                <span className={`flex items-center justify-center rounded size-4 border ${task.done ? "bg-lime border-lime-strong text-ink" : "border-border"}`}>
                                    {task.done && <svg viewBox="0 0 12 12" className="size-2.5"><path d="m2.5 6 2.5 2.5 4.5-5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>}
                                </span>
                                <span className={task.done ? "text-muted line-through" : ""}>{task.label}</span>
                            </li>
                        ))}
                    </ul>
                    <blockquote className="pl-3 mb-3 italic border-l-2 border-lime-strong text-muted">Lo simple escala mejor.</blockquote>
                    <p><strong>Entrega:</strong> viernes</p>
                </div>
            </div>
        </div>
    );
}

export default AppMockup;
