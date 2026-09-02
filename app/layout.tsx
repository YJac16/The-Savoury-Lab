import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, TAGLINE, WHATSAPP_DISPLAY } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const description =
  "Halaal handcrafted frozen savouries, made to order. Kenilworth collect at 52 Goldbourne Road. Order on WhatsApp " +
  WHATSAPP_DISPLAY +
  ".";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} · ${TAGLINE}`,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${TAGLINE}`,
    description,
    images: [
      {
        url: "/images/catalogue/samoosas.jpg",
        width: 1024,
        height: 1024,
        alt: "Handcrafted frozen samoosas from The Savoury Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${TAGLINE}`,
    description,
    images: ["/images/catalogue/samoosas.jpg"],
  },
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
    <html lang="en-ZA" className={`${inter.variable} ${playfair.variable}`}>
      <body className="mobile-sticky-offset font-sans antialiased md:pb-0">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
