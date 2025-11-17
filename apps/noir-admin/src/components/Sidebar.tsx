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
import styles from './Sidebar.module.scss';

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
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles['sidebar--open'] : ''}`}
      >
        <div className={styles.sidebarContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <h1 className={styles.logoText}>{content.site.name}</h1>
          </div>

          {/* Menu Items */}
          <nav className={styles.nav}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`${styles.menuItem} ${
                    isActive ? styles['menuItem--active'] : ''
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
