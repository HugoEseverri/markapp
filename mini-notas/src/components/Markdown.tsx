"use client"

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownEditor = () => {
    const [text, setText] = useState<string>("# Escribe en Markdown ✍️");

    return (
        <div className="p-4 max-w-2xl mx-auto bg-amber-900">
            <textarea
                className="w-full h-40 p-2 border rounded-md"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-4 p-4 border rounded-md bg-white">
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </div>
    );
};

export default MarkdownEditor;
