// La app ocupa toda la pantalla: la navegación vive en la barra lateral
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-dvh overflow-hidden">{children}</div>;
}
