import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AdminDashboard from './components/AdminDashboard';
import AuthSection from './components/AuthSection';

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Divider />
        <ProductGrid />
        <Divider />
        <AuthSection />
        <Divider />
        <AdminDashboard />
      </main>
      <footer className="border-t border-gray-100 dark:border-gray-800 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} POETRACIKAL — Jasa Percetakan & Branding. Semua hak dilindungi.
      </footer>
    </div>
  );
}
