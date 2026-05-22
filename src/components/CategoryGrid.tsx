import { Laptop, Cpu, Monitor, Layers, Keyboard } from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  activeCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const CATEGORIES = [
  {
    key: 'gaming' as Category,
    title: 'Laptop Gaming',
    subTitle: 'Chiến Game AAA cấu hình đỉnh cao',
    icon: Laptop,
    activeColor: 'bg-red-500/15 text-red-500 border-red-500/30',
    hoverBg: 'hover:bg-red-500/5 group-hover:text-red-500',
    iconColor: 'text-red-500',
    tag: 'RTX 40 Series'
  },
  {
    key: 'student' as Category,
    title: 'Laptop Sinh Viên',
    subTitle: 'Mỏng nhẹ, bền bỉ, pin trâu cả ngày',
    icon: Cpu,
    activeColor: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    hoverBg: 'hover:bg-blue-500/5 group-hover:text-blue-500',
    iconColor: 'text-blue-500',
    tag: 'Giá Sinh Viên'
  },
  {
    key: 'office' as Category,
    title: 'Laptop Văn Phòng',
    subTitle: 'Đẳng cấp doanh nhân sang trọng CNC',
    icon: Monitor,
    activeColor: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    hoverBg: 'hover:bg-emerald-500/5 group-hover:text-emerald-500',
    iconColor: 'text-emerald-500',
    tag: 'Sang Trọng - Bền'
  },
  {
    key: 'macbook' as Category,
    title: 'MacBook Apple',
    subTitle: 'Thời lượng pin ấn tượng, màn hiếm XDR',
    icon: Layers,
    activeColor: 'bg-indigo-500/15 text-indigo-500 border-indigo-500/30',
    hoverBg: 'hover:bg-indigo-500/5 group-hover:text-indigo-500',
    iconColor: 'text-indigo-500',
    tag: 'Chính Hãng VN/A'
  },
  {
    key: 'accessory' as Category,
    title: 'Phụ Kiện Công Nghệ',
    subTitle: 'Bàn phím cơ, chuột gaming wireless',
    icon: Keyboard,
    activeColor: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    hoverBg: 'hover:bg-amber-500/5 group-hover:text-amber-500',
    iconColor: 'text-amber-500',
    tag: 'Pro Gaming Gear'
  }
];

export default function CategoryGrid({ activeCategory, onSelectCategory }: CategoryGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" id="hs-categories">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <span className="font-sans text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">DANH MỤC THIẾT BỊ</span>
          <h2 className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white mt-1">
            MUA SẮM THEO NHU CẦU
          </h2>
        </div>
        <button 
          onClick={() => onSelectCategory(null)}
          className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-500 cursor-pointer dark:text-blue-400"
        >
          Xem tất cả danh mục →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5" id="categories-grid-container">
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = activeCategory === cat.key;

          return (
            <div
              key={cat.key}
              onClick={() => onSelectCategory(isActive ? null : cat.key)}
              className={`group cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                isActive
                  ? `${cat.activeColor} ring-2 ring-blue-500/20 translate-y-[-4px]`
                  : 'border-slate-100 bg-white hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 hover:translate-y-[-4px]'
              }`}
              id={`cat-card-${cat.key}`}
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-xl p-3 transition-colors ${
                  isActive ? 'bg-white dark:bg-slate-950' : 'bg-slate-50 dark:bg-slate-950/60'
                }`}>
                  <IconComponent className={`h-6 w-6 ${cat.iconColor}`} />
                </div>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  {cat.tag}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {cat.title}
                </h3>
                <p className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {cat.subTitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
