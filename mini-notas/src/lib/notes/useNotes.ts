"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { localRepository } from "./localRepository";
import type { Note, NoteDraft, NotePatch, NotesRepository } from "./types";

const SAVE_DELAY_MS = 500;

export type SaveStatus = "saved" | "saving";

function newId() {
    // randomUUID solo existe en contextos seguros (https o localhost)
    return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useNotes(repository: NotesRepository = localRepository) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");

    // Copia sincrónica del estado: varias ediciones seguidas antes de un render no se pisan
    const notesRef = useRef<Note[]>([]);
    const pending = useRef(new Map<string, Note>());
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const commit = useCallback((next: Note[]) => {
        notesRef.current = next;
        setNotes(next);
    }, []);

    const flush = useCallback(async () => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = null;
        if (pending.current.size === 0) return;
        const batch = [...pending.current.values()];
        pending.current.clear();
        await repository.upsertMany(batch);
        if (pending.current.size === 0) setSaveStatus("saved");
    }, [repository]);

    const schedule = useCallback((note: Note) => {
        pending.current.set(note.id, note);
        setSaveStatus("saving");
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(flush, SAVE_DELAY_MS);
    }, [flush]);

    useEffect(() => {
        repository.getAll().then((all) => {
            commit(all);
            setIsLoading(false);
        });
    }, [repository, commit]);

    // No perder la última edición si se cierra la pestaña o se sale de la página
    useEffect(() => {
        const onUnload = () => { flush(); };
        window.addEventListener("beforeunload", onUnload);
        return () => {
            window.removeEventListener("beforeunload", onUnload);
            flush();
        };
    }, [flush]);

    const createNote = useCallback((draft: NoteDraft = { title: "", content: "" }) => {
        const now = Date.now();
        const note: Note = {
            id: newId(),
            title: draft.title.trim(),
            content: draft.content,
            pinned: false,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
        };
        commit([...notesRef.current, note]);
        schedule(note);
        return note;
    }, [commit, schedule]);

    const importNotes = useCallback((drafts: NoteDraft[]) => {
        const now = Date.now();
        const created = drafts.map((draft, i): Note => ({
            id: newId(),
            title: draft.title.trim(),
            content: draft.content,
            pinned: false,
            createdAt: now + i,
            updatedAt: now + i,
            deletedAt: null,
        }));
        commit([...notesRef.current, ...created]);
        created.forEach(schedule);
        return created;
    }, [commit, schedule]);

    const updateNote = useCallback((id: string, patch: NotePatch) => {
        const current = notesRef.current.find((n) => n.id === id);
        if (!current) return;
        // Fijar o mover a la papelera no cuenta como edición del contenido
        const touchesContent = "title" in patch || "content" in patch;
        const updated: Note = { ...current, ...patch, updatedAt: touchesContent ? Date.now() : current.updatedAt };
        commit(notesRef.current.map((n) => (n.id === id ? updated : n)));
        schedule(updated);
    }, [commit, schedule]);

    const trashNote = useCallback((id: string) => updateNote(id, { deletedAt: Date.now(), pinned: false }), [updateNote]);
    const restoreNote = useCallback((id: string) => updateNote(id, { deletedAt: null }), [updateNote]);

    const deleteForever = useCallback(async (ids: string[]) => {
        ids.forEach((id) => pending.current.delete(id));
        const toRemove = new Set(ids);
        commit(notesRef.current.filter((n) => !toRemove.has(n.id)));
        await repository.remove(ids);
    }, [commit, repository]);

    return {
        notes,
        isLoading,
        saveStatus,
        createNote,
        importNotes,
        updateNote,
        trashNote,
        restoreNote,
        deleteForever,
    };
}
