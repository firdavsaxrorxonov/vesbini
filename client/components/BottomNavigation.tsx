import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  QrCode,
  User,
  Heart
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    path: "/",
    icon: ShoppingBag,
    key: "catalog" as const
  },
  {
    path: "/qr",
    icon: QrCode,
    key: "qrCode" as const
  },
  {
    path: "/profile",
    icon: User,
    key: "profile" as const
  },
  {
    path: "/wishlist",
    icon: Heart,
    key: "wishlist" as const
  }
];

export function BottomNavigation() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <nav
      className="bg-nav-background border-t border-border"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        maxWidth: '448px',
        margin: '0 auto',
        zIndex: 50
      }}
    >
      <div className="flex items-center justify-around py-2 px-4">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1 transition-colors",
                isActive
                  ? "text-nav-active"
                  : "text-nav-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium truncate">
                {t[item.key]}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
