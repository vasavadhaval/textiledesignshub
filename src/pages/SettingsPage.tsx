import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Sliders,
  Trash2,
  CheckCircle2,
  Sparkles,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import { MACHINE_OPTIONS } from '../data/mockData';

export const SettingsPage: React.FC = () => {
  const { user, updateUserProfile, setSettlementMode, logout, showToast } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [bankAccount, setBankAccount] = useState(user.bankAccount);
  const [settlementMode, setLocalSettlementMode] = useState(user.settlementMode);
  const [notifyOnSale, setNotifyOnSale] = useState(true);
  const [notifyOnSettlement, setNotifyOnSettlement] = useState(true);
  const [notifyWeeklyDrop, setNotifyWeeklyDrop] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      bankAccount,
      settlementMode,
    });
    setSettlementMode(settlementMode);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <ConfirmationDialog
        isOpen={deleteModalOpen}
        title="Delete Marketplace Account"
        message="This will permanently delete your account, design archives, and wallet balances. This action is irreversible."
        confirmLabel="Confirm Delete"
        isDestructive={true}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          logout();
        }}
      />

      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Account & Studio Settings
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage your personal profile, notification alerts, and settlement payout accounts.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Section 1: Profile & Entity */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-stone-600" />
              Personal & Studio Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Contact Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-stone-700 block">Mobile Phone / WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full sm:w-1/2 p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Settlement Mode & Bank Payouts */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-stone-600" />
              Settlement Mode & Bank Payout Information
            </h3>

            <div className="space-y-3 text-xs">
              <label className="font-semibold text-stone-700 block">
                Payout Disbursement Mode
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLocalSettlementMode('manual')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    settlementMode === 'manual'
                      ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
                      : 'bg-stone-50 border-stone-200 text-stone-600'
                  }`}
                >
                  <span className="font-bold block">Manual Withdrawal Request</span>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Funds sit in your Available balance until you submit a manual withdrawal.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setLocalSettlementMode('automatic')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    settlementMode === 'automatic'
                      ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
                      : 'bg-stone-50 border-stone-200 text-stone-600'
                  }`}
                >
                  <span className="font-bold block">Automatic Bank Transfer</span>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Funds are automatically transferred on each bi-weekly settlement date.
                  </p>
                </button>
              </div>

              <div className="space-y-1 pt-2">
                <label className="font-semibold text-stone-700 block">
                  Verified Destination Bank Account (NEFT / IMPS)
                </label>
                <input
                  type="text"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Notification Preferences */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-stone-600" />
              Notification Preferences
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 bg-stone-50 rounded-xl cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-900 block">Instant Sale Notifications</span>
                  <span className="text-[11px] text-stone-500">Receive an SMS & WhatsApp alert when a garment mill purchases your design.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyOnSale}
                  onChange={(e) => setNotifyOnSale(e.target.checked)}
                  className="rounded text-amber-800"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-stone-50 rounded-xl cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-900 block">Settlement Release Alerts</span>
                  <span className="text-[11px] text-stone-500">Notifications when settlement cycles transition to available balances.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyOnSettlement}
                  onChange={(e) => setNotifyOnSettlement(e.target.checked)}
                  className="rounded text-amber-800"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-stone-50 rounded-xl cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-900 block">Weekly Textile Design Digest</span>
                  <span className="text-[11px] text-stone-500">Trending motifs, machine punch tips, and export trends.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifyWeeklyDrop}
                  onChange={(e) => setNotifyWeeklyDrop(e.target.checked)}
                  className="rounded text-amber-800"
                />
              </label>
            </div>
          </div>

          {/* Section 4: Danger Zone */}
          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-200 shadow-xs flex items-center justify-between">
            <div>
              <h4 className="font-serif text-sm font-bold text-rose-900">Close Marketplace Account</h4>
              <p className="text-xs text-rose-700 mt-0.5">
                Permanently purge your digitizing studio profile and license certificates.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg"
            >
              Delete Account
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs shadow-sm transition-colors"
            >
              Save All Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
