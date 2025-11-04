import { useState } from 'react';
import { Plus, Users, Package, Save, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [tab, setTab] = useState('products');
  const [items, setItems] = useState([
    { id: 'card', name: 'Kartu Nama Premium', price: 35000, unit: '100 pcs' },
    { id: 'sticker', name: 'Stiker Vinyl', price: 45000, unit: 'A3+' },
  ]);
  const [form, setForm] = useState({ id: '', name: '', price: '', unit: '' });

  const addOrUpdate = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    setItems((prev) => {
      const exists = prev.find((i) => i.id === form.id);
      if (exists) {
        return prev.map((i) => (i.id === form.id ? { ...i, ...form, price: Number(form.price) } : i));
      }
      return [...prev, { ...form, id: form.id || crypto.randomUUID(), price: Number(form.price) }];
    });
    setForm({ id: '', name: '', price: '', unit: '' });
  };

  const editItem = (i) => setForm({ id: i.id, name: i.name, price: i.price, unit: i.unit });
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <section id="admin" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">Dashboard Admin</h2>
            <p className="text-gray-600 mt-1">Kelola produk dan akun pengguna secara sederhana. (UI demo)</p>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm">
            <Package size={16}/> Mode: Demo UI
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="flex border-b border-gray-100">
            <button onClick={() => setTab('products')} className={`px-5 py-3 text-sm font-medium ${tab==='products' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}>Produk</button>
            <button onClick={() => setTab('users')} className={`px-5 py-3 text-sm font-medium ${tab==='users' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}>Pengguna</button>
          </div>

          {tab === 'products' && (
            <div className="p-6 grid lg:grid-cols-3 gap-6">
              <form onSubmit={addOrUpdate} className="lg:col-span-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-semibold text-gray-900 mb-3">Tambah / Edit Produk</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Nama Produk</label>
                    <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Contoh: Banner X-Banner" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Harga</label>
                      <input type="number" value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="95000" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Satuan</label>
                      <input value={form.unit} onChange={(e)=>setForm({...form, unit:e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="60x160cm" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"><Save size={16}/> Simpan</button>
                    <button type="button" onClick={()=>setForm({ id:'', name:'', price:'', unit:'' })} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Reset</button>
                  </div>
                </div>
              </form>

              <div className="lg:col-span-2">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-gray-500">
                        <th className="px-4 py-3">Nama</th>
                        <th className="px-4 py-3">Harga</th>
                        <th className="px-4 py-3">Satuan</th>
                        <th className="px-4 py-3 w-40">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((i)=> (
                        <tr key={i.id} className="border-t border-gray-100">
                          <td className="px-4 py-3 font-medium text-gray-900">{i.name}</td>
                          <td className="px-4 py-3 text-gray-700">{new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(i.price)}</td>
                          <td className="px-4 py-3 text-gray-700">{i.unit}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button onClick={()=>editItem(i)} className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Edit</button>
                              <button onClick={()=>removeItem(i.id)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100"><Trash2 size={16}/> Hapus</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === 'users' && (
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Users size={18}/> Akun Pengguna</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="text-gray-800">admin@poetracikal.id</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Admin</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-gray-800">cs@poetracikal.id</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">CS</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Plus size={18}/> Tambah Pengguna</p>
                  <div className="grid grid-cols-2 gap-3">
                    <input className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Nama" />
                    <input className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email" />
                    <select className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Admin</option>
                      <option>Customer Service</option>
                    </select>
                    <button className="col-span-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">Simpan</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
