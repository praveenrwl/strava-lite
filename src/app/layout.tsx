import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserMenu from "@/components/UserMenu"; // 👈 add this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strava Lite",
  description: "Activity tracker with Supabase + Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 👇 Header */}
        <header className="p-4 flex justify-between items-center border-b">
          <h1 className="text-xl font-bold">Strava Lite</h1>
          <UserMenu />
        </header>

        {/* 👇 Page content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
