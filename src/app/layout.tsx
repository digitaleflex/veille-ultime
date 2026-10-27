import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Veille Ultime — L'information tech, sans le bruit",
    template: "%s | Veille Ultime",
  },
  description:
    "Une veille technologique structurée sur la cybersécurité, les vulnérabilités, le développement, le cloud et l'intelligence artificielle.",
  applicationName: "Veille Ultime",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
