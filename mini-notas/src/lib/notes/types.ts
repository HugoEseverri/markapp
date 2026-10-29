export type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
};

export type NoteDraft = Pick<Note, "title" | "content">;

// Contrato de almacenamiento: hoy localStorage, mañana una API, sin tocar la UI
export interface NotesRepository {
    getAll(): Promise<Note[]>;
    upsert(note: Note): Promise<void>;
    remove(id: string): Promise<void>;
}
