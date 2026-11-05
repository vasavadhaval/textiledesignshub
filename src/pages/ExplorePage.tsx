import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Camera,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  X,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DesignCard } from '../components/common/DesignCard';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { SearchByImageModal } from '../components/common/SearchByImageModal';
import {
  CATEGORY_OPTIONS,
  MACHINE_OPTIONS,
  MACHINE_TYPE_OPTIONS,
  DESIGN_TYPE_OPTIONS,
  FILE_FORMAT_OPTIONS,
} from '../data/mockData';

export const ExplorePage: React.FC = () => {
  const { designs, searchQuery, setSearchQuery } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state
  const [localSearch, setLocalSearch] = useState(searchParams.get('q') || searchQuery || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-asc' | 'price-desc'>(
    (searchParams.get('sort') as any) || 'popular'
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Filter selections
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  );
  const [selectedMachine, setSelectedMachine] = useState<string>(
    searchParams.get('machine') || ''
  );
  const [selectedMachineType, setSelectedMachineType] = useState<string>(
    searchParams.get('machineType') || ''
  );
  const [selectedDesignTypes, setSelectedDesignTypes] = useState<string[]>(
    searchParams.get('designType') ? [searchParams.get('designType')!] : []
  );
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  // Sync url params when arriving from external links
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setLocalSearch(q);
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const mach = searchParams.get('machine');
    if (mach) setSelectedMachine(mach);
  }, [searchParams]);

  // Filter application
  const filteredDesigns = useMemo(() => {
    return designs.filter((item) => {
      // Keyword search
      if (localSearch.trim()) {
        const query = localSearch.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesMachine = item.machine.toLowerCase().includes(query);
        const matchesSeller = item.sellerName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesMachine && !matchesSeller) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && item.category !== selectedCategory) {
        return false;
      }

      // Machine filter
      if (selectedMachine && item.machine !== selectedMachine) {
        return false;
      }

      // Machine type filter
      if (selectedMachineType && item.machineType !== selectedMachineType) {
        return false;
      }

      // Design types
      if (selectedDesignTypes.length > 0) {
        const hasMatchingType = selectedDesignTypes.some((type) =>
          item.designTypes.includes(type)
        );
        if (!hasMatchingType) return false;
      }

      // Format filter
      if (selectedFormats.length > 0) {
        const hasFormat = selectedFormats.some((fmt) =>
          item.formats.includes(fmt as any)
        );
        if (!hasFormat) return false;
      }

      // Price filter
      if (item.price > maxPrice) {
        return false;
      }

      return true;
    });
  }, [
    designs,
    localSearch,
    selectedCategory,
    selectedMachine,
    selectedMachineType,
    selectedDesignTypes,
    selectedFormats,
    maxPrice,
  ]);

  // Sorting
  const sortedDesigns = useMemo(() => {
    const result = [...filteredDesigns];
    switch (sortBy) {
      case 'newest':
        return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'price-asc':
        return result.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return result.sort((a, b) => b.price - a.price);
      case 'popular':
      default:
        return result.sort((a, b) => b.salesCount - a.salesCount);
    }
  }, [filteredDesigns, sortBy]);

  const displayedDesigns = sortedDesigns.slice(0, visibleCount);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedMachine('');
    setSelectedMachineType('');
    setSelectedDesignTypes([]);
    setSelectedFormats([]);
    setMaxPrice(5000);
    setLocalSearch('');
    setSearchQuery('');
  };

  const toggleDesignType = (type: string) => {
    setSelectedDesignTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleFormat = (fmt: string) => {
    setSelectedFormats((prev) =>
      prev.includes(fmt) ? prev.filter((f) => f !== fmt) : [...prev, fmt]
    );
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (selectedMachine ? 1 : 0) +
    (selectedMachineType ? 1 : 0) +
    selectedDesignTypes.length +
    selectedFormats.length +
    (maxPrice < 5000 ? 1 : 0) +
    (localSearch ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Visual Swatch Search Modal */}
      <SearchByImageModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onSelectSampleOrUpload={(hint) => {
          if (hint) {
            setSelectedCategory(hint);
          }
        }}
      />

      {/* Header Banner */}
      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                <span>Direct Production Exchange</span>
                <span aria-hidden="true">·</span>
                <span>{designs.length} Verified Masterworks</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Explore Machine Embroidery Designs
              </h1>
            </div>

            {/* Search and Swatch Match Bar */}
            <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search border, buta, schiffli..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700 focus:bg-white"
                />
              </div>

              <button
                type="button"
                onClick={() => setImageModalOpen(true)}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg border border-stone-200 transition-colors flex items-center gap-1.5 shrink-0"
                title="Search by image swatch"
              >
                <Camera className="w-3.5 h-3.5 text-amber-800" />
                <span className="hidden sm:inline">Swatch Match</span>
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-5 rounded-xl border border-stone-200/90 h-fit sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-stone-700" />
                <h3 className="font-serif text-sm font-bold text-stone-900">
                  Filters & Specs
                </h3>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-amber-900 hover:text-amber-700 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-700"
              >
                <option value="">All Categories</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Machine Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                Embroidery Machine
              </label>
              <select
                value={selectedMachine}
                onChange={(e) => setSelectedMachine(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-700"
              >
                <option value="">All Machines</option>
                {MACHINE_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Machine Type Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                Production Calibration
              </label>
              <select
                value={selectedMachineType}
                onChange={(e) => setSelectedMachineType(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-700"
              >
                <option value="">All Calibrations</option>
                {MACHINE_TYPE_OPTIONS.map((mt) => (
                  <option key={mt} value={mt}>
                    {mt}
                  </option>
                ))}
              </select>
            </div>

            {/* Design Types (Multi-select) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                Embroidery Technique
              </label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {DESIGN_TYPE_OPTIONS.map((type) => {
                  const checked = selectedDesignTypes.includes(type);
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDesignType(type)}
                        className="rounded border-stone-300 text-amber-800 focus:ring-amber-700"
                      />
                      <span className="truncate">{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* File Formats */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                Required File Format
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {FILE_FORMAT_OPTIONS.map((fmt) => {
                  const active = selectedFormats.includes(fmt);
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => toggleFormat(fmt)}
                      className={`text-xs py-1.5 px-2 rounded font-mono font-medium transition-colors border ${
                        active
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {fmt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-stone-700 uppercase tracking-wider">
                  Max Price
                </label>
                <span className="font-mono font-bold text-stone-900">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-800"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>₹500</span>
                <span>₹5,000</span>
              </div>
            </div>
          </aside>

          {/* Results Main Area */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Controls Bar: Count, Active Chips, Sort, View Toggle */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/90 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Count & Mobile Filter Trigger */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-100 text-stone-800 rounded-lg border border-stone-200"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
                  </button>
                  <p className="text-xs text-stone-600 font-medium">
                    Showing <span className="font-bold text-stone-900">{sortedDesigns.length}</span> verified design files
                  </p>
                </div>

                {/* Sort & Grid/List View Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-stone-500 hidden sm:inline">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-xs bg-stone-50 border border-stone-200 rounded-lg py-1.5 px-2.5 text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-amber-700"
                    >
                      <option value="popular">Most Popular / High Volume</option>
                      <option value="newest">Newest Releases</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>

                  <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                      }`}
                      title="Grid View"
                      aria-label="Grid View"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'list' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                      }`}
                      title="List View"
                      aria-label="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Active Filter Chips (Clean interactive buttons per Section 1.A) */}
              {activeFilterCount > 0 && (
                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-stone-400 text-[11px]">Active filters:</span>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded flex items-center gap-1"
                    >
                      <span>Category: {selectedCategory}</span>
                      <X className="w-3 h-3 text-stone-500" />
                    </button>
                  )}
                  {selectedMachine && (
                    <button
                      onClick={() => setSelectedMachine('')}
                      className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded flex items-center gap-1"
                    >
                      <span>Machine: {selectedMachine}</span>
                      <X className="w-3 h-3 text-stone-500" />
                    </button>
                  )}
                  {selectedMachineType && (
                    <button
                      onClick={() => setSelectedMachineType('')}
                      className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded flex items-center gap-1"
                    >
                      <span>Type: {selectedMachineType}</span>
                      <X className="w-3 h-3 text-stone-500" />
                    </button>
                  )}
                  {selectedDesignTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleDesignType(type)}
                      className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded flex items-center gap-1"
                    >
                      <span>{type}</span>
                      <X className="w-3 h-3 text-amber-700" />
                    </button>
                  ))}
                  {selectedFormats.map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => toggleFormat(fmt)}
                      className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded font-mono flex items-center gap-1"
                    >
                      <span>{fmt}</span>
                      <X className="w-3 h-3 text-stone-500" />
                    </button>
                  ))}
                  {localSearch && (
                    <button
                      onClick={() => {
                        setLocalSearch('');
                        setSearchQuery('');
                      }}
                      className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded flex items-center gap-1"
                    >
                      <span>"{localSearch}"</span>
                      <X className="w-3 h-3 text-stone-500" />
                    </button>
                  )}
                  <button
                    onClick={handleResetFilters}
                    className="text-amber-900 font-semibold hover:underline ml-1"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Results Display */}
            {isLoading ? (
              <LoadingSkeleton count={6} viewMode={viewMode} />
            ) : sortedDesigns.length === 0 ? (
              <EmptyState
                title="No matching embroidery designs found"
                description="Try broadening your machine calibrations, clearing technique filters, or searching for broader terms like 'zari' or 'border'."
                actionLabel="Clear all filters"
                onAction={handleResetFilters}
              />
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {displayedDesigns.map((design) => (
                  <DesignCard key={design.id} design={design} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Pagination / Load More */}
            {sortedDesigns.length > visibleCount && (
              <div className="pt-8 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl shadow-sm transition-colors"
                >
                  Load More Designs ({sortedDesigns.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Filter Design Files
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800"
                >
                  <option value="">All Categories</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Machine */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider block">
                  Machine
                </label>
                <select
                  value={selectedMachine}
                  onChange={(e) => setSelectedMachine(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800"
                >
                  <option value="">All Machines</option>
                  {MACHINE_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">Max Price</span>
                  <span className="font-mono font-bold">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-800"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg"
              >
                Show Results ({sortedDesigns.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
