import type { Metadata } from "next";
import "./globals.css";
import { MovieProvider } from "@/contexts/MovieContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ClientLayout from "@/components/ClientLayout";
import { dmSans } from '@/fonts/fonts'

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
      <body className={dmSans.className}>
        <MovieProvider>
          <ThemeProvider>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </MovieProvider>
      </body>
    </html>
  );
}
