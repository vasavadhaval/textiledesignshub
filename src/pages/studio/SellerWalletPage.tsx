import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Wallet,
  Clock,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  AlertCircle,
  Sparkles,
  Sliders,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Info,
  Building2,
  TrendingUp,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

export const SellerWalletPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'earnings';

  const {
    user,
    wallet,
    earnings,
    settlementCycles,
    withdrawals,
    ledger,
    requestWithdrawal,
    cancelWithdrawal,
    setSettlementMode,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'earnings' | 'settlements' | 'withdrawals' | 'ledger'>(
    initialTab
  );

  // Earnings Filter state
  const [earningStatusFilter, setEarningStatusFilter] = useState<'all' | 'pending' | 'available'>('all');
  const [earningCycleFilter, setEarningCycleFilter] = useState<string>('all');

  // Withdrawal form state
  const [withdrawAmount, setWithdrawAmount] = useState<number>(10000);
  const [selectedBank, setSelectedBank] = useState(user.bankAccount);
  const [withdrawConfirmOpen, setWithdrawConfirmOpen] = useState(false);
  const [expandedLedgerId, setExpandedLedgerId] = useState<string | null>(null);

  // Settlement Mode Switcher
  const handleModeChange = (mode: 'manual' | 'automatic') => {
    setSettlementMode(mode);
  };

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (withdrawAmount < 1000) {
      showToast('Minimum Withdrawal ₹1,000', 'Please enter at least ₹1,000.', 'error');
      return;
    }
    if (withdrawAmount > wallet.available) {
      showToast('Insufficient Balance', 'Requested amount exceeds your available balance.', 'error');
      return;
    }
    setWithdrawConfirmOpen(true);
  };

  const handleConfirmWithdrawal = () => {
    setWithdrawConfirmOpen(false);
    requestWithdrawal(withdrawAmount, selectedBank);
  };

  const filteredEarnings = earnings.filter((e) => {
    if (earningStatusFilter !== 'all' && e.status !== earningStatusFilter) return false;
    if (earningCycleFilter !== 'all' && !e.settlementCycle.includes(earningCycleFilter)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Withdrawal Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={withdrawConfirmOpen}
        title="Confirm Bank Payout Request"
        message={`Are you sure you want to request a payout of ₹${withdrawAmount.toLocaleString('en-IN')} to ${selectedBank}? This amount will be moved from Available to Reserved.`}
        confirmLabel="Confirm & Reserve Amount"
        onCancel={() => setWithdrawConfirmOpen(false)}
        onConfirm={handleConfirmWithdrawal}
      />

      {/* Top Header */}
      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 mb-1">
                <span>Creator Financial Center</span>
                <span aria-hidden="true">·</span>
                <span>Transparent Bi-Weekly Accounting</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Seller Wallet & Settlements
              </h1>
            </div>

            {/* Settlement Mode Switcher */}
            <div className="flex items-center gap-3 bg-stone-100 p-1.5 rounded-xl border border-stone-200 text-xs">
              <span className="font-medium text-stone-600 pl-2">Payout Mode:</span>
              <button
                type="button"
                onClick={() => handleModeChange('manual')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  wallet.settlementMode === 'manual'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Manual Requests
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('automatic')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  wallet.settlementMode === 'automatic'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Automatic Bank Transfer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Test Mode & Settlement Explanation Banner */}
        <div className="p-4 bg-amber-50/90 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-amber-950">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">
                Transparent Settlement Cycle Policy (Test Sandbox Active)
              </strong>
              <p className="text-amber-900/80 mt-0.5 leading-relaxed">
                “Your earning is recorded after purchase, waits until the configured settlement date, and then becomes available or is automatically processed based on your settlement mode.”
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="font-mono text-[11px] bg-amber-200/80 px-2.5 py-1 rounded-md font-bold">
              Next Payout: {wallet.nextSettlementDate}
            </span>
          </div>
        </div>

        {/* 4 Balance Cards per prompt: Pending, Available, Reserved, Paid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Pending */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-wider font-medium text-[10px]">1. Pending Balance</span>
              <span className="p-1 rounded-md bg-amber-50 text-amber-700">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
              ₹{wallet.pending.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
              Waiting for Cycle #49 release on Nov 12
            </p>
          </div>

          {/* Card 2: Available */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2 ring-1 ring-emerald-500/20">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-wider font-medium text-[10px]">2. Available Balance</span>
              <span className="p-1 rounded-md bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-emerald-900">
              ₹{wallet.available.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-100 flex items-center justify-between">
              <span>Ready for withdrawal</span>
              {wallet.settlementMode === 'manual' && (
                <button
                  onClick={() => setActiveTab('withdrawals')}
                  className="font-bold text-amber-900 hover:underline"
                >
                  Request Payout →
                </button>
              )}
            </p>
          </div>

          {/* Card 3: Reserved */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-wider font-medium text-[10px]">3. Reserved Balance</span>
              <span className="p-1 rounded-md bg-stone-100 text-stone-700">
                <Lock className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
              ₹{wallet.reserved.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
              Under payout bank processing
            </p>
          </div>

          {/* Card 4: Paid */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-wider font-medium text-[10px]">4. Total Paid Out</span>
              <span className="p-1 rounded-md bg-stone-100 text-stone-700">
                <Building2 className="w-4 h-4" />
              </span>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-stone-900">
              ₹{wallet.paid.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
              Completed bank transfers
            </p>
          </div>

        </div>

        {/* 4 Wallet Tabs per prompt: Earnings, Settlements/Payouts, Withdrawals, Ledger */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 space-y-6">
          
          {/* Tab Navigation Controls */}
          <div className="flex bg-stone-100 p-1.5 rounded-xl text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('earnings')}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'earnings'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              1. Earnings Breakdown ({earnings.length})
            </button>
            <button
              onClick={() => setActiveTab('settlements')}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'settlements'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              2. Settlement Timeline & Cycles
            </button>
            <button
              onClick={() => setActiveTab('withdrawals')}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'withdrawals'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              3. Bank Payouts / Withdrawals
            </button>
            <button
              onClick={() => setActiveTab('ledger')}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === 'ledger'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              4. Human-Readable Ledger ({ledger.length})
            </button>
          </div>

          {/* TAB 1: EARNINGS UI */}
          {activeTab === 'earnings' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    Product Sales & Royalty Ledger
                  </h3>
                  <p className="text-xs text-stone-500">
                    Showing gross buyer purchase, 15% platform commission deduction, and your net earnings.
                  </p>
                </div>

                {/* Filters for Status & Settlement Cycle */}
                <div className="flex items-center gap-2 text-xs">
                  <select
                    value={earningStatusFilter}
                    onChange={(e) => setEarningStatusFilter(e.target.value as any)}
                    className="p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="available">Available</option>
                  </select>

                  <select
                    value={earningCycleFilter}
                    onChange={(e) => setEarningCycleFilter(e.target.value)}
                    className="p-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800"
                  >
                    <option value="all">All Cycles</option>
                    <option value="49">Cycle #49</option>
                    <option value="48">Cycle #48</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-y border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Design Item</th>
                      <th className="py-3 px-4">Buyer Paid</th>
                      <th className="py-3 px-4">Commission (15%)</th>
                      <th className="py-3 px-4">Seller Net</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Cycle / Scheduled</th>
                      <th className="py-3 px-4">Environment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredEarnings.map((record) => (
                      <tr key={record.id} className="hover:bg-stone-50/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={record.image}
                              alt={record.designName}
                              className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                            />
                            <div>
                              <h5 className="font-serif font-bold text-stone-900 truncate max-w-xs">
                                {record.designName}
                              </h5>
                              <span className="text-[10px] text-stone-400 font-mono">
                                {record.saleDate}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono font-medium text-stone-900">
                          ₹{record.buyerPaid.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>

                        <td className="py-3 px-4 font-mono text-stone-500">
                          -₹{record.commission.toFixed(2)}
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                          +₹{record.netEarning.toFixed(2)}
                        </td>

                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            record.status === 'available'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {record.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-stone-600">
                          <div>{record.settlementCycle}</div>
                          <span className="text-[10px] text-stone-400 font-mono">
                            Release: {record.scheduledSettlementDate}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-mono text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                            {record.environment}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SETTLEMENT UI */}
          {activeTab === 'settlements' && (
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Settlement Timeline & Active Cycles
                </h3>
                <p className="text-xs text-stone-500">
                  Track when your sales transition from waiting periods to available cash balances.
                </p>
              </div>

              {/* Visual Settlement Cycles Timeline */}
              <div className="space-y-6">
                {settlementCycles.map((cycle, idx) => {
                  const isCurrent = cycle.status === 'upcoming';
                  const isProcessing = cycle.status === 'processing';
                  return (
                    <div
                      key={cycle.id}
                      className={`p-6 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'border-amber-300 bg-amber-50/30'
                          : isProcessing
                          ? 'border-emerald-300 bg-emerald-50/20'
                          : 'border-stone-200 bg-white'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              isCurrent
                                ? 'bg-amber-100 text-amber-900'
                                : isProcessing
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-stone-100 text-stone-600'
                            }`}>
                              {cycle.status}
                            </span>
                            <h4 className="font-serif text-base font-bold text-stone-900">
                              {cycle.cyclePeriod}
                            </h4>
                          </div>
                          <p className="text-xs text-stone-500 mt-1">
                            Sales window: {cycle.startDay} to {cycle.endDay} · Scheduled Payout: <strong>{cycle.settlementDate}</strong>
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-mono">
                          <div>
                            <span className="text-stone-400 block text-[10px] uppercase">Sales</span>
                            <span className="font-bold text-stone-900">{cycle.salesCount} Runs</span>
                          </div>
                          <div>
                            <span className="text-stone-400 block text-[10px] uppercase">Amount</span>
                            <span className="font-bold text-stone-900">
                              ₹{(cycle.waitingAmount || cycle.releasedAmount || cycle.paidAmount).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Timeline Graphic */}
                      <div className="mt-4 pt-2">
                        <div className="flex items-center justify-between text-xs font-medium text-stone-600 mb-2">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            1. Purchases Recorded
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className={`w-3.5 h-3.5 ${isCurrent ? 'text-amber-700' : 'text-emerald-700'}`} />
                            2. Cycle Window ({cycle.startDay}–{cycle.endDay})
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Building2 className={`w-3.5 h-3.5 ${cycle.status === 'completed' ? 'text-emerald-700' : 'text-stone-400'}`} />
                            3. Settlement Released ({cycle.settlementDate})
                          </span>
                        </div>

                        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              cycle.status === 'completed'
                                ? 'w-full bg-emerald-600'
                                : cycle.status === 'processing'
                                ? 'w-3/4 bg-emerald-500'
                                : 'w-1/3 bg-amber-500'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanatory rules for digitizers */}
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-2">
                <h4 className="font-semibold text-stone-900">How the Settlement Engine Operates:</h4>
                <ul className="list-disc list-inside space-y-1 text-stone-500">
                  <li>Sales from Days 1–4 are aggregated and released on Day 6.</li>
                  <li>Sales from Days 5–10 are aggregated and released on Day 12.</li>
                  <li>In <strong>Automatic Mode</strong>, released balances are automatically transferred to your designated bank account via NEFT/IMPS.</li>
                  <li>In <strong>Manual Mode</strong>, balances enter Available status, allowing you to withdraw customized sums on demand.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: WITHDRAWALS UI */}
          {activeTab === 'withdrawals' && (
            <div className="space-y-8">
              
              {/* Show based on user.settlementMode */}
              {wallet.settlementMode === 'manual' ? (
                /* Manual Settlement Mode View */
                <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-6">
                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      Request Manual Bank Withdrawal
                    </h3>
                    <p className="text-xs text-stone-500">
                      Transfer available creator royalties directly to your verified Indian bank account.
                    </p>
                  </div>

                  <form onSubmit={handleWithdrawalSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end text-xs">
                    <div className="space-y-1 sm:col-span-1">
                      <label className="font-semibold text-stone-700 block">
                        Withdrawal Sum (Min. ₹1,000)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-stone-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="1000"
                          max={wallet.available}
                          step="500"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                          className="w-full pl-7 pr-3 py-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 font-mono font-bold text-sm focus:outline-none focus:ring-1 focus:ring-amber-700"
                        />
                      </div>
                      <span className="text-[10px] text-stone-500 font-mono">
                        Available: ₹{wallet.available.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="space-y-1 sm:col-span-1">
                      <label className="font-semibold text-stone-700 block">Destination Bank Account</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-stone-800"
                      >
                        <option value={user.bankAccount}>{user.bankAccount}</option>
                        <option value="State Bank of India ending in 9931">SBI ending in 9931</option>
                      </select>
                      <span className="text-[10px] text-stone-500">NEFT / IMPS 24x7</span>
                    </div>

                    <div className="sm:col-span-1">
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        Request Withdrawal
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Automatic Mode View */
                <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-stone-900">
                        Automatic Bank Settlements Active
                      </h3>
                      <p className="text-xs text-stone-600">
                        Manual withdrawal forms are disabled because your account is configured for automatic payouts.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-3 bg-white rounded-xl border border-emerald-200/80">
                      <span className="text-stone-400 block text-[10px] uppercase">Next Scheduled Auto Payout</span>
                      <span className="font-mono font-bold text-stone-900 text-sm">{wallet.nextSettlementDate}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-emerald-200/80">
                      <span className="text-stone-400 block text-[10px] uppercase">Destination Bank</span>
                      <span className="font-medium text-stone-900">{user.bankAccount}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Withdrawal History & Status Timeline */}
              <div className="space-y-4">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Withdrawal & Payout History
                </h4>

                <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden bg-white">
                  {withdrawals.map((wdr) => (
                    <div key={wdr.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-stone-900 text-sm">
                            ₹{wdr.amount.toLocaleString('en-IN')}
                          </span>
                          <span>·</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            wdr.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-800'
                              : wdr.status === 'Processing'
                              ? 'bg-blue-50 text-blue-800'
                              : wdr.status === 'Requested'
                              ? 'bg-amber-50 text-amber-800'
                              : 'bg-stone-100 text-stone-600'
                          }`}>
                            {wdr.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500">
                          {wdr.date} · {wdr.bankAccount} · Ref: <span className="font-mono">{wdr.referenceId}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {wdr.canCancel && (
                          <button
                            onClick={() => cancelWithdrawal(wdr.id)}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg transition-colors"
                          >
                            Cancel Request
                          </button>
                        )}
                        <span className="text-xs text-stone-400 font-mono">
                          {wdr.status === 'Paid' ? 'Transferred' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: HUMAN-READABLE LEDGER UI */}
          {activeTab === 'ledger' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Transaction & Audit Ledger
                </h3>
                <p className="text-xs text-stone-500">
                  Every credit and debit converted into friendly human language with balance bucket tags.
                </p>
              </div>

              <div className="space-y-3">
                {ledger.map((item) => {
                  const isCredit = item.type === 'credit';
                  const isExpanded = expandedLedgerId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isCredit ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {isCredit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-semibold text-xs text-stone-900">
                                {item.label}
                              </h5>
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-100 text-stone-600">
                                {item.bucket} Bucket
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500">{item.itemRef} · {item.dateTime}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className={`font-mono font-bold text-sm tabular-nums ${
                            isCredit ? 'text-emerald-800' : 'text-stone-900'
                          }`}>
                            {isCredit ? '+' : '-'}₹{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </div>
                          <button
                            onClick={() => setExpandedLedgerId(isExpanded ? null : item.id)}
                            className="text-[10px] text-stone-400 hover:text-stone-700 font-mono inline-flex items-center gap-0.5"
                          >
                            <span>Details</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>

                      {/* Expandable technical details */}
                      {isExpanded && (
                        <div className="pt-2 border-t border-stone-100 text-[10px] text-stone-500 font-mono space-y-1 bg-stone-50 p-2.5 rounded-lg">
                          <div>Audit Reference ID: {item.id}</div>
                          <div>Backend Operation Code: <code className="text-amber-800">{item.rawCode}</code></div>
                          <div>State Ledger Anchor: Immutable Double-Entry Timestamp Hash</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
