import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useApp();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Textile Digest', 'You will receive weekly releases and digitizing tips.', 'success');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-stone-800/80 bg-stone-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-100">Production Guaranteed</h4>
                <p className="text-xs text-stone-400 mt-0.5">All files pre-tested on industrial multi-head looms for zero-loop errors.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-100">Multi-Format Included</h4>
                <p className="text-xs text-stone-400 mt-0.5">Instant downloads with original EMB source plus DST, PES, and EXP.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-100">Transparent Settlements</h4>
                <p className="text-xs text-stone-400 mt-0.5">Clear bi-weekly cycles with no hidden fees or unexpected buyer deductions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-100">Digitizer Support</h4>
                <p className="text-xs text-stone-400 mt-0.5">Direct communication with master digitizers in Surat, Varanasi & Jaipur.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-800 text-amber-400 flex items-center justify-center font-serif text-base font-bold ring-1 ring-amber-400/20">
                T
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                Textile Design Hub
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              The premier marketplace connecting Indian textile master digitizers with garment manufacturers, boutique designers, and embroidery production houses across the globe.
            </p>

            {/* Newsletter */}
            <div className="pt-2 max-w-sm">
              <h5 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-2">
                Weekly Design Drop
              </h5>
              {subscribed ? (
                <p className="text-xs text-emerald-400 font-medium">
                  ✓ You are subscribed to weekly masterwork releases.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter manufacturer email..."
                    className="flex-1 bg-stone-800/90 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors flex items-center gap-1"
                  >
                    Join
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Explore Categories */}
          <div>
            <h5 className="text-xs font-semibold text-stone-100 uppercase tracking-wider mb-4">
              Design Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/explore?category=Saree+Borders" className="hover:text-amber-200 transition-colors">
                  Saree Borders & Patti
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Bridal+Lehenga" className="hover:text-amber-200 transition-colors">
                  Bridal Lehenga Panels
                </Link>
              </li>
              <li>
                <Link to="/explore?category=All-over+Jaal" className="hover:text-amber-200 transition-colors">
                  All-over Sequin & Zari Jaal
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Blouse+&+Neckline" className="hover:text-amber-200 transition-colors">
                  Blouse & Necklines
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Floral+&+Motifs" className="hover:text-amber-200 transition-colors">
                  Lucknowi Chikan Motifs
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Lace+&+Patti" className="hover:text-amber-200 transition-colors">
                  Schiffli Chemical Lace
                </Link>
              </li>
            </ul>
          </div>

          {/* Machine Compatibility */}
          <div>
            <h5 className="text-xs font-semibold text-stone-100 uppercase tracking-wider mb-4">
              Machine Compatibility
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/explore?machine=Multi-head+Embroidery" className="hover:text-amber-200 transition-colors">
                  Tajima Industrial Multi-Head
                </Link>
              </li>
              <li>
                <Link to="/explore?machine=Multi-head+Embroidery" className="hover:text-amber-200 transition-colors">
                  Barudan 9 & 12 Needle
                </Link>
              </li>
              <li>
                <Link to="/explore?machine=Schiffli" className="hover:text-amber-200 transition-colors">
                  Schiffli Chemical Looms
                </Link>
              </li>
              <li>
                <Link to="/explore?machine=Ari+/+Sequence+Multi" className="hover:text-amber-200 transition-colors">
                  Dual-Sequence 3mm/5mm
                </Link>
              </li>
              <li>
                <Link to="/explore?machine=Single+Head" className="hover:text-amber-200 transition-colors">
                  Brother & Janome Boutique
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio & Legal */}
          <div>
            <h5 className="text-xs font-semibold text-stone-100 uppercase tracking-wider mb-4">
              Creators & Support
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/studio" className="hover:text-amber-200 transition-colors text-amber-400 font-medium">
                  My Studio Workspace
                </Link>
              </li>
              <li>
                <Link to="/studio/wallet" className="hover:text-amber-200 transition-colors">
                  Wallet & Payouts
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-200 transition-colors">
                  About Textile Hub
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-amber-200 transition-colors">
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-amber-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-amber-200 transition-colors">
                  Refund & Guarantee Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright only, no mechanical telemetry or fake engines */}
        <div className="mt-14 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Textile Design Hub. Dedicated to Indian Textile & Embroidery Digitizing.</p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-stone-300 transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/privacy" className="hover:text-stone-300 transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/refund" className="hover:text-stone-300 transition-colors">Refunds</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-stone-300 transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
