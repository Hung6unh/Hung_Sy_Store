import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, Zap } from 'lucide-react';

interface HeroBannerProps {
  onSelectProduct: (productId: string) => void;
  onExploreProducts: () => void;
}

const SLIDES = [
  {
    productId: '1',
    subtitle: '🔥 CHIẾN THẦN ĐẤU TRƯỜNG GAMING',
    title: 'ASUS ROG STRIX G16',
    description: 'Sức mạnh Core i7 HX thế hệ 13 và card NVIDIA RTX 4060 cực khủng. Tấm nền 165Hz siêu mượt và dải tản nhiệt 3 quạt tối tân đánh bại mọi đối thủ.',
    badge: 'Flash Sale Giảm 11%',
    price: '34,490,000đ',
    originalPrice: '38,990,000đ',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-blue-600/30 to-cyan-500/10'
  },
  {
    productId: '4',
    subtitle: '💼 ĐẲNG CẤP DOANH NHÂN & CREATOR',
    title: 'DELL XPS 15 PREMIUM',
    description: 'Màn hình cảm ứng OLED Vô Cực 3.5K siêu thực, dải cấu hình chuẩn Studio RTX 4050 và RAM 32GB. Chế tác CNC nhôm nguyên khối sang trọng lịch lãm.',
    badge: 'Độc Quyền Tại Hùng Sỹ',
    price: '59,990,000đ',
    originalPrice: '65,990,000đ',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-indigo-600/30 to-slate-500/10'
  },
  {
    productId: '7',
    subtitle: '🍎 SỨC MẠNH VÔ SONG CỦA APPLE SILICON',
    title: 'MACBOOK PRO M3 PRO',
    description: 'Mang sức mạnh đồ họa đỉnh cao từ chip M3 Pro silicon, bộ nhớ siêu tốc 18GB Unified Memory và màn hình Liquid Retina XDR 120Hz. Thời lượng pin 18 giờ cực đỉnh.',
    badge: 'Tặng Phụ Kiện Cao Cấp',
    price: '47,990,000đ',
    originalPrice: '52,990,000đ',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-purple-600/30 to-rose-500/10'
  }
];

export default function HeroBanner({ onSelectProduct, onExploreProducts }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000); // Next slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 border-b border-slate-800" id="hs-hero-banner">
      {/* Background Slides */}
      <div className="relative h-[480px] sm:h-[550px] md:h-[600px] w-full">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0'
            }`}
          >
            {/* Dark overlay with neon soft lighting */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentColor} mix-blend-multiply opacity-50`} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            {/* Visual background laptop image */}
            <img
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
              id={`hero-bg-${index}`}
            />

            {/* Content box */}
            <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl text-left" id={`hero-slide-info-${index}`}>
                <div className="mb-4 inline-flex items-center space-x-2 rounded-full bg-blue-500/15 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                  <Zap className="h-3 w-3 fill-current text-blue-400" />
                  <span>{slide.badge}</span>
                </div>
                
                <h1 className="font-display text-4xl font-black text-white sm:text-5xl md:text-6xl tracking-tight leading-none mb-4">
                  {slide.title}
                </h1>

                <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 mb-6 leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                  <div>
                    <span className="font-sans text-xs text-slate-400 block tracking-widest uppercase">MỨC GIÁ ƯU ĐÃI</span>
                    <span className="font-mono text-3xl font-extrabold text-blue-400">{slide.price}</span>
                    <span className="font-mono text-sm text-slate-400 line-through ml-2.5">{slide.originalPrice}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-rose-400">
                    <ShieldCheck className="h-4.5 w-4.5 text-blue-400" />
                    <span>Cam kết đổi mới 30 ngày • Bảo hành chính hãng 100%</span>
                  </div>
                </div>

                <div className="flex space-x-3.5" id={`hero-slide-ctas-${index}`}>
                  <button
                    onClick={() => onSelectProduct(slide.productId)}
                    className="cursor-pointer rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 font-display text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  >
                    MUA NGAY
                  </button>
                  <button
                    onClick={onExploreProducts}
                    className="cursor-pointer rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 px-6 py-3 font-display text-sm font-bold text-slate-200 hover:text-white transition-all active:scale-95"
                  >
                    XEM THÊM SẢN PHẨM
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Left/Right Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
        id="hero-nav-prev"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
        id="hero-nav-next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide Dots Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2" id="hero-nav-dots">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-blue-500' : 'w-2.5 bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`Đi tới Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
