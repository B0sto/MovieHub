"use client";
import Logo from "@/public/Logo";
import Image from "next/image";
import MovieList from "@/components/MovieList";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import FormModal from "./FormModal";
import BugReportForm from "@/components/BugReportForm"

const MainPage = () => {
  const { isDarkMode } = useTheme();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (isDarkMode !== undefined) {
      document.documentElement.classList.add(isDarkMode ? "dark" : "light");
      document.documentElement.classList.remove(isDarkMode ? "light" : "dark");
    }
  }, [isDarkMode]);

  return (
    <main className={` ${isDarkMode ? "bg-primary" : "bg-white"}`}>
      <Logo />

      <ThemeToggle />

      <div className="wrapper">
        <header className="relative">
          <Image src="/heroimg.png" alt="heroimg" width={500} height={500} />

          <h1 className={`${isDarkMode ? "text-white" : "text-black"}`}>
            Find{" "}
            <span
              className={`${
                isDarkMode ? "text-gradient-dark" : "text-gradient-light"
              }`}
            >
              Movies
            </span>{" "}
            You'll enjoy Without the Hassle
          </h1>
        </header>

        <MovieList />
        {openModal && <BugReportForm onClose={() => setOpenModal(false)}/>}
        {!openModal && <FormModal onClick={() => setOpenModal(true)} />}
      </div>
    </main>
  );
};

export default MainPage;
