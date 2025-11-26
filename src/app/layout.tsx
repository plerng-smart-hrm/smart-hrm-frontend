import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import "./App.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wynnier",
  description: "Wynnier running web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <Providers>
          <div>{children}</div>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
