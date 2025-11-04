import { Rocket, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-xs font-medium mb-5">
            <Star size={14}/> Cetak cepat, hasil profesional
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Solusi Percetakan Modern untuk Bisnis dan Personal
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            POETRACIKAL menyediakan layanan percetakan lengkap: kartu nama, brosur, stiker, banner, merchandise, kemasan, dan banyak lagi. Pesan mudah, langsung terhubung ke WhatsApp kami.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Rocket size={18}/> Lihat Produk
            </a>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890'}?text=${encodeURIComponent('Halo POETRACIKAL, saya ingin konsultasi kebutuhan cetak.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Chat WhatsApp
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
              <dt className="text-xs text-gray-500 dark:text-gray-400">Produk</dt>
              <dd className="text-xl font-bold text-gray-900 dark:text-white">100+</dd>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
              <dt className="text-xs text-gray-500 dark:text-gray-400">Rating</dt>
              <dd className="text-xl font-bold text-gray-900 dark:text-white">4.9/5</dd>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
              <dt className="text-xs text-gray-500 dark:text-gray-400">Waktu Proses</dt>
              <dd className="text-xl font-bold text-gray-900 dark:text-white">Cepat</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-2xl" />
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg rounded-xl p-4 w-56">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Kualitas Warna Tajam</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Dukungan warna CMYK & Pantone</p>
          </div>
          <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg rounded-xl p-4 w-56">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Finishing Lengkap</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Laminasi, UV, emboss, jilid</p>
          </div>
        </div>
      </div>
    </section>
  );
}
