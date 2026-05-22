import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, MessageSquare, Send, Check } from 'lucide-react';
import { Product, ReviewComment } from '../types';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onAddComment: (productId: string, comment: ReviewComment) => void;
}

export default function ProductDetails({ product, onClose, onAddToCart, onAddComment }: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(5);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;

    const newCommentObj: ReviewComment = {
      id: Math.random().toString(),
      author: newCommentAuthor.trim(),
      rating: newCommentRating,
      date: new Date().toISOString().split('T')[0],
      content: newCommentText.trim()
    };

    onAddComment(product.id, newCommentObj);
    setNewCommentAuthor('');
    setNewCommentRating(5);
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 bg-slate-950/80 backdrop-blur-md py-6" id="hs-product-details-modal">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl dark:bg-slate-950 border border-slate-200 dark:border-slate-800 animate-scale-in" id="hs-details-modal-box">
        
        {/* Close Button top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
          id="close-details-modal-btn"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
          {/* LEFT: Structural Image Gallery */}
          <div className="flex flex-col space-y-4" id="details-image-gallery">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 rounded-xl bg-red-600 px-3 py-1 font-mono text-xs font-bold text-white">
                -{product.discountPercentage}%
              </div>
            </div>

            {/* Thumbnail gallery items selector list */}
            <div className="flex space-x-2.5 overflow-x-auto pb-1" id="details-gallery-items">
              {product.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-slate-50 dark:bg-slate-900 transition-all ${
                    activeImage === imgUrl ? 'border-blue-600' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} thumbnail ${idx}`} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Shop Core Warranties guarantees */}
            <div className="grid grid-cols-3 gap-3 border-t border-slate-100 pt-5 dark:border-slate-800/80 text-center" id="store-guarantees">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <ShieldCheck className="mx-auto h-5 w-5 text-blue-500 mb-1" />
                <span className="font-display text-[10.5px] font-bold text-slate-900 dark:text-white block">CHÍNH HÃNG 100%</span>
                <span className="font-sans text-[9px] text-slate-500">Bồi hoàn gấp x10 nếu phát hiện hàng giả</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <Truck className="mx-auto h-5 w-5 text-blue-500 mb-1" />
                <span className="font-display text-[10.5px] font-bold text-slate-900 dark:text-white block">HỎA TỐC</span>
                <span className="font-sans text-[9px] text-slate-500">Giao hàng miễn phí nội thành 2h</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/40">
                <RefreshCw className="mx-auto h-5 w-5 text-blue-500 mb-1" />
                <span className="font-display text-[10.5px] font-bold text-slate-900 dark:text-white block">ĐỔI TRẢ 1-1</span>
                <span className="font-sans text-[9px] text-slate-500">Bảo hành 1 đổi 1 trong 30 ngày đầu</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Laptop details specs */}
          <div className="flex flex-col justify-between" id="details-specification-panel">
            <div>
              <span className="font-sans text-xs font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                LAPTOP {product.brand} CHÍNH HÃNG VN/A
              </span>
              <h2 className="font-display text-2xl font-black tracking-tight text-slate-900 dark:text-white mt-1.5 leading-snug">
                {product.name}
              </h2>

              {/* Star reviews block */}
              <div className="mt-3 flex items-center space-x-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'fill-current text-amber-500' : 'text-slate-200 dark:text-slate-800'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-display text-sm font-bold text-slate-900 dark:text-white">{product.rating} / 5</span>
                <span className="text-xs text-slate-400">• ({product.reviewsCount} khách hàng tin dùng)</span>
              </div>

              {/* Cost Row price details */}
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <span className="font-sans text-[10px] text-slate-400 block tracking-wider uppercase">MỨC GIÁ KHUYẾN MÃI</span>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="font-mono text-2xl font-black text-blue-600 dark:text-blue-400">
                    {product.discountPrice.toLocaleString('vi-VN')} VND
                  </span>
                  <span className="font-mono text-sm text-slate-400 line-through">
                    {product.originalPrice.toLocaleString('vi-VN')} VND
                  </span>
                  <span className="rounded-md bg-red-100 text-red-700 px-1.5 py-0.5 text-xs font-bold dark:bg-red-950/40 dark:text-red-400">
                    Tiết kiệm { (product.originalPrice - product.discountPrice).toLocaleString('vi-VN') }đ
                  </span>
                </div>
              </div>

              {/* Out of Stock Alert Warning */}
              {product.inStock === false && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs font-bold text-rose-600 dark:border-rose-500/10 dark:bg-rose-950/10">
                  <span className="flex h-2 w-2 shrink-0 rounded-full bg-rose-600 animate-pulse"></span>
                  HỆ THỐNG BÁO CÁO: SẢN PHẨM HIỆN ĐANG HẾT HÀNG TẠM THỜI (Liên hệ hotline 1900 xxxx để đặt trước)
                </div>
              )}

              {/* Technical Data Specification sheets */}
              <div className="mt-6">
                <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white tracking-wide uppercase border-b border-slate-100 dark:border-slate-800/80 pb-1.5">
                  THÔNG SỐ KỸ THUẬT SIÊU CHI TIẾT
                </h3>
                <dl className="mt-3.5 space-y-2.5 text-xs font-sans" id="specs-list">
                  <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 dark:border-slate-800/60">
                    <dt className="text-slate-400 font-medium">BỘ VI XỬ LÝ (CPU)</dt>
                    <dd className="text-slate-900 font-bold text-right dark:text-white max-w-xs">{product.specs.cpu}</dd>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 dark:border-slate-800/60">
                    <dt className="text-slate-400 font-medium">LỰC ĐỒ HỌA (GPU)</dt>
                    <dd className="text-slate-900 font-bold text-right dark:text-white max-w-xs">{product.specs.gpu}</dd>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 dark:border-slate-800/60">
                    <dt className="text-slate-400 font-medium">DUNG LƯỢNG RAM</dt>
                    <dd className="text-slate-900 font-bold text-right dark:text-white">{product.specs.ram}</dd>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 dark:border-slate-800/60">
                    <dt className="text-slate-400 font-medium">Ổ CỨNG LƯU TRỮ (SSD)</dt>
                    <dd className="text-slate-900 font-bold text-right dark:text-white">{product.specs.ssd}</dd>
                  </div>
                  <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 dark:border-slate-800/60">
                    <dt className="text-slate-400 font-medium">MÀN HÌNH HIỂN THỊ</dt>
                    <dd className="text-slate-900 font-bold text-right dark:text-white max-w-xs">{product.specs.screen}</dd>
                  </div>
                  {product.specs.battery && (
                    <div className="flex justify-between border-b border-dashed border-slate-100 pb-1.5 dark:border-slate-800/60">
                      <dt className="text-slate-400 font-medium">DUNG LƯỢNG PIN</dt>
                      <dd className="text-slate-900 font-bold text-right dark:text-white">{product.specs.battery}</dd>
                    </div>
                  )}
                  {product.specs.weight && (
                    <div className="flex justify-between pb-1.5">
                      <dt className="text-slate-400 font-medium">TRỌNG LƯỢNG MÁY</dt>
                      <dd className="text-slate-900 font-bold text-right dark:text-white">{product.specs.weight}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Product description sentence */}
              <div className="mt-5 rounded-xl bg-blue-50/50 p-3.5 border border-blue-500/10 dark:bg-blue-950/10 dark:border-blue-500/5">
                <p className="font-sans text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Checkout Action triggers */}
            <div className="mt-8 flex space-x-3" id="details-actions">
              {product.inStock !== false ? (
                <>
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      alert(`Đã đặt mua thành công ${product.name}! Hùng Sỹ sẽ sớm liên hệ quý khách.`);
                    }}
                    className="cursor-pointer flex-1 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-900 py-3 text-sm font-bold text-white shadow-lg transition active:scale-95 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-50 text-center"
                  >
                    MUA NGAY HỎA TỐC
                  </button>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="cursor-pointer flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    THÊM VÀO GIỎ HÀNG
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="w-full flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-3 text-sm font-bold text-slate-400 dark:text-slate-500 cursor-not-allowed uppercase"
                >
                  SẢN PHẨM ĐANG HẾT HÀNG - LIÊN HỆ ĐẶT TRƯỚC
                </button>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM: Ratings Comments and review writing blocks */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 p-6 md:p-8" id="product-reviews-workspace">
          <h3 className="font-display text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            ĐÁNH GIÁ KHÁCH HÀNG & BÌNH LUẬN
          </h3>

          <div className="grid grid-cols-1 gap-8 mt-5 md:grid-cols-3">
            
            {/* Display comments lists */}
            <div className="md:col-span-2 space-y-4" id="comments-list-viewport">
              {product.comments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Chưa có bình luận nào cho sản phẩm này. Hãy là người đầu tiên đánh giá!</p>
              ) : (
                product.comments.map((comment) => (
                  <div key={comment.id} className="rounded-xl border border-slate-50 bg-slate-50/50 p-4 dark:border-slate-800/40 dark:bg-slate-900/10">
                    <div className="flex items-center justify-between pb-2 border-b border-dashed border-slate-100 dark:border-slate-800/40">
                      <div>
                        <span className="font-display text-xs font-bold text-slate-900 dark:text-white block">{comment.author}</span>
                        <span className="text-[10px] text-slate-400">{comment.date}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < comment.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-800'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="font-sans text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Comment Submission Form */}
            <div className="rounded-xl border border-slate-100 p-5 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/10" id="comment-form-container">
              <h4 className="font-display text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-4">GỬI ĐÁNH GIÁ CỦA BẠN</h4>
              
              <form onSubmit={handleSubmitComment} className="space-y-4">
                {/* Author Name input */}
                <div>
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 block mb-1 uppercase">HỌ TÊN CỦA BẠN</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A..."
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                {/* Rating selection digits row layout */}
                <div>
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5 uppercase">CHẤT LƯỢNG SẢN PHẨM</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setNewCommentRating(starVal)}
                        className="cursor-pointer transition transform active:scale-90"
                      >
                        <Star
                          className={`h-5.5 w-5.5 ${
                            starVal <= newCommentRating ? 'fill-current text-amber-500' : 'text-slate-200 dark:text-slate-800'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Comment Textarea */}
                <div>
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 block mb-1 uppercase">NỘI DUNG ĐÁNH GIÁ</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Sản phẩm rất tốt, giao hàng cực nhanh, tản nhiệt tốt..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white resize-none"
                  />
                </div>

                {/* Feedback notifications */}
                {commentSuccess && (
                  <div className="flex items-center space-x-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-[11px] font-semibold text-emerald-500 animate-slide-in">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>Hùng Sỹ đã duyệt và đăng thành công! Cảm ơn bạn.</span>
                  </div>
                )}

                {/* Submit trigger button */}
                <button
                  type="submit"
                  className="cursor-pointer w-full flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-display text-xs font-bold py-2.5 shadow-md shadow-blue-500/10 active:scale-95 transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  GỬI ĐÁNH GIÁ LIÊN XÃ
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
