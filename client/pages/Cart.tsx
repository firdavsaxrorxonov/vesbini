import { useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const regions = [
  "Ташкент",
  "Самарканд", 
  "Бухара",
  "Андижан",
  "Наманган",
  "Фергана",
  "Навои",
  "Джизак",
  "Сырдарья",
  "Кашкадарья",
  "Сурхандарья",
  "Хорезм",
  "Каракалпакстан"
];

export function Cart() {
  const { items, itemCount, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { t } = useLanguage();
  const [deliveryMethod, setDeliveryMethod] = useState("courier");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [notes, setNotes] = useState("");

  const deliveryFee = deliveryMethod === "courier" ? 20000 : 0;
  const finalTotal = totalPrice + deliveryFee;
  const cashback = paymentMethod === "card" ? Math.floor(finalTotal * 0.02) : 0;

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Here you would typically send order to backend
    alert(`Заказ оформлен! Общая сумма: ${finalTotal.toLocaleString()} UZS. Кэшбэк: ${cashback.toLocaleString()} UZS`);
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background border-b border-border">
          <div className="flex items-center gap-3 p-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">{t.cart}</h1>
          </div>
        </header>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
          <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center mb-8 shadow-lg">
            <div className="text-5xl">🛒</div>
          </div>
          <h2 className="text-2xl font-semibold mb-3">{t.emptyCart}</h2>
          <p className="text-muted-foreground mb-8 max-w-sm">
            {t.addProductsToCart}
          </p>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-full">
              {t.goToCatalog}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">{t.cart} ({itemCount})</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg bg-muted object-cover"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.ageRange}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <span className="font-semibold text-sm">
                      {(item.priceNumeric * item.quantity).toLocaleString()} UZS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Options */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <h3 className="font-semibold">{t.deliveryMethod}</h3>
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="courier" id="courier" />
              <Label htmlFor="courier" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <span>{t.courier}</span>
                  <span className="text-primary font-medium">+20,000 UZS</span>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <span>{t.pickup}</span>
                  <span className="text-muted-foreground">{t.free}</span>
                </div>
              </Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="region">{t.region}</Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder={t.selectRegion} />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <h3 className="font-semibold">{t.paymentMethod}</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex-1 cursor-pointer">
                <div>
                  <div>{t.card}</div>
                  <div className="text-xs text-primary">
                    {t.cashback}
                  </div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex-1 cursor-pointer">
                <div>
                  <div>{t.cash}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.showBeforePayment}
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">{t.notes}</Label>
          <Textarea
            id="notes"
            placeholder={t.orderNotes}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="resize-none"
            rows={3}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h3 className="font-semibold">{t.total}</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{t.items} ({itemCount})</span>
              <span>{totalPrice.toLocaleString()} UZS</span>
            </div>

            {deliveryMethod === "courier" && (
              <div className="flex justify-between">
                <span>{t.delivery}</span>
                <span>{deliveryFee.toLocaleString()} UZS</span>
              </div>
            )}

            <div className="border-t border-border pt-2 flex justify-between font-semibold">
              <span>{t.total}</span>
              <span>{finalTotal.toLocaleString()} UZS</span>
            </div>

            {cashback > 0 && (
              <div className="flex justify-between text-primary">
                <span>{t.cashback}</span>
                <span>+{cashback.toLocaleString()} UZS</span>
              </div>
            )}
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          disabled={!selectedRegion}
          className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-semibold"
        >
          {t.checkout}
        </Button>
      </div>
    </div>
  );
}
