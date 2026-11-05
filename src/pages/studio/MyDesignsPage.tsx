import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Archive,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { DesignItem } from '../../data/mockData';

export const MyDesignsPage: React.FC = () => {
  const { designs, user, deleteDesign, updateDesign } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft' | 'inactive'>('all');
  const [designToDelete, setDesignToDelete] = useState<DesignItem | null>(null);

  // All designs owned by user (or fallback to creator-1's designs)
  const myDesigns = designs.filter((d) => d.sellerId === user.id || d.sellerName === user.name);

  const filteredDesigns = myDesigns.filter((d) => {
    if (statusFilter !== 'all' && d.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = d.title.toLowerCase().includes(q);
      const matchCat = d.category.toLowerCase().includes(q);
      const matchMach = d.machine.toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchMach) return false;
    }
    return true;
  });

  const handleDeleteConfirm = () => {
    if (designToDelete) {
      deleteDesign(designToDelete.id);
      setDesignToDelete(null);
    }
  };

  const toggleStatus = (design: DesignItem) => {
    const nextStatus = design.status === 'active' ? 'inactive' : 'active';
    updateDesign(design.id, { status: nextStatus });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Delete confirmation modal */}
      <ConfirmationDialog
        isOpen={Boolean(designToDelete)}
        title="Delete Marketplace Listing?"
        message={`Are you sure you want to remove "${designToDelete?.title}"? Buyers who previously purchased the files will still retain download access.`}
        confirmLabel="Delete Listing"
        isDestructive={true}
        onCancel={() => setDesignToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                <span>Studio Inventory</span>
                <span aria-hidden="true">·</span>
                <span>{myDesigns.length} Listed Files</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                My Machine Embroidery Designs
              </h1>
            </div>

            <Link
              to="/studio/designs/new"
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto"
            >
              <UploadCloud className="w-4 h-4" />
              Upload New Design
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Studio Sub-nav */}
        <div className="bg-white p-2 rounded-xl border border-stone-200/90 flex items-center gap-2 text-xs font-semibold">
          <Link to="/studio" className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100">
            Dashboard
          </Link>
          <Link to="/studio/designs" className="px-4 py-2 rounded-lg bg-stone-900 text-white">
            My Designs ({myDesigns.length})
          </Link>
          <Link to="/studio/collections" className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100">
            Collections
          </Link>
          <Link to="/studio/wallet" className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100">
            Wallet & Ledger
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-stone-100 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                statusFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All ({myDesigns.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                statusFilter === 'active'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                statusFilter === 'draft'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Drafts
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                statusFilter === 'inactive'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Inactive
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search design title or machine..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
            />
          </div>
        </div>

        {/* Designs Table / Grid */}
        {filteredDesigns.length === 0 ? (
          <EmptyState
            icon={Layers}
            title={myDesigns.length === 0 ? 'Welcome to your Creator Studio' : 'No designs matching your filter'}
            description={
              myDesigns.length === 0
                ? 'Upload your first Wilcom EMB or Tajima DST machine punch to start generating royalties from garment manufacturers.'
                : 'Try clearing your search query or switching status filters.'
            }
            actionLabel="Upload First Design"
            onAction={() => navigate('/studio/designs/new')}
          />
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Design Item</th>
                    <th className="py-3 px-4">Category & Machine</th>
                    <th className="py-3 px-4">Specifications</th>
                    <th className="py-3 px-4">Price / Est. Net</th>
                    <th className="py-3 px-4">Sales / Runs</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredDesigns.map((design) => {
                    const estimatedNet = design.price * 0.85;
                    return (
                      <tr key={design.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={design.images[0]}
                              alt={design.title}
                              className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                            />
                            <div className="min-w-0 max-w-xs">
                              <h4 className="font-serif text-xs font-bold text-stone-900 truncate">
                                {design.title}
                              </h4>
                              <span className="text-[10px] text-stone-400 font-mono">
                                Added {design.createdAt}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-stone-600">
                          <div className="font-medium text-stone-900">{design.category}</div>
                          <div className="text-[11px] text-stone-500">{design.machine}</div>
                        </td>

                        <td className="py-3.5 px-4 text-stone-600 font-mono text-[11px]">
                          <div>{design.stitches.toLocaleString()} Stitches</div>
                          <div className="text-stone-400">{design.heightMm}×{design.widthMm} mm</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold font-mono tabular-nums text-stone-900">
                            ₹{design.price.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] font-mono text-emerald-700">
                            ~₹{estimatedNet.toLocaleString('en-IN', { maximumFractionDigits: 0 })} net
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-bold font-mono text-stone-900">
                            {design.salesCount}
                          </span>
                          <span className="text-[11px] text-stone-400 block">purchases</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleStatus(design)}
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded cursor-pointer transition-colors ${
                              design.status === 'active'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : design.status === 'draft'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-stone-100 text-stone-600 border border-stone-200'
                            }`}
                            title="Click to toggle status"
                          >
                            {design.status}
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/design/${design.id}`}
                              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded"
                              title="Public Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              to={`/studio/designs/edit/${design.id}`}
                              className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded"
                              title="Edit Listing"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => setDesignToDelete(design)}
                              className="p-1.5 text-stone-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                              title="Delete Design"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
