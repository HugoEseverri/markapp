export type Note = {
    id: string;
    title: string;
    content: string;
    pinned: boolean;
    createdAt: number;
    updatedAt: number;
    // null mientras la nota no está en la papelera
    deletedAt: number | null;
};

export type NoteDraft = Pick<Note, "title" | "content">;

export type NotePatch = Partial<Pick<Note, "title" | "content" | "pinned" | "deletedAt">>;

// Contrato de almacenamiento: hoy localStorage, mañana una API, sin tocar la UI
export interface NotesRepository {
    getAll(): Promise<Note[]>;
    upsert(note: Note): Promise<void>;
    upsertMany(notes: Note[]): Promise<void>;
    remove(ids: string[]): Promise<void>;
}
