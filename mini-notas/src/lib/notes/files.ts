import type { Note, NoteDraft } from "./types";
import { getDisplayTitle } from "./selectors";

function slugify(text: string) {
    const slug = text
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60);
    return slug || "nota";
}

// El título se exporta como encabezado para que el archivo se lea bien en cualquier editor
export function downloadMarkdown(note: Note) {
    const body = note.title.trim() ? `# ${note.title.trim()}\n\n${note.content}` : note.content;
    const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(getDisplayTitle(note))}.md`;
    link.click();
    // Algunos navegadores necesitan que la URL siga viva un momento después del click
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Inverso de downloadMarkdown: un "# Título" en la primera línea pasa a ser el título
export async function readMarkdownFiles(files: FileList | File[]): Promise<NoteDraft[]> {
    return Promise.all(
        [...files].map(async (file) => {
            const text = (await file.text()).replace(/\r\n/g, "\n");
            const heading = text.match(/^#\s+(.+)\n*/);
            if (heading) return { title: heading[1].trim(), content: text.slice(heading[0].length) };
            return { title: file.name.replace(/\.(md|markdown|txt)$/i, ""), content: text };
        }),
    );
}
