import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-sm font-medium bg-white/70 dark:bg-gray-900/60 backdrop-blur hover:bg-white dark:hover:bg-gray-900 transition"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="relative inline-block h-4 w-7 rounded-full bg-gray-300 dark:bg-gray-700">
        <span className={`absolute top-0.5 ${dark ? 'right-0.5' : 'left-0.5'} h-3 w-3 rounded-full bg-white dark:bg-gray-200 shadow transition-all`}></span>
      </span>
      <span className="text-gray-700 dark:text-gray-200">{dark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
