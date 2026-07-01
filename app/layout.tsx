import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/siteConfig";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://renouncreation.com"),
  title: {
    default: `${siteConfig.name} · ${siteConfig.role} | ${siteConfig.brand}`,
    template: `%s · ${siteConfig.brand}`,
  },
  description: siteConfig.intro,
  keywords: [
    "photographer",
    "cinematographer",
    "director of photography",
    "portrait photography",
    "Renoun Creation",
    "Vanna Noun",
  ],
  openGraph: {
    title: `${siteConfig.name} · ${siteConfig.role}`,
    description: siteConfig.intro,
    siteName: siteConfig.brand,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
