"use client";

import { useTheme } from "@/contexts/ThemeContext";
import React, { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div onClick={toggleTheme} className="cursor-pointer z-50">
      {isDarkMode ? (
        <IoSunny className="sun_icon" />
      ) : (
        <IoMdMoon className="moon_icon"/>
      )}
    </div>
  );
};

export default ThemeToggle;
