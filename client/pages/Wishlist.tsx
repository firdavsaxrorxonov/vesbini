import { useState } from "react";
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { ColorSelection } from "@/components/ColorSwatch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


export function Wishlist() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { addItem } = useCart();
  const { items: wishlistItems, removeItem } = useWishlist();
  const { t } = useLanguage();

  const removeFromWishlist = (id: string) => {
    removeItem(id);
  };

  const addToCartFromModal = () => {
    if (selectedItem && selectedColor && selectedSize) {
      addItem({
        id: selectedItem.id,
        name: `${selectedItem.name} (${selectedColor}, ${selectedSize})`,
        image: selectedItem.image,
        price: selectedItem.price,
        priceNumeric: selectedItem.priceNumeric,
        ageRange: selectedItem.ageRange
      });
      setSelectedItem(null);
      setSelectedColor('');
      setSelectedSize('');
    }
  };

  const quickAddToCart = (item: typeof sampleWishlistItems[0]) => {
    if (item.inStock) {
      addItem({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        priceNumeric: item.priceNumeric,
        ageRange: item.ageRange
      });
    }
  };

  if (wishlistItems.length === 0) {
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
            <h1 className="text-xl font-semibold">{t.wishlist}</h1>
          </div>
        </header>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">{t.emptyWishlist}</h2>
          <p className="text-muted-foreground mb-6">
            {t.addToWishlistMessage}
          </p>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90">
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
          <h1 className="text-xl font-semibold">
            {t.wishlist} ({wishlistItems.length})
          </h1>
        </div>
      </header>

      {/* Wishlist Items */}
      <div className="p-4 space-y-4">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setSelectedColor(item.colors[0].name);
                  setSelectedSize(item.sizes[0]);
                }}
                className="flex-shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg bg-muted object-cover"
                />
              </button>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.ageRange}</p>
                    <p className="text-sm font-semibold text-primary">{item.price}</p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromWishlist(item.id)}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(item);
                      setSelectedColor(item.colors[0].name);
                      setSelectedSize(item.sizes[0]);
                    }}
                    className="flex-1 text-xs"
                  >
                    {t.details}
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => quickAddToCart(item)}
                    disabled={!item.inStock}
                    className="bg-primary hover:bg-primary/90 text-xs"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    {item.inStock ? t.addToCart : t.outOfStock}
                  </Button>
                </div>
                
                {!item.inStock && (
                  <p className="text-xs text-destructive">{t.outOfStock}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent
          className="max-w-sm max-h-[90vh] overflow-auto"
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 50
          }}
        >
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.name}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full aspect-square rounded-lg bg-muted object-cover"
                />
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.age}</p>
                    <p className="font-medium">{selectedItem.ageRange}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">{t.color}</p>
                    <ColorSelection
                      colors={selectedItem.colors}
                      selectedColor={selectedColor}
                      onColorSelect={setSelectedColor}
                      showNames={true}
                    />
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t.size}</p>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedItem.sizes.map(size => (
                        <Button
                          key={size}
                          variant={selectedSize === size ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedSize(size)}
                          className="text-xs"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-xl font-bold text-primary">{selectedItem.price}</p>
                  </div>

                  <Button
                    onClick={addToCartFromModal}
                    disabled={!selectedItem.inStock || !selectedColor || !selectedSize}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {selectedItem.inStock ? t.addToCart : t.outOfStock}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
