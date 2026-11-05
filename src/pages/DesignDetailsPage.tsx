import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  Download,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Maximize2,
  X,
  Layers,
  Cpu,
  Scissors,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DesignCard } from '../components/common/DesignCard';

export const DesignDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { designs, user, isSaved, toggleSaveDesign, isPurchased, showToast } = useApp();

  const design = designs.find((d) => d.id === id) || designs[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const saved = isSaved(design.id);
  const purchased = isPurchased(design.id);
  const isOwner = user.id === design.sellerId;

  const similarDesigns = designs
    .filter((d) => d.id !== design.id && (d.category === design.category || d.machine === design.machine))
    .slice(0, 3);

  const creatorDesigns = designs
    .filter((d) => d.id !== design.id && d.sellerId === design.sellerId)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Design URL copied to clipboard.', 'info');
  };

  const handleDownloadFile = (fileName: string) => {
    showToast('Download Started', `Packaging verified production file: ${fileName}`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-stone-900/60"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={design.images[activeImageIndex] || design.images[0]}
            alt={design.title}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-stone-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-stone-500 flex items-center gap-2">
          <Link to="/" className="hover:text-stone-900">Home</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-stone-900">Explore</Link>
          <span>/</span>
          <Link to={`/explore?category=${encodeURIComponent(design.category)}`} className="hover:text-stone-900">
            {design.category}
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-medium truncate">{design.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Owner Banner if user is the seller */}
        {isOwner && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>
                <strong>Studio Preview:</strong> You are viewing your own listed design as it appears to buyers.
              </span>
            </div>
            <Link
              to={`/studio/designs`}
              className="text-xs font-semibold text-amber-900 bg-amber-200/60 hover:bg-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Manage in Studio
            </Link>
          </div>
        )}

        {/* Main PDP Grid: Gallery Left, Sticky Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Large Image */}
            <div className="relative aspect-[4/3] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-sm group">
              <img
                src={design.images[activeImageIndex] || design.images[0]}
                alt={design.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 bg-stone-900/80 hover:bg-stone-900 text-white p-2.5 rounded-xl shadow-md backdrop-blur-sm transition-all"
                title="View High-Resolution Stitch Zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {purchased && (
                <div className="absolute top-4 left-4 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Purchased & Licensed
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {design.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {design.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-amber-800 ring-2 ring-amber-800/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Technical Specifications Matrix */}
            <div className="mt-8 bg-white rounded-2xl border border-stone-200/90 p-6 space-y-6">
              <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
                Machine Calibration & Needle Specifications
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                  <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Stitch Count</span>
                  <span className="font-mono font-bold text-stone-900 text-base tabular-nums">
                    {design.stitches.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                  <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Active Needles</span>
                  <span className="font-mono font-bold text-stone-900 text-base">
                    {design.needles} Needles
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                  <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Dimensions (H × W)</span>
                  <span className="font-mono font-bold text-stone-900 text-base tabular-nums">
                    {design.heightMm} × {design.widthMm} mm
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                  <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Total Stitch Area</span>
                  <span className="font-mono font-bold text-stone-900 text-base tabular-nums">
                    {design.areaCm2} cm²
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                  <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Sequence Mode</span>
                  <span className="font-medium text-stone-900 text-xs">
                    {design.sequenceType}
                  </span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                  <span className="text-stone-500 uppercase tracking-wider block text-[10px]">Machine Type</span>
                  <span className="font-medium text-stone-900 text-xs">
                    {design.machineType}
                  </span>
                </div>
              </div>

              {/* Techniques / Design types */}
              <div>
                <span className="text-xs font-semibold text-stone-700 block mb-2">
                  Applied Techniques & Thread Formulas:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {design.designTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-md font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description & Digitizer Notes */}
              <div className="pt-4 border-t border-stone-100">
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
                  Digitizer Notes & Fabric Suitability
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {design.description}
                </p>
              </div>

              {/* Production Guarantee Callout */}
              <div className="p-4 bg-emerald-50/60 border border-emerald-200/70 rounded-xl flex items-start gap-3 text-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-emerald-950">Factory Production Guarantee</h5>
                  <p className="text-emerald-900/80 mt-0.5 leading-relaxed">
                    {design.buyerProtection}
                  </p>
                </div>
              </div>
            </div>

            {/* Included Production Files List */}
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 space-y-4">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Package Contents ({design.files.length} Production Files)
              </h3>
              <div className="divide-y divide-stone-100">
                {design.files.map((file, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-amber-800" />
                      <span className="font-mono font-medium text-stone-800">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-stone-400 font-mono">{file.size}</span>
                      {purchased && (
                        <button
                          onClick={() => handleDownloadFile(file.name)}
                          className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 text-[11px]"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Purchase Module (5 cols) per E-Commerce Reference Section 2.A */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm space-y-6">
              
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span className="uppercase font-semibold tracking-wider text-amber-900">
                    {design.category}
                  </span>
                  <span>·</span>
                  <span>{design.machine}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg border border-stone-200"
                    title="Share design link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleSaveDesign(design.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      saved ? 'bg-rose-50 border-rose-200 text-rose-600' : 'text-stone-500 hover:text-stone-900 border-stone-200'
                    }`}
                    title={saved ? 'Remove from saved' : 'Save design'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                {design.title}
              </h1>

              {/* Seller snippet */}
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={design.sellerAvatar}
                    alt={design.sellerName}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-stone-200"
                  />
                  <div>
                    <h5 className="font-semibold text-stone-900">{design.sellerName}</h5>
                    <p className="text-[11px] text-stone-500">Master Digitizer · Surat Certified</p>
                  </div>
                </div>
                <Link
                  to={`/creator/${design.sellerId}`}
                  className="text-xs font-semibold text-amber-900 hover:underline shrink-0"
                >
                  View Profile
                </Link>
              </div>

              {/* Pricing & Commercial License */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-baseline justify-between mb-1">
                  <div className="text-3xl font-bold font-mono tabular-nums text-stone-900">
                    ₹{design.price.toLocaleString('en-IN')}
                  </div>
                  <span className="text-xs text-stone-500 font-medium">Full Commercial License</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Unlimited factory garment production runs with no recurring royalties.
                </p>
              </div>

              {/* Primary Actions */}
              <div className="space-y-3 pt-2">
                {purchased ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleDownloadFile(`${design.title.replace(/\s+/g, '_')}_master_archive.zip`)}
                      className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Complete Multi-Format Archive (ZIP)
                    </button>
                    <Link
                      to="/account/purchases"
                      className="block text-center text-xs text-stone-600 hover:text-stone-900 font-medium"
                    >
                      View in My Purchases & Invoices
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate(`/checkout/design/${design.id}`)}
                    className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    Buy Now & Download Files
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <p className="text-[11px] text-stone-400 text-center">
                  Instant ZIP download upon payment · GST Invoice provided
                </p>
              </div>

              {/* Machine Compatibility Pills / Format Checklist */}
              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
                <span className="font-semibold text-stone-800 block">
                  Included Machine Formats:
                </span>
                <div className="grid grid-cols-2 gap-2 text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>.EMB (Wilcom Master)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>.DST (Tajima / Barudan)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>.PES (Brother / Baby Lock)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>.EXP (Melco / Bernina)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Similar Designs Row */}
        {similarDesigns.length > 0 && (
          <section className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Similar {design.category} Files
              </h3>
              <Link to={`/explore?category=${encodeURIComponent(design.category)}`} className="text-xs font-semibold text-amber-900 hover:underline">
                View all in category
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarDesigns.map((d) => (
                <DesignCard key={d.id} design={d} />
              ))}
            </div>
          </section>
        )}

        {/* More from this Creator */}
        {creatorDesigns.length > 0 && (
          <section className="mt-12 pt-12 border-t border-stone-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                More from {design.sellerName}
              </h3>
              <Link to={`/creator/${design.sellerId}`} className="text-xs font-semibold text-amber-900 hover:underline">
                Visit full studio
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {creatorDesigns.map((d) => (
                <DesignCard key={d.id} design={d} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
