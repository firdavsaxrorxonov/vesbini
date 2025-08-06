import { useState } from "react";
import { QrCode, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

export function QRCodePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { itemCount } = useCart();
  const { t } = useLanguage();

  return (
    <div className="bg-background pb-20 flex flex-col">
      <Header
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        cartItemCount={itemCount}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
        {/* QR Code */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-48 h-48 bg-white border-4 border-black flex items-center justify-center">
                <QrCode className="h-32 w-32 text-black" />
              </div>
            </button>
          </DialogTrigger>
          
          <DialogContent className="max-w-sm p-6">
            <DialogTitle className="sr-only">
              {t.showQRCode}
            </DialogTitle>
            <div className="bg-white p-6 rounded-xl">
              <div className="w-full aspect-square bg-white border-4 border-black flex items-center justify-center">
                <QrCode className="h-48 w-48 text-black" />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Instructions */}
        <div className="text-center space-y-4 max-w-sm">
          <p className="text-foreground font-medium text-lg">
            {t.showQRCode}
          </p>
          <p className="text-muted-foreground">
            {t.getCashback}
          </p>

          <div className="bg-card border border-border rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-primary">
              {t.howToGetCashback}
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>{t.showBeforePayment}</li>
              <li>{t.cashierScans}</li>
              <li>{t.cashbackAdded}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
