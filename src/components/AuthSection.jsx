import { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';

export default function AuthSection(){
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const base = import.meta.env.VITE_BACKEND_URL || '';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg('');
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${base}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: form.get('email'), password: form.get('password') })});
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Gagal login');
      localStorage.setItem('auth', JSON.stringify(data));
      setMsg('Berhasil masuk');
      window.location.hash = '#admin';
      window.location.reload();
    } catch (e) {
      setMsg(e.message);
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg('');
    const form = new FormData(e.currentTarget);
    try {
      const payload = { name: form.get('name'), email: form.get('email'), password: form.get('password') };
      const res = await fetch(`${base}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Gagal daftar');
      localStorage.setItem('auth', JSON.stringify(data));
      setMsg('Pendaftaran berhasil');
      window.location.hash = '#admin';
      window.location.reload();
    } catch (e) {
      setMsg(e.message);
    } finally { setLoading(false); }
  };

  return (
    <section id="auth" className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex">
            <button onClick={()=>setTab('login')} className={`flex-1 py-3 text-sm font-medium ${tab==='login' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}>Masuk</button>
            <button onClick={()=>setTab('register')} className={`flex-1 py-3 text-sm font-medium ${tab==='register' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}>Daftar</button>
          </div>

          <div className="p-6">
            {tab==='login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
                    <Mail size={16} className="text-gray-400"/>
                    <input name="email" type="email" required className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Kata Sandi</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
                    <Lock size={16} className="text-gray-400"/>
                    <input name="password" type="password" required className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100" placeholder="••••••••" />
                  </div>
                </div>
                <button disabled={loading} className="w-full bg-gray-900 disabled:opacity-50 text-white px-4 py-2 rounded-lg hover:bg-gray-800">{loading? 'Memproses...' : 'Masuk'}</button>
              </form>
            )}

            {tab==='register' && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Nama</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
                    <User size={16} className="text-gray-400"/>
                    <input name="name" required className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100" placeholder="Nama lengkap" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
                    <Mail size={16} className="text-gray-400"/>
                    <input name="email" type="email" required className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Kata Sandi</label>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
                    <Lock size={16} className="text-gray-400"/>
                    <input name="password" type="password" required className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100" placeholder="Minimal 6 karakter" />
                  </div>
                </div>
                <button disabled={loading} className="w-full bg-gray-900 disabled:opacity-50 text-white px-4 py-2 rounded-lg hover:bg-gray-800">{loading? 'Memproses...' : 'Daftar'}</button>
              </form>
            )}

            {msg && <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">{msg}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
