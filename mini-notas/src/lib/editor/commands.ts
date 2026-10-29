import { EditorSelection } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";

// Envuelve cada selección con before/after; sin selección deja el cursor en el medio
export function wrapSelection(view: EditorView, before: string, after = before) {
    const changes = view.state.changeByRange((range) => ({
        changes: [
            { from: range.from, insert: before },
            { from: range.to, insert: after },
        ],
        range: EditorSelection.range(range.from + before.length, range.to + before.length),
    }));
    view.dispatch(view.state.update(changes, { scrollIntoView: true, userEvent: "input" }));
    view.focus();
    return true;
}

// Agrega (o quita, si todas ya lo tienen) un prefijo al principio de cada línea seleccionada
export function toggleLinePrefix(view: EditorView, prefix: string) {
    const { state } = view;
    const lines = new Set<number>();
    for (const range of state.selection.ranges) {
        const first = state.doc.lineAt(range.from).number;
        const last = state.doc.lineAt(range.to).number;
        for (let n = first; n <= last; n++) lines.add(n);
    }

    const targets = [...lines].map((n) => state.doc.line(n));
    const allHavePrefix = targets.every((line) => line.text.startsWith(prefix));

    view.dispatch({
        changes: targets.map((line) =>
            allHavePrefix
                ? { from: line.from, to: line.from + prefix.length, insert: "" }
                : { from: line.from, insert: prefix },
        ),
        scrollIntoView: true,
        userEvent: "input",
    });
    view.focus();
    return true;
}

export function insertLink(view: EditorView) {
    const range = view.state.selection.main;
    const text = view.state.sliceDoc(range.from, range.to) || "texto";
    const insert = `[${text}](https://)`;
    // Deja seleccionada la URL para reemplazarla al escribir
    const urlStart = range.from + text.length + 3;
    view.dispatch({
        changes: { from: range.from, to: range.to, insert },
        selection: EditorSelection.range(urlStart, urlStart + "https://".length),
        scrollIntoView: true,
        userEvent: "input",
    });
    view.focus();
    return true;
}

export type FormatAction = "bold" | "italic" | "strike" | "heading" | "quote" | "list" | "checklist" | "code" | "link";

export function applyFormat(view: EditorView, action: FormatAction) {
    switch (action) {
        case "bold": return wrapSelection(view, "**");
        case "italic": return wrapSelection(view, "_");
        case "strike": return wrapSelection(view, "~~");
        case "code": return wrapSelection(view, "`");
        case "heading": return toggleLinePrefix(view, "## ");
        case "quote": return toggleLinePrefix(view, "> ");
        case "list": return toggleLinePrefix(view, "- ");
        case "checklist": return toggleLinePrefix(view, "- [ ] ");
        case "link": return insertLink(view);
    }
}
