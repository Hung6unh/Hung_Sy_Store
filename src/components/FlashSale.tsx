import { useState, useEffect } from 'react';
import { Clock, Zap, Flame, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface FlashSaleProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function FlashSale({ products, onSelectProduct, onAddToCart }: FlashSaleProps) {
  // Set an target time: e.g. 6 hours from current load
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 59, seconds: 59 });

  useEffect(() => {
    // Basic countdown function
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to 6 hours when finished to keep demo continuous
          return { hours: 6, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // Filter out products marked for flash sale
  const flashProducts = products.filter(p => p.flashSale);

  if (flashProducts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="hs-flash-sale">
      <div className="rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 p-0.5 shadow-xl shadow-red-500/10">
        <div className="rounded-2.5xl bg-slate-950 p-6 sm:p-8">
          
          {/* Header row. Flame effect + Timer boxes */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-5" id="flash-sale-header">
            <div className="flex items-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/15 text-red-500">
                <Flame className="h-6 w-6 text-red-500 animate-pulse fill-red-500/20" />
              </div>
              <div>
                <h2 className="font-display text-xl font-extrabold text-white tracking-tight sm:text-2xl flex items-center gap-1.5">
                  GIỜ VÀNG FLASH SALE
                </h2>
                <p className="font-sans text-xs text-slate-400">Ưu đãi cực sốc • Số lượng có hạn</p>
              </div>
            </div>

            {/* Timers list */}
            <div className="mt-4 sm:mt-0 flex items-center space-x-2" id="flash-sale-timer">
              <Clock className="h-4.5 w-4.5 text-orange-400 mr-1" />
              <div className="flex items-center space-x-1.5 text-sm font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white font-mono font-bold text-center">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="text-orange-500 font-bold">:</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white font-mono font-bold text-center">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="text-orange-500 font-bold">:</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white font-mono font-bold text-center">
                  {formatNumber(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          {/* Flash sale products grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2" id="flash-products-container">
            {flashProducts.map((product) => {
              // Calculate width fraction for hypothetical stock meter
              const stockSoldPercent = product.id === '1' ? 78 : 62;

              return (
                <div
                  key={product.id}
                  className="group flex flex-col sm:flex-row gap-5 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 transition duration-300 hover:border-red-500/40 hover:bg-slate-900/80"
                  id={`flash-card-${product.id}`}
                >
                  {/* Laptop Visual thumbnail */}
                  <div className="relative h-44 w-full sm:w-44 shrink-0 rounded-xl overflow-hidden bg-slate-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 left-2.5 rounded-md bg-red-600 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-widest">
                      -{product.discountPercentage}%
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      {/* Brand Info */}
                      <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">{product.brand}</span>
                      
                      {/* Product Name */}
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-display text-base font-bold text-white hover:text-red-400 cursor-pointer mt-1 duration-200 line-clamp-2"
                      >
                        {product.name}
                      </h3>

                      {/* Spark Specs in Flash */}
                      <p className="text-[11px] text-slate-400 mt-1.5 font-sans line-clamp-1 border-l-2 border-red-500/60 pl-2">
                        {product.specs.cpu.split(' (')[0]} • {product.specs.gpu.split(' (')[0]}
                      </p>

                      {/* Ratings stars review stars */}
                      <div className="mt-2.5 flex items-center space-x-1.5 text-xs text-amber-400">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-current text-amber-400'
                                  : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">({product.reviewsCount} đánh giá)</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      {/* Prices scale row */}
                      <div className="flex items-baseline space-x-2.5">
                        <span className="font-mono text-xl font-black text-red-400">
                          {product.discountPrice.toLocaleString('vi-VN')}đ
                        </span>
                        <span className="font-mono text-xs text-slate-400 line-through">
                          {product.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                      </div>

                      {/* Stocks progress meter */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1">
                          <span>🔥 Đã bán: {stockSoldPercent}%</span>
                          <span>Hạn mức: Chỉ còn 4 máy</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                            style={{ width: `${stockSoldPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Quick Checkout cart actions */}
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="cursor-pointer flex-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 py-2 text-xs font-bold transition active:scale-95 text-center"
                        >
                          XEM CHI TIẾT
                        </button>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="cursor-pointer rounded-lg bg-red-600 hover:bg-red-500 text-white p-2 px-3.5 transition active:scale-95 flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/15"
                          title="Thêm vào giỏ hàng"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span className="text-xs font-bold">MUA GẤP</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
