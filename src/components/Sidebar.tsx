'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Factory,
  History,
  LogOut,
} from 'lucide-react';

const navItems = [
  {
    section: 'Overview',
    items: [
      { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    section: 'Inventory',
    items: [
      { href: '/products', label: 'Products', icon: Package },
    ],
  },
  {
    section: 'Orders',
    items: [
      { href: '/sales', label: 'Sales Orders', icon: ShoppingCart },
      { href: '/purchases', label: 'Purchase Orders', icon: Truck },
    ],
  },
  {
    section: 'Manufacturing',
    items: [
      { href: '/manufacturing', label: 'Manufacturing (WIP)', icon: Factory },
    ],
  },
  {
    section: 'Reports',
    items: [
      { href: '/history', label: 'Order History', icon: History },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <aside className="sidebar" id="sidebar-nav">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">IV</div>
        <div>
          <div className="sidebar-brand-text">InventoryPro</div>
          <div className="sidebar-brand-sub">Management System</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((section) => (
          <div key={section.section}>
            <div className="sidebar-section-label">{section.section}</div>
            {section.items.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  id={`nav-${item.href.replace('/', '') || 'dashboard'}`}
                >
                  <item.icon />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Logout button at bottom */}
      <div className="sidebar-footer">
        <button className="sidebar-link sidebar-logout" onClick={handleLogout} id="btn-logout">
          <LogOut />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
