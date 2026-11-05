import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle2, Shield, Eye } from 'lucide-react';
import { DesignItem } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

interface DesignCardProps {
  design: DesignItem;
  viewMode?: 'grid' | 'list';
}

export const DesignCard: React.FC<DesignCardProps> = ({ design, viewMode = 'grid' }) => {
  const { isSaved, toggleSaveDesign, isPurchased } = useApp();
  const saved = isSaved(design.id);
  const purchased = isPurchased(design.id);

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-xl border border-stone-200/90 hover:border-stone-300 p-4 transition-all duration-200 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Link
            to={`/design/${design.id}`}
            className="w-24 h-24 rounded-lg overflow-hidden bg-stone-100 shrink-0 relative block"
          >
            <img
              src={design.images[0]}
              alt={design.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {purchased && (
              <span className="absolute bottom-1 left-1 bg-emerald-800 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-sm">
                Purchased
              </span>
            )}
          </Link>

          <div className="flex-1 min-w-0 space-y-1.5">
            {/* Clean unboxed metadata with separators */}
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="uppercase tracking-wider font-medium text-stone-600">{design.category}</span>
              <span aria-hidden="true">·</span>
              <span>{design.machine}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{design.stitches.toLocaleString()} stitches</span>
            </div>

            <Link
              to={`/design/${design.id}`}
              className="block font-serif text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors truncate"
            >
              {design.title}
            </Link>

            <div className="flex items-center gap-3 text-xs text-stone-500">
              <span className="font-mono">{design.formats.join(' / ')}</span>
              <span aria-hidden="true">·</span>
              <span>By {design.sellerName}</span>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
          <div className="text-right">
            <div className="text-lg font-bold font-mono tabular-nums text-stone-900">
              ₹{design.price.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-stone-500">Instant multi-format ZIP</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveDesign(design.id)}
              className={`p-2 rounded-lg border transition-colors ${
                saved
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
              title={saved ? 'Remove from saved' : 'Save design'}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
            <Link
              to={`/design/${design.id}`}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap"
            >
              {purchased ? 'Download Files' : 'View Specs'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Mode
  return (
    <div className="group bg-white rounded-xl border border-stone-200/90 hover:border-stone-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Media Slot */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <Link to={`/design/${design.id}`} className="block w-full h-full">
          <img
            src={design.images[0]}
            alt={design.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Quiet Top Actions (Saved Heart & Purchased Tag) */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {purchased ? (
            <span className="pointer-events-auto inline-flex items-center gap-1 bg-stone-900/90 backdrop-blur-md text-emerald-400 text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm">
              <CheckCircle2 className="w-3 h-3" />
              Owned
            </span>
          ) : design.isNew ? (
            <span className="inline-flex items-center text-[11px] font-semibold tracking-wider uppercase text-amber-900 bg-amber-100/90 backdrop-blur-md px-2 py-0.5 rounded shadow-sm">
              New Drop
            </span>
          ) : (
            <div />
          )}

          <button
            onClick={() => toggleSaveDesign(design.id)}
            className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-transform active:scale-90 ${
              saved
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-stone-700 hover:text-stone-900 hover:bg-white'
            }`}
            title={saved ? 'Remove from saved' : 'Save design'}
            aria-label="Save design to wishlist"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom subtle specs strip over image */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent p-3 pt-6 text-white text-[11px] flex items-center justify-between pointer-events-none">
          <span className="font-mono tabular-nums font-medium">
            {design.stitches.toLocaleString()} Stitches
          </span>
          <span className="font-mono text-stone-300">
            {design.heightMm}×{design.widthMm} mm
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Unboxed clean metadata (zero-pill discipline) */}
          <div className="flex items-center gap-2 text-[11px] text-stone-500">
            <span className="uppercase tracking-wider font-medium text-stone-700 truncate">
              {design.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{design.machine}</span>
          </div>

          <Link
            to={`/design/${design.id}`}
            className="block font-serif text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1"
            title={design.title}
          >
            {design.title}
          </Link>

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {design.description}
          </p>
        </div>

        {/* Formats & Seller Details */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              src={design.sellerAvatar}
              alt={design.sellerName}
              className="w-4 h-4 rounded-full object-cover shrink-0"
            />
            <span className="truncate text-stone-600">{design.sellerName}</span>
          </div>
          <span className="font-mono text-[10px] text-stone-400 shrink-0">
            {design.formats.slice(0, 3).join(' · ')}
          </span>
        </div>

        {/* Price & Primary CTA */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-bold font-mono tabular-nums text-stone-900">
              ₹{design.price.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-stone-500">Tested machine files</div>
          </div>

          <Link
            to={`/design/${design.id}`}
            className="px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 group-hover:bg-stone-900 group-hover:text-white rounded-lg transition-colors whitespace-nowrap"
          >
            {purchased ? 'Download' : 'View File'}
          </Link>
        </div>
      </div>
    </div>
  );
};
