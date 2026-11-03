'use client';

import Image from 'next/image';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <nav className="fixed w-full top-0 left-0 z-50 border-b border-violet-200/80 dark:border-violet-900/70 bg-white/85 dark:bg-[#1b1229]/90 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl shadow-md shadow-violet-300/40 dark:shadow-violet-950/40">
            <Image src="/rara-ai-icon.svg" alt="" width={42} height={42} priority />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none text-violet-950 dark:text-white">
              Rara AI Asisten
            </h1>
            <p className="text-xs text-violet-600 dark:text-violet-300">
              Teman ngobrol yang selalu siap
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="px-3 py-1.5 rounded-lg border border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/70 transition-colors text-violet-800 dark:text-violet-200 flex items-center justify-center"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} sm:mr-1.5`} />
            <span className="hidden sm:inline text-xs font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button
            className="px-3 py-1.5 rounded-lg border border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/70 transition-colors text-violet-800 dark:text-violet-200 flex items-center justify-center"
            title="API Status"
          >
            <i className="fas fa-circle text-green-500 sm:mr-1.5" style={{ fontSize: '0.65rem' }}></i>
            <span className="hidden sm:inline text-xs font-medium">Live</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
