import type { Metadata } from "next";
import "./globals.css";
import { MovieProvider } from "@/contexts/MovieContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ClientLayout from "@/components/ClientLayout";

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
          <ThemeProvider>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </MovieProvider>
      </body>
    </html>
  );
}
