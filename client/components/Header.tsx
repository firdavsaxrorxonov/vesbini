import { useState, useEffect } from "react";
import { Search, Bell, Globe, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  cartItemCount?: number;
  isSearchPage?: boolean;
}

export function Header({
  searchValue,
  onSearchChange,
  cartItemCount = 0,
  isSearchPage = false
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [prevCartCount, setPrevCartCount] = useState(cartItemCount);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (cartItemCount > prevCartCount) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 600);
      return () => clearTimeout(timer);
    }
    setPrevCartCount(cartItemCount);
  }, [cartItemCount, prevCartCount]);

  const handleLanguageToggle = () => {
    setLanguage(language === 'uz' ? 'ru' : 'uz');
  };

  const handleSearchFocus = () => {
    if (!isSearchPage) {
      navigate('/search');
    }
  };
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center gap-3 p-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-xl font-bold text-primary">
            Vesbini
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t.search}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={handleSearchFocus}
            className={cn(
              "pl-10 bg-input border-border",
              !isSearchPage && "cursor-pointer"
            )}
            readOnly={!isSearchPage}
          />
        </div>
        
        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLanguageToggle}
            className="h-9 w-9 p-0 hover:bg-secondary transition-colors"
          >
            <Globe className="h-4 w-4" />
          </Button>

          {/* Cart */}
          <Link to="/cart">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 relative hover:bg-secondary transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className={cn(
                  "absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-medium",
                  isPulsing && "cart-badge-pulse"
                )}>
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 relative hover:bg-secondary transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-info text-white rounded-full text-xs flex items-center justify-center">
              2
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
