"use client"

import React, { useMemo } from "react";
import CodeMirror, { EditorView, keymap } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { Prec } from "@codemirror/state";
import { tags as t } from "@lezer/highlight";
import { applyFormat } from "@/lib/editor/commands";

// Todo el look sale de los tokens de globals.css, así sigue al tema claro/oscuro
const theme = EditorView.theme({
    "&": { height: "100%", fontSize: "15px", backgroundColor: "transparent", color: "var(--foreground)" },
    "&.cm-focused": { outline: "none" },
    ".cm-scroller": { fontFamily: "var(--font-mono-stack)", lineHeight: "1.7" },
    ".cm-content": { padding: "16px 0 40vh", caretColor: "var(--foreground)", maxWidth: "75ch", margin: "0 auto" },
    ".cm-line": { padding: "0 24px" },
    ".cm-cursor": { borderLeftColor: "var(--foreground)" },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": {
        backgroundColor: "var(--selection) !important",
    },
    ".cm-placeholder": { color: "var(--muted)" },
});

const highlight = HighlightStyle.define([
    { tag: t.heading1, fontSize: "1.45em", fontWeight: "700" },
    { tag: t.heading2, fontSize: "1.25em", fontWeight: "700" },
    { tag: [t.heading3, t.heading4, t.heading5, t.heading6], fontWeight: "700" },
    { tag: t.strong, fontWeight: "700" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: [t.link, t.url], color: "var(--accent-text)", textDecoration: "underline" },
    { tag: t.monospace, color: "var(--accent-text)" },
    { tag: t.quote, color: "var(--muted)", fontStyle: "italic" },
    { tag: [t.processingInstruction, t.meta, t.contentSeparator], color: "var(--muted)" },
]);

type Props = {
    value: string;
    onChange: (value: string) => void;
    onReady?: (view: EditorView) => void;
    autoFocus?: boolean;
};

function MarkdownEditor({ value, onChange, onReady, autoFocus }: Props) {
    const extensions = useMemo(() => [
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        EditorView.lineWrapping,
        theme,
        syntaxHighlighting(highlight),
        // Prec.high para ganarle a los atajos por defecto (Mod-i selecciona el nodo padre)
        Prec.high(keymap.of([
            { key: "Mod-b", run: (view) => applyFormat(view, "bold") },
            { key: "Mod-i", run: (view) => applyFormat(view, "italic") },
            { key: "Mod-Shift-x", run: (view) => applyFormat(view, "strike") },
            { key: "Mod-e", run: (view) => applyFormat(view, "code") },
        ])),
    ], []);

    return (
        <CodeMirror
            value={value}
            onChange={onChange}
            onCreateEditor={onReady}
            extensions={extensions}
            autoFocus={autoFocus}
            placeholder="Empezá a escribir… Usá # para títulos, - para listas y #palabra para tags."
            height="100%"
            className="h-full"
            theme="none"
            basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
                autocompletion: false,
                searchKeymap: true,
            }}
        />
    );
}

export default MarkdownEditor;
