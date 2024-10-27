"use client";
import Image from "next/image";
import headerLogo from "../../../../public/img/header-logo.svg";
import { IoMoon } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { useState, useEffect } from "react";

const toggleTheme = (
  theme: "dark" | "light",
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>
) => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  document.documentElement.classList.remove(theme);
  document.documentElement.classList.add(newTheme);
  localStorage.setItem("theme", newTheme);
};

const getTheme = (
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>
) => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme as "light" | "dark");
    document.documentElement.classList.add(savedTheme);
  }
};

const MainHeader = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    getTheme(setTheme);
  }, []);

  return (
    <div className="bg-[#373B53] flex dark:bg-[#1E2139] items-center justify-between pr-5">
      <Image src={headerLogo} alt="Logo" />
      <div
        onClick={() => toggleTheme(theme, setTheme)}
        className="cursor-pointer"
      >
        <IoMoon size={25} color="#7E88C3" className="dark:hidden" />
        <GoDotFill size={35} color="#858BB2" className="hidden dark:block" />
      </div>
    </div>
  );
};

export default MainHeader;
