"use client"

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import ConfirmButton from "@/components/ui/ConfirmButton";
import IconButton from "@/components/ui/IconButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { HashIcon, NoteIcon, PlusIcon, SearchIcon, TrashIcon, UploadIcon, XIcon } from "@/components/ui/icons";
import NoteListItem from "@/components/notes/NoteListItem";
import type { Note } from "@/lib/notes/types";

export type SidebarView = "notes" | "trash";

type Props = {
    notes: Note[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onCreate: () => void;
    onImport: (files: FileList) => void;
    query: string;
    onQueryChange: (query: string) => void;
    tags: { tag: string; count: number }[];
    activeTag: string | null;
    onTagChange: (tag: string | null) => void;
    view: SidebarView;
    onViewChange: (view: SidebarView) => void;
    trashCount: number;
    onEmptyTrash: () => void;
    isLoading: boolean;
};

function Sidebar(props: Props) {
    const { notes, selectedId, onSelect, onCreate, query, onQueryChange, tags, activeTag, onTagChange, view, onViewChange } = props;
    const fileInput = useRef<HTMLInputElement>(null);

    const isFiltering = query.trim() !== "" || activeTag !== null;

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 h-14 shrink-0">
                <Link href="/" className="flex items-center gap-2 font-semibold" title="Volver al inicio">
                    <Image src="/logo.png" alt="" width={26} height={26} className="object-contain dark:invert" />
                    Mark App
                </Link>
                <ThemeToggle />
            </div>

            <div className="px-3 space-y-2 shrink-0">
                {view === "notes" ? (
                    <Button onClick={onCreate} className="w-full" size="sm">
                        <PlusIcon /> Nueva nota
                        <kbd className="ml-auto hidden text-xs font-normal opacity-60 md:inline">Alt N</kbd>
                    </Button>
                ) : (
                    <Button onClick={() => onViewChange("notes")} variant="ghost" className="w-full justify-start" size="sm">
                        <NoteIcon /> Volver a mis notas
                    </Button>
                )}

                <label className="relative block">
                    <span className="sr-only">Buscar notas</span>
                    <SearchIcon className="absolute -translate-y-1/2 left-3 top-1/2 text-muted" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        placeholder={view === "trash" ? "Buscar en la papelera" : "Buscar"}
                        className="w-full py-2 pr-3 text-sm border rounded-lg pl-9 bg-surface border-border placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-lime/60 focus:border-lime-strong"
                    />
                </label>

                {view === "notes" && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1" role="group" aria-label="Filtrar por tag">
                        {tags.map(({ tag, count }) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => onTagChange(activeTag === tag ? null : tag)}
                                aria-pressed={activeTag === tag}
                                className={cn(
                                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs transition-colors cursor-pointer border",
                                    activeTag === tag
                                        ? "bg-lime text-ink border-lime"
                                        : "border-border text-muted hover:text-foreground",
                                )}
                            >
                                <HashIcon className="size-3" />{tag}
                                <span className="opacity-60">{count}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between px-4 pt-4 pb-1 text-xs font-semibold tracking-wider uppercase text-muted shrink-0">
                <span>{view === "trash" ? "Papelera" : "Notas"}</span>
                {isFiltering && (
                    <button
                        type="button"
                        onClick={() => { onQueryChange(""); onTagChange(null); }}
                        className="flex items-center gap-1 tracking-normal normal-case cursor-pointer hover:text-foreground"
                    >
                        <XIcon className="size-3" /> Limpiar filtros
                    </button>
                )}
            </div>

            <ul className="flex-1 px-2 pb-2 space-y-0.5 overflow-y-auto">
                {!props.isLoading && notes.length === 0 && (
                    <li className="px-3 py-6 text-sm text-center text-muted">
                        {isFiltering
                            ? "No hay notas que coincidan."
                            : view === "trash"
                                ? "La papelera está vacía."
                                : "Todavía no tenés notas."}
                    </li>
                )}
                {notes.map((note) => (
                    <NoteListItem key={note.id} note={note} isActive={note.id === selectedId} onSelect={onSelect} />
                ))}
            </ul>

            <div className="flex items-center gap-1 px-2 py-2 border-t border-border shrink-0">
                {view === "notes" ? (
                    <>
                        <Button variant="ghost" size="sm" onClick={() => onViewChange("trash")} className="flex-1 justify-start font-normal text-muted">
                            <TrashIcon /> Papelera
                            {props.trashCount > 0 && <span className="ml-auto text-xs">{props.trashCount}</span>}
                        </Button>
                        <IconButton label="Importar archivos .md" onClick={() => fileInput.current?.click()}>
                            <UploadIcon />
                        </IconButton>
                        <input
                            ref={fileInput}
                            type="file"
                            accept=".md,.markdown,.txt,text/markdown,text/plain"
                            multiple
                            hidden
                            onChange={(e) => {
                                if (e.target.files?.length) props.onImport(e.target.files);
                                e.target.value = "";
                            }}
                        />
                    </>
                ) : (
                    <ConfirmButton
                        variant="ghost"
                        size="sm"
                        onConfirm={props.onEmptyTrash}
                        disabled={props.trashCount === 0}
                        className="flex-1 justify-start font-normal text-muted"
                        confirmLabel="¿Vaciar? Click para confirmar"
                    >
                        <TrashIcon /> Vaciar papelera
                    </ConfirmButton>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
