import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AdminDashboard from './components/AdminDashboard';

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Divider />
        <ProductGrid />
        <Divider />
        <AdminDashboard />
      </main>
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} POETRACIKAL — Jasa Percetakan & Branding. Semua hak dilindungi.
      </footer>
    </div>
  );
}
