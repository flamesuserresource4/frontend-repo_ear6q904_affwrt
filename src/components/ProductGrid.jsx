import { useEffect, useState } from 'react';
import { BadgeCheck, ShoppingCart } from 'lucide-react';

function formatPrice(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const number = (import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890').replace(/^\+/, '');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError('Gagal memuat produk');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleOrder = (product) => {
    const text = `Halo POETRACIKAL, saya ingin pesan: ${product.name} (${product.unit || ''}) - ${formatPrice(product.price)}.`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="products" className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Produk Unggulan</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Klik produk untuk langsung memesan via WhatsApp.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-emerald-600">
            <BadgeCheck size={18}/>
            <span className="text-sm">Garansi kepuasan</span>
          </div>
        </div>

        {loading && <p className="text-gray-600 dark:text-gray-400">Memuat produk...</p>}
        {error && <p className="text-rose-600">{error}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => handleOrder(p)}
              className="group text-left bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg transition-all overflow-hidden"
            >
              <div className={`h-36 bg-gradient-to-br ${p.image ? '' : 'from-indigo-500 to-fuchsia-500'}`}>
                {p.image && (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                {p.unit && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{p.unit}</p>}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">{formatPrice(p.price)}</span>
                  <span className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                    <ShoppingCart size={16}/> Pesan
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
