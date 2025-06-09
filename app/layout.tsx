import type { Metadata } from "next";
import "./globals.css";
import { MovieProvider } from "@/contexts/MovieContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
        <MovieProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </MovieProvider>
      </body>
    </html>
  );
}
