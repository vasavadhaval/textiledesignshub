import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Layers, Store, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { user } = useApp();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-3 py-2 flex items-center justify-around text-[10px] font-medium"
      style={{ maxHeight: '60px' }}
    >
      <Link
        to="/"
        className={`flex flex-col items-center gap-1 py-1 transition-colors ${
          isActive('/') && location.pathname === '/' ? 'text-amber-900 font-bold' : 'text-stone-500'
        }`}
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>

      <Link
        to="/explore"
        className={`flex flex-col items-center gap-1 py-1 transition-colors ${
          isActive('/explore') ? 'text-amber-900 font-bold' : 'text-stone-500'
        }`}
      >
        <Compass className="w-4 h-4" />
        <span>Explore</span>
      </Link>

      <Link
        to="/collections"
        className={`flex flex-col items-center gap-1 py-1 transition-colors ${
          isActive('/collections') ? 'text-amber-900 font-bold' : 'text-stone-500'
        }`}
      >
        <Layers className="w-4 h-4" />
        <span>Suites</span>
      </Link>

      <Link
        to="/studio"
        className={`flex flex-col items-center gap-1 py-1 transition-colors ${
          isActive('/studio') ? 'text-amber-900 font-bold' : 'text-stone-500'
        }`}
      >
        <Store className="w-4 h-4" />
        <span>Studio</span>
      </Link>

      <Link
        to="/account"
        className={`flex flex-col items-center gap-1 py-1 transition-colors ${
          isActive('/account') ? 'text-amber-900 font-bold' : 'text-stone-500'
        }`}
      >
        <User className="w-4 h-4" />
        <span>Account</span>
      </Link>
    </nav>
  );
};
