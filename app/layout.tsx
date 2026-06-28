import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

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
    <html lang="ru" className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}
