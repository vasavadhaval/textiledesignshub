import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Store,
  Layers,
  ChevronDown,
  LogOut,
  Sliders,
  DollarSign,
  PackageCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, savedDesignIds, purchases, toggleUserRole, logout, searchQuery, setSearchQuery } = useApp();
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [tempSearch, setTempSearch] = useState(searchQuery);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(tempSearch);
    setSearchModalOpen(false);
    navigate(`/explore?q=${encodeURIComponent(tempSearch)}`);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Announcement Bar */}
      {showAnnouncement && (
        <aside aria-label="Announcement" className="bg-stone-900 text-stone-200 text-xs py-2 px-4 border-b border-stone-800 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 mx-auto sm:mx-0 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                Verified Production Files:
              </span>
              <span className="text-stone-300 truncate">
                All EMB & DST files tested on Tajima & Barudan multi-head looms in Surat and Varanasi.
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-stone-400 shrink-0">
              <Link to="/about" className="hover:text-amber-200 transition-colors">
                Quality Standards
              </Link>
              <span>·</span>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="hover:text-white p-0.5 rounded transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Navigation Bar - Following Top Bar Contract: 3 Zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-slate-900 group whitespace-nowrap shrink-0 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center font-serif text-lg font-bold shadow-sm ring-1 ring-stone-900/10">
              T
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-serif text-stone-900 group-hover:text-amber-900 transition-colors">
                Textile Design Hub
              </span>
              <span className="text-[10px] tracking-wider uppercase text-stone-500 font-medium -mt-1 hidden sm:block">
                Machine Embroidery & Zari
              </span>
            </div>
          </Link>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link
              to="/explore"
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                isActive('/explore') ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              Explore Designs
            </Link>
            <Link
              to="/collections"
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                isActive('/collections') ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              Collections
            </Link>
            <Link
              to="/explore?machine=Multi-head+Embroidery"
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Industrial Machines
            </Link>
            <Link
              to="/about"
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                isActive('/about') ? 'text-amber-950 font-semibold' : ''
              }`}
            >
              How It Works
            </Link>
            {user.role === 'seller' ? (
              <Link
                to="/studio"
                className={`flex items-center gap-1.5 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 text-amber-800 font-semibold ${
                  isActive('/studio') ? 'text-amber-950 font-bold' : ''
                }`}
              >
                <Store className="w-4 h-4 text-amber-700" />
                My Studio
              </Link>
            ) : (
              <button
                onClick={() => {
                  toggleUserRole();
                  navigate('/studio');
                }}
                className="text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
              >
                Sell Designs
              </button>
            )}
          </nav>

          {/* Zone 3: 1 primary action or action cluster */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Quick Search trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-600 bg-stone-100/90 hover:bg-stone-200/80 rounded-lg border border-stone-200/60 transition-colors focus:outline-none"
              title="Search designs or machine types"
            >
              <Search className="w-4 h-4 text-stone-500" />
              <span className="hidden md:inline text-stone-500">Search stitches, borders...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-white rounded border border-stone-300 font-mono text-stone-500">
                /
              </kbd>
            </button>

            {/* Saved Designs Heart */}
            <Link
              to="/account?tab=saved"
              className="relative p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              title="Saved Designs"
            >
              <Heart className="w-5 h-5" />
              {savedDesignIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedDesignIds.length}
                </span>
              )}
            </Link>

            {/* Purchases Bag */}
            <Link
              to="/account/purchases"
              className="relative p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              title="My Purchases & Downloads"
            >
              <ShoppingBag className="w-5 h-5" />
              {purchases.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {purchases.length}
                </span>
              )}
            </Link>

            {/* User Profile / Studio Menu */}
            {user.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-left focus:outline-none"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-stone-300"
                  />
                  <ChevronDown className="w-4 h-4 text-stone-500 hidden sm:block" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs text-stone-500 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-stone-900 truncate">{user.name}</p>
                      <p className="text-xs text-stone-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      {user.role === 'seller' ? (
                        <>
                          <Link
                            to="/studio"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                          >
                            <Store className="w-4 h-4 text-amber-700" />
                            Seller Studio Dashboard
                          </Link>
                          <Link
                            to="/studio/designs"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                          >
                            <Layers className="w-4 h-4 text-stone-500" />
                            My Designs & Uploads
                          </Link>
                          <Link
                            to="/studio/wallet"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                          >
                            <DollarSign className="w-4 h-4 text-emerald-700" />
                            Seller Wallet & Settlements
                          </Link>
                        </>
                      ) : null}

                      <Link
                        to="/account"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                      >
                        <User className="w-4 h-4 text-stone-500" />
                        Buyer Account & Preferences
                      </Link>
                      <Link
                        to="/account/purchases"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                      >
                        <PackageCheck className="w-4 h-4 text-stone-500" />
                        Purchased Machine Files
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                      >
                        <Sliders className="w-4 h-4 text-stone-500" />
                        Settings & Preferences
                      </Link>
                    </div>

                    <div className="pt-1 mt-1 border-t border-stone-100">
                      <button
                        onClick={() => {
                          toggleUserRole();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 text-xs text-amber-900 hover:bg-amber-50 font-medium"
                      >
                        <span>Role Mode:</span>
                        <span className="font-bold underline">{user.role === 'seller' ? 'Seller Studio' : 'Buyer View'}</span>
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-700 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-lg"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-2xl w-full p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="font-serif text-lg font-bold text-stone-900">Search Textile Design Hub</h3>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  autoFocus
                  value={tempSearch}
                  onChange={(e) => setTempSearch(e.target.value)}
                  placeholder="Try 'Zari saree border', 'Tajima lace', 'Chikankari floral'..."
                  className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white"
                />
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Saree Borders', 'Bridal Lehenga Jaal', 'Schiffli Scallop', 'EMB Files', 'DST Multi-head', 'Lucknowi Chikan'].map(
                    (tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                          setSearchModalOpen(false);
                          navigate(`/explore?q=${encodeURIComponent(tag)}`);
                        }}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSearchModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg"
                >
                  Search Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <span className="font-serif text-lg font-bold text-stone-900">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-stone-500 hover:text-stone-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-4 text-base font-medium text-stone-700">
                <Link
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-amber-900 py-1"
                >
                  Explore Designs
                </Link>
                <Link
                  to="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-amber-900 py-1"
                >
                  Design Collections
                </Link>
                <Link
                  to="/studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-amber-900 py-1 text-amber-900 font-semibold"
                >
                  Seller Studio
                </Link>
                <Link
                  to="/account/purchases"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-amber-900 py-1"
                >
                  My Purchased Files
                </Link>
                <Link
                  to="/account?tab=saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-amber-900 py-1"
                >
                  Saved Wishlist ({savedDesignIds.length})
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-amber-900 py-1"
                >
                  How It Works
                </Link>
                <Link
                  to="/help"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-amber-900 py-1"
                >
                  Help & FAQs
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100">
              <button
                onClick={() => {
                  toggleUserRole();
                  setMobileMenuOpen(false);
                }}
                className="w-full mb-3 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl"
              >
                Switch to {user.role === 'seller' ? 'Buyer View' : 'Creator Studio'}
              </button>
              {user.isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full px-4 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-xl"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
