import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE.name} — услуги сантехника в Витебске`,
  description: SITE.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
