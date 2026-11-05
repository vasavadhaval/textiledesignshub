import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderPlus,
  Layers,
  Search,
  Eye,
  Edit2,
  Trash2,
  X,
  UploadCloud,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CollectionItem, ASSET_IMAGES } from '../../data/mockData';

export const MyCollectionsPage: React.FC = () => {
  const { collections, designs, user, addCollection, showToast } = useApp();
  const navigate = useNavigate();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Create Collection Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Saree Borders');
  const [price, setPrice] = useState<number>(3999);
  const [originalTotal, setOriginalTotal] = useState<number>(6500);
  const [selectedDesignIds, setSelectedDesignIds] = useState<string[]>(['des-101', 'des-103']);
  const [coverImage, setCoverImage] = useState(ASSET_IMAGES.sareeBorder);

  const myCollections = collections.filter(
    (c) => c.sellerId === user.id || c.sellerName === user.name
  );

  const filteredCollections = myCollections.filter((c) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Title Required', 'Please provide a collection title.', 'error');
      return;
    }

    addCollection({
      title,
      description,
      category,
      price,
      originalTotal,
      designCount: selectedDesignIds.length,
      includedDesignIds: selectedDesignIds,
      coverImage,
      isFeatured: true,
    });

    setCreateModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const toggleSelectDesign = (id: string) => {
    setSelectedDesignIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Create Collection Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-xl w-full p-6 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Create Design Suite / Collection
              </h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCollection} className="mt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Collection Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Surat Heritage Bridal Saree Border Suite"
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Description & Included Components</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain how the border, pallu, and blouse motifs coordinate..."
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">Bundle Price (₹ INR)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono text-stone-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">Individual Total (₹ INR)</label>
                  <input
                    type="number"
                    value={originalTotal}
                    onChange={(e) => setOriginalTotal(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono text-stone-900"
                  />
                </div>
              </div>

              {/* Design Selector */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="font-semibold text-stone-700 block">
                  Select Included Designs ({selectedDesignIds.length} Selected)
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {designs.slice(0, 6).map((d) => {
                    const isSelected = selectedDesignIds.includes(d.id);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => toggleSelectDesign(d.id)}
                        className={`w-full p-2 rounded-lg border text-left flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-amber-50 border-amber-300 text-stone-900 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img src={d.images[0]} alt={d.title} className="w-8 h-8 rounded object-cover" />
                          <span className="truncate">{d.title}</span>
                        </div>
                        <span className="font-mono text-[11px] shrink-0">₹{d.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold"
                >
                  Create & Publish Suite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                <span>Bundle Architecture</span>
                <span aria-hidden="true">·</span>
                <span>{myCollections.length} Coordinated Suites</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                My Design Collections & Bundles
              </h1>
            </div>

            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto"
            >
              <FolderPlus className="w-4 h-4" />
              Create New Collection
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Studio Sub-nav */}
        <div className="bg-white p-2 rounded-xl border border-stone-200/90 flex items-center gap-2 text-xs font-semibold">
          <Link to="/studio" className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100">
            Dashboard
          </Link>
          <Link to="/studio/designs" className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100">
            My Designs
          </Link>
          <Link to="/studio/collections" className="px-4 py-2 rounded-lg bg-stone-900 text-white">
            Collections ({myCollections.length})
          </Link>
          <Link to="/studio/wallet" className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100">
            Wallet & Ledger
          </Link>
        </div>

        {/* Collections Table */}
        <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Suite / Collection</th>
                  <th className="py-3 px-4">Designs Included</th>
                  <th className="py-3 px-4">Bundle Price</th>
                  <th className="py-3 px-4">Est. Net (85%)</th>
                  <th className="py-3 px-4">Sales Count</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredCollections.map((col) => {
                  const estimatedNet = col.price * 0.85;
                  return (
                    <tr key={col.id} className="hover:bg-stone-50/50">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={col.coverImage}
                            alt={col.title}
                            className="w-14 h-10 rounded-lg object-cover border border-stone-200"
                          />
                          <div className="min-w-0 max-w-sm">
                            <h4 className="font-serif text-xs font-bold text-stone-900 truncate">
                              {col.title}
                            </h4>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {col.category} · Created {col.createdAt}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-stone-800">
                        {col.designCount} machine files
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold font-mono text-stone-900">
                          ₹{col.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] line-through text-stone-400 font-mono block">
                          ₹{col.originalTotal.toLocaleString('en-IN')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">
                        ₹{estimatedNet.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-stone-900 font-semibold">
                        {col.salesCount} bundles
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/collections/${col.id}`}
                          className="p-1.5 text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 text-[11px] font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Preview
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
