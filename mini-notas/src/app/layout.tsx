import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export const metadata: Metadata = {
  title: {
    default: "Mark App",
    template: "%s · Mark App",
  },
  description: "Escribí y organizá tus notas en Markdown, rápido y desde cualquier dispositivo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // El script aplica el tema guardado antes de pintar, por eso el atributo puede diferir del SSR
    <html lang="es" suppressHydrationWarning>
      <body className={`${prompt.variable} font-sans antialiased`}>
        {/* Al principio del body y no en el head: algunas extensiones inyectan scripts en el head
            y React, al hidratar, confunde el suyo con este. Igual corre antes de pintar el contenido. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
