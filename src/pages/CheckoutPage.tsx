import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Download,
  ArrowRight,
  Sparkles,
  CreditCard,
  QrCode,
  Building2,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PurchaseRecord } from '../data/mockData';

export const CheckoutPage: React.FC = () => {
  const { type, id } = useParams<{ type: 'design' | 'collection'; id: string }>();
  const navigate = useNavigate();
  const { designs, collections, addPurchase, showToast } = useApp();

  // Find target item
  const item =
    type === 'collection'
      ? collections.find((c) => c.id === id) || collections[0]
      : designs.find((d) => d.id === id) || designs[0];

  const price = item.price;
  const tax = 0; // Tax row prepared but ₹0 in test mode
  const total = price + tax;

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('manufacturer@okaxis');
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [createdPurchase, setCreatedPurchase] = useState<PurchaseRecord | null>(null);

  const handleSimulatePayment = (forceFail: boolean = false) => {
    setCheckoutState('processing');
    setTimeout(() => {
      if (forceFail) {
        setCheckoutState('failed');
        showToast('Payment Unsuccessful', 'Bank server did not authorize transaction.', 'error');
      } else {
        const purchaseRecord = addPurchase(item, type === 'collection' ? 'collection' : 'design', total);
        setCreatedPurchase(purchaseRecord);
        setCheckoutState('success');
      }
    }, 1400);
  };

  // Payment Success Screen
  if (checkoutState === 'success' && createdPurchase) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-stone-200/90 p-8 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              Payment Confirmed · Test Mode
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Files Ready for Production Download
            </h1>
            <p className="text-xs text-stone-500">
              Order ID: <span className="font-mono font-bold text-stone-800">{createdPurchase.orderNumber}</span>
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 text-left flex items-center gap-4">
            <img
              src={createdPurchase.itemImage}
              alt={createdPurchase.itemTitle}
              className="w-16 h-16 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                {createdPurchase.itemTitle}
              </h4>
              <p className="text-xs text-stone-500">{createdPurchase.category} · {createdPurchase.sellerName}</p>
              <p className="text-xs font-mono font-bold text-stone-900 mt-1">
                ₹{createdPurchase.amountPaid.toLocaleString('en-IN')} Paid
              </p>
            </div>
          </div>

          {/* Download Action List */}
          <div className="text-left space-y-2">
            <h5 className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Instant Machine Downloads:
            </h5>
            <div className="divide-y divide-stone-100 bg-stone-50 rounded-xl p-3 border border-stone-200/60">
              {createdPurchase.downloadUrls.map((dl, i) => (
                <div key={i} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-amber-800" />
                    <span className="font-mono font-medium text-stone-800">{dl.filename}</span>
                  </div>
                  <button
                    onClick={() => showToast('Downloading File', `Starting download of ${dl.filename}`, 'success')}
                    className="text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download ({dl.size})
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              to="/account/purchases"
              className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs transition-colors"
            >
              Go to My Purchases & Downloads
            </Link>
            <Link
              to="/explore"
              className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl text-xs transition-colors"
            >
              Browse More Designs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Payment Failed Screen
  if (checkoutState === 'failed') {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-stone-200/90 p-8 shadow-md text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
            <AlertCircle className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">
              Transaction Failed
            </span>
            <h1 className="font-serif text-2xl font-bold text-stone-900">
              Payment Could Not Be Processed
            </h1>
            <p className="text-xs text-stone-500">
              No amount has been deducted. You can retry using another payment option or UPI ID.
            </p>
          </div>

          <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200 text-left text-xs text-rose-900">
            <strong>Error code:</strong> BANK_TIMEOUT_RETRY_ALLOWED. Your order remains pending in checkout.
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => handleSimulatePayment(false)}
              className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retry Payment (Razorpay Test Mode)
            </button>
            <button
              onClick={() => setCheckoutState('idle')}
              className="w-full py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              Change Payment Method
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Checkout Screen
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Test Mode Top Notice */}
        <div className="bg-amber-50/90 border border-amber-200/90 p-4 rounded-xl flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Marketplace Test Checkout:</strong> Simulated payments via Razorpay/UPI sandbox. No real money charged.
            </span>
          </div>
          <span className="font-mono uppercase font-bold text-[10px] bg-amber-200/80 px-2 py-0.5 rounded">
            Test Mode Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Payment Options (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-stone-200/90 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Payment Method
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>256-Bit Encrypted</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'upi'
                    ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'card'
                    ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Debit / Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'netbanking'
                    ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>NetBanking</span>
              </button>
            </div>

            {/* UPI Details */}
            {paymentMethod === 'upi' && (
              <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200/60 text-xs">
                <label className="font-semibold text-stone-700 block">
                  Enter VPA / UPI ID (Google Pay, PhonePe, Paytm, BHIM)
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@upi or name@okaxis"
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
                <p className="text-[11px] text-stone-500">
                  A payment authorization request will be simulated on your UPI app.
                </p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200/60 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Card Number (Sandbox)</label>
                  <input
                    type="text"
                    disabled
                    value="4111 ···· ···· 1111 (Visa Sandbox)"
                    className="w-full p-2.5 bg-stone-100 border border-stone-300 rounded-lg text-stone-600 font-mono text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Expiry</label>
                    <input
                      type="text"
                      disabled
                      value="12 / 28"
                      className="w-full p-2.5 bg-stone-100 border border-stone-300 rounded-lg text-stone-600 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">CVV</label>
                    <input
                      type="text"
                      disabled
                      value="888"
                      className="w-full p-2.5 bg-stone-100 border border-stone-300 rounded-lg text-stone-600 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/60 text-xs space-y-2">
                <label className="font-semibold text-stone-700 block">Select Indian Bank</label>
                <select className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-800 text-xs">
                  <option>HDFC Bank</option>
                  <option>State Bank of India (SBI)</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-4">
              <button
                disabled={checkoutState === 'processing'}
                onClick={() => handleSimulatePayment(false)}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                {checkoutState === 'processing' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authorizing Razorpay Gateway...
                  </span>
                ) : (
                  <>
                    <span>Pay ₹{total.toLocaleString('en-IN')} (Razorpay Sandbox)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSimulatePayment(true)}
                className="w-full py-2 text-[11px] text-stone-400 hover:text-stone-600 text-center font-medium"
              >
                Simulate Gateway Timeout Failure (Test Retry Flow)
              </button>
            </div>

            {/* Security Guarantee Note */}
            <div className="pt-4 border-t border-stone-100 flex items-center gap-3 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                100% Secure Checkout. Machine files will be instantly bound to your account with free perpetual re-downloads.
              </span>
            </div>

          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="md:col-span-5 bg-white rounded-2xl border border-stone-200/90 p-6 space-y-6">
            <h3 className="font-serif text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
              Order Summary
            </h3>

            {/* Item Card */}
            <div className="flex gap-4 items-start">
              <img
                src={'coverImage' in item ? item.coverImage : item.images[0]}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-200"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-900 block truncate">
                  {item.category}
                </span>
                <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-500 truncate">By {item.sellerName}</p>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-4 border-t border-stone-100 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Base Selling Price</span>
                <span className="font-mono tabular-nums">₹{price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>GST / Tax (Prepared for Live)</span>
                <span className="font-mono tabular-nums">₹0 (Test Mode)</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                <span>Total Amount Due</span>
                <span className="font-mono tabular-nums text-base">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Important requirement: Never show platform commission as an additional buyer charge! */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 text-[11px] text-stone-500 space-y-1">
              <p className="font-semibold text-stone-700">Fair Marketplace Transparency:</p>
              <p>Platform digitizer commissions are covered by the seller. No extra buyer fees or hidden checkout surcharges.</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
