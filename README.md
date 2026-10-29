# Mark App

Editor de notas en **Markdown** con vista previa en vivo, búsqueda instantánea y tags. Se usa sin registrarse: abrís la app y empezás a escribir, y todo se guarda solo en el navegador.

## Funciones

- **Editor con vista previa en vivo**: tres modos (Editar, Dividido y Vista previa), con resaltado de sintaxis y continuación automática de listas.
- **Barra de formato y atajos**: negrita, cursiva, tachado, títulos, citas, listas, checklists, código y links. `Ctrl+B`, `Ctrl+I`, `Ctrl+E` y `Ctrl+Shift+X`.
- **Markdown con extensiones de GitHub**: tablas, checklists, tachado y bloques de código con colores.
- **Autoguardado**: cada cambio se guarda mientras escribís, con indicador de estado.
- **Búsqueda instantánea**: paleta de comandos con `Ctrl+K` que busca en títulos y contenido, sin importar tildes ni mayúsculas.
- **Tags automáticos**: escribir `#algo` en una nota lo convierte en un filtro de la barra lateral.
- **Notas fijadas y papelera**: lo importante queda arriba y lo borrado se puede restaurar.
- **Importar y exportar `.md`**: las notas se descargan como archivos Markdown comunes y se pueden importar archivos existentes.
- **Tema claro y oscuro**: sigue al sistema o se elige a mano, y se recuerda.
- **Responsive**: en celulares se ve la lista o la nota de a una.

## Tecnologías

- **[Next.js 15](https://nextjs.org)** (App Router) y **React 19**, con **TypeScript**.
- **[Tailwind CSS 4](https://tailwindcss.com)**, con design tokens para el tema claro y oscuro.
- **[CodeMirror 6](https://codemirror.net)** como editor.
- **[react-markdown](https://github.com/remarkjs/react-markdown)** con `remark-gfm` y `rehype-highlight` para renderizar.
- **[Framer Motion](https://motion.dev)** para las animaciones.

## Cómo correrlo

Necesitás Node.js 20 o superior.

```bash
cd mini-notas
npm install
npm run dev
```

Después abrí [http://localhost:3000](http://localhost:3000). La app de notas está en `/app`.

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build de producción |
| `npm run lint` | Revisa el código con ESLint |

## Estructura

```
mini-notas/src
├── app
│   ├── (marketing)     # Landing: navbar, secciones y footer
│   └── (app)/app       # La app de notas, a pantalla completa
├── components
│   ├── landing         # Secciones de la landing
│   ├── notes           # Barra lateral, editor, vista previa, paleta de comandos
│   └── ui              # Botones, inputs, íconos y otros componentes base
└── lib
    ├── editor          # Comandos de formato para CodeMirror
    └── notes           # Modelo de datos, almacenamiento, búsqueda e import/export
```

El almacenamiento está detrás de la interfaz `NotesRepository` (`lib/notes/types.ts`). Hoy la implementa `localStorage`, y para pasar a un backend alcanza con escribir otra implementación, sin tocar los componentes.

## Dónde se guardan las notas

En el `localStorage` del navegador, en el dispositivo donde las escribiste. No se envían a ningún servidor. Si borrás los datos del navegador, las notas se pierden: para llevarlas a otro lado, exportalas como `.md`.

## Próximos pasos

- Cuentas de usuario y sincronización entre dispositivos.
- Compartir notas con un link público de solo lectura.
- Funcionar offline como PWA.

## Autor

**Hugo Omar Eseverri**: [Portfolio](https://portfoliohugoeseverri.netlify.app/) · [GitHub](https://github.com/HugoEseverri/) · [LinkedIn](https://www.linkedin.com/in/hugo-omar-eseverri/)
