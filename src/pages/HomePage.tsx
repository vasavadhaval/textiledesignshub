import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Scissors,
  Award,
  Star,
  Users,
  TrendingUp,
  Download,
  Store,
  ChevronRight,
  SlidersHorizontal,
  Camera
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DesignCard } from '../components/common/DesignCard';
import { CollectionCard } from '../components/common/CollectionCard';
import { SearchByImageModal } from '../components/common/SearchByImageModal';
import {
  ASSET_IMAGES,
  MACHINE_OPTIONS,
  CATEGORY_OPTIONS,
  DESIGN_TYPE_OPTIONS,
  MACHINE_TYPE_OPTIONS,
} from '../data/mockData';

export const HomePage: React.FC = () => {
  const { designs, collections, creators, setSearchQuery } = useApp();
  const [keyword, setKeyword] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      setSearchQuery(keyword.trim());
      navigate(`/explore?q=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const featuredDesigns = designs.filter((d) => d.isFeatured).slice(0, 4);
  const trendingDesigns = designs.filter((d) => d.isTrending).slice(0, 4);
  const newArrivals = designs.filter((d) => d.isNew).slice(0, 4);
  const popularCollections = collections.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Search by Image Modal */}
      <SearchByImageModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        onSelectSampleOrUpload={(hint) => {
          if (hint) {
            navigate(`/explore?category=${encodeURIComponent(hint)}`);
          } else {
            navigate('/explore');
          }
        }}
      />

      {/* Hero Section - Split-column 1440 baseline with authentic luxury Indian embroidery focal imagery */}
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-[#F5F2EB] to-[#FAF8F5] pt-8 pb-16 lg:pt-14 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Quiet unboxed kicker */}
              <div className="flex items-center gap-2 text-xs text-amber-900/90 font-medium tracking-wide">
                <span>The Premier Indian Machine Embroidery Exchange</span>
                <span aria-hidden="true">·</span>
                <span>Tajima & Barudan Calibrated</span>
              </div>

              {/* Refined Display Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
                Production-ready textile designs & multi-head stitch files.
              </h1>

              <p className="text-base text-stone-600 leading-relaxed max-w-xl">
                Source master-digitized saree borders, bridal lehenga jaals, and Lucknowi Chikan motifs directly from verified digitizers in Surat, Varanasi, and Jaipur. Instant multi-format downloads in EMB, DST, and PES.
              </p>

              {/* Main Search & Visual Match Bar */}
              <form onSubmit={handleHeroSearch} className="max-w-xl">
                <div className="flex flex-col sm:flex-row gap-2 p-1.5 bg-white rounded-xl shadow-lg border border-stone-200">
                  <div className="relative flex-1 flex items-center">
                    <Search className="w-5 h-5 text-stone-400 ml-3.5 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Search design title, machine (e.g. Schiffli), stitches..."
                      className="w-full py-2.5 pr-3 text-sm text-stone-900 placeholder-stone-400 bg-transparent focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 px-1">
                    <button
                      type="button"
                      onClick={() => setImageModalOpen(true)}
                      className="p-2.5 text-stone-500 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
                      title="Search with fabric sample photo"
                    >
                      <Camera className="w-4 h-4 text-amber-700" />
                      <span className="hidden sm:inline">Swatch Match</span>
                    </button>
                    
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shadow-sm"
                    >
                      Explore 2,400+ Designs
                    </button>
                  </div>
                </div>
              </form>

              {/* Trust metric anchors adjacent to search */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Zero Thread-Break Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>EMB Source + DST & PES Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Instant Razorpay & UPI Checkout</span>
                </div>
              </div>
            </div>

            {/* Right Media Column - High fidelity authentic hero image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-300/80 group">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="Royal Indian Zari & Needlework Mastercraft"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay card */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-950/85 backdrop-blur-md text-white p-4 rounded-xl border border-stone-800/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono text-amber-300 uppercase tracking-wider">
                      Featured Masterwork
                    </span>
                    <span className="text-xs font-mono tabular-nums text-stone-300">
                      94,800 Stitches · 7 Needles
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-white">
                    Royal Banarasi Zari Floral Arch Motif
                  </h4>
                  <div className="mt-2 flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
                    <span className="text-stone-300">By Varanasi Zari Atelier</span>
                    <Link
                      to="/design/des-104"
                      className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
                    >
                      View Specs <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Machine & Category Quick Navigation Strip */}
      <section className="py-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Browse by Machine Calibration
            </h3>
            <Link
              to="/explore"
              className="text-xs font-semibold text-amber-900 hover:text-amber-700 inline-flex items-center gap-1"
            >
              All Machines <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {MACHINE_OPTIONS.map((machine) => (
              <Link
                key={machine}
                to={`/explore?machine=${encodeURIComponent(machine)}`}
                className="group p-3.5 rounded-xl border border-stone-200/80 hover:border-amber-700/60 bg-stone-50/60 hover:bg-amber-50/30 transition-all flex flex-col justify-between"
              >
                <div className="w-7 h-7 rounded-lg bg-stone-200/80 group-hover:bg-amber-100 flex items-center justify-center text-stone-700 group-hover:text-amber-900 transition-colors mb-2">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900 group-hover:text-amber-950 leading-snug">
                    {machine}
                  </h4>
                  <p className="text-[10px] text-stone-500 mt-0.5">Tajima, Barudan</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category Tabs */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
              Garment & Textile Segments
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Popular Embroidery Categories
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-semibold text-stone-700 hover:text-stone-900 inline-flex items-center gap-1"
          >
            Explore all categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORY_OPTIONS.map((category) => (
            <Link
              key={category}
              to={`/explore?category=${encodeURIComponent(category)}`}
              className="group p-4 bg-white rounded-xl border border-stone-200/90 hover:border-stone-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center font-serif font-bold text-xs">
                  {category.charAt(0)}
                </span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <h3 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                {category}
              </h3>
              <p className="text-xs text-stone-500 mt-1">EMB, DST, PES ready</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Designs Showcase */}
      <section className="py-12 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                Hand-Selected Masterworks
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Featured Production Designs
              </h2>
            </div>
            <Link
              to="/explore"
              className="text-xs font-semibold text-stone-700 hover:text-stone-900 inline-flex items-center gap-1"
            >
              View full collection ({designs.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDesigns.map((design) => (
              <DesignCard key={design.id} design={design} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Collections Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
              Curated Production Suites
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Popular Design Bundles
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Save up to 45% when purchasing coordinated border, pallu, and blouse suites.
            </p>
          </div>
          <Link
            to="/collections"
            className="text-xs font-semibold text-stone-700 hover:text-stone-900 inline-flex items-center gap-1"
          >
            All Collections <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      {/* Trending Designs & New Arrivals Tabbed / Side-by-Side */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Trending Column */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5" />
                    High Factory Run Volume
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">Trending in Surat & Mumbai</h3>
                </div>
                <Link to="/explore?sort=popular" className="text-xs font-medium text-stone-500 hover:text-stone-900">
                  See all
                </Link>
              </div>
              <div className="space-y-4">
                {trendingDesigns.map((design) => (
                  <DesignCard key={design.id} design={design} viewMode="list" />
                ))}
              </div>
            </div>

            {/* New Arrivals Column */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    Fresh Digitizer Drops
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">Latest Weekly Releases</h3>
                </div>
                <Link to="/explore?sort=newest" className="text-xs font-medium text-stone-500 hover:text-stone-900">
                  See all
                </Link>
              </div>
              <div className="space-y-4">
                {newArrivals.map((design) => (
                  <DesignCard key={design.id} design={design} viewMode="list" />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
            Verified Indian Master Digitizers
          </span>
          <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
            Meet the Studios Behind the Stitches
          </h2>
          <p className="text-xs text-stone-500 mt-2">
            Every digitizer undergoes rigorous machine punch testing with strict checks on density balance, satin cornering, and needle pull compensation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="bg-white rounded-xl border border-stone-200/90 p-5 hover:border-stone-300 hover:shadow-md transition-all flex flex-col justify-between text-center"
            >
              <div>
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-stone-200 mb-3"
                />
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {creator.name}
                </h4>
                <p className="text-xs text-stone-500">{creator.location}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-amber-700 font-medium mt-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{creator.rating}</span>
                  <span className="text-stone-400">·</span>
                  <span className="text-stone-500">{creator.totalSales} sales</span>
                </div>
                <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                  {creator.bio}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-medium text-stone-500">{creator.totalDesigns} Designs</span>
                <Link
                  to={`/creator/${creator.id}`}
                  className="font-semibold text-amber-900 hover:text-amber-700 inline-flex items-center gap-0.5"
                >
                  View Studio <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works & Start Selling Dual Block */}
      <section className="py-16 bg-stone-900 text-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Buyer Steps */}
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                For Buyers & Manufacturers
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                How It Works: Seamless Factory Production
              </h2>
              
              <div className="space-y-4 text-xs">
                <div className="flex gap-4 p-4 rounded-xl bg-stone-800/80 border border-stone-700">
                  <div className="w-7 h-7 rounded-lg bg-stone-700 text-amber-300 flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">Discover & Calibrate</h4>
                    <p className="text-stone-400 mt-1 leading-relaxed">
                      Filter by your exact machine setup (Multi-head, Schiffli, Cording), stitch count bounds, and dimensions in millimeters.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-stone-800/80 border border-stone-700">
                  <div className="w-7 h-7 rounded-lg bg-stone-700 text-amber-300 flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">One-Click Secure Checkout</h4>
                    <p className="text-stone-400 mt-1 leading-relaxed">
                      Instant purchase via UPI, NetBanking, or Cards. No platform fee markups on buyer pricing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-stone-800/80 border border-stone-700">
                  <div className="w-7 h-7 rounded-lg bg-stone-700 text-amber-300 flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-100 text-sm">Instant Production Download</h4>
                    <p className="text-stone-400 mt-1 leading-relaxed">
                      Receive original Wilcom EMB files, machine-ready DST, PES, plus color stop sheets and thread consumption reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Pitch */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-850 border border-stone-700 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                For Embroidery Digitizers
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Turn Your Stitch Archives Into Recurring Royalties
              </h2>
              <p className="text-xs text-stone-300 leading-relaxed">
                Join 500+ Indian digitizers selling machine files to garment exporters, boutiques, and textile mills across Surat, Ahmedabad, Ludhiana, Tirupur, and international buyers.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-stone-900/80 rounded-lg border border-stone-700">
                  <span className="font-bold text-white text-base font-mono">85%</span>
                  <p className="text-stone-400 mt-0.5">Seller Net Payout</p>
                </div>
                <div className="p-3 bg-stone-900/80 rounded-lg border border-stone-700">
                  <span className="font-bold text-white text-base font-mono">Bi-Weekly</span>
                  <p className="text-stone-400 mt-0.5">Automated Settlements</p>
                </div>
              </div>

              <Link
                to="/studio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-xl text-xs transition-colors shadow-md"
              >
                Open My Studio & Start Selling
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Attributable Testimonials per Section 1.H */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
            Real Manufacturing Outcomes
          </span>
          <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
            Trusted by Garment Exporters & Mills
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <p className="text-xs text-stone-600 leading-relaxed italic">
              "We run forty-eight 12-head Tajima machines in Surat. Using Textile Design Hub's pre-tested EMB files eliminated needle breaks on our bridal borders, cutting our sampling turn-around time by 60%."
            </p>
            <div className="mt-4 pt-4 border-t border-stone-100">
              <h5 className="font-semibold text-xs text-stone-900">Rajesh Patel</h5>
              <p className="text-[11px] text-stone-500">Managing Director, Omkar Textile Mills, Surat</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <p className="text-xs text-stone-600 leading-relaxed italic">
              "The density adjustments on the Lucknowi Chikan motifs are phenomenal. Even on thin silk organza, there is zero fabric puckering. The thread consumption sheets save us huge costing headaches."
            </p>
            <div className="mt-4 pt-4 border-t border-stone-100">
              <h5 className="font-semibold text-xs text-stone-900">Ananya Sen</h5>
              <p className="text-[11px] text-stone-500">Head of Design, Sen & Sharma Couture, New Delhi</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <p className="text-xs text-stone-600 leading-relaxed italic">
              "As an independent puncher in Varanasi, the transparent ledger and automated payouts give me complete financial peace of mind. I have earned over ₹3.4 Lakhs in passive file sales in 6 months."
            </p>
            <div className="mt-4 pt-4 border-t border-stone-100">
              <h5 className="font-semibold text-xs text-stone-900">Maheshwar Rao</h5>
              <p className="text-[11px] text-stone-500">Senior Digitizer, Varanasi Zari Studio</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
