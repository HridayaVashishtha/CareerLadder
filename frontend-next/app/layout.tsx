import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Career Predictor - Placement Risk & Salary Assessment",
  description: "AI-powered placement risk and career predictor for students. Predict placement probabilities, salary expectations, and risk assessments.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#030712" />
      </head>
      <body className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 antialiased">{children}</body>
    </html>
  );
}

