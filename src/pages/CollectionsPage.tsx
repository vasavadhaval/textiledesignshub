import React, { useState } from 'react';
import { Layers, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CollectionCard } from '../components/common/CollectionCard';
import { CATEGORY_OPTIONS } from '../data/mockData';

export const CollectionsPage: React.FC = () => {
  const { collections } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredCollections = selectedCategory
    ? collections.filter((c) => c.category === selectedCategory)
    : collections;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Header Banner */}
      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
              <Layers className="w-4 h-4 text-amber-800" />
              <span>Production Bundles & Suites</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Coordinated Design Collections
            </h1>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              Complete matching sets for full bridal ensembles, matching saree borders and pallus, and coordinated kurti neckline capsules. Master-digitized for harmonious tension and thread balance.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === ''
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Bundles ({collections.length})
            </button>
            {['Saree Borders', 'Floral & Motifs', 'Pallu & Dupatta', 'Bridal Lehenga'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  );
};
