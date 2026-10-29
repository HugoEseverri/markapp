import type { NoteDraft } from "./types";

export const welcomeNote: NoteDraft = {
    title: "Te damos la bienvenida a Mark App",
    content: `Esta nota es una guía rápida. Editala, borrala o usala de referencia. #guia

## Formato básico

Escribí **negrita**, _cursiva_, ~~tachado~~ y \`código\`. También podés usar la barra de herramientas o los atajos **Ctrl+B**, **Ctrl+I** y **Ctrl+E**.

> Las citas se escriben empezando la línea con >.

## Listas y tareas

- Una lista común
- Con varios ítems

Y una lista de tareas:

- [x] Crear mi primera nota
- [ ] Probar la vista dividida
- [ ] Buscar una nota con **Ctrl+K**

## Tablas

| Atajo | Acción |
| --- | --- |
| Ctrl+K | Buscar notas |
| Alt+N | Nueva nota |
| Ctrl+B | Negrita |

## Código

\`\`\`js
function saludar(nombre) {
  return \`Hola, \${nombre}!\`;
}
\`\`\`

## Tags

Escribí \`#algo\` (sin el espacio después del numeral) en cualquier parte de una nota y aparece como filtro en la barra lateral.

Todo se guarda solo, en este navegador.`,
};
