"use client"

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import type { EditorView } from "@codemirror/view";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import ConfirmButton from "@/components/ui/ConfirmButton";
import IconButton from "@/components/ui/IconButton";
import {
    ArrowLeftIcon, BoldIcon, ChecklistIcon, CodeIcon, DownloadIcon, HeadingIcon, ItalicIcon,
    LinkIcon, ListIcon, PinIcon, QuoteIcon, RestoreIcon, StrikeIcon, TrashIcon,
} from "@/components/ui/icons";
import MarkdownPreview from "@/components/notes/MarkdownPreview";
import { applyFormat, type FormatAction } from "@/lib/editor/commands";
import { downloadMarkdown } from "@/lib/notes/files";
import { formatRelative } from "@/lib/notes/selectors";
import type { SaveStatus } from "@/lib/notes/useNotes";
import type { Note, NotePatch } from "@/lib/notes/types";

// CodeMirror solo funciona en el navegador y pesa: se carga aparte
const MarkdownEditor = dynamic(() => import("@/components/notes/MarkdownEditor"), {
    ssr: false,
    loading: () => <div className="h-full" />,
});

export type EditorMode = "edit" | "split" | "preview";

const modes: { value: EditorMode; label: string; className?: string }[] = [
    { value: "edit", label: "Editar" },
    { value: "split", label: "Dividido", className: "hidden lg:block" },
    { value: "preview", label: "Vista previa" },
];

const formatButtons: { action: FormatAction; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { action: "bold", label: "Negrita (Ctrl+B)", Icon: BoldIcon },
    { action: "italic", label: "Cursiva (Ctrl+I)", Icon: ItalicIcon },
    { action: "strike", label: "Tachado (Ctrl+Shift+X)", Icon: StrikeIcon },
    { action: "heading", label: "Título", Icon: HeadingIcon },
    { action: "quote", label: "Cita", Icon: QuoteIcon },
    { action: "list", label: "Lista", Icon: ListIcon },
    { action: "checklist", label: "Checklist", Icon: ChecklistIcon },
    { action: "code", label: "Código (Ctrl+E)", Icon: CodeIcon },
    { action: "link", label: "Link", Icon: LinkIcon },
];

function countWords(text: string) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
}

type Props = {
    note: Note;
    mode: EditorMode;
    onModeChange: (mode: EditorMode) => void;
    onChange: (patch: NotePatch) => void;
    onTrash: () => void;
    onRestore: () => void;
    onDeleteForever: () => void;
    onBack: () => void;
    saveStatus: SaveStatus;
    autoFocusTitle: boolean;
};

function NoteEditor({ note, mode, onModeChange, onChange, onTrash, onRestore, onDeleteForever, onBack, saveStatus, autoFocusTitle }: Props) {
    const viewRef = useRef<EditorView | null>(null);
    const isTrashed = note.deletedAt !== null;
    // En la papelera la nota es de solo lectura
    const effectiveMode: EditorMode = isTrashed ? "preview" : mode;
    const showEditor = effectiveMode !== "preview";
    const showPreview = effectiveMode !== "edit";
    const words = countWords(note.content);

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center gap-1 px-2 border-b h-14 shrink-0 border-border sm:px-3">
                <IconButton label="Volver a la lista" onClick={onBack} className="md:hidden">
                    <ArrowLeftIcon className="size-5" />
                </IconButton>

                {showEditor && (
                    <div className="flex items-center min-w-0 gap-0.5 overflow-x-auto [scrollbar-width:none]" role="toolbar" aria-label="Formato">
                        {formatButtons.map(({ action, label, Icon }) => (
                            <IconButton
                                key={action}
                                label={label}
                                // Evita que el botón le robe el foco (y la selección) al editor
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => viewRef.current && applyFormat(viewRef.current, action)}
                            >
                                <Icon />
                            </IconButton>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-1 ml-auto shrink-0">
                    {!isTrashed && (
                        <>
                            <div className="hidden p-0.5 mr-1 rounded-lg sm:flex bg-foreground/[0.06]" role="radiogroup" aria-label="Modo de vista">
                                {modes.map(({ value, label, className }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        role="radio"
                                        aria-checked={mode === value}
                                        onClick={() => onModeChange(value)}
                                        className={cn(
                                            "px-2.5 py-1 text-sm rounded-md transition-colors cursor-pointer",
                                            mode === value ? "bg-surface shadow-sm font-semibold" : "text-muted hover:text-foreground",
                                            className,
                                        )}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                            {/* En pantallas chicas, un solo botón alterna editar/ver */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="sm:hidden"
                                onClick={() => onModeChange(mode === "preview" ? "edit" : "preview")}
                            >
                                {mode === "preview" ? "Editar" : "Ver"}
                            </Button>
                            <IconButton
                                label={note.pinned ? "Desfijar" : "Fijar arriba"}
                                active={note.pinned}
                                onClick={() => onChange({ pinned: !note.pinned })}
                            >
                                <PinIcon />
                            </IconButton>
                            <IconButton label="Descargar .md" onClick={() => downloadMarkdown(note)}>
                                <DownloadIcon />
                            </IconButton>
                            <IconButton label="Mover a la papelera" onClick={onTrash}>
                                <TrashIcon />
                            </IconButton>
                        </>
                    )}
                </div>
            </header>

            {isTrashed && (
                <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 text-sm border-b border-border bg-foreground/[0.04] shrink-0">
                    <span className="mr-auto text-muted">Esta nota está en la papelera.</span>
                    <Button size="sm" variant="ghost" onClick={onRestore}>
                        <RestoreIcon /> Restaurar
                    </Button>
                    <ConfirmButton size="sm" variant="ghost" onConfirm={onDeleteForever} confirmLabel="¿Eliminar para siempre?">
                        <TrashIcon /> Eliminar definitivamente
                    </ConfirmButton>
                </div>
            )}

            <div className="flex flex-1 min-h-0">
                {showEditor && (
                    <section
                        className={cn("flex flex-col min-w-0 flex-1", showPreview && "lg:border-r border-border")}
                        aria-label="Editor"
                    >
                        <input
                            value={note.title}
                            onChange={(e) => onChange({ title: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    viewRef.current?.focus();
                                }
                            }}
                            autoFocus={autoFocusTitle}
                            placeholder="Sin título"
                            aria-label="Título"
                            className="w-full max-w-[75ch] mx-auto px-6 pt-6 text-2xl font-bold bg-transparent sm:text-3xl placeholder:text-muted/60 focus:outline-none"
                        />
                        <div className="flex-1 min-h-0">
                            <MarkdownEditor
                                key={note.id}
                                value={note.content}
                                onChange={(content) => onChange({ content })}
                                onReady={(view) => { viewRef.current = view; }}
                            />
                        </div>
                    </section>
                )}

                {showPreview && (
                    <section
                        className={cn("flex-1 min-w-0 overflow-y-auto", showEditor && "hidden lg:block bg-foreground/[0.015]")}
                        aria-label="Vista previa"
                    >
                        <article className="max-w-[75ch] px-6 py-6 mx-auto">
                            {!showEditor && (
                                <h1 className="mb-6 text-2xl font-bold sm:text-3xl">{note.title || "Sin título"}</h1>
                            )}
                            <MarkdownPreview content={note.content} />
                        </article>
                    </section>
                )}
            </div>

            <footer className="flex items-center gap-3 px-4 text-xs border-t h-8 shrink-0 border-border text-muted">
                <span>{words} {words === 1 ? "palabra" : "palabras"}</span>
                <span aria-hidden="true">·</span>
                <span>Editada {formatRelative(note.updatedAt)}</span>
                <span className="ml-auto" role="status">
                    {isTrashed ? "" : saveStatus === "saving" ? "Guardando…" : "Guardado"}
                </span>
            </footer>
        </div>
    );
}

export default NoteEditor;
