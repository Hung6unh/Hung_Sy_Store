import { useState } from 'react';
import { Search, ShoppingBag, User, Sun, Moon, Menu, X, Laptop } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  activeCategory: string | null;
  setActiveCategory: (cat: 'gaming' | 'student' | 'office' | 'macbook' | 'accessory' | null) => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  searchTerm,
  setSearchTerm,
  cartCount,
  onOpenCart,
  onOpenAuth,
  activeCategory,
  setActiveCategory,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Trang chủ', value: null },
    { label: 'Laptop Gaming', value: 'gaming' },
    { label: 'Laptop Văn Phòng', value: 'office' },
    { label: 'Laptop Sinh Viên', value: 'student' },
    { label: 'MacBook', value: 'macbook' },
    { label: 'Phụ kiện', value: 'accessory' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95" id="hs-header">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo "Hùng Sỹ" */}
        <div 
          className="flex cursor-pointer items-center space-x-2" 
          onClick={() => {
            setActiveCategory(null);
            setSearchTerm('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          id="hs-logo"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-display text-2xl font-bold text-white shadow-lg shadow-blue-500/20 antialiased">
            HS
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            HÙNG <span className="text-blue-500">SỸ</span>
          </span>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden max-w-md flex-1 px-8 md:block" id="hs-search-container">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm laptop gaming, macbook..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500 dark:focus:bg-slate-950"
              id="hs-search-input"
            />
            <Search className="absolute top-3 left-3.5 h-4.5 w-4.5 text-slate-400 group-focus-within:text-blue-500" />
          </div>
        </div>

        {/* Desktop Navbar Links */}
        <nav className="hidden lg:flex items-center space-x-1" id="hs-desktop-nav">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveCategory(item.value);
                setSearchTerm('');
              }}
              className={`rounded-lg px-4 py-2 font-display text-sm font-semibold transition-colors duration-200 ${
                activeCategory === item.value && searchTerm === ''
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2" id="hs-action-controls">
          {/* Light/Dark mode Switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            title="Đổi giao diện"
            id="hs-theme-toggle"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
          </button>

          {/* User Account Portal trigger */}
          <button
            onClick={onOpenAuth}
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            title="Tài khoản"
            id="hs-user-toggle"
          >
            <User className="h-5 w-5" />
          </button>

          {/* Shopping cart trigger */}
          <button
            onClick={onOpenCart}
            className="relative rounded-xl p-2.5 text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
            title="Giỏ hàng"
            id="hs-cart-trigger"
          >
            <ShoppingBag className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-50 lg:hidden dark:text-slate-300 dark:hover:bg-slate-900"
            id="hs-mobile-menu-trigger"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar block */}
      <div className="border-t border-slate-100 px-4 py-2 md:hidden dark:border-slate-800 dark:bg-slate-950">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm laptop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
            id="hs-mobile-search-input"
          />
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 px-4 py-4 space-y-2 animate-fade-in" id="hs-mobile-menu-panel">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveCategory(item.value);
                setSearchTerm('');
                setMobileMenuOpen(false);
              }}
              className={`block w-full rounded-xl px-4 py-3 text-left font-display text-sm font-medium transition-colors ${
                activeCategory === item.value && searchTerm === ''
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                  : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
