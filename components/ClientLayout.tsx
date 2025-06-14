"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? "bg-primary" : "bg-white"}`}>
      {children}
    </div>
  );
}
