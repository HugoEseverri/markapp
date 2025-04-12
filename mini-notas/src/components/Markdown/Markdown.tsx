"use client"

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: number;
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
            createdAt: Date.now()
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

    return (
        <div className="min-h-screen p-6 bg-gray-700">
            <h1 className="mb-6 text-4xl font-bold text-white">Nueva Nota</h1>

            <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold text-white">Título</label>
                <input
                    type="text"
                    placeholder="Ej. Ideas para el proyecto"
                    className="w-full rounded-md border border-[#effe8a] bg-white p-3 text-black focus:border-[#effe8a] focus:outline-none focus:ring-1 focus:ring-[#effe8a]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block mb-1 text-sm font-semibold text-white">Contenido (Markdown)</label>
                <textarea
                    placeholder="Ej. ## Título grande\nEscribí lo que quieras..."
                    className="w-full h-40 rounded-md border border-[#effe8a] bg-white p-3 text-black resize-none focus:border-[#effe8a] focus:outline-none focus:ring-1 focus:ring-[#effe8a]"
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


            <h2 className="mt-10 mb-4 text-2xl">Notas Guardadas</h2>
            {notes.map((note) => (
                <div
                    key={note.id}
                    className="p-6 mb-6 transition-shadow bg-white border border-gray-300 shadow-md rounded-xl hover:shadow-lg"
                >
                    <h3 className="mb-1 text-xl font-semibold text-gray-800">{note.title}</h3>
                    <p className="mb-4 text-sm text-gray-500">
                        {new Date(note.createdAt).toLocaleString()}
                    </p>
                    <div className="prose-sm prose text-gray-800 prose-img:rounded-lg prose-img:shadow max-w-none">
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                    </div>
                    <button
                        onClick={() => handleDelete(note.id)}
                        className="px-4 py-2 mt-2 text-white bg-red-800 rounded"
                    >
                        Borrar
                    </button>
                </div>
            ))}

        </div>
    );
}

export default Notes;
