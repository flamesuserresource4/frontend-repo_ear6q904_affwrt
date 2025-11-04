import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark' || (
      !localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white/70 backdrop-blur hover:bg-gray-50 text-gray-700 dark:text-gray-200 dark:bg-gray-800/60 dark:border-gray-700 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="text-sm hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
