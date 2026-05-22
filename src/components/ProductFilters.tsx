import { Brand } from '../types';

interface ProductFiltersProps {
  selectedBrand: Brand | 'ALL';
  onChangeBrand: (brand: Brand | 'ALL') => void;
  brands: (Brand | 'ALL')[];
}

export default function ProductFilters({ selectedBrand, onChangeBrand, brands }: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-4" id="hs-brand-filters">
      <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 mr-2 uppercase">HÃNG SẢN XUẤT:</span>
      {brands.map((brand) => {
        const isActive = selectedBrand === brand;
        
        return (
          <button
            key={brand}
            onClick={() => onChangeBrand(brand)}
            className={`cursor-pointer rounded-xl px-4.5 py-2 font-display text-xs font-bold tracking-wider transition-all duration-200 outline-none ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-102 border-transparent'
                : 'border border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800/60'
            }`}
            id={`filter-pill-${brand}`}
          >
            {brand === 'ALL' ? 'TẤT CẢ HÃNG' : brand}
          </button>
        );
      })}
    </div>
  );
}
