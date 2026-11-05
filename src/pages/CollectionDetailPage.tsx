import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  Download,
  CheckCircle2,
  ShieldCheck,
  Package,
  FileCheck,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DesignCard } from '../components/common/DesignCard';
import { CollectionCard } from '../components/common/CollectionCard';

export const CollectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { collections, designs, isPurchased, showToast } = useApp();

  const collection = collections.find((c) => c.id === id) || collections[0];
  const purchased = isPurchased(collection.id);

  // Included designs
  const includedDesigns = designs.filter((d) =>
    collection.includedDesignIds.includes(d.id)
  );

  const relatedCollections = collections.filter((c) => c.id !== collection.id).slice(0, 2);

  const handleDownloadAll = () => {
    showToast('Download Started', `Packaging all ${collection.designCount} machine design archives (.ZIP)`, 'success');
  };

  const savings = collection.originalTotal - collection.price;
  const discountPercent = Math.round((savings / collection.originalTotal) * 100);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-stone-500 flex items-center gap-2">
          <Link to="/" className="hover:text-stone-900">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-stone-900">Collections</Link>
          <span>/</span>
          <span className="text-stone-900 font-medium truncate">{collection.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Collection Header Banner */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-4 rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200">
            <img
              src={collection.coverImage}
              alt={collection.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="uppercase font-semibold tracking-wider text-amber-900">{collection.category}</span>
              <span>·</span>
              <span>By {collection.sellerName}</span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold">{collection.salesCount} suites sold</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              {collection.title}
            </h1>

            <p className="text-sm text-stone-600 leading-relaxed">
              {collection.description}
            </p>

            {/* Pricing Strip */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold font-mono tabular-nums text-stone-900">
                    ₹{collection.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-base line-through text-stone-400 font-mono tabular-nums">
                    ₹{collection.originalTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded">
                    Save {discountPercent}%
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Includes all {collection.designCount} machine files, color stop sequence sheets, and commercial license.
                </p>
              </div>

              <div>
                {purchased ? (
                  <button
                    onClick={handleDownloadAll}
                    className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Complete Suite ZIP ({collection.designCount} Designs)
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/checkout/collection/${collection.id}`)}
                    className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors"
                  >
                    Buy Complete Suite (₹{collection.price.toLocaleString('en-IN')})
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Included Designs List / Previews */}
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Included Designs in this Suite ({collection.designCount} Files)
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Each design comes with original Wilcom EMB files, DST production punches, and specification sheets.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedDesigns.length > 0 ? (
              includedDesigns.map((design) => (
                <DesignCard key={design.id} design={design} />
              ))
            ) : (
              designs.slice(0, 3).map((design) => (
                <DesignCard key={design.id} design={design} />
              ))
            )}
          </div>
        </section>

        {/* Related Collections */}
        {relatedCollections.length > 0 && (
          <section className="mt-16 pt-12 border-t border-stone-200 space-y-6">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Related Design Bundles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCollections.map((rc) => (
                <CollectionCard key={rc.id} collection={rc} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
