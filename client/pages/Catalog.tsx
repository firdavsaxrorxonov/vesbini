import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: 'new', key: 'new' as const },
  { id: 'girls-1-6', key: 'girls1to6' as const },
  { id: 'girls-7-10', key: 'girls7to10' as const },
  { id: 'boys-1-6', key: 'boys1to6' as const },
  { id: 'boys-7-10', key: 'boys7to10' as const },
];

// Product data with translations
const productData = [
  {
    id: '1',
    nameUz: 'Malika ko\'ylagi',
    nameRu: 'Платье принцессы',
    image: '/placeholder.svg',
    price: '89,000 UZS',
    priceNumeric: 89000,
    ageRangeUz: '2–4 yosh',
    ageRangeRu: '2–4 года',
    category: 'girls-1-6',
    isNew: true,
    colorsUz: [
      { name: 'Pushti', code: '#FF69B4' },
      { name: 'Moviy', code: '#87CEEB' },
      { name: 'Oq', code: '#FFFFFF' }
    ],
    colorsRu: [
      { name: 'Розовый', code: '#FF69B4' },
      { name: 'Голубой', code: '#87CEEB' },
      { name: 'Белый', code: '#FFFFFF' }
    ],
    sizes: ['86', '92', '98', '104'],
    inStock: true
  },
  {
    id: '2',
    nameUz: 'Sport kostyumi',
    nameRu: 'Спортивный костюм',
    image: '/placeholder.svg',
    price: '125,000 UZS',
    priceNumeric: 125000,
    ageRangeUz: '5–7 yosh',
    ageRangeRu: '5–7 лет',
    category: 'boys-1-6',
    isNew: false,
    colorsUz: [
      { name: 'Ko\'k', code: '#4169E1' },
      { name: 'Qora', code: '#000000' }
    ],
    colorsRu: [
      { name: 'Синий', code: '#4169E1' },
      { name: 'Черный', code: '#000000' }
    ],
    sizes: ['98', '104', '110'],
    inStock: true
  },
  {
    id: '3',
    nameUz: 'Yozgi ko\'ylak',
    nameRu: 'Летнее платье',
    image: '/placeholder.svg',
    price: '69,000 UZS',
    priceNumeric: 69000,
    ageRangeUz: '1–2.5 yosh',
    ageRangeRu: '1–2.5 года',
    category: 'girls-1-6',
    isNew: true,
    colorsUz: [
      { name: 'Sariq', code: '#FFD700' },
      { name: 'Yashil', code: '#32CD32' }
    ],
    colorsRu: [
      { name: 'Желтый', code: '#FFD700' },
      { name: 'Зеленый', code: '#32CD32' }
    ],
    sizes: ['74', '80', '86'],
    inStock: true
  },
  {
    id: '4',
    nameUz: 'Jinsi va futbolka',
    nameRu: 'Джинсы с футболкой',
    image: '/placeholder.svg',
    price: '156,000 UZS',
    priceNumeric: 156000,
    ageRangeUz: '8–10 yosh',
    ageRangeRu: '8–10 лет',
    category: 'boys-7-10',
    isNew: false,
    colorsUz: [
      { name: 'Kulrang', code: '#808080' },
      { name: 'Qora', code: '#000000' }
    ],
    colorsRu: [
      { name: 'Серый', code: '#808080' },
      { name: 'Черный', code: '#000000' }
    ],
    sizes: ['104', '110', '116'],
    inStock: true
  },
  {
    id: '5',
    nameUz: 'Maktab ko\'ylagi',
    nameRu: 'Школьное платье',
    image: '/placeholder.svg',
    price: '145,000 UZS',
    priceNumeric: 145000,
    ageRangeUz: '7–9 yosh',
    ageRangeRu: '7–9 лет',
    category: 'girls-7-10',
    isNew: false,
    isOutOfStock: true,
    colorsUz: [
      { name: 'Ko\'k', code: '#4169E1' },
      { name: 'Oq', code: '#FFFFFF' }
    ],
    colorsRu: [
      { name: 'Синий', code: '#4169E1' },
      { name: 'Белый', code: '#FFFFFF' }
    ],
    sizes: ['104', '110', '116'],
    inStock: false
  },
  {
    id: '6',
    nameUz: 'Qishki kombinezon',
    nameRu: 'Зимний комбинезон',
    image: '/placeholder.svg',
    price: '235,000 UZS',
    priceNumeric: 235000,
    ageRangeUz: '3–5 yosh',
    ageRangeRu: '3–5 лет',
    category: 'boys-1-6',
    isNew: true,
    colorsUz: [
      { name: 'Qizil', code: '#DC143C' },
      { name: 'Ko\'k', code: '#4169E1' }
    ],
    colorsRu: [
      { name: 'Красный', code: '#DC143C' },
      { name: 'Синий', code: '#4169E1' }
    ],
    sizes: ['92', '98', '104'],
    inStock: true
  }
];

export function Catalog() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('new');
  const { addItem, itemCount } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { t, language } = useLanguage();

  // Transform product data based on current language
  const sampleProducts = productData.map(product => ({
    ...product,
    name: language === 'uz' ? product.nameUz : product.nameRu,
    ageRange: language === 'uz' ? product.ageRangeUz : product.ageRangeRu,
    colors: language === 'uz' ? product.colorsUz : product.colorsRu
  }));

  const handleAddToCart = (productId: string) => {
    const product = sampleProducts.find(p => p.id === productId);
    if (product && !product.isOutOfStock) {
      addItem({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        priceNumeric: product.priceNumeric,
        ageRange: product.ageRange
      });
    }
  };

  const handleToggleWishlist = (productId: string) => {
    const product = sampleProducts.find(p => p.id === productId);
    if (product) {
      toggleItem(product);
    }
  };

  const filteredProducts = sampleProducts.filter(product => {
    // Filter by search - search in name and age range
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(searchLower);
      const matchesAge = product.ageRange.toLowerCase().includes(searchLower);
      const matchesId = product.id.includes(searchValue);

      if (!matchesName && !matchesAge && !matchesId) {
        return false;
      }
    }

    // Filter by category
    if (selectedCategory === 'new') {
      return product.isNew;
    }

    return product.category === selectedCategory;
  });

  return (
    <div className="bg-background pb-20">
      <Header
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        cartItemCount={itemCount}
      />
      
      {/* Category Filters */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "whitespace-nowrap text-xs px-4 py-2 rounded-full",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {t[category.key]}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t.productNotFound}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  priceNumeric={product.priceNumeric}
                  ageRange={product.ageRange}
                  colors={product.colors}
                  sizes={product.sizes}
                  isWishlisted={isWishlisted(product.id)}
                  isOutOfStock={product.isOutOfStock}
                  inStock={product.inStock}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
