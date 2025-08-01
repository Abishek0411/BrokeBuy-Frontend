import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import ViewDetails from "./pages/ViewDetails";
import EditListing from "./pages/EditListing";
import Purchases from "./pages/Purchases";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Sell from "./pages/Sell";
import MyListings from "./pages/MyListings";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import SafetyGuidelines from "./pages/SafetyGuidelines";
import HelpCenter from "./pages/HelpCenter";
import ReportIssue from "./pages/ReportIssue";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CommunityGuidelines from "./pages/CommunityGuidelines";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/listings/" element={<Marketplace />} />
                  <Route path="/listings/:id" element={<ViewDetails />} />
                  <Route path="/listings/:id/edit" element={<EditListing />} />
                  <Route path="/purchases" element={<Purchases />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/sell" element={<Sell />} />
                  <Route path="/listings/my-listings" element={<MyListings />} />
                  <Route path="/messages/:listing_id/:receiver_id" element={<Messages />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/safety" element={<SafetyGuidelines />} />
                  <Route path="/help" element={<HelpCenter />} />
                  <Route path="/report" element={<ReportIssue />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/community-guidelines" element={<CommunityGuidelines />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
