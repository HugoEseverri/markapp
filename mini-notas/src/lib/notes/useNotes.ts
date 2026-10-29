"use client"

import { useCallback, useEffect, useState } from "react";
import { localRepository } from "./localRepository";
import type { Note, NoteDraft, NotesRepository } from "./types";

export function useNotes(repository: NotesRepository = localRepository) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        repository.getAll().then((all) => {
            setNotes(all);
            setIsLoading(false);
        });
    }, [repository]);

    const createNote = useCallback(async (draft: NoteDraft) => {
        const now = Date.now();
        const note: Note = {
            // randomUUID solo existe en contextos seguros (https o localhost)
            id: crypto.randomUUID?.() ?? `${now}-${Math.random().toString(36).slice(2)}`,
            title: draft.title.trim(),
            content: draft.content,
            createdAt: now,
            updatedAt: now,
        };
        await repository.upsert(note);
        setNotes((prev) => [...prev, note]);
        return note;
    }, [repository]);

    const deleteNote = useCallback(async (id: string) => {
        await repository.remove(id);
        setNotes((prev) => prev.filter((n) => n.id !== id));
    }, [repository]);

    return { notes, isLoading, createNote, deleteNote };
}
