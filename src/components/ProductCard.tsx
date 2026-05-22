import { Star, ShoppingCart, Info, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onSelectProduct, onAddToCart }: ProductCardProps) {
  return (
    <div
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-800/80 dark:bg-slate-900/60 dark:hover:border-blue-500/30 dark:hover:bg-slate-900"
      id={`product-card-${product.id}`}
    >
      <div>
        {/* Thumbnail Image Section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950/60">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-106"
            id={`product-img-${product.id}`}
          />
          
          {/* Discount Tag */}
          <div className="absolute top-2.5 left-2.5 rounded-lg bg-red-600 px-2.5 py-1 text-[10px] font-extrabold text-white tracking-wider">
            -{product.discountPercentage}% OFF
          </div>

          {/* Luxury Tags */}
          {product.inStock !== false && product.bestSeller && (
            <div className="absolute top-2.5 right-2.5 rounded-lg bg-blue-600 px-2.5 py-1 text-[10px] font-extrabold text-white tracking-wider">
              BÁN CHẠY
            </div>
          )}

          {product.inStock === false && (
            <div className="absolute top-2.5 right-2.5 rounded-lg bg-rose-600 px-2.5 py-1 text-[10px] font-extrabold text-white tracking-wider animate-pulse">
              HẾT HÀNG
            </div>
          )}

          {/* Quick Peek Hover Cover */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={() => onSelectProduct(product)}
              className="cursor-pointer mx-1.5 flex h-9.5 items-center justify-center gap-1.5 rounded-xl bg-white px-4 text-xs font-extrabold text-slate-900 shadow-lg hover:bg-slate-100 transition-all transform translate-y-2 group-hover:translate-y-0"
            >
              <Eye className="h-4 w-4" />
              XEM NHANH
            </button>
          </div>
        </div>

        {/* Brand Label */}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-[10px] font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            {product.brand}
          </span>
          <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400 uppercase">
            {product.category === 'gaming' ? 'Gaming' : product.category === 'student' ? 'Sinh viên' : product.category === 'office' ? 'Văn phòng' : product.category === 'macbook' ? 'Macbook' : 'Phụ kiện'}
          </span>
        </div>

        {/* Laptop Title */}
        <h3
          onClick={() => onSelectProduct(product)}
          className="mt-1 block font-display text-base font-bold text-slate-950 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400 line-clamp-2 min-h-12 cursor-pointer transition-colors duration-200"
        >
          {product.name}
        </h3>

        {/* Feature Spec Strip */}
        <div className="mt-2 flex flex-wrap gap-1 border-t border-dashed border-slate-100 pt-3 dark:border-slate-800/80">
          <span className="rounded-md bg-slate-50 border border-slate-100 px-2 py-0.5 text-[9.5px] font-semibold text-slate-600 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-300">
            {product.specs.cpu.split(' (')[0]}
          </span>
          <span className="rounded-md bg-slate-50 border border-slate-100 px-2 py-0.5 text-[9.5px] font-semibold text-slate-600 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-300">
            {product.specs.ram.split(' (')[0]}
          </span>
        </div>

        {/* Stars Reviews */}
        <div className="mt-3.5 flex items-center space-x-1.5 text-xs text-amber-500">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-current text-amber-500'
                    : 'text-slate-200 dark:text-slate-800'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-slate-900 dark:text-slate-300">{product.rating}</span>
          <span className="text-[10px] text-slate-400">({product.reviewsCount} review)</span>
        </div>
      </div>

      {/* Pricing and Cart Actions Block */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-col">
          <span className="font-mono text-xs text-slate-400 line-through">
            {product.originalPrice.toLocaleString('vi-VN')}đ
          </span>
          <span className="font-mono text-lg font-black text-blue-600 dark:text-blue-400 leading-none">
            {product.discountPrice.toLocaleString('vi-VN')}đ
          </span>
        </div>

        <div className="mt-4 flex space-x-2">
          {/* Add to Cart CTA */}
          {product.inStock !== false ? (
            <button
              onClick={() => onAddToCart(product)}
              className="cursor-pointer flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 px-3 text-xs font-bold text-white shadow-lg shadow-blue-500/10 active:scale-95 transition-all"
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              THÊM GIỎ HÀNG
            </button>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 py-2.5 px-3 text-xs font-bold cursor-not-allowed"
            >
              HẾT HÀNG
            </button>
          )}
          
          <button
            onClick={() => onSelectProduct(product)}
            className="cursor-pointer flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:bg-slate-800/60 dark:border-slate-700/60 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            title="Xem chi tiết"
          >
            <Info className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
