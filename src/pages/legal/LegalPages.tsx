import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// ABOUT PAGE
export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <div className="bg-white border-b border-stone-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
            <span>Our Heritage & Mission</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Digitizing the Soul of Indian Textiles
          </h1>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Textile Design Hub bridges centuries of master hand-embroidery craftsmanship with modern high-speed industrial embroidery machinery across Surat, Varanasi, Jaipur, Lucknow, and global garment manufacturing capitals.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Why Textile Design Hub?
          </h2>
          <p>
            Industrial embroidery facilities often suffer huge production losses from poorly digitized stitch files—needle breakages, irregular thread loops, fabric puckering, and misaligned sequence placements.
          </p>
          <p>
            Textile Design Hub was founded to establish an uncompromising production quality standard. Every stitch file sold on our platform is created by verified digitizers and validated against real machine constraints before being offered for commercial production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <span className="font-serif text-3xl font-bold text-stone-900 block font-mono">100%</span>
            <p className="text-xs text-stone-500 mt-1">Multi-head test verified punches</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <span className="font-serif text-3xl font-bold text-stone-900 block font-mono">85%</span>
            <p className="text-xs text-stone-500 mt-1">Direct creator royalty payout</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200">
            <span className="font-serif text-3xl font-bold text-stone-900 block font-mono">2,400+</span>
            <p className="text-xs text-stone-500 mt-1">Production embroidery files</p>
          </div>
        </div>

        <div className="bg-stone-900 text-stone-200 p-8 rounded-2xl space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">
            Ready to digitize or manufacture with us?
          </h3>
          <p className="text-xs text-stone-300">
            Explore our machine-ready collection or open your studio to distribute designs worldwide.
          </p>
          <div className="flex gap-3 pt-2">
            <Link
              to="/explore"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-colors"
            >
              Explore All Designs
            </Link>
            <Link
              to="/studio"
              className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-white font-semibold rounded-xl text-xs transition-colors"
            >
              Creator Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// TERMS PAGE
export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Terms of Service & Licensing Agreement
          </h1>
          <p className="text-xs text-stone-500 mt-1">Last revised: November 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-stone-900">1. Commercial Manufacturing License</h3>
            <p>
              When a buyer purchases an embroidery design or collection file (EMB, DST, PES, EXP), they receive a worldwide, perpetual, royalty-free commercial license to manufacture physical garments, sarees, dupattas, and fabrics without quantity limits.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-stone-900">2. Prohibited Digital Redistribution</h3>
            <p>
              Buyers are strictly prohibited from reselling, sub-licensing, sharing, or uploading the underlying digital stitch files (.EMB, .DST, .PES) on third-party forums or file-sharing portals. The license grants physical garment production rights only.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-stone-900">3. Digitizer Warranties</h3>
            <p>
              Creators warrant that all submitted embroidery punches are original works or calibrated reproductions with verified needle paths, density stabilization, and proper trim codes.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-base font-bold text-stone-900">4. Platform Settlement Cycles</h3>
            <p>
              All seller revenues are disbursed in strict accordance with the bi-weekly settlement engine. Platform commission is fixed at 15% and deducted at the source of buyer payment.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

// PRIVACY PAGE
export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-stone-900">Privacy Policy</h1>
          <p className="text-xs text-stone-500 mt-1">Committed to protecting creator and manufacturer data</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <p>
            Textile Design Hub respects the privacy of our designers, boutique buyers, and textile mills. We collect minimal operational data required for payment verification, GST invoicing, and secure digital file delivery.
          </p>
          <h3 className="font-serif text-base font-bold text-stone-900">Data Storage & Protection</h3>
          <p>
            Bank account identifiers and GSTIN numbers are encrypted using 256-bit protocol standards. We do not sell your personal or manufacturing data to third-party advertisers.
          </p>
        </div>
      </div>
    </div>
  );
};

// REFUND PAGE
export const RefundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-stone-900">Refund & Production Guarantee Policy</h1>
          <p className="text-xs text-stone-500 mt-1">Zero thread breaks guarantee</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-emerald-950">Factory Production Guarantee</h4>
              <p className="text-xs text-emerald-900/80 mt-1">
                If any purchased embroidery file experiences corrupted needle code, loop errors, or uncorrected jump breaks on Tajima/Barudan machines, we mandate free revision within 48 hours or full 100% refund.
              </p>
            </div>
          </div>
          <p>
            Due to the digital nature of machine embroidery files (EMB, DST, PES), refund claims must be initiated within 7 calendar days of purchase, accompanied by your machine punch report or sample run photo.
          </p>
        </div>
      </div>
    </div>
  );
};

// HELP CENTER & FAQ
export const HelpCenterPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which machine embroidery formats are included with each purchase?',
      a: 'All listings include the Wilcom Master (.EMB) file with full object properties, Tajima/Barudan industrial (.DST) code, Brother (.PES), and Melco (.EXP), accompanied by a color stop production PDF.',
    },
    {
      q: 'Can I resize or adjust stitch density after purchasing?',
      a: 'Yes! Because the native .EMB Wilcom object file is provided, you or your master puncher can adjust scaling by up to ±20% while Wilcom automatically recalculates stitch density.',
    },
    {
      q: 'How do settlements work for embroidery digitizers?',
      a: 'Settlements follow predictable bi-weekly windows. Sales made in days 1–4 are released on day 6; sales made in days 5–10 are released on day 12. Payouts can be automated or requested manually into any Indian bank account.',
    },
    {
      q: 'Are there hidden buyer checkout fees?',
      a: 'Never. The price you see on the design card is the final price. All digitizer commission fees (15%) are borne on the seller side.',
    },
    {
      q: 'Can I search for designs by uploading my fabric swatch photo?',
      a: 'Yes! Click "Swatch Match" in the search bar or Explore page to upload an embroidery photograph or fabric swatch. Our system will analyze density and motifs to find matching stitch files.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
            <HelpCircle className="w-4 h-4 text-amber-800" />
            <span>Support & Documentation</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Frequently Asked Questions & Help Centre
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-sm font-bold text-stone-900 hover:text-amber-900 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-8 text-center">
          <p className="text-xs text-stone-500 mb-3">Still have machine or licensing questions?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Contact Production Support <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// CONTACT PAGE
export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Digitizing Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message Received', 'Our Surat support desk will respond within 4 hours.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <div className="bg-white border-b border-stone-200 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Contact Production & Studio Support
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Assistance with machine calibrations, custom punches, or seller payouts.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-6 text-xs text-stone-600">
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3">
              <h4 className="font-serif text-sm font-bold text-stone-900">Support Hubs</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>Ring Road Textile Market, Surat, Gujarat 395002</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>support@textiledesignhub.in</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>+91 98250 12345 (Mon–Sat, 9am–7pm IST)</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-1">
              <span className="font-semibold block">Need Custom Machine Digitizing?</span>
              <p className="text-[11px] leading-relaxed">
                Connect directly with our master digitizers for bespoke Banarasi zaris or Schiffli lace punching.
              </p>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900">Message Dispatched</h4>
                <p className="text-xs text-stone-500">
                  Our technical digitizing team will review your query and contact you promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Rajesh Patel"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="rajesh@omkartextiles.in"
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">Subject / Machine Model</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-800"
                  >
                    <option>Digitizing Inquiry</option>
                    <option>Tajima / Barudan Machine Punch Calibration</option>
                    <option>Seller Payout & Settlement Question</option>
                    <option>Custom Bridal Lehenga Commission</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 block">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your embroidery requirements or issue..."
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

// 404 NOT FOUND PAGE
export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] bg-[#FAF8F5] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <span className="font-serif text-5xl font-bold text-amber-900 block font-mono">404</span>
        <h2 className="font-serif text-2xl font-bold text-stone-900">Design Not Found</h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          The requested stitch file, collection suite, or creator profile could not be located in our production registry.
        </p>
        <div className="pt-2">
          <Link
            to="/explore"
            className="px-6 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 inline-block transition-colors"
          >
            Explore Active Designs
          </Link>
        </div>
      </div>
    </div>
  );
};
