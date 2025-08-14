import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Useful Sites",
  description: "A collection of useful sites",
  openGraph: {
    title: "Useful Sites",
    description: "A collection of useful sites",
    images: ["https://sites.jukelyn.com/embed_photo"],
    url: "https://sites.jukelyn.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Useful Sites",
    description: "A collection of useful sites",
    images: ["https://sites.jukelyn.com/embed_photo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
