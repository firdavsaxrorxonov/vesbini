import { useState } from "react";
import { ArrowLeft, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const productCategories = [
  { id: 'all', key: 'all' as const },
  { id: 'tracksuit', key: 'tracksuit' as const },
  { id: 'sweater', key: 'sweater' as const },
  { id: 'dress', key: 'dress' as const },
  { id: 'tshirt', key: 'tshirt' as const },
  { id: 'pajamas', key: 'pajamas' as const },
];

const ageGroups = [
  { id: 'all', key: 'all' as const },
  { id: '1-3', key: 'age1to3' as const },
  { id: '4-6', key: 'age4to6' as const },
  { id: '7-10', key: 'age7to10' as const },
];

const colors = [
  { name: 'Все', nameUz: 'Hammasi', value: 'all' },
  { name: 'Розовый', nameUz: 'Pushti', value: 'pink' },
  { name: 'Голубой', nameUz: 'Moviy', value: 'blue' },
  { name: 'Белый', nameUz: 'Oq', value: 'white' },
  { name: 'Желтый', nameUz: 'Sariq', value: 'yellow' },
  { name: 'Зеленый', nameUz: 'Yashil', value: 'green' },
  { name: 'Синий', nameUz: 'Ko\'k', value: 'navy' },
  { name: 'Черный', nameUz: 'Qora', value: 'black' },
  { name: 'Красный', nameUz: 'Qizil', value: 'red' },
];

// Product data with translations (same as Catalog)
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
  }
];

export function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { addItem, itemCount } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const { t, language } = useLanguage();

  // Transform product data based on current language for search
  const searchResults = productData.map(product => ({
    ...product,
    name: language === 'uz' ? product.nameUz : product.nameRu,
    ageRange: language === 'uz' ? product.ageRangeUz : product.ageRangeRu,
    colors: language === 'uz' ? product.colorsUz : product.colorsRu,
    // Map categories for search compatibility
    category: product.category.includes('girls') ? 'dress' : 'tracksuit',
    ageGroup: product.ageRangeUz.includes('2–4') || product.ageRangeUz.includes('1–2.5') ? '1-3' : 
             product.ageRangeUz.includes('5–7') || product.ageRangeUz.includes('3–5') ? '4-6' : '7-10',
    color: 'all' // Default color filter
  }));

  const handleAddToCart = (productId: string) => {
    const product = searchResults.find(p => p.id === productId);
    if (product && product.inStock) {
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
    const product = searchResults.find(p => p.id === productId);
    if (product) {
      toggleItem(product);
    }
  };

  const filteredResults = searchResults.filter(product => {
    // Search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(searchLower);
      const matchesAge = product.ageRange.toLowerCase().includes(searchLower);
      
      if (!matchesName && !matchesAge) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Age group filter
    if (selectedAgeGroup !== 'all' && product.ageGroup !== selectedAgeGroup) {
      return false;
    }

    // Price range filter
    if (product.priceNumeric < priceRange[0] || product.priceNumeric > priceRange[1]) {
      return false;
    }

    return true;
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedAgeGroup('all');
    setSelectedColor('all');
    setPriceRange([0, 300000]);
    setSearchValue('');
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedAgeGroup !== 'all', 
    selectedColor !== 'all',
    priceRange[0] !== 0 || priceRange[1] !== 300000
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t.category}</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.allCategories}</SelectItem>
            <SelectItem value="dress">{t.dress}</SelectItem>
            <SelectItem value="tracksuit">{t.tracksuit}</SelectItem>
            <SelectItem value="tshirt">{t.tshirt}</SelectItem>
            <SelectItem value="pajamas">{t.pajamas}</SelectItem>
            <SelectItem value="sweater">{t.sweater}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Age Group Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t.ageGroup}</Label>
        <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.allAges}</SelectItem>
            <SelectItem value="1-3">1-3 {t.years}</SelectItem>
            <SelectItem value="4-6">4-6 {t.years}</SelectItem>
            <SelectItem value="7-10">7-10 {t.years}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Color Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t.color}</Label>
        <Select value={selectedColor} onValueChange={setSelectedColor}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {colors.map(color => (
              <SelectItem key={color.value} value={color.value}>
                {language === 'uz' ? color.nameUz : color.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t.priceRange}</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={300000}
            min={0}
            step={10000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{priceRange[0].toLocaleString()} UZS</span>
            <span>{priceRange[1].toLocaleString()} UZS</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="w-full"
        >
          {t.resetFilters}
        </Button>
      )}
    </div>
  );

  return (
    <div className="bg-background pb-20">
      <Header
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        cartItemCount={itemCount}
        showBackButton
      />

      {/* Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  {t.filters}
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>{t.filters}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Категория: {selectedCategory}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedCategory('all')}
                />
              </Badge>
            )}
            {selectedAgeGroup !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Возраст: {selectedAgeGroup}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedAgeGroup('all')}
                />
              </Badge>
            )}
            {selectedColor !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                Цвет: {colors.find(c => c.value === selectedColor)?.name}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedColor('all')}
                />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-muted-foreground">
            {t.found} {filteredResults.length} {t.products}
          </p>
        </div>

        {filteredResults.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t.noResults}
            </p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="mt-4"
            >
              {t.resetFilters}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredResults.map((product, index) => (
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
                  isOutOfStock={!product.inStock}
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
