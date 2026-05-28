import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dana`|`Vitan | Бутикови дрехи и стилизирани носии",
  description:
    "Бутикови дрехи, стилизирани носии и аксесоари с ръчна изработка и персонална консултация.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[color:var(--background)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
