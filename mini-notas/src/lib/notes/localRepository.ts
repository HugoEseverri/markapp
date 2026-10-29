import type { Note, NotesRepository } from "./types";

const STORAGE_KEY = "notes";

// Acepta el formato viejo (con isExpanded y sin updatedAt) y lo normaliza
function normalize(raw: unknown): Note | null {
    if (!raw || typeof raw !== "object") return null;
    const n = raw as Record<string, unknown>;
    if (typeof n.id !== "string") return null;

    const createdAt = typeof n.createdAt === "number" ? n.createdAt : Date.now();
    return {
        id: n.id,
        title: typeof n.title === "string" ? n.title : "",
        content: typeof n.content === "string" ? n.content : "",
        createdAt,
        updatedAt: typeof n.updatedAt === "number" ? n.updatedAt : createdAt,
    };
}

function read(): Note[] {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        if (!Array.isArray(parsed)) return [];
        return parsed.map(normalize).filter((n): n is Note => n !== null);
    } catch {
        return [];
    }
}

function write(notes: Note[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export const localRepository: NotesRepository = {
    async getAll() {
        return read();
    },
    async upsert(note) {
        const notes = read();
        const index = notes.findIndex((n) => n.id === note.id);
        if (index === -1) notes.push(note);
        else notes[index] = note;
        write(notes);
    },
    async remove(id) {
        write(read().filter((n) => n.id !== id));
    },
};
