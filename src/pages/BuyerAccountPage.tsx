import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  Heart,
  PackageCheck,
  Shield,
  Sliders,
  LogOut,
  AlertTriangle,
  Check,
  Edit2,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DesignCard } from '../components/common/DesignCard';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import { EmptyState } from '../components/common/EmptyState';
import { MACHINE_OPTIONS } from '../data/mockData';

export const BuyerAccountPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';

  const {
    user,
    designs,
    savedDesignIds,
    purchases,
    updateUserProfile,
    toggleUserRole,
    logout,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'preferences' | 'security'>(
    initialTab === 'saved' ? 'saved' : 'profile'
  );

  // Profile Form Edit state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [companyName, setCompanyName] = useState(user.companyName);
  const [gstNumber, setGstNumber] = useState(user.gstNumber);
  const [location, setLocation] = useState(user.location);
  const [machinePrefs, setMachinePrefs] = useState<string[]>(user.machinePreferences);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const savedDesignsList = designs.filter((d) => savedDesignIds.includes(d.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      companyName,
      gstNumber,
      location,
      machinePreferences: machinePrefs,
    });
  };

  const toggleMachinePref = (m: string) => {
    setMachinePrefs((prev) =>
      prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Delete Account Dialog */}
      <ConfirmationDialog
        isOpen={deleteModalOpen}
        title="Delete Marketplace Account"
        message="This action will permanently delete your account, license tokens, and downloaded design histories. This cannot be undone."
        confirmLabel="Permanently Delete"
        isDestructive={true}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          logout();
          showToast('Account Deleted', 'Your account and data have been removed.', 'info');
        }}
      />

      {/* Header Profile Summary */}
      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-stone-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-stone-900">{user.name}</h1>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                  {user.role === 'seller' ? 'Creator / Studio' : 'Garment Manufacturer'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {user.email} · {user.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleUserRole}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 transition-colors"
            >
              Switch to {user.role === 'seller' ? 'Buyer View' : 'Creator Studio'}
            </button>
            <Link
              to="/account/purchases"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors flex items-center gap-1.5"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              Purchased Files ({purchases.length})
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar Tabs (3 cols) */}
          <aside className="lg:col-span-3 bg-white rounded-xl border border-stone-200/90 p-2 space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                activeTab === 'profile'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <User className="w-4 h-4" />
              Personal & Mill Details
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                activeTab === 'saved'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>Saved Designs</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                activeTab === 'saved' ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-600'
              }`}>
                {savedDesignIds.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                activeTab === 'preferences'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Machine Preferences
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                activeTab === 'security'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              Account & Security
            </button>
          </aside>

          {/* Content Area (9 cols) */}
          <main className="lg:col-span-9 bg-white rounded-2xl border border-stone-200/90 p-8 shadow-xs">
            
            {/* TAB 1: Profile & Mill Details */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    Personal & Manufacturing Details
                  </h2>
                  <p className="text-xs text-stone-500">
                    Information used on your commercial stitch file invoices and creator communications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-stone-700 block">Contact Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-stone-700 block">Registered Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-stone-700 block">Phone / WhatsApp Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-stone-700 block">City / Production Hub</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Surat, Gujarat"
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-stone-700 block">Company / Studio Entity</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-stone-700 block">GSTIN (For Tax Invoices)</label>
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 font-mono focus:outline-none focus:ring-1 focus:ring-amber-700 uppercase"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg text-xs transition-colors shadow-sm"
                  >
                    Save Details
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: Saved Designs (Wishlist) */}
            {activeTab === 'saved' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    Saved Embroidery Designs ({savedDesignsList.length})
                  </h2>
                  <p className="text-xs text-stone-500">
                    Quickly revisit motifs and borders you are planning for upcoming production runs.
                  </p>
                </div>

                {savedDesignsList.length === 0 ? (
                  <EmptyState
                    icon={Heart}
                    title="No saved designs yet"
                    description="Browse our marketplace and click the heart icon on any design card to save it for easy access."
                    actionLabel="Explore Designs"
                    onAction={() => window.location.href = '/explore'}
                  />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedDesignsList.map((d) => (
                      <DesignCard key={d.id} design={d} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Machine Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    Production Machinery Calibrations
                  </h2>
                  <p className="text-xs text-stone-500">
                    Tailors search ranking and recommendations to match your shop-floor embroidery equipment.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {MACHINE_OPTIONS.map((machine) => {
                    const isSelected = machinePrefs.includes(machine);
                    return (
                      <button
                        key={machine}
                        type="button"
                        onClick={() => toggleMachinePref(machine)}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <span>{machine}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-800" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-end">
                  <button
                    onClick={() => {
                      updateUserProfile({ machinePreferences: machinePrefs });
                      showToast('Preferences Saved', 'Updated your machine calibration filter profile.', 'success');
                    }}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg text-xs"
                  >
                    Save Machinery Profile
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: Account & Security */}
            {activeTab === 'security' && (
              <div className="space-y-6 text-xs">
                <div>
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    Account & Security Settings
                  </h2>
                  <p className="text-stone-500">
                    Manage password credentials and account deletion policies.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <h4 className="font-semibold text-stone-900">Change Password</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="p-2.5 bg-white border border-stone-300 rounded-lg"
                    />
                    <input
                      type="password"
                      placeholder="New Password (min. 8 characters)"
                      className="p-2.5 bg-white border border-stone-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Password Updated', 'Your security credentials have been updated.', 'success')}
                    className="px-4 py-2 bg-stone-900 text-white rounded-lg font-semibold"
                  >
                    Update Password
                  </button>
                </div>

                {/* Delete Account */}
                <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-200 space-y-2">
                  <h4 className="font-semibold text-rose-900">Danger Zone</h4>
                  <p className="text-stone-600">
                    Permanently delete your account and all associated purchase tokens.
                  </p>
                  <button
                    type="button"
                    onClick={() => setDeleteModalOpen(true)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Account
                  </button>
                </div>
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
};
