import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight } from 'lucide-react';
import { CollectionItem } from '../../data/mockData';

interface CollectionCardProps {
  collection: CollectionItem;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  const savings = collection.originalTotal - collection.price;
  const discountPercent = Math.round((savings / collection.originalTotal) * 100);

  return (
    <div className="group bg-white rounded-xl border border-stone-200/90 hover:border-stone-300 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
        <Link to={`/collections/${collection.id}`} className="block w-full h-full">
          <img
            src={collection.coverImage}
            alt={collection.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-md text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
          <Layers className="w-3.5 h-3.5" />
          <span>{collection.designCount} Machine Designs</span>
        </div>
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-amber-700 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
            Save {discountPercent}%
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="uppercase tracking-wider font-medium text-stone-600">{collection.category}</span>
            <span aria-hidden="true">·</span>
            <span>By {collection.sellerName}</span>
          </div>

          <Link
            to={`/collections/${collection.id}`}
            className="block font-serif text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1"
          >
            {collection.title}
          </Link>

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {collection.description}
          </p>
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono tabular-nums text-stone-900">
                ₹{collection.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs line-through text-stone-400 font-mono tabular-nums">
                ₹{collection.originalTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-[10px] text-stone-500">Complete bundle license</div>
          </div>

          <Link
            to={`/collections/${collection.id}`}
            className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
          >
            Explore Suite
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
