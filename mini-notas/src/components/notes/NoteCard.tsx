"use client"

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { Note } from "@/lib/notes/types";

function NoteCard({ note, onDelete }: { note: Note; onDelete: (id: string) => void }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card className={cn("flex flex-col w-full sm:w-80", isExpanded ? "h-auto" : "h-80")}>
            <h3 className="text-lg font-semibold truncate">{note.title || "Sin título"}</h3>
            <small className="text-sm text-muted">{new Date(note.updatedAt).toLocaleString("es-AR")}</small>

            <div className={cn("markdown mt-3 min-h-0 flex-1 text-sm", isExpanded ? "" : "overflow-hidden")}>
                <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>

            <div className="flex gap-2 pt-4 mt-auto">
                <Button variant="primary" size="sm" onClick={() => setIsExpanded((v) => !v)}>
                    {isExpanded ? "Ver menos" : "Ver más"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(note.id)}>
                    Borrar
                </Button>
            </div>
        </Card>
    );
}

export default NoteCard;
