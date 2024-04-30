import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import Navbar from "@/components/client/Navbar";

export const metadata: Metadata = {
  title: "FinansFokus",
  description: "En app for at holde styr på dine finanser",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
