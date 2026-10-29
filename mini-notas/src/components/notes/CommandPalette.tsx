"use client"

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { NoteIcon, PlusIcon, SearchIcon } from "@/components/ui/icons";
import { getDisplayTitle, getExcerpt, matchesQuery, sortNotes } from "@/lib/notes/selectors";
import type { Note } from "@/lib/notes/types";

type Item =
    | { kind: "create"; id: "create" }
    | { kind: "note"; id: string; note: Note };

type Props = {
    open: boolean;
    onClose: () => void;
    notes: Note[];
    onSelect: (id: string) => void;
    onCreate: (title: string) => void;
};

const MAX_RESULTS = 8;

function CommandPalette({ open, onClose, notes, onSelect, onCreate }: Props) {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (open) {
            setQuery("");
            setActiveIndex(0);
        }
    }, [open]);

    const items = useMemo<Item[]>(() => {
        const matches = sortNotes(notes.filter((n) => matchesQuery(n, query)))
            .slice(0, MAX_RESULTS)
            .map((note): Item => ({ kind: "note", id: note.id, note }));
        return [{ kind: "create", id: "create" }, ...matches];
    }, [notes, query]);

    useEffect(() => {
        // Con texto escrito, lo más probable es querer abrir el primer resultado, no crear
        setActiveIndex(query.trim() && items.length > 1 ? 1 : 0);
    }, [query, items.length]);

    useEffect(() => {
        listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    const run = (item: Item) => {
        onClose();
        if (item.kind === "create") onCreate(query.trim());
        else onSelect(item.id);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % items.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => (i - 1 + items.length) % items.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            const item = items[activeIndex];
            if (item) run(item);
        } else if (e.key === "Escape") {
            e.preventDefault();
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
                >
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Buscar notas"
                        className="w-full max-w-xl overflow-hidden border shadow-2xl rounded-xl bg-surface border-border"
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-3 px-4 border-b border-border">
                            <SearchIcon className="size-5 text-muted" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={onKeyDown}
                                placeholder="Buscar notas o crear una nueva…"
                                role="combobox"
                                aria-expanded="true"
                                aria-controls="palette-results"
                                aria-activedescendant={`palette-item-${activeIndex}`}
                                className="flex-1 py-4 bg-transparent focus:outline-none placeholder:text-muted"
                            />
                            <kbd className="text-xs text-muted">Esc</kbd>
                        </div>

                        <ul id="palette-results" ref={listRef} role="listbox" className="p-2 overflow-y-auto max-h-[50vh]">
                            {items.map((item, index) => (
                                <li
                                    key={item.id}
                                    id={`palette-item-${index}`}
                                    data-index={index}
                                    role="option"
                                    aria-selected={index === activeIndex}
                                    onMouseMove={() => setActiveIndex(index)}
                                    onClick={() => run(item)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer",
                                        index === activeIndex && "bg-foreground/[0.07]",
                                    )}
                                >
                                    {item.kind === "create" ? (
                                        <>
                                            <span className="flex items-center justify-center rounded-md size-7 bg-lime text-ink"><PlusIcon /></span>
                                            <span className="flex-1">
                                                {query.trim() ? <>Nueva nota: <strong>{query.trim()}</strong></> : "Nueva nota"}
                                            </span>
                                            <kbd className="text-xs text-muted">Alt N</kbd>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex items-center justify-center rounded-md size-7 bg-foreground/[0.06] text-muted"><NoteIcon /></span>
                                            <span className="flex-1 min-w-0">
                                                <span className="block truncate">{getDisplayTitle(item.note)}</span>
                                                <span className="block text-xs truncate text-muted">{getExcerpt(item.note, 80)}</span>
                                            </span>
                                        </>
                                    )}
                                </li>
                            ))}
                            {items.length === 1 && query.trim() && (
                                <li className="px-3 py-3 text-sm text-muted">No hay notas que coincidan.</li>
                            )}
                        </ul>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default CommandPalette;
