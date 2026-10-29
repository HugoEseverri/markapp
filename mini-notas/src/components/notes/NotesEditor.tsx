"use client"

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Input";
import NoteCard from "@/components/notes/NoteCard";
import { useNotes } from "@/lib/notes/useNotes";

function NotesEditor() {
    const { notes, isLoading, createNote, deleteNote } = useNotes();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const canSave = title.trim() !== "" || content.trim() !== "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSave) return;
        await createNote({ title, content });
        setTitle("");
        setContent("");
    };

    return (
        <div className="max-w-6xl p-6 mx-auto">
            <h1 className="mb-6 text-4xl font-bold">Nueva nota</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="note-title">Título</Label>
                    <Input
                        id="note-title"
                        type="text"
                        placeholder="Ej. Ideas para el proyecto"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="note-content">Contenido (Markdown)</Label>
                    <Textarea
                        id="note-content"
                        placeholder={"## Título grande\nEscribí lo que quieras..."}
                        className="h-40"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <Button type="submit" disabled={!canSave}>
                    Guardar nota
                </Button>
            </form>

            <h2 className="mt-12 mb-4 text-2xl font-semibold">Notas guardadas</h2>

            {isLoading ? null : notes.length === 0 ? (
                <p className="text-muted">Todavía no tenés notas. Escribí la primera arriba.</p>
            ) : (
                <div className="flex flex-wrap gap-6">
                    {notes.map((note) => (
                        <NoteCard key={note.id} note={note} onDelete={deleteNote} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default NotesEditor;
