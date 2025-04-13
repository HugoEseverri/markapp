"use client"

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    isExpanded: boolean;
};

function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("notes") || "[]");
        setNotes(saved);
    }, []);

    const handleSave = () => {
        const newNote = {
            id: Date.now().toString(),
            title,
            content,
            createdAt: Date.now(),
            isExpanded: false
        };

        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));

        setTitle("");
        setContent("");
    };

    const handleDelete = (id: string) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const toggleExpand = (id: string) => {
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return { ...note, isExpanded: !note.isExpanded };
            }
            return note;
        });
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    return (
        <div className="min-h-screen p-6 bg-gray-700">
            <h1 className="mb-6 text-4xl font-bold text-white">Nueva Nota</h1>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold text-white">Título</label>
                <input
                    type="text"
                    placeholder="Ej. Ideas para el proyecto"
                    className="w-full rounded-md border border-[#effe8a] bg-gray-300 p-3 text-black focus:border-[#effe8a] focus:outline-none focus:ring-1 focus:ring-[#effe8a]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block mb-1 text-sm font-semibold text-white">Contenido (Markdown)</label>
                
                <textarea
                    placeholder="Ej. ## Título grande\nEscribí lo que quieras..."
                    className="w-full h-40 rounded-md border border-[#effe8a] bg-gray-300 p-3 text-black resize-none focus:border-[#effe8a] focus:outline-none focus:ring-1 focus:ring-[#effe8a]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <button
                className="rounded-md bg-[#effe8a] px-6 py-2 text-black font-semibold shadow hover:bg-[#d9d65b] transition-colors"
                onClick={handleSave}
            >
                Guardar Nota
            </button>

            <h2 className="mt-10 mb-4 text-2xl text-white">Notas Guardadas</h2>
            <div className="flex flex-wrap gap-6">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className={`p-4 border bg-[#cecfc8] w-80 h-80 overflow-hidden rounded-lg flex flex-col ${note.isExpanded ? "h-auto" : "h-80"
                            }`}
                    >
                        <h3 className="font-semibold text-[#333] text-lg">{note.title}</h3>
                        <small className="block text-sm text-gray-600">{new Date(note.createdAt).toLocaleString()}</small>
                        <div
                            className={`mt-2 overflow-auto text-black ${note.isExpanded ? "block" : "line-clamp-7"
                                }`}
                        >
                            <ReactMarkdown>{note.content}</ReactMarkdown>
                        </div>
                        <div className="flex mt-auto space-x-2">
                            <button
                                onClick={() => toggleExpand(note.id)}
                                className="px-4 py-2 text-black bg-[#e5f397] rounded"
                            >
                                {note.isExpanded ? "Ver menos" : "Ver más"}
                            </button>
                            <button
                                onClick={() => handleDelete(note.id)}
                                className="px-4 py-2 text-black rounded bg-sky-200"
                            >
                                Borrar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );

}

export default Notes;
