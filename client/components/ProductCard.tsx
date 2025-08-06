import { useState } from "react";
import { Plus, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ColorSelection } from "@/components/ColorSwatch";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  priceNumeric: number;
  ageRange: string;
  colors?: Array<{ name: string; code?: string }>;
  sizes?: string[];
  isWishlisted?: boolean;
  isOutOfStock?: boolean;
  inStock?: boolean;
  onAddToCart: (id: string) => void;
  onToggleWishlist: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  image,
  price,
  priceNumeric,
  ageRange,
  colors = [],
  sizes = [],
  isWishlisted = false,
  isOutOfStock = false,
  inStock = true,
  onAddToCart,
  onToggleWishlist
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { t } = useLanguage();

  const handleAddToCart = () => {
    if (!isOutOfStock && !isAdding) {
      setIsAdding(true);
      onAddToCart(id);
      setTimeout(() => setIsAdding(false), 300);
    }
  };

  const openModal = () => {
    if (colors.length > 0) setSelectedColor(colors[0].name);
    if (sizes.length > 0) setSelectedSize(sizes[0]);
    setShowModal(true);
  };

  const addToCartFromModal = () => {
    if (selectedColor && selectedSize && !isOutOfStock) {
      onAddToCart(id);
      setShowModal(false);
      setSelectedColor('');
      setSelectedSize('');
    }
  };
  return (
    <div
      className={cn(
        "bg-product-background border border-product-border rounded-xl p-3 card-hover",
        isOutOfStock ? "opacity-50 grayscale" : "hover:border-primary/50"
      )}
    >
      {/* Product Image */}
      <div className="relative mb-3 overflow-hidden rounded-lg bg-muted aspect-square">
        <button
          onClick={openModal}
          className="w-full h-full block"
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </button>
        
        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(id)}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full transition-all btn-press",
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-black/20 text-white hover:bg-black/40"
          )}
          disabled={isOutOfStock}
        >
          <Heart 
            className="h-4 w-4" 
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-foreground line-clamp-2 text-sm">
          {name}
        </h3>
        
        <div className="text-xs text-muted-foreground">
          {ageRange}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-semibold text-primary text-sm">
            {price}
          </span>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isOutOfStock || isAdding}
            className={cn(
              "h-8 w-8 p-0 rounded-full bg-primary hover:bg-primary/90 transition-all",
              isAdding && "btn-success-flash"
            )}
          >
            {isAdding ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      {isOutOfStock && (
        <div className="mt-2 text-center text-xs text-destructive font-medium">
          Нет в наличии
        </div>
      )}

      {/* Product Detail Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
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
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <img
              src={image}
              alt={name}
              className="w-full aspect-square rounded-lg bg-muted object-cover"
            />

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.age}</p>
                <p className="font-medium">{ageRange}</p>
              </div>

              {colors.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">{t.color}</p>
                  <ColorSelection
                    colors={colors}
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                    showNames={true}
                  />
                </div>
              )}

              {sizes.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{t.size}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map(size => (
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
              )}

              <div className="border-t pt-3">
                <p className="text-xl font-bold text-primary">{price}</p>
              </div>

              <Button
                onClick={addToCartFromModal}
                disabled={isOutOfStock || (colors.length > 0 && !selectedColor) || (sizes.length > 0 && !selectedSize)}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isOutOfStock ? t.outOfStock : t.addToCart}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
