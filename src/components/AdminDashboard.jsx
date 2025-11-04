import { useEffect, useState } from 'react';
import { Plus, Users, Package, Save, Trash2, Shield } from 'lucide-react';

function currency(n){
  return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n||0);
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('products');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: '', name: '', price: '', unit: '' });
  const [message, setMessage] = useState('');

  const auth = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('auth') || 'null') : null;
  const isAdmin = auth?.user?.role === 'admin';
  const base = import.meta.env.VITE_BACKEND_URL || '';

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${base}/products`);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      setMessage('Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const addOrUpdate = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    try {
      if (form.id) {
        const res = await fetch(`${base}/products/${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, price: Number(form.price), unit: form.unit })
        });
        if (!res.ok) throw new Error('Gagal update');
      } else {
        const res = await fetch(`${base}/products?token=${encodeURIComponent(auth?.token||'')}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, price: Number(form.price), unit: form.unit })
        });
        if (!res.ok) throw new Error('Gagal tambah');
      }
      setForm({ id:'', name:'', price:'', unit:'' });
      await loadProducts();
      setMessage('Tersimpan');
    } catch (e) {
      setMessage(e.message);
    }
  };

  const editItem = (i) => setForm({ id: i.id, name: i.name, price: i.price, unit: i.unit||'' });

  const removeItem = async (id) => {
    if (!isAdmin) return;
    if (!confirm('Hapus produk ini?')) return;
    const res = await fetch(`${base}/products/${id}?token=${encodeURIComponent(auth?.token||'')}`, { method: 'DELETE' });
    if (res.ok) {
      await loadProducts();
    } else {
      setMessage('Gagal menghapus');
    }
  };

  return (
    <section id="admin" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Dashboard Admin</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Kelola produk dan akun pengguna secara dinamis.</p>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-lg text-sm">
            <Package size={16}/> Live
          </div>
        </div>

        {!isAdmin && (
          <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200 flex items-center gap-2">
            <Shield size={18}/> Hanya admin yang dapat menambah/mengubah produk. Silakan masuk sebagai admin.
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex border-b border-gray-100 dark:border-gray-800">
            <button onClick={() => setTab('products')} className={`px-5 py-3 text-sm font-medium ${tab==='products' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}>Produk</button>
            <button onClick={() => setTab('users')} className={`px-5 py-3 text-sm font-medium ${tab==='users' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}>Pengguna</button>
          </div>

          {tab === 'products' && (
            <div className="p-6 grid lg:grid-cols-3 gap-6">
              <form onSubmit={addOrUpdate} className="lg:col-span-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white mb-3">Tambah / Edit Produk</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Nama Produk</label>
                    <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Contoh: Banner X-Banner" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Harga</label>
                      <input type="number" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="95000" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Satuan</label>
                      <input value={form.unit} onChange={(e)=>setForm({...form, unit:e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="60x160cm" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button disabled={!isAdmin} className="inline-flex items-center gap-2 bg-gray-900 disabled:opacity-50 text-white px-4 py-2 rounded-lg hover:bg-gray-800"><Save size={16}/> Simpan</button>
                    <button type="button" onClick={()=>setForm({ id:'', name:'', price:'', unit:'' })} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Reset</button>
                  </div>
                  {message && <p className="text-xs text-gray-500">{message}</p>}
                </div>
              </form>

              <div className="lg:col-span-2">
                {loading ? (
                  <p className="text-gray-600 dark:text-gray-400">Memuat...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-800/60">
                        <tr className="text-left text-gray-500 dark:text-gray-400">
                          <th className="px-4 py-3">Nama</th>
                          <th className="px-4 py-3">Harga</th>
                          <th className="px-4 py-3">Satuan</th>
                          <th className="px-4 py-3 w-40">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((i)=> (
                          <tr key={i.id} className="border-t border-gray-100 dark:border-gray-800">
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{i.name}</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{currency(i.price)}</td>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{i.unit || '-'}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button onClick={()=>editItem(i)} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Edit</button>
                                <button disabled={!isAdmin} onClick={()=>removeItem(i.id)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 disabled:opacity-50"><Trash2 size={16}/> Hapus</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'users' && (
            <div className="p-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                <p className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><Users size={18}/> Info Pengguna Aktif</p>
                {auth ? (
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <p>Nama: <span className="font-medium text-gray-900 dark:text-gray-100">{auth.user.name}</span></p>
                    <p>Email: {auth.user.email}</p>
                    <p>Peran: <span className="uppercase text-xs px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">{auth.user.role}</span></p>
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">Belum masuk. Silakan gunakan form pada bagian Akun.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
