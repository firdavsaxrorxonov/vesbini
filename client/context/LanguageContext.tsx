import { createContext, useContext, useState, ReactNode } from "react";

export type Language = 'uz' | 'ru';

interface Translations {
  // Navigation
  catalog: string;
  qrCode: string;
  profile: string;
  wishlist: string;
  cart: string;
  
  // Common
  search: string;
  add: string;
  remove: string;
  cancel: string;
  confirm: string;
  save: string;
  edit: string;
  delete: string;
  back: string;
  next: string;
  done: string;
  loading: string;
  error: string;
  success: string;
  
  // Auth
  welcome: string;
  fullName: string;
  phoneNumber: string;
  country: string;
  region: string;
  enterName: string;
  enterPhone: string;
  selectCountry: string;
  selectRegion: string;
  enterRegion: string;
  continue: string;
  verification: string;
  verificationCode: string;
  enterCode: string;
  verify: string;
  changePhone: string;
  demoCode: string;
  createAccount: string;
  termsAccept: string;
  codeSent: string;
  invalidCode: string;
  invalidPhone: string;
  
  // Products
  addToCart: string;
  addToWishlist: string;
  removeFromWishlist: string;
  outOfStock: string;
  inStock: string;
  price: string;
  age: string;
  color: string;
  size: string;
  quantity: string;
  details: string;
  
  // Categories
  new: string;
  girls1to6: string;
  girls7to10: string;
  boys1to6: string;
  boys7to10: string;
  
  // Cart
  emptyCart: string;
  cartEmpty: string;
  addProductsToCart: string;
  goToCatalog: string;
  checkout: string;
  deliveryMethod: string;
  paymentMethod: string;
  courier: string;
  pickup: string;
  card: string;
  cash: string;
  notes: string;
  orderNotes: string;
  total: string;
  items: string;
  delivery: string;
  cashback: string;
  orderPlaced: string;
  
  // Profile
  myOrders: string;
  myBonuses: string;
  feedback: string;
  ourAddress: string;
  editInfo: string;
  logout: string;
  member: string;
  orders: string;
  spent: string;
  bonuses: string;
  achievements: string;
  
  // Wishlist
  emptyWishlist: string;
  wishlistEmpty: string;
  addToWishlistMessage: string;
  
  // QR
  showQRCode: string;
  getCashback: string;
  qrInstructions: string;
  howToGetCashback: string;
  showBeforePayment: string;
  cashierScans: string;
  cashbackAdded: string;
  
  // Errors
  productNotFound: string;
  serverError: string;
  networkError: string;
  
  // Time
  year: string;
  years: string;
  old: string;

  // Additional
  uploadPhoto: string;
  free: string;
  deliveryFee: string;

  // Search and filters
  searchResults: string;
  filters: string;
  clearFilters: string;
  category: string;
  allCategories: string;
  ageGroup: string;
  allAges: string;
  priceRange: string;
  noResults: string;
  resetFilters: string;
  found: string;
  products: string;

  // Product categories
  tracksuit: string;
  sweater: string;
  dress: string;
  tshirt: string;
  pajamas: string;
}

const translations: Record<Language, Translations> = {
  uz: {
    // Navigation
    catalog: "Katalog",
    qrCode: "QR kod",
    profile: "Profil",
    wishlist: "Sevimlilar",
    cart: "Savatcha",
    
    // Common
    search: "Qidiruv...",
    add: "Qo'shish",
    remove: "O'chirish",
    cancel: "Bekor qilish",
    confirm: "Tasdiqlash",
    save: "Saqlash",
    edit: "Tahrirlash",
    delete: "O'chirish",
    back: "Orqaga",
    next: "Keyingi",
    done: "Tayyor",
    loading: "Yuklanmoqda...",
    error: "Xatolik",
    success: "Muvaffaqiyat",
    
    // Auth
    welcome: "Xush kelibsiz!",
    fullName: "To'liq ism",
    phoneNumber: "Telefon raqam",
    country: "Mamlakat",
    region: "Viloyat",
    enterName: "Ismingizni kiriting",
    enterPhone: "Telefon raqamingizni kiriting",
    selectCountry: "Mamlakatni tanlang",
    selectRegion: "Viloyatni tanlang",
    enterRegion: "Viloyatingizni kiriting",
    continue: "Davom etish",
    verification: "Tasdiqlash",
    verificationCode: "Tasdiqlash kodi",
    enterCode: "4 xonali kodni kiriting",
    verify: "Tasdiqlash",
    changePhone: "Telefon raqamni o'zgartirish",
    demoCode: "Demo kod: 1234",
    createAccount: "Xarid qilish uchun akkaunt yarating",
    termsAccept: "Davom etib, siz foydalanish shartlariga rozilik bildirasiz",
    codeSent: "SMS kod yuborildi",
    invalidCode: "Noto'g'ri tasdiqlash kodi",
    invalidPhone: "Telefon raqam formati noto'g'ri",
    
    // Products
    addToCart: "Savatchaga",
    addToWishlist: "Sevimlilar",
    removeFromWishlist: "Sevimlilardan o'chirish",
    outOfStock: "Mavjud emas",
    inStock: "Mavjud",
    price: "Narx",
    age: "Yosh",
    color: "Rang",
    size: "O'lcham",
    quantity: "Miqdor",
    details: "Tafsilotlar",
    
    // Categories
    new: "Yangi",
    girls1to6: "Qizlar 1–6 yosh",
    girls7to10: "Qizlar 7–10 yosh",
    boys1to6: "O'g'il bolalar 1–6 yosh",
    boys7to10: "O'g'il bolalar 7–10 yosh",
    
    // Cart
    emptyCart: "Savatcha bo'sh",
    cartEmpty: "Savatcha bo'sh",
    addProductsToCart: "Buyurtma berish uchun katalogdan mahsulotlar qo'shing",
    goToCatalog: "Katalogga o'tish",
    checkout: "Buyurtma qilish",
    deliveryMethod: "Yetkazib berish usuli",
    paymentMethod: "To'lov usuli",
    courier: "Kuryer/Pochta",
    pickup: "O'zim olib ketaman",
    card: "Karta (Payme / Click)",
    cash: "Naqd pul",
    notes: "Buyurtmaga izoh",
    orderNotes: "Qo'shimcha tilaklar...",
    total: "Jami",
    items: "Mahsulotlar",
    delivery: "Yetkazib berish",
    cashback: "🎁 Keshbek 2%",
    orderPlaced: "Buyurtma qabul qilindi!",
    
    // Profile
    myOrders: "Mening buyurtmalarim",
    myBonuses: "Mening bonuslarim",
    feedback: "Fikr va takliflar",
    ourAddress: "Bizning manzil",
    editInfo: "Ma'lumotlarni tahrirlash",
    logout: "Akkauntdan chiqish",
    member: "A'zo",
    orders: "Buyurtmalar",
    spent: "Sarflangan",
    bonuses: "Bonuslar",
    achievements: "Yutuqlar",
    
    // Wishlist
    emptyWishlist: "Sevimlilar bo'sh",
    wishlistEmpty: "Sevimlilar bo'sh",
    addToWishlistMessage: "Yoqqan mahsulotlarni tez topish uchun sevimlilarga qo'shing",
    
    // QR
    showQRCode: "Ushbu QR kodni kassirga ko'rsating",
    getCashback: "va 2% keshbek oling",
    qrInstructions: "Keshbek olish:",
    howToGetCashback: "Keshbek qanday olish:",
    showBeforePayment: "• To'lovdan oldin QR kodni ko'rsating",
    cashierScans: "• Kassir kodni skanerlaydi",
    cashbackAdded: "• 2% summa hisobingizga qo'shiladi",
    
    // Errors
    productNotFound: "Mahsulot topilmadi",
    serverError: "Server xatoligi",
    networkError: "Tarmoq xatoligi",
    
    // Time
    year: "yil",
    years: "yosh",
    old: "yosh",

    // Additional
    uploadPhoto: "Rasm yuklash",
    free: "Tekin",
    deliveryFee: "Yetkazib berish haqi",

    // Search and filters
    searchResults: "Qidiruv natijalari",
    filters: "Filtrlar",
    clearFilters: "Filtrlarni tozalash",
    category: "Kategoriya",
    allCategories: "Barcha kategoriyalar",
    ageGroup: "Yosh guruhi",
    allAges: "Barcha yoshlar",
    priceRange: "Narx oralig'i",
    noResults: "Hech narsa topilmadi",
    resetFilters: "Filtrlarni qayta tiklash",
    found: "Topildi",
    products: "mahsulot",

    // Product categories
    tracksuit: "Sport kiyim",
    sweater: "Sviter",
    dress: "Ko'ylak",
    tshirt: "Futbolka",
    pajamas: "Uyqu kiyimi"
  },
  
  ru: {
    // Navigation
    catalog: "Каталог",
    qrCode: "QR код",
    profile: "Профиль",
    wishlist: "Избранное",
    cart: "Корзина",
    
    // Common
    search: "Поиск...",
    add: "Добавить",
    remove: "Удалить",
    cancel: "Отмена",
    confirm: "Подтвердить",
    save: "Сохранить",
    edit: "Редактировать",
    delete: "Удалить",
    back: "Назад",
    next: "Далее",
    done: "Готово",
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успешно",
    
    // Auth
    welcome: "Добро пожаловать!",
    fullName: "Полное имя",
    phoneNumber: "Номер телефона",
    country: "Страна",
    region: "Регион",
    enterName: "Введите ваше имя",
    enterPhone: "Введите номер телефона",
    selectCountry: "Выберите страну",
    selectRegion: "Выберите регион",
    enterRegion: "Введите ваш регион",
    continue: "Продолжить",
    verification: "Подтверждение",
    verificationCode: "Код подтверждения",
    enterCode: "Введите 4-значный код",
    verify: "Подтвердить",
    changePhone: "Изменить номер телефона",
    demoCode: "Демо код: 1234",
    createAccount: "Создайте аккаунт для совершения покупок",
    termsAccept: "Продолжая, вы соглашаетесь с условиями использования",
    codeSent: "Мы отправили SMS-код на номер",
    invalidCode: "Неверный код подтверждения",
    invalidPhone: "Неверный формат номера телефона",
    
    // Products
    addToCart: "В корзину",
    addToWishlist: "В избранное",
    removeFromWishlist: "Удалить из избранного",
    outOfStock: "Нет в наличии",
    inStock: "В наличии",
    price: "Цена",
    age: "Возраст",
    color: "Цвет",
    size: "Размер",
    quantity: "Количество",
    details: "Подробнее",
    
    // Categories
    new: "Новинки",
    girls1to6: "Девочки 1–6 лет",
    girls7to10: "Девочки 7–10 лет",
    boys1to6: "Мальчики 1–6 лет",
    boys7to10: "Мальчики 7–10 лет",
    
    // Cart
    emptyCart: "Корзина пуста",
    cartEmpty: "Корзина пуста",
    addProductsToCart: "Добавьте товары из каталога, чтобы оформить заказ",
    goToCatalog: "Перейти в каталог",
    checkout: "Оформить заказ",
    deliveryMethod: "Способ доставки",
    paymentMethod: "Способ оплаты",
    courier: "Курьер/Почта",
    pickup: "Самовывоз",
    card: "Карта (Payme / Click)",
    cash: "Наличные",
    notes: "Комментарий к заказу",
    orderNotes: "Дополнительные пожелания...",
    total: "Итого",
    items: "Товары",
    delivery: "Доставка",
    cashback: "🎁 Кэшбэк 2%",
    orderPlaced: "Заказ оформлен!",
    
    // Profile
    myOrders: "Мои заказы",
    myBonuses: "Мои бонусы",
    feedback: "Отзывы и предложения",
    ourAddress: "Наш а��рес",
    editInfo: "Редактировать информацию",
    logout: "Выйти из аккаунта",
    member: "Участник с",
    orders: "Заказов",
    spent: "Потрачено",
    bonuses: "Бонусы",
    achievements: "Достижен��я",
    
    // Wishlist
    emptyWishlist: "Избранное пусто",
    wishlistEmpty: "Избранное пусто",
    addToWishlistMessage: "Добавляйте понравившиеся товары в избранное для быстрого доступа",
    
    // QR
    showQRCode: "Покажите этот QR-код кассиру",
    getCashback: "и получите 2% кэшбэка",
    qrInstructions: "Как получить кэшбэк:",
    howToGetCashback: "Как получить кэшбэк:",
    showBeforePayment: "• Покажите QR-код перед оплатой",
    cashierScans: "• Кассир отсканирует код",
    cashbackAdded: "• 2% от суммы зачислится на ваш баланс",
    
    // Errors
    productNotFound: "Товар не найден",
    serverError: "Ошибка сервера",
    networkError: "Ошибка сети",
    
    // Time
    year: "г��д",
    years: "лет",
    old: "лет",

    // Additional
    uploadPhoto: "Загрузить фото",
    free: "Бесплатно",
    deliveryFee: "Стоимость доставки",

    // Search and filters
    searchResults: "Результаты поиска",
    filters: "Фильтры",
    clearFilters: "Очистить фильтры",
    category: "Категория",
    allCategories: "Все категории",
    ageGroup: "Возрастная группа",
    allAges: "Все возраста",
    priceRange: "Диапазон цен",
    noResults: "По вашему запросу ничего не найдено",
    resetFilters: "Сбросить фильтры",
    found: "Найдено",
    products: "товаров",

    // Product categories
    tracksuit: "Спортивные костюмы",
    sweater: "Свитера",
    dress: "Платья",
    tshirt: "Футболки",
    pajamas: "Пижамы"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('uz');

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t: translations[language]
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
