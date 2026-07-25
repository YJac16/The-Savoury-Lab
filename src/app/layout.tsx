import type { Metadata } from "next";
import { Fraunces, Great_Vibes, Manrope } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { storeConfig } from "@/lib/store";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${storeConfig.name} | Frozen Handcrafted Savouries`,
    template: `%s | ${storeConfig.name}`,
  },
  description:
    "Handcrafted frozen samoosas, pies, spring rolls and more from Kenilworth. Halaal. Made to order.",
  openGraph: {
    title: storeConfig.name,
    description: storeConfig.tagline,
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-ZA"
      className={`${display.variable} ${script.variable} ${body.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <CartProvider>
          <div className="site-shell">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
