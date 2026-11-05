import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Layers,
  UploadCloud,
  FolderPlus,
  Wallet,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  BarChart3,
  FileCode,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudioDashboardPage: React.FC = () => {
  const { user, designs, collections, wallet, earnings } = useApp();
  const navigate = useNavigate();

  const myDesigns = designs.filter((d) => d.sellerId === user.id);
  const myCollections = collections.filter((c) => c.sellerId === user.id);
  const totalSalesCount = myDesigns.reduce((acc, d) => acc + d.salesCount, 0);

  const topSellingDesigns = [...myDesigns]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Studio Banner */}
      <div className="bg-stone-900 text-stone-100 border-b border-stone-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400/40"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {user.name}
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                    Verified Studio
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-1">
                  {user.location} · Surat Embroidery Multi-head Digitizing Workspace
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/studio/designs/new"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <UploadCloud className="w-4 h-4" />
                Upload New Design
              </Link>
              <Link
                to="/studio/collections"
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold rounded-xl text-xs flex items-center gap-1.5 border border-stone-700 transition-colors"
              >
                <FolderPlus className="w-4 h-4" />
                Create Collection
              </Link>
              <Link
                to="/studio/wallet"
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold rounded-xl text-xs flex items-center gap-1.5 border border-stone-700 transition-colors"
              >
                <Wallet className="w-4 h-4 text-emerald-400" />
                Open Wallet
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Studio Sub-navigation bar */}
        <div className="bg-white p-2 rounded-xl border border-stone-200/90 flex flex-wrap items-center gap-2 text-xs font-semibold">
          <Link
            to="/studio"
            className="px-4 py-2 rounded-lg bg-stone-900 text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/studio/designs"
            className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100"
          >
            My Designs ({myDesigns.length})
          </Link>
          <Link
            to="/studio/collections"
            className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100"
          >
            Collections ({myCollections.length})
          </Link>
          <Link
            to="/studio/wallet"
            className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100 flex items-center gap-1.5"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
            Wallet & Settlement Timeline
          </Link>
        </div>

        {/* 4 Financial & Metric Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-wider font-medium text-[10px]">Available Balance</span>
              <span className="p-1 rounded-md bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
              ₹{wallet.available.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1 border-t border-stone-100">
              <span>Ready for payout</span>
              <Link to="/studio/wallet?tab=withdrawals" className="text-amber-900 font-semibold hover:underline">
                Withdraw →
              </Link>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-wider font-medium text-[10px]">Waiting Settlement</span>
              <span className="p-1 rounded-md bg-amber-50 text-amber-700">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-amber-900">
              ₹{wallet.waitingAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1 border-t border-stone-100">
              <span>Next: {wallet.nextSettlementDate}</span>
              <span className="text-[10px] font-mono text-stone-400">Cycle #49</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-wider font-medium text-[10px]">Total Sales Volume</span>
              <span className="p-1 rounded-md bg-blue-50 text-blue-700">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
              {totalSalesCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
              Across {myDesigns.length} active machine designs
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-wider font-medium text-[10px]">Lifetime Paid Out</span>
              <span className="p-1 rounded-md bg-stone-100 text-stone-700">
                <DollarSign className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
              ₹{wallet.paid.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
              Credited to {user.bankAccount}
            </div>
          </div>

        </div>

        {/* Studio Content Split: Recent Sales Left, Top Selling Designs Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Recent Sales Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/90 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Recent Design Royalties
                </h3>
                <p className="text-xs text-stone-500">
                  Real-time sales credited to your pending & available buckets.
                </p>
              </div>
              <Link to="/studio/wallet" className="text-xs font-semibold text-amber-900 hover:underline">
                View All Ledger Entries
              </Link>
            </div>

            <div className="divide-y divide-stone-100">
              {earnings.slice(0, 4).map((earning) => (
                <div key={earning.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={earning.image}
                      alt={earning.designName}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif text-xs font-bold text-stone-900 truncate">
                        {earning.designName}
                      </h4>
                      <p className="text-[11px] text-stone-500">{earning.saleDate} · {earning.settlementCycle}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold font-mono tabular-nums text-emerald-800">
                      +₹{earning.netEarning.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                      earning.status === 'available'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {earning.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Designs (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/90 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Top Performing Designs
              </h3>
              <Link to="/studio/designs" className="text-xs font-semibold text-amber-900 hover:underline">
                Manage ({myDesigns.length})
              </Link>
            </div>

            <div className="space-y-3">
              {topSellingDesigns.map((d, idx) => (
                <div key={d.id} className="p-3 rounded-xl border border-stone-100 bg-stone-50/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <img
                      src={d.images[0]}
                      alt={d.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h5 className="font-serif text-xs font-bold text-stone-900 truncate">
                        {d.title}
                      </h5>
                      <span className="text-[10px] text-stone-500">
                        {d.stitches.toLocaleString()} stitches · {d.machine}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold font-mono text-stone-900 block">
                      {d.salesCount} runs
                    </span>
                    <span className="text-[10px] text-stone-500">₹{d.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/studio/designs/new"
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <UploadCloud className="w-4 h-4" />
                Upload Next Design File
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
