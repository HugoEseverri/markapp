import type { Metadata } from "next";
import NotesApp from "@/components/notes/NotesApp";

export const metadata: Metadata = {
  title: "Notas",
};

export default function AppPage() {
  return <NotesApp />;
}
