import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QuoteCartProvider } from "@/lib/quote-cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindcraft Creatives | Creative Agency Suriname",
  description:
    "Mindcraft Creatives - Uw creatieve partner in Paramaribo, Suriname. Grafisch ontwerp, drukwerk, stickers, signage en meer.",
  keywords: [
    "grafisch ontwerp",
    "drukwerk",
    "stickers",
    "signage",
    "Suriname",
    "Paramaribo",
    "branding",
    "creative agency",
  ],
  icons: {
    icon: "/favicon.jpeg",
    shortcut: "/favicon.jpeg",
    apple: "/favicon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QuoteCartProvider>
          {children}
        </QuoteCartProvider>
      </body>
    </html>
  );
}
