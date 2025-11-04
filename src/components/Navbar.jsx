import { ShoppingBag, Settings, Home, Phone } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-fuchsia-500 grid place-content-center text-white font-bold">P</div>
            <div className="leading-tight">
              <p className="text-lg font-bold tracking-tight">POETRACIKAL</p>
              <p className="text-xs text-gray-500 -mt-0.5">Printing & Branding</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"><Home size={16}/>Beranda</a>
            <a href="#products" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"><ShoppingBag size={16}/>Produk</a>
            <a href="#admin" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"><Settings size={16}/>Dashboard</a>
            <a href="tel:+6281234567890" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"><Phone size={16}/>Hubungi</a>
          </nav>

          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890'}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
          >
            Pesan via WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
