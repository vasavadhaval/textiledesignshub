/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { DesignDetailsPage } from './pages/DesignDetailsPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AuthPage } from './pages/AuthPage';
import { BuyerAccountPage } from './pages/BuyerAccountPage';
import { PurchasesPage } from './pages/PurchasesPage';
import { StudioDashboardPage } from './pages/studio/StudioDashboardPage';
import { MyDesignsPage } from './pages/studio/MyDesignsPage';
import { AddEditDesignPage } from './pages/studio/AddEditDesignPage';
import { MyCollectionsPage } from './pages/studio/MyCollectionsPage';
import { SellerWalletPage } from './pages/studio/SellerWalletPage';
import { CreatorProfilePage } from './pages/CreatorProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import {
  AboutPage,
  TermsPage,
  PrivacyPage,
  RefundPage,
  HelpCenterPage,
  ContactPage,
  NotFoundPage,
} from './pages/legal/LegalPages';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen text-stone-900 bg-[#FAF8F5]">
          <Header />
          <div className="flex-1">
            <Routes>
              {/* Public Discovery Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/design/:id" element={<DesignDetailsPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/collections/:id" element={<CollectionDetailPage />} />
              <Route path="/creator/:id" element={<CreatorProfilePage />} />

              {/* Checkout & Commerce */}
              <Route path="/checkout/:type/:id" element={<CheckoutPage />} />

              {/* Authentication */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Buyer Account */}
              <Route path="/account" element={<BuyerAccountPage />} />
              <Route path="/account/purchases" element={<PurchasesPage />} />

              {/* Seller Studio */}
              <Route path="/studio" element={<StudioDashboardPage />} />
              <Route path="/studio/designs" element={<MyDesignsPage />} />
              <Route path="/studio/designs/new" element={<AddEditDesignPage />} />
              <Route path="/studio/designs/edit/:id" element={<AddEditDesignPage />} />
              <Route path="/studio/collections" element={<MyCollectionsPage />} />
              <Route path="/studio/wallet" element={<SellerWalletPage />} />

              {/* Settings, Legal & Support */}
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/refund" element={<RefundPage />} />
              <Route path="/help" element={<HelpCenterPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
          <MobileBottomNav />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
