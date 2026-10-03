import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`inline-flex items-center justify-center rounded-lg border transition-colors ${
        isDark
          ? 'border-slate-700 bg-slate-800 text-yellow-300 hover:bg-slate-700'
          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
      } ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="ml-2 hidden sm:inline text-sm font-medium">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
