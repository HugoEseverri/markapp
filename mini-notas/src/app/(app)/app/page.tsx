import type { Metadata } from "next";
import NotesEditor from "@/components/notes/NotesEditor";

export const metadata: Metadata = {
  title: "Notas",
};

export default function AppPage() {
  return <NotesEditor />;
}
