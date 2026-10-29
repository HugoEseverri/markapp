import React from "react";
import Reveal from "@/components/ui/Reveal";
import { ChevronDownIcon } from "@/components/ui/icons";

const faqs = [
    {
        question: "¿Necesito crear una cuenta?",
        answer: "No. Entrás a la app y empezás a escribir. No te pedimos mail ni contraseña.",
    },
    {
        question: "¿Dónde se guardan mis notas?",
        answer: "En tu navegador, en este dispositivo. Nada se manda a un servidor. Por eso, si borrás los datos del navegador o cambiás de dispositivo, no vas a ver tus notas: para llevarlas a otro lado, descargalas como .md.",
    },
    {
        question: "¿Qué es Markdown?",
        answer: "Una forma de darle formato al texto con símbolos simples: # para títulos, ** para negrita, - para listas. Es fácil de aprender, se lee bien incluso sin formato y lo usan herramientas como GitHub, Notion u Obsidian.",
    },
    {
        question: "¿Puedo pasar mis notas a otra app?",
        answer: "Sí. Cada nota se descarga como un archivo .md común que abre cualquier editor. También podés importar archivos .md que ya tengas.",
    },
    {
        question: "¿Funciona en el celular?",
        answer: "Sí. En pantallas chicas ves la lista o la nota de a una, con un botón para volver. Las notas quedan guardadas en el navegador del celular.",
    },
    {
        question: "¿Cuánto cuesta?",
        answer: "Nada. Mark App es un proyecto personal y gratuito.",
    },
];

function Faq() {
    return (
        <section id="preguntas" className="py-24 scroll-mt-16">
            <div className="grid max-w-6xl gap-12 px-4 mx-auto sm:px-6 lg:grid-cols-[1fr_2fr]">
                <Reveal>
                    <p className="mb-3 text-sm font-semibold tracking-wider uppercase text-accent-text">Preguntas frecuentes</p>
                    <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">Lo que suelen preguntar</h2>
                </Reveal>

                <Reveal>
                    <div className="border-t border-border">
                        {faqs.map(({ question, answer }) => (
                            <details key={question} className="border-b group border-border">
                                <summary className="flex items-center justify-between gap-4 py-5 text-lg font-semibold list-none cursor-pointer [&::-webkit-details-marker]:hidden hover:text-accent-text">
                                    {question}
                                    <ChevronDownIcon className="transition-transform size-5 text-muted group-open:rotate-180" />
                                </summary>
                                <p className="pb-5 pr-8 text-muted">{answer}</p>
                            </details>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export default Faq;
