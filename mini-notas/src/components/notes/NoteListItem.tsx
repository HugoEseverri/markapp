import React from "react";
import { cn } from "@/lib/cn";
import { PinIcon } from "@/components/ui/icons";
import { formatRelative, getDisplayTitle, getExcerpt } from "@/lib/notes/selectors";
import type { Note } from "@/lib/notes/types";

function NoteListItem({ note, isActive, onSelect }: { note: Note; isActive: boolean; onSelect: (id: string) => void }) {
    const excerpt = getExcerpt(note, 90);

    return (
        <li>
            <button
                type="button"
                onClick={() => onSelect(note.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                    "w-full rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer border-l-2",
                    isActive
                        ? "bg-foreground/[0.07] border-lime-strong"
                        : "border-transparent hover:bg-foreground/[0.04]",
                )}
            >
                <div className="flex items-center gap-1.5">
                    {note.pinned && <PinIcon className="size-3.5 text-accent-text" />}
                    <span className="font-semibold truncate">{getDisplayTitle(note)}</span>
                </div>
                {excerpt && <p className="mt-0.5 text-sm text-muted line-clamp-2">{excerpt}</p>}
                <p className="mt-1 text-xs text-muted/80">{formatRelative(note.updatedAt)}</p>
            </button>
        </li>
    );
}

export default NoteListItem;
