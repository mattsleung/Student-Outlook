"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("student-outlook-theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme} type="button">
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
      Switch to {theme === "dark" ? "light" : "dark"} mode
    </button>
  );
}
