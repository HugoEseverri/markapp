import type { Note } from "./types";

// Saca bloques e inline code para que `#include` o similares no cuenten como tags
function stripCode(markdown: string) {
    return markdown.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
}

// Un tag es #palabra pegado al numeral (los títulos "# Algo" llevan espacio y no cuentan)
const TAG_RE = /(?:^|\s)#([\p{L}\p{N}_-]+)/gu;

export function extractTags(markdown: string): string[] {
    const tags = new Set<string>();
    for (const match of stripCode(markdown).matchAll(TAG_RE)) {
        tags.add(match[1].toLowerCase());
    }
    return [...tags];
}

export function collectTags(notes: Note[]): { tag: string; count: number }[] {
    const counts = new Map<string, number>();
    for (const note of notes) {
        for (const tag of extractTags(note.content)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return [...counts].map(([tag, count]) => ({ tag, count })).sort((a, b) => a.tag.localeCompare(b.tag));
}

// Texto plano aproximado: alcanza para títulos de respaldo y extractos
function toPlainText(markdown: string) {
    return stripCode(markdown)
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/^\s{0,3}(#{1,6}\s+|>\s?|[-*+]\s+(\[[ xX]\]\s+)?|\d+\.\s+)/gm, "")
        .replace(/[*_~]/g, "")
        .trim();
}

export function getDisplayTitle(note: Note) {
    if (note.title.trim()) return note.title.trim();
    const firstLine = toPlainText(note.content).split("\n").find((l) => l.trim());
    return firstLine?.trim().slice(0, 80) || "Sin título";
}

export function getExcerpt(note: Note, length = 120) {
    const lines = toPlainText(note.content).split("\n").filter((l) => l.trim());
    // Si no hay título explícito, la primera línea ya se usa como título
    const body = (note.title.trim() ? lines : lines.slice(1)).join(" ");
    return body.length > length ? `${body.slice(0, length).trimEnd()}…` : body;
}

function fold(text: string) {
    return text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function matchesQuery(note: Note, query: string) {
    const q = fold(query.trim());
    if (!q) return true;
    return fold(`${note.title}\n${note.content}`).includes(q);
}

// Fijadas primero, después por última edición
export function sortNotes(notes: Note[]) {
    return [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt);
}

export function formatRelative(timestamp: number) {
    const diff = Date.now() - timestamp;
    const minute = 60_000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) return "recién";
    if (diff < hour) return `hace ${Math.floor(diff / minute)} min`;
    if (diff < day) return `hace ${Math.floor(diff / hour)} h`;
    if (diff < 7 * day) return `hace ${Math.floor(diff / day)} d`;
    return new Date(timestamp).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" });
}
