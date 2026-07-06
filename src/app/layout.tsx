import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SYNAPSE AI | Premium Medical Education Platform",
  description: "Crack NEET PG & INI-CET with AI-powered mock tests, viva simulators, custom Q-Banks and smart lectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0A0A0A] text-[#EDEDED] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
