
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from './dictionaries';
import Footer from "@/components/Footer"
import Header from "@/components/Header"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body>
      <Header></Header>
      <main>
          {children}
      </main>
      <Footer></Footer>
      </body>
    </html>
  );
}
