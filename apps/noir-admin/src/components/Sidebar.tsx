import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  DollarSign,
  Users,
  Settings,
  Languages,
  FileText,
  Palette,
  Layout,
  Sparkles,
} from 'lucide-react';
import { content } from '../lib/content';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { path: '/', label: content.nav.dashboard, icon: LayoutDashboard },
  { path: '/products', label: content.nav.products, icon: Package },
  { path: '/orders', label: content.nav.orders, icon: ShoppingBag },
  { path: '/finance', label: content.nav.finance, icon: DollarSign },
  { path: '/customers', label: content.nav.customers, icon: Users },
  { path: '/translations', label: 'Translations', icon: Languages },
  { path: '/content', label: 'Content Editor', icon: FileText },
  { path: '/styles', label: 'Styles Editor', icon: Palette },
  { path: '/templates', label: 'Templates', icon: Layout },
  { path: '/components', label: 'Component Generator', icon: Sparkles },
  { path: '/settings', label: content.nav.settings, icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:fixed inset-y-0 left-0 z-50 w-64 bg-noir-black text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full lg:h-screen">
          {/* Logo */}
          <div className="p-6 border-b border-noir-gray-800">
            <h1 className="text-2xl font-serif font-bold text-noir-gold">
              {content.site.name}
            </h1>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-noir-gold text-noir-black font-semibold'
                      : 'text-noir-gray-300 hover:bg-noir-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-sans">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
