import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Search,
  CheckCircle2,
  FileCheck,
  ExternalLink,
  PackageOpen,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EmptyState } from '../components/common/EmptyState';

export const PurchasesPage: React.FC = () => {
  const { purchases, showToast } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'design' | 'collection'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPurchases = purchases.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = item.itemTitle.toLowerCase().includes(q);
      const matchOrder = item.orderNumber.toLowerCase().includes(q);
      const matchSeller = item.sellerName.toLowerCase().includes(q);
      if (!matchTitle && !matchOrder && !matchSeller) return false;
    }
    return true;
  });

  const handleDownload = (filename: string) => {
    showToast('Download Started', `Downloading verified production package: ${filename}`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                <span>Licensed Archives</span>
                <span aria-hidden="true">·</span>
                <span>Commercial Usage Allowed</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Purchased Machine Files & Invoices
              </h1>
            </div>

            <Link
              to="/explore"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors self-start sm:self-auto"
            >
              Browse More Designs
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Segmented Filter */}
          <div className="flex bg-stone-100 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterType === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Purchases ({purchases.length})
            </button>
            <button
              onClick={() => setFilterType('design')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterType === 'design'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Single Designs
            </button>
            <button
              onClick={() => setFilterType('collection')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterType === 'collection'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Full Collections
            </button>
          </div>

          {/* Search Field */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by order ID or title..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
            />
          </div>
        </div>

        {/* Purchases List */}
        {filteredPurchases.length === 0 ? (
          <EmptyState
            icon={PackageOpen}
            title="No purchases found"
            description="You have not purchased any machine design files matching your filter criteria."
            actionLabel="Explore Designs"
            onAction={() => window.location.href = '/explore'}
          />
        ) : (
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs hover:border-stone-300 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
              >
                {/* Left: Image & Info */}
                <div className="flex gap-4 items-start sm:items-center flex-1 min-w-0">
                  <img
                    src={purchase.itemImage}
                    alt={purchase.itemTitle}
                    className="w-20 h-20 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200"
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-mono font-medium text-stone-700">{purchase.orderNumber}</span>
                      <span>·</span>
                      <span>{purchase.date}</span>
                      <span>·</span>
                      <span className="capitalize text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Licensed
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-stone-900 truncate">
                      {purchase.itemTitle}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span>Category: {purchase.category}</span>
                      <span>·</span>
                      <span>Creator: {purchase.sellerName}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Price & Downloads */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-stone-100 justify-between">
                  <div>
                    <div className="text-base font-bold font-mono tabular-nums text-stone-900">
                      ₹{purchase.amountPaid.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[11px] text-stone-500">Paid via UPI / Card</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleDownload(`${purchase.itemTitle.replace(/\s+/g, '_')}_all_files.zip`)}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download ZIP
                    </button>
                    <Link
                      to={`/design/${purchase.itemId}`}
                      className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg text-xs transition-colors"
                    >
                      Specs
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
