import { ShoppingBag, Settings, Home, Phone, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const number = (import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890').replace(/^\+/, '');
  const auth = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('auth') || 'null') : null;

  const logout = () => {
    localStorage.removeItem('auth');
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-100 dark:bg-gray-900/70 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-fuchsia-500 grid place-content-center text-white font-bold">P</div>
            <div className="leading-tight">
              <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">POETRACIKAL</p>
              <p className="text-xs text-gray-500 -mt-0.5">Printing & Branding</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"><Home size={16}/>Beranda</a>
            <a href="#products" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"><ShoppingBag size={16}/>Produk</a>
            <a href="#admin" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"><Settings size={16}/>Dashboard</a>
            <a href="#auth" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"><User size={16}/>Akun</a>
            <a href={`tel:+${number}`} className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"><Phone size={16}/>Hubungi</a>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={`https://wa.me/${number}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
            >
              WhatsApp
            </a>
            {auth ? (
              <button onClick={logout} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">Keluar</button>
            ) : (
              <a href="#auth" className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">Masuk</a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
