import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DesignItem,
  CollectionItem,
  CreatorItem,
  PurchaseRecord,
  EarningRecord,
  SettlementCycle,
  WithdrawalRequest,
  LedgerItem,
  DESIGNS as INITIAL_DESIGNS,
  COLLECTIONS as INITIAL_COLLECTIONS,
  CREATORS,
  INITIAL_PURCHASES,
  INITIAL_EARNINGS,
  INITIAL_SETTLEMENT_CYCLES,
  INITIAL_WITHDRAWALS,
  INITIAL_LEDGER,
  ASSET_IMAGES,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  avatar: string;
  role: 'buyer' | 'seller';
  machinePreferences: string[];
  settlementMode: 'manual' | 'automatic';
  isLoggedIn: boolean;
  bankAccount: string;
  companyName: string;
  gstNumber: string;
  location: string;
}

interface AppContextType {
  user: UserProfile;
  designs: DesignItem[];
  collections: CollectionItem[];
  creators: CreatorItem[];
  savedDesignIds: string[];
  purchases: PurchaseRecord[];
  wallet: {
    pending: number;
    available: number;
    reserved: number;
    paid: number;
    waitingAmount: number;
    nextSettlementDate: string;
    settlementMode: 'manual' | 'automatic';
  };
  earnings: EarningRecord[];
  settlementCycles: SettlementCycle[];
  withdrawals: WithdrawalRequest[];
  ledger: LedgerItem[];
  toasts: ToastMessage[];
  // Actions
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  toggleSaveDesign: (id: string) => void;
  isSaved: (id: string) => boolean;
  isPurchased: (id: string) => boolean;
  addPurchase: (item: DesignItem | CollectionItem, type: 'design' | 'collection', amount: number) => PurchaseRecord;
  addDesign: (design: Omit<DesignItem, 'id' | 'createdAt' | 'salesCount' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerRating'>) => DesignItem;
  updateDesign: (id: string, updates: Partial<DesignItem>) => void;
  deleteDesign: (id: string) => void;
  addCollection: (collection: Omit<CollectionItem, 'id' | 'createdAt' | 'salesCount' | 'sellerId' | 'sellerName' | 'sellerAvatar'>) => CollectionItem;
  requestWithdrawal: (amount: number, bank: string) => boolean;
  cancelWithdrawal: (id: string) => void;
  setSettlementMode: (mode: 'manual' | 'automatic') => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  toggleUserRole: () => void;
  login: (identifier: string, name?: string) => void;
  logout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    id: 'creator-1',
    name: 'Surat Embroidery Works',
    email: 'digitizing@suratembroidery.in',
    phone: '9825012345',
    countryCode: '+91',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'seller', // Can toggle between seller and buyer for rich previewing
    machinePreferences: ['Multi-head Embroidery', 'Schiffli', 'Ari / Sequence Multi'],
    settlementMode: 'manual',
    isLoggedIn: true,
    bankAccount: 'HDFC Bank ending in 4082',
    companyName: 'Surat Embroidery Digitizing LLP',
    gstNumber: '24AAECS1234E1Z7',
    location: 'Surat, Gujarat',
  });

  const [designs, setDesigns] = useState<DesignItem[]>(() => {
    const saved = localStorage.getItem('tdh_designs');
    return saved ? JSON.parse(saved) : INITIAL_DESIGNS;
  });

  const [collections, setCollections] = useState<CollectionItem[]>(() => {
    const saved = localStorage.getItem('tdh_collections');
    return saved ? JSON.parse(saved) : INITIAL_COLLECTIONS;
  });

  const [savedDesignIds, setSavedDesignIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('tdh_saved_designs');
    return saved ? JSON.parse(saved) : ['des-101', 'des-103'];
  });

  const [purchases, setPurchases] = useState<PurchaseRecord[]>(() => {
    const saved = localStorage.getItem('tdh_purchases');
    return saved ? JSON.parse(saved) : INITIAL_PURCHASES;
  });

  const [wallet, setWallet] = useState({
    pending: 18450,
    available: 42800,
    reserved: 25000,
    paid: 124600,
    waitingAmount: 18450,
    nextSettlementDate: 'Nov 12, 2026',
    settlementMode: 'manual' as 'manual' | 'automatic',
  });

  const [earnings, setEarnings] = useState<EarningRecord[]>(INITIAL_EARNINGS);
  const [settlementCycles] = useState<SettlementCycle[]>(INITIAL_SETTLEMENT_CYCLES);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWALS);
  const [ledger, setLedger] = useState<LedgerItem[]>(INITIAL_LEDGER);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist local state
  useEffect(() => {
    localStorage.setItem('tdh_designs', JSON.stringify(designs));
  }, [designs]);

  useEffect(() => {
    localStorage.setItem('tdh_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('tdh_saved_designs', JSON.stringify(savedDesignIds));
  }, [savedDesignIds]);

  useEffect(() => {
    localStorage.setItem('tdh_purchases', JSON.stringify(purchases));
  }, [purchases]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSaveDesign = (id: string) => {
    setSavedDesignIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Design Removed', 'Removed from your saved designs wishlist.', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Design Saved', 'Added to your saved designs collection.', 'success');
        return [...prev, id];
      }
    });
  };

  const isSaved = (id: string) => savedDesignIds.includes(id);

  const isPurchased = (id: string) => purchases.some((p) => p.itemId === id);

  const addPurchase = (item: DesignItem | CollectionItem, type: 'design' | 'collection', amount: number): PurchaseRecord => {
    const newRecord: PurchaseRecord = {
      id: 'pur-' + Date.now().toString().slice(-4),
      orderNumber: 'ORD-TXH-' + Math.floor(1000 + Math.random() * 9000),
      type,
      itemId: item.id,
      itemTitle: item.title,
      itemImage: 'coverImage' in item ? item.coverImage : (item.images[0] || ASSET_IMAGES.sareeBorder),
      category: item.category,
      sellerName: item.sellerName,
      amountPaid: amount,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      downloadUrls: [
        { format: 'EMB', filename: `${item.title.replace(/\s+/g, '_')}_master.EMB`, size: '5.2 MB' },
        { format: 'DST', filename: `${item.title.replace(/\s+/g, '_')}_industrial.DST`, size: '2.8 MB' },
        { format: 'PES', filename: `${item.title.replace(/\s+/g, '_')}_brother.PES`, size: '2.9 MB' },
        { format: 'PDF', filename: 'Color_Stop_Production_Sheet.PDF', size: '820 KB' },
      ],
    };

    setPurchases((prev) => [newRecord, ...prev]);

    // Also simulate seller earning addition
    const commission = amount * 0.15;
    const netEarning = amount - commission;
    const newEarning: EarningRecord = {
      id: 'earn-' + Date.now().toString().slice(-4),
      designName: item.title,
      image: newRecord.itemImage,
      buyerPaid: amount,
      commission,
      netEarning,
      status: 'pending',
      saleDate: 'Just now',
      settlementCycle: 'Cycle #49 (Nov 5–Nov 10)',
      scheduledSettlementDate: '2026-11-12',
      environment: 'Test Mode',
    };
    setEarnings((prev) => [newEarning, ...prev]);
    setWallet((prev) => ({
      ...prev,
      pending: prev.pending + netEarning,
      waitingAmount: prev.waitingAmount + netEarning,
    }));

    // Add to ledger
    const newLedgerItem: LedgerItem = {
      id: 'led-' + Date.now().toString().slice(-4),
      label: 'Earning added',
      amount: netEarning,
      type: 'credit',
      bucket: 'Pending',
      dateTime: 'Just now',
      itemRef: `Order #${newRecord.orderNumber} (${item.title.slice(0, 24)}...)`,
      rawCode: 'earning_pending_credit',
    };
    setLedger((prev) => [newLedgerItem, ...prev]);

    showToast('Payment Successful', `Order #${newRecord.orderNumber} confirmed. Machine files ready for download.`, 'success');
    return newRecord;
  };

  const addDesign = (designData: Omit<DesignItem, 'id' | 'createdAt' | 'salesCount' | 'sellerId' | 'sellerName' | 'sellerAvatar' | 'sellerRating'>): DesignItem => {
    const newDesign: DesignItem = {
      ...designData,
      id: 'des-' + Date.now().toString().slice(-4),
      sellerId: user.id,
      sellerName: user.name,
      sellerAvatar: user.avatar,
      sellerRating: 5.0,
      salesCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      buyerProtection: 'Production guaranteed on multi-head and single needle machinery.',
    };

    setDesigns((prev) => [newDesign, ...prev]);
    showToast('Design Published', `"${newDesign.title}" is now active in the marketplace.`, 'success');
    return newDesign;
  };

  const updateDesign = (id: string, updates: Partial<DesignItem>) => {
    setDesigns((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
    showToast('Design Updated', 'Changes have been saved to your design listing.', 'success');
  };

  const deleteDesign = (id: string) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
    showToast('Design Deleted', 'The design listing was removed from the marketplace.', 'info');
  };

  const addCollection = (colData: Omit<CollectionItem, 'id' | 'createdAt' | 'salesCount' | 'sellerId' | 'sellerName' | 'sellerAvatar'>): CollectionItem => {
    const newCol: CollectionItem = {
      ...colData,
      id: 'col-' + Date.now().toString().slice(-4),
      sellerId: user.id,
      sellerName: user.name,
      sellerAvatar: user.avatar,
      salesCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCollections((prev) => [newCol, ...prev]);
    showToast('Collection Created', `Collection "${newCol.title}" created with ${newCol.designCount} designs.`, 'success');
    return newCol;
  };

  const requestWithdrawal = (amount: number, bank: string): boolean => {
    if (amount < 1000) {
      showToast('Minimum Withdrawal ₹1,000', 'Please enter at least ₹1,000 for withdrawal.', 'error');
      return false;
    }
    if (amount > wallet.available) {
      showToast('Insufficient Available Balance', `You only have ₹${wallet.available.toLocaleString('en-IN')} available.`, 'error');
      return false;
    }

    const newReq: WithdrawalRequest = {
      id: 'wdr-' + Math.floor(100 + Math.random() * 900),
      amount,
      date: 'Just now',
      status: 'Requested',
      bankAccount: bank || user.bankAccount,
      referenceId: 'REQ-TXH-' + Math.floor(10000 + Math.random() * 90000),
      canCancel: true,
    };

    setWithdrawals((prev) => [newReq, ...prev]);
    setWallet((prev) => ({
      ...prev,
      available: prev.available - amount,
      reserved: prev.reserved + amount,
    }));

    // Ledger record
    const ledgerEntry: LedgerItem = {
      id: 'led-' + Date.now().toString().slice(-4),
      label: 'Withdrawal reserved',
      amount,
      type: 'debit',
      bucket: 'Available',
      dateTime: 'Just now',
      itemRef: `Withdrawal Request #${newReq.id}`,
      rawCode: 'withdrawal_reserve_available_debit',
    };
    setLedger((prev) => [ledgerEntry, ...prev]);

    showToast('Withdrawal Requested', `₹${amount.toLocaleString('en-IN')} reserved for payout processing.`, 'success');
    return true;
  };

  const cancelWithdrawal = (id: string) => {
    const target = withdrawals.find((w) => w.id === id);
    if (!target || !target.canCancel) return;

    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: 'Cancelled', canCancel: false } : w))
    );
    setWallet((prev) => ({
      ...prev,
      available: prev.available + target.amount,
      reserved: prev.reserved - target.amount,
    }));

    const ledgerEntry: LedgerItem = {
      id: 'led-' + Date.now().toString().slice(-4),
      label: 'Withdrawal cancelled',
      amount: target.amount,
      type: 'credit',
      bucket: 'Available',
      dateTime: 'Just now',
      itemRef: `Withdrawal #${target.id} Cancelled`,
      rawCode: 'withdrawal_cancelled_available_credit',
    };
    setLedger((prev) => [ledgerEntry, ...prev]);

    showToast('Withdrawal Cancelled', `₹${target.amount.toLocaleString('en-IN')} returned to your available balance.`, 'info');
  };

  const setSettlementMode = (mode: 'manual' | 'automatic') => {
    setWallet((prev) => ({ ...prev, settlementMode: mode }));
    setUser((prev) => ({ ...prev, settlementMode: mode }));
    showToast('Settlement Mode Updated', `Switched to ${mode === 'automatic' ? 'Automatic Bank Transfer' : 'Manual Payout Request'} mode.`, 'info');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile Updated', 'Your account settings have been saved.', 'success');
  };

  const toggleUserRole = () => {
    setUser((prev) => {
      const newRole = prev.role === 'seller' ? 'buyer' : 'seller';
      showToast(
        newRole === 'seller' ? 'Switched to Creator / Studio Mode' : 'Switched to Buyer Mode',
        newRole === 'seller' ? 'Accessing seller tools, uploads, and wallet.' : 'Browsing as a buyer/manufacturer.',
        'info'
      );
      return { ...prev, role: newRole };
    });
  };

  const login = (identifier: string, name?: string) => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: true,
      email: identifier.includes('@') ? identifier : prev.email,
      phone: !identifier.includes('@') ? identifier : prev.phone,
      name: name || prev.name,
    }));
    showToast('Welcome to Textile Design Hub', 'Signed in successfully.', 'success');
  };

  const logout = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    showToast('Signed Out', 'You have been safely signed out.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        designs,
        collections,
        creators: CREATORS,
        savedDesignIds,
        purchases,
        wallet,
        earnings,
        settlementCycles,
        withdrawals,
        ledger,
        toasts,
        showToast,
        removeToast,
        toggleSaveDesign,
        isSaved,
        isPurchased,
        addPurchase,
        addDesign,
        updateDesign,
        deleteDesign,
        addCollection,
        requestWithdrawal,
        cancelWithdrawal,
        setSettlementMode,
        updateUserProfile,
        toggleUserRole,
        login,
        logout,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
