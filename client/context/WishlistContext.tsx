import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: string;
  priceNumeric: number;
  ageRange: string;
  colors: Array<{ name: string; code?: string }>;
  sizes: string[];
  inStock: boolean;
}

interface WishlistContextType {
  items: WishlistItem[];
  itemCount: number;
  isWishlisted: (id: string) => boolean;
  addItem: (product: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (product: WishlistItem) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vesbini-wishlist');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const itemCount = items.length;

  // Save to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vesbini-wishlist', JSON.stringify(items));
    }
  }, [items]);

  const isWishlisted = (id: string) => {
    return items.some(item => item.id === id);
  };

  const addItem = (product: WishlistItem) => {
    setItems(current => {
      const existingItem = current.find(item => item.id === product.id);
      if (existingItem) {
        return current; // Item already in wishlist
      }
      return [...current, product];
    });
  };

  const removeItem = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const toggleItem = (product: WishlistItem) => {
    if (isWishlisted(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      itemCount,
      isWishlisted,
      addItem,
      removeItem,
      toggleItem,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
