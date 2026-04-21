import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerLadder - Placement Risk & Salary Assessment",
  description: "AI-powered placement risk assessment and career insights for students. Predict placement probabilities, salary expectations, and risk assessments.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#030712" />
      </head>
      <body className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 antialiased" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

