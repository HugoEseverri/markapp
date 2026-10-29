"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";
import { NoteIcon, PlusIcon } from "@/components/ui/icons";
import Sidebar, { type SidebarView } from "@/components/notes/Sidebar";
import NoteEditor, { type EditorMode } from "@/components/notes/NoteEditor";
import CommandPalette from "@/components/notes/CommandPalette";
import { useNotes } from "@/lib/notes/useNotes";
import { collectTags, extractTags, matchesQuery, sortNotes } from "@/lib/notes/selectors";
import { readMarkdownFiles } from "@/lib/notes/files";
import { welcomeNote } from "@/lib/notes/sample";

const MODE_KEY = "editor-mode";

// En mobile la lista y el editor no entran juntos; en desktop sí
function isDesktop() {
    return window.matchMedia("(min-width: 768px)").matches;
}

function NotesApp() {
    const { notes, isLoading, saveStatus, createNote, importNotes, updateNote, trashNote, restoreNote, deleteForever } = useNotes();

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [justCreatedId, setJustCreatedId] = useState<string | null>(null);
    const [view, setView] = useState<SidebarView>("notes");
    const [query, setQuery] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [mode, setMode] = useState<EditorMode>("split");

    useEffect(() => {
        try {
            const saved = localStorage.getItem(MODE_KEY);
            if (saved === "edit" || saved === "split" || saved === "preview") setMode(saved);
        } catch {
            // Sin storage se usa el modo por defecto
        }
    }, []);

    const changeMode = (next: EditorMode) => {
        setMode(next);
        try {
            localStorage.setItem(MODE_KEY, next);
        } catch {}
    };

    const activeNotes = useMemo(() => notes.filter((n) => n.deletedAt === null), [notes]);
    const trashedNotes = useMemo(() => notes.filter((n) => n.deletedAt !== null), [notes]);
    const tags = useMemo(() => collectTags(activeNotes), [activeNotes]);

    const listed = useMemo(() => {
        const source = view === "trash" ? trashedNotes : activeNotes;
        return sortNotes(
            source.filter((n) => matchesQuery(n, query) && (!activeTag || extractTags(n.content).includes(activeTag))),
        );
    }, [view, trashedNotes, activeNotes, query, activeTag]);

    // Si el tag filtrado desaparece (se borró de todas las notas), se suelta el filtro
    useEffect(() => {
        if (activeTag && !tags.some((t) => t.tag === activeTag)) setActiveTag(null);
    }, [tags, activeTag]);

    const selected = notes.find((n) => n.id === selectedId) ?? null;

    const select = useCallback((id: string | null) => {
        setSelectedId(id);
        setJustCreatedId(null);
    }, []);

    const handleCreate = useCallback((title = "") => {
        const note = createNote({ title, content: "" });
        setView("notes");
        setQuery("");
        setActiveTag(null);
        setSelectedId(note.id);
        setJustCreatedId(note.id);
    }, [createNote]);

    // Después de sacar una nota de la vista, en desktop se abre la vecina; en mobile se vuelve a la lista
    const selectNeighbor = (id: string) => {
        const index = listed.findIndex((n) => n.id === id);
        const neighbor = listed[index + 1] ?? listed[index - 1] ?? null;
        select(isDesktop() ? neighbor?.id ?? null : null);
    };

    const handleTrash = (id: string) => {
        selectNeighbor(id);
        trashNote(id);
    };

    const handleRestore = (id: string) => {
        selectNeighbor(id);
        restoreNote(id);
    };

    const handleDeleteForever = (id: string) => {
        selectNeighbor(id);
        deleteForever([id]);
    };

    const handleEmptyTrash = () => {
        if (selected?.deletedAt !== null) select(null);
        deleteForever(trashedNotes.map((n) => n.id));
    };

    const handleImport = async (files: FileList) => {
        const drafts = await readMarkdownFiles(files);
        const created = importNotes(drafts);
        setView("notes");
        setQuery("");
        setActiveTag(null);
        if (created[0]) select(created[0].id);
    };

    const handleViewChange = (next: SidebarView) => {
        setView(next);
        setQuery("");
        setActiveTag(null);
        select(null);
    };

    // Atajos globales; en captura para que funcionen también con el foco en el editor
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setPaletteOpen((open) => !open);
            } else if (e.altKey && !e.ctrlKey && !e.metaKey && e.code === "KeyN") {
                // e.code y no e.key: en Mac, Alt+N escribe "˜"
                e.preventDefault();
                handleCreate();
            }
        };
        window.addEventListener("keydown", onKeyDown, true);
        return () => window.removeEventListener("keydown", onKeyDown, true);
    }, [handleCreate]);

    return (
        <div className="flex h-full">
            <aside
                className={cn(
                    "w-full md:w-80 md:shrink-0 border-r border-border bg-surface/60",
                    selected ? "hidden md:block" : "block",
                )}
            >
                <Sidebar
                    notes={listed}
                    selectedId={selectedId}
                    onSelect={select}
                    onCreate={() => handleCreate()}
                    onImport={handleImport}
                    query={query}
                    onQueryChange={setQuery}
                    tags={tags}
                    activeTag={activeTag}
                    onTagChange={setActiveTag}
                    view={view}
                    onViewChange={handleViewChange}
                    trashCount={trashedNotes.length}
                    onEmptyTrash={handleEmptyTrash}
                    isLoading={isLoading}
                />
            </aside>

            <main className={cn("flex-1 min-w-0", selected ? "block" : "hidden md:block")}>
                {selected ? (
                    <NoteEditor
                        // Remontar al cambiar de nota: resetea el foco, el historial de deshacer y el editor
                        key={selected.id}
                        note={selected}
                        mode={mode}
                        onModeChange={changeMode}
                        onChange={(patch) => updateNote(selected.id, patch)}
                        onTrash={() => handleTrash(selected.id)}
                        onRestore={() => handleRestore(selected.id)}
                        onDeleteForever={() => handleDeleteForever(selected.id)}
                        onBack={() => select(null)}
                        saveStatus={saveStatus}
                        autoFocusTitle={selected.id === justCreatedId}
                    />
                ) : (
                    !isLoading && (
                        <EmptyState
                            hasNotes={activeNotes.length > 0}
                            onCreate={() => handleCreate()}
                            onCreateWelcome={() => {
                                const note = createNote(welcomeNote);
                                select(note.id);
                            }}
                        />
                    )
                )}
            </main>

            <CommandPalette
                open={paletteOpen}
                onClose={() => setPaletteOpen(false)}
                notes={activeNotes}
                onSelect={(id) => {
                    setView("notes");
                    select(id);
                }}
                onCreate={handleCreate}
            />
        </div>
    );
}

function EmptyState({ hasNotes, onCreate, onCreateWelcome }: { hasNotes: boolean; onCreate: () => void; onCreateWelcome: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
            <span className="flex items-center justify-center rounded-2xl size-16 bg-lime text-ink">
                <NoteIcon className="size-8" />
            </span>
            <div>
                <h1 className="text-2xl font-bold">{hasNotes ? "Elegí una nota" : "Tu espacio para escribir"}</h1>
                <p className="max-w-sm mt-2 text-muted">
                    {hasNotes
                        ? "Abrí una nota de la lista o creá una nueva."
                        : "Escribí en Markdown con vista previa en vivo. Todo se guarda solo en este navegador."}
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                <Button onClick={onCreate}><PlusIcon /> Nueva nota</Button>
                {!hasNotes && <Button variant="ghost" onClick={onCreateWelcome}>Ver la guía de Markdown</Button>}
            </div>
            <dl className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1.5 text-sm text-muted">
                <dt><kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-xs">Ctrl K</kbd></dt><dd className="text-left">Buscar notas</dd>
                <dt><kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-xs">Alt N</kbd></dt><dd className="text-left">Nueva nota</dd>
                <dt><kbd className="px-1.5 py-0.5 rounded border border-border bg-surface text-xs">Ctrl B</kbd></dt><dd className="text-left">Negrita</dd>
            </dl>
        </div>
    );
}

export default NotesApp;
