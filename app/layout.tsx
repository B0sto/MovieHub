import type { Metadata } from "next";
import "./globals.css";
import { MovieProvider } from "@/contexts/MovieContext";

export const metadata: Metadata = {
  title: "MovieHub",
  description: "Discover, Track, and Obsess",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MovieProvider>{children}</MovieProvider>
      </body>
    </html>
  );
}
