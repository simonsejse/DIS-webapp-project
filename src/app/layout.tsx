import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "react-query";
const inter = Inter({ subsets: ["latin"] });
import { Session } from "next-auth";
import Navbar from "@/components/client/Sidebar";
import { ReactQueryClientProvider } from "@/components/client/ReactQueryClientProvider";

export const metadata: Metadata = {
  title: "FinansFokus",
  description: "En app for at holde styr på dine finanser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
