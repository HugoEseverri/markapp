import type { Note, NotesRepository } from "./types";

const STORAGE_KEY = "notes";

// Acepta formatos anteriores (con isExpanded, sin updatedAt/pinned/deletedAt) y los normaliza
function normalize(raw: unknown): Note | null {
    if (!raw || typeof raw !== "object") return null;
    const n = raw as Record<string, unknown>;
    if (typeof n.id !== "string") return null;

    const createdAt = typeof n.createdAt === "number" ? n.createdAt : Date.now();
    return {
        id: n.id,
        title: typeof n.title === "string" ? n.title : "",
        content: typeof n.content === "string" ? n.content : "",
        pinned: n.pinned === true,
        createdAt,
        updatedAt: typeof n.updatedAt === "number" ? n.updatedAt : createdAt,
        deletedAt: typeof n.deletedAt === "number" ? n.deletedAt : null,
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
        await localRepository.upsertMany([note]);
    },
    async upsertMany(incoming) {
        const byId = new Map(read().map((n) => [n.id, n]));
        for (const note of incoming) byId.set(note.id, note);
        write([...byId.values()]);
    },
    async remove(ids) {
        const toRemove = new Set(ids);
        write(read().filter((n) => !toRemove.has(n.id)));
    },
};
