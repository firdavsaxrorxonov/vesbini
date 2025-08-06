import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Comprehensive ResizeObserver error suppression
const suppressResizeObserverError = (originalMethod: any) => {
  return (...args: any[]) => {
    const message = args[0];
    if (typeof message === 'string' &&
        (message.includes('ResizeObserver loop') ||
         message.includes('ResizeObserver loop completed') ||
         message.includes('undelivered notifications') ||
         message.includes('ResizeObserver'))) {
      return;
    }
    originalMethod(...args);
  };
};

// Apply suppression to multiple console methods
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

console.error = suppressResizeObserverError(originalError);
console.warn = suppressResizeObserverError(originalWarn);

// Also handle window error events
window.addEventListener('error', (event) => {
  if (event.message && event.message.includes('ResizeObserver')) {
    event.preventDefault();
    event.stopPropagation();
  }
});

// Handle unhandled promise rejections that might contain ResizeObserver errors
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && typeof event.reason === 'string' && event.reason.includes('ResizeObserver')) {
    event.preventDefault();
  }
});
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { BottomNavigation } from "./components/BottomNavigation";
import { Catalog } from "./pages/Catalog";
import { Search } from "./pages/Search";
import { QRCodePage } from "./pages/QRCode";
import { Profile } from "./pages/Profile";
import { Wishlist } from "./pages/Wishlist";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import NotFound from "./pages/NotFound";

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen max-h-screen bg-background flex justify-center overflow-hidden">
      <div className="w-full max-w-md relative overflow-y-auto">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/search" element={<Search />} />
          <Route path="/qr" element={<QRCodePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <BottomNavigation />
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
