import { useState, useEffect } from 'react';
import { 
  ArrowUp, Phone, Mail, MapPin, Search, Star, Laptop, 
  ChevronRight, Shield, RefreshCcw, Facebook, Youtube, Heart
} from 'lucide-react';
import { MOCK_PRODUCTS } from './data';
import { Product, CartItem, Brand, Category, ReviewComment } from './types';

// Importing sub-components
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryGrid from './components/CategoryGrid';
import FlashSale from './components/FlashSale';
import ProductFilters from './components/ProductFilters';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import CartSidebar from './components/CartSidebar';
import AuthModal from './components/AuthModal';

export default function App() {
  // Global States
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default with premium high-tech Dark mode
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'ALL'>('ALL');
  const [userName, setUserName] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Modal Triggers
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Reset pagination when active filter settings modify
  useEffect(() => {
    setVisibleCount(12);
  }, [searchTerm, activeCategory, selectedBrand]);

  // Initialize: load cart data and dark mode
  useEffect(() => {
    // Simulated elite loading sequence
    const loadTimer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    // Sync dark mode style attribute on document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Pull Cart Items from localStorage
    try {
      const storedCart = localStorage.getItem('hungsy_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Failed to load storage cart:', e);
    }

    // Pull authenticated session
    const storedUser = localStorage.getItem('hungsy_user');
    if (storedUser) {
      setUserName(storedUser);
    }

    return () => clearTimeout(loadTimer);
  }, []);

  // Update dark mode class whenever state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Synchronize cart state to client storage when modified
  const updateCartAndStorage = (newItems: CartItem[]) => {
    setCartItems(newItems);
    try {
      localStorage.setItem('hungsy_cart', JSON.stringify(newItems));
    } catch (e) {
      console.error('Failed to update local storage:', e);
    }
  };

  // Detect scroll value to show or hide Back-to-top controller
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safe incremental addition of products to shopping list
  const handleAddToCart = (product: Product) => {
    const existingIndex = cartItems.findIndex(item => item.product.id === product.id);
    let updated: CartItem[] = [];

    if (existingIndex > -1) {
      updated = [...cartItems];
      updated[existingIndex].quantity += 1;
    } else {
      updated = [...cartItems, { product, quantity: 1 }];
    }

    updateCartAndStorage(updated);
    
    // Smooth custom popups confirmation
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-6 z-50 rounded-xl bg-emerald-600 text-white px-5 py-3 shadow-xl flex items-center gap-2 font-display text-xs font-bold animate-slide-in';
    toast.innerHTML = `✅ Đã thêm thành công ${product.name} vào giỏ hàng!`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => toast.remove(), 500);
    }, 2500);
  };

  // Modifying active items inside cart list
  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    const updated = cartItems.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    );
    updateCartAndStorage(updated);
  };

  // Delete product row completely from checkout lists
  const handleRemoveCartItem = (productId: string) => {
    const updated = cartItems.filter(item => item.product.id !== productId);
    updateCartAndStorage(updated);
  };

  // Empty checkout cart completely on completed orders
  const handleClearCart = () => {
    updateCartAndStorage([]);
  };

  // Registering authenticated users session
  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    localStorage.setItem('hungsy_user', name);
  };

  // Signing out session
  const handleLogout = () => {
    setUserName(null);
    localStorage.removeItem('hungsy_user');
    alert('Đã đăng xuất tài khoản Hùng Sỹ Club thành công.');
  };

  // Supporting direct comments append into products
  const handleAddComment = (productId: string, newComment: ReviewComment) => {
    const updatedProducts = products.map((prod) => {
      if (prod.id === productId) {
        // Compute new ratings averages
        const currentComments = [...prod.comments, newComment];
        const newAverageRating = Number(
          (currentComments.reduce((acc, c) => acc + c.rating, 0) / currentComments.length).toFixed(1)
        );
        return {
          ...prod,
          comments: currentComments,
          rating: newAverageRating,
          reviewsCount: currentComments.length
        };
      }
      return prod;
    });

    setProducts(updatedProducts);
    
    // Synchronize modal detail context if active
    if (selectedProduct && selectedProduct.id === productId) {
      const matchProd = updatedProducts.find(p => p.id === productId);
      if (matchProd) {
        setSelectedProduct(matchProd);
      }
    }
  };

  // Back-to-top handler
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Products grid filtration matching algorithm
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = activeCategory === null || product.category === activeCategory;
    const matchesBrand = selectedBrand === 'ALL' || product.brand === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  // Extract list of existing brands
  const brandsList: (Brand | 'ALL')[] = ['ALL', 'ASUS', 'MSI', 'ACER', 'DELL', 'LENOVO', 'HP', 'APPLE'];

  if (initialLoading) {
    // Beautiful Loading Spinner matching premium dark/cyan aesthetics
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 text-white" id="app-loading-screen">
        <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
          <div className="absolute h-full w-full rounded-full border-4 border-slate-900 border-t-blue-500 animate-spin" />
          <div className="font-display text-lg font-black text-blue-400">HS</div>
        </div>
        <h1 className="font-display text-lg font-extrabold uppercase tracking-widest text-slate-200">LAPTOP HÙNG SỸ</h1>
        <p className="font-sans text-xs text-slate-500 mt-2 tracking-wide">Đang khởi tạo linh hồn công nghệ 2026...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100" id="hungsy-app-container">
      
      {/* 1. HEADER SECTION & NAVIGATION BAR */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          setSearchTerm(''); // Clear search on menu select
        }}
      />

      {/* Greeting Banner for authorized sessions */}
      {userName && (
        <div className="bg-gradient-to-r from-blue-700 to-indigo-600 px-4 py-2.5 text-center text-xs font-semibold text-white shadow-md flex items-center justify-center gap-3" id="hs-club-greet">
          <span>🌟 Thành viên VIP: <strong className="font-extrabold uppercase">{userName}</strong> • Bạn đang được giảm thêm 2% tất cả giỏ hàng!</span>
          <button 
            onClick={handleLogout}
            className="cursor-pointer bg-white/10 hover:bg-white/20 rounded-md px-2.5 py-0.5 text-[10px] font-black tracking-wide border border-white/20"
          >
            ĐĂNG XUẤT
          </button>
        </div>
      )}

      {/* 2. HERO BANNER SLIDESHOW */}
      {!searchTerm && activeCategory === null && (
        <HeroBanner
          onSelectProduct={(productId) => {
            const matched = products.find(p => p.id === productId);
            if (matched) setSelectedProduct(matched);
          }}
          onExploreProducts={() => {
            const el = document.getElementById('hs-all-laptops');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* 3. CORE CATEGORIES GRID LIST */}
      {!searchTerm && (
        <CategoryGrid
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      )}

      {/* 9. FLASH SALE SECTION */}
      {!searchTerm && activeCategory === null && (
        <FlashSale
          products={products}
          onSelectProduct={setSelectedProduct}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 4. MAIN LAPTOP PRODUCTS GRID WITH ADVANCED BRANDS FILTERS */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" id="hs-all-laptops">
        <div className="mb-6 flex flex-col items-start justify-between border-b border-slate-200 pb-5 md:flex-row md:items-end dark:border-slate-800">
          <div>
            <span className="font-sans text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              {activeCategory ? `DANH MỤC: ${activeCategory}` : 'SẢN PHẨM KHUYẾN NGHỊ'}
            </span>
            <h2 className="font-display text-2xl font-black text-slate-900 tracking-tight sm:text-3xl dark:text-white mt-1">
              {searchTerm ? `KẾT QUẢ TÌM KIẾM CHO "${searchTerm}"` : 'DANH SÁCH LAPTOP PHÂN PHỐI'},
            </h2>
            <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              Hiển thị {filteredProducts.length} cấu hình laptop chính hãng cao cấp
            </p>
            
            {/* Real-time stock status reporter widget */}
            <div className="mt-3 flex flex-wrap gap-2 text-[10.5px]">
              <span className="rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 px-2.5 py-1 font-semibold text-slate-600 dark:text-slate-300">
                Tổng cộng: <strong className="text-slate-900 dark:text-white font-extrabold">{filteredProducts.length}</strong> máy
              </span>
              <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/10 px-2.5 py-1 font-semibold text-emerald-600">
                Còn hàng: <strong className="font-extrabold">{filteredProducts.filter(p => p.inStock !== false).length}</strong>
              </span>
              <span className="rounded-lg bg-rose-500/10 border border-rose-500/20 dark:border-rose-500/10 px-2.5 py-1 font-semibold text-rose-600">
                Hết hàng: <strong className="font-extrabold">{filteredProducts.filter(p => p.inStock === false).length}</strong>
              </span>
            </div>
          </div>

          {/* Integrated search status summary tags */}
          {(searchTerm || activeCategory || selectedBrand !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory(null);
                setSelectedBrand('ALL');
              }}
              className="mt-4 md:mt-0 text-xs font-extrabold text-blue-600 dark:text-blue-400 border border-blue-500/20 bg-blue-500/5 px-3 py-1.5 rounded-xl hover:bg-blue-500/10 cursor-pointer"
            >
              Hủy bộ lọc tìm kiếm ×
            </button>
          )}
        </div>

        {/* Brand filters navigation strips */}
        <ProductFilters
          selectedBrand={selectedBrand}
          onChangeBrand={setSelectedBrand}
          brands={brandsList}
        />

        {/* Filters and search empty states */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-16 text-center dark:border-slate-800 dark:bg-slate-950/40">
            <Search className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-800 stroke-[1.5] mb-4.5" />
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wide">Không Tìm Thấy Sản Phẩm</h3>
            <p className="font-sans text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Rất tiếc, Hùng Sỹ chưa phân phối cấu hình laptop khớp chính xác với tiêu chí tuyển chọn của bạn. Thử tìm kiếm với từ khóa khác hoặc tư vấn trợ lý AI nhé!
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory(null);
                setSelectedBrand('ALL');
              }}
              className="cursor-pointer mt-5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 font-display text-xs font-bold text-white shadow-md active:scale-95 transition"
            >
              QUAY LẠI TẤT CẢ LAPTOP
            </button>
          </div>
        ) : (
          /* Products Grid Layout */
          <div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6" id="app-products-grid">
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {filteredProducts.length > visibleCount && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => Math.min(prev + 12, filteredProducts.length))}
                  className="cursor-pointer rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 py-3.5 px-8 text-xs font-bold tracking-widest text-white uppercase transition-all duration-300 dark:bg-slate-800 dark:hover:bg-slate-750 dark:border-slate-700/80 hover:shadow-xl shadow-blue-500/5 hover:-translate-y-0.5 active:translate-y-0 transform"
                >
                  XEM THÊM CẤU HÌNH KHÁC ({filteredProducts.length - visibleCount} sản phẩm)
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Core Policy strip blocks above footer */}
      <section className="bg-slate-100/50 py-12 dark:bg-slate-900/10 border-t border-slate-200 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600/10 rounded-xl p-3 text-blue-600 dark:bg-blue-500/5 dark:text-blue-400">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-slate-950 dark:text-white uppercase">BẢO HÀNH CHÍNH HÃNG</h4>
              <p className="font-sans text-xs text-slate-500 mt-1 dark:text-slate-400 leading-normal">Bảo hành 12 - 24 tháng theo đúng tiêu chuẩn nhà sản xuất ASUS, MSI, DELL, HP, Mac.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600/10 rounded-xl p-3 text-blue-600 dark:bg-blue-500/5 dark:text-blue-400">
              <RefreshCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-slate-950 dark:text-white uppercase">LOẠI TRỪ RỦI RO</h4>
              <p className="font-sans text-xs text-slate-500 mt-1 dark:text-slate-400 leading-normal">Chính sách bao test 1 đổi 1 trong vòng 30 ngày hoàn toàn miễn phí nếu máy phát sinh lỗi phần cứng.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600/10 rounded-xl p-3 text-blue-600 dark:bg-blue-500/5 dark:text-blue-400">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-slate-950 dark:text-white uppercase">HỖ TRỢ TRỌN ĐỜI</h4>
              <p className="font-sans text-xs text-slate-500 mt-1 dark:text-slate-400 leading-normal">Tặng gói vệ sinh máy, tra keo tản nhiệt thạch anh và cài đặt hệ điều hành Windows miễn phí trọn đời.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-600/10 rounded-xl p-3 text-blue-600 dark:bg-blue-500/5 dark:text-blue-400">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-slate-950 dark:text-white uppercase">DỊCH VỤ TRẢ GÓP 0%</h4>
              <p className="font-sans text-xs text-slate-500 mt-1 dark:text-slate-400 leading-normal">Trả góp online lãi suất 0% qua thẻ tín dụng hoặc thủ tục xét duyệt CCCD nhanh chỉ 15 phút.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRODUCT DETAILS MODAL DIALOGUE */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onAddComment={handleAddComment}
        />
      )}

      {/* 6. CART SIDEBAR SLIDE OVER */}
      {cartOpen && (
        <CartSidebar
          cartItems={cartItems}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
        />
      )}

      {/* 7. AUTHMODAL PORTAL */}
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* 10. ELITE STRUCTURAL FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8" id="hs-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-10 md:grid-cols-4">
          
          {/* Col 1 Brand watermark */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-display text-xl font-bold text-white shadow-lg shadow-blue-500/20">
                HS
              </div>
              <span className="font-display text-xl font-black text-white tracking-tight">HÙNG <span className="text-blue-500">SỸ</span></span>
            </div>
            <p className="font-sans text-xs text-slate-500 leading-relaxed">
              Hệ thống bán lẻ thiết bị số, laptop gaming và thiết bị công nghệ cao cấp hàng đầu miền Trung. Sứ mệnh mang đến trải nghiệm phần cứng tinh tế và dịch vụ chăm sóc chân tình nhất.
            </p>
            
            {/* Social icons */}
            <div className="flex space-x-3 pt-2" id="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-500 hover:text-white hover:border-blue-500 transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-500 hover:text-white hover:border-red-500 transition">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-500 hover:text-white hover:border-indigo-500 transition">
                <Heart className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2 Shop Categories links */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold tracking-widest text-slate-200 uppercase">HỆ THỐNG SẢN PHẨM</h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <button onClick={() => { setActiveCategory('gaming'); handleScrollToTop(); }} className="hover:text-white dark:hover:text-blue-400 transition text-slate-500 flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" /> Laptop Gaming Rog/Katana
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('office'); handleScrollToTop(); }} className="hover:text-white dark:hover:text-blue-400 transition text-slate-500 flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" /> Laptop Văn Phòng XPS Cao Cấp
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('student'); handleScrollToTop(); }} className="hover:text-white dark:hover:text-blue-400 transition text-slate-500 flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" /> Laptop Sinh Viên Pavilion/ThinkPad
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('macbook'); handleScrollToTop(); }} className="hover:text-white dark:hover:text-blue-400 transition text-slate-500 flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" /> MacBook Pro / Air chính hãng
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveCategory('accessory'); handleScrollToTop(); }} className="hover:text-white dark:hover:text-blue-400 transition text-slate-500 flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" /> Bàn Phím Chuột Pro Gaming Gear
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Policies */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold tracking-widest text-slate-200 uppercase">CHÍNH SÁCH DỊCH VỤ</h4>
            <ul className="space-y-2.5 text-xs text-slate-500 font-sans">
              <li className="hover:text-white cursor-pointer transition flex items-center gap-1">
                <ChevronRight className="h-3 w-3" /> Quy chế bảo hành đổi trả 30 ngày
              </li>
              <li className="hover:text-white cursor-pointer transition flex items-center gap-1">
                <ChevronRight className="h-3 w-3" /> Chính sách giao vận miễn phí hỏa tốc
              </li>
              <li className="hover:text-white cursor-pointer transition flex items-center gap-1">
                <ChevronRight className="h-3 w-3" /> Chính sách bảo mật thông tin mã hóa
              </li>
              <li className="hover:text-white cursor-pointer transition flex items-center gap-1">
                <ChevronRight className="h-3 w-3" /> Điều khoản mua sắm và trả góp 0%
              </li>
            </ul>
          </div>

          {/* Col 4 Contact addresses + Embedded Map coordinates */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold tracking-widest text-slate-200 uppercase">LIÊN HỆ SHOWROOM</h4>
            <ul className="space-y-3 text-xs text-slate-500 font-sans" id="footer-addresses">
              <li className="flex items-start space-x-2.5 leading-normal">
                <MapPin className="h-4.5 w-4.5 shrink-0 text-blue-500" />
                <span>📍 156 Hàm Nghi, Thạc Gián, Thanh Khê, Đà Nẵng</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5 shrink-0 text-blue-500" />
                <span>📞 Hotline: 1900 6060 • 0905 177 552</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4.5 w-4.5 shrink-0 text-blue-500" />
                <span>✉️ Email: contact@hungsy.vn</span>
              </li>
            </ul>
            
            {/* Elegant Map Preview Iframe placeholder */}
            <div className="rounded-xl overflow-hidden h-28 border border-slate-900 group" id="footer-mini-maps">
              <iframe 
                title="Bản đồ Hùng Sỹ"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1194.8778!2d108.21203!3d16.064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219cc0!2s156%20Ham%20Nghi%20Da%20Nang!5e0!3m2!1svi!2s!4v17000000000"
                className="w-full h-full border-none grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
              />
            </div>
          </div>
        </div>

        {/* Copywrite trademark strip */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-slate-500 text-center" id="footer-trademarks">
          <span>© {new Date().getFullYear()} LAPTOP HÙNG SỸ. Thiết kế bởi Senior developer 10 năm kinh nghiệm. All rights reserved.</span>
          <span>🇻🇳 Đồng phân phối chính ngạch tại Việt Nam bởi HUNG SỸ Co., Ltd.</span>
        </div>
      </footer>

      {/* Floating Back to top button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="cursor-pointer fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl transition-all hover:-translate-y-1 active:scale-95"
          id="scroll-to-top-balloon"
          title="Về đầu trang"
        >
          <ArrowUp className="h-4.5 w-4.5" />
        </button>
      )}

    </div>
  );
}
