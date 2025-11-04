import { BadgeCheck, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 'card',
    name: 'Kartu Nama Premium',
    price: 35000,
    unit: '100 pcs',
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'sticker',
    name: 'Stiker Vinyl',
    price: 45000,
    unit: 'A3+',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'banner',
    name: 'Banner X-Banner',
    price: 95000,
    unit: '60x160cm',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'merch',
    name: 'Merchandise Kaos Sablon',
    price: 89000,
    unit: 'per pcs',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'brosur',
    name: 'Brosur Full Color',
    price: 75000,
    unit: 'A4 150gsm',
    color: 'from-fuchsia-500 to-purple-500',
  },
  {
    id: 'kemasan',
    name: 'Kemasan Custom',
    price: 120000,
    unit: 'start from',
    color: 'from-cyan-500 to-sky-500',
  },
];

function formatPrice(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

export default function ProductGrid() {
  const number = (import.meta.env.VITE_WHATSAPP_NUMBER || '6281234567890').replace(/^\+/, '');

  const handleOrder = (product) => {
    const text = `Halo POETRACIKAL, saya ingin pesan: ${product.name} (${product.unit}) - ${formatPrice(product.price)}.`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">Produk Unggulan</h2>
            <p className="text-gray-600 mt-1">Klik produk untuk langsung memesan via WhatsApp.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-emerald-600">
            <BadgeCheck size={18}/>
            <span className="text-sm">Garansi kepuasan</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => handleOrder(p)}
              className="group text-left bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all overflow-hidden"
            >
              <div className={`h-36 bg-gradient-to-br ${p.color}`} />
              <div className="p-5">
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{p.unit}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-indigo-600 font-bold">{formatPrice(p.price)}</span>
                  <span className="inline-flex items-center gap-2 text-sm text-gray-700 group-hover:text-gray-900">
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
