import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/cn";

function MarkdownPreview({ content, className }: { content: string; className?: string }) {
    if (!content.trim()) {
        return <p className={cn("text-muted italic", className)}>Nada para mostrar todavía.</p>;
    }

    return (
        <div className={cn("markdown", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

export default MarkdownPreview;
