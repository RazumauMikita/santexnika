import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE } from "@/lib/constants";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoCondensedBold = Roboto_Condensed({
  subsets: ["latin", "cyrillic"],
  weight: "700",
  variable: "--font-roboto-condensed-bold",
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
    <html lang="ru" className={`${roboto.variable} ${robotoCondensedBold.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
