import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SITE_NAME, TAGLINE } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} · ${TAGLINE}`,
  description:
    "Halaal handcrafted frozen savouries, made to order. Kenilworth collect. Order on WhatsApp 065 663 2215.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={geist.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
