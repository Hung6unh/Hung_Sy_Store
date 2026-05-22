import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, ShieldAlert, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartSidebarProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BANK'>('COD');
  const [orderComplete, setOrderComplete] = useState(false);

  // Math sum tallies
  const originalTotal = cartItems.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const currentTotal = cartItems.reduce((acc, item) => acc + item.product.discountPrice * item.quantity, 0);
  const totalSavings = originalTotal - currentTotal;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng!');
      return;
    }

    // Success complete order flow
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
      onClose();
      setOrderComplete(false);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs" id="hs-cart-sheet">
      <div className="absolute inset-0 overflow-hidden">
        {/* Click background can close */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

        <div className="pointer-events-none absolute inset-y-0 right-0 flex max-w-full pl-10" id="hs-cart-slider-box">
          <div className="pointer-events-auto w-screen max-w-md border-l border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 flex flex-col justify-between h-full shadow-2xl animate-slide-left">
            
            {/* Header section with Close triggers */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800/80" id="cart-header">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5.5 w-5.5 text-blue-500" />
                <h2 className="font-display text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Giỏ hàng của bạn ({cartItems.length})</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-slate-50 p-2 text-slate-500 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
                id="cart-sheet-close-btn"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* If Order Complete success indicator */}
            {orderComplete ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center" id="order-complete-success-box">
                <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 p-5 mb-4 animate-bounce">
                  <CheckCircle className="h-12 w-12 text-emerald-500" />
                </div>
                <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">ĐẶT HÀNG THÀNH CÔNG!</h3>
                <p className="font-sans text-xs text-slate-500 mt-2.5 max-w-xs leading-relaxed">
                  Cảm ơn Quý khách <strong className="text-slate-900 dark:text-white">{customerName}</strong>. Hệ thống Hùng Sỹ đang phê duyệt đơn hàng tự động. Chuyên viên sẽ gọi đến hotline <strong className="text-slate-900 dark:text-white">{customerPhone}</strong> trong vòng 10 phút nhé!
                </p>
                <div className="mt-8 w-2/3 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 animate-[pulse_1.5s_infinite] w-full" style={{ animationDuration: '4s' }} />
                </div>
              </div>
            ) : (
              /* Regular Main Cart List */
              <div className="flex-1 overflow-y-auto p-5 space-y-4" id="cart-sheet-items-list">
                {cartItems.length === 0 ? (
                  <div className="flex h-64 flex-col items-center justify-center text-center">
                    <ShoppingBag className="h-10 w-10 text-slate-300 stroke-[1.5] mb-2.5" />
                    <p className="font-sans text-xs text-slate-400">Giỏ hàng của bạn đang trống.</p>
                    <button
                      onClick={onClose}
                      className="cursor-pointer font-display text-[11px] font-bold text-blue-600 hover:text-blue-500 uppercase mt-4"
                    >
                      BẮT ĐẦU MUA SẮM NGAY →
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Maps CartItems List layout */}
                    <div className="space-y-3.5" id="cart-items-wrapper">
                      {cartItems.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex gap-4 rounded-xl border border-slate-100 p-3 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/45 hover:border-slate-200 dark:hover:border-slate-700/60 transition"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="h-16 w-16 rounded-lg object-cover shrink-0 border border-slate-100 dark:border-slate-850"
                          />
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <span className="text-[9px] font-black text-slate-400 tracking-wider uppercase block">{item.product.brand}</span>
                              <h4 className="font-display text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{item.product.name}</h4>
                              <div className="mt-1 flex items-baseline space-x-1.5">
                                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                                  {item.product.discountPrice.toLocaleString('vi-VN')}đ
                                </span>
                                <span className="font-mono text-[10px] text-slate-400 line-through">
                                  {item.product.originalPrice.toLocaleString('vi-VN')}đ
                                </span>
                              </div>
                            </div>

                            {/* Quantity buttons & trash modifier */}
                            <div className="mt-3.5 flex items-center justify-between">
                              <div className="flex items-center space-x-1 border border-slate-100 bg-white rounded-lg px-2 py-0.5 dark:border-slate-800 dark:bg-slate-950">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="font-mono text-xs font-extrabold px-2 dark:text-slate-200">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer"
                                title="Xóa hàng"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Integrated Simulated Checkout Form layout */}
                    <div className="border-t border-slate-100 pt-5 mt-5 dark:border-slate-800/85 space-y-4" id="cart-embedded-form">
                      <h3 className="font-display text-xs font-extrabold tracking-widest text-slate-500 dark:text-slate-400 uppercase">THÔNG TIN GIAO HÀNG HUNG SY</h3>
                      
                      <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                        {/* Name Input */}
                        <div>
                          <label className="text-[9.5px] font-black text-slate-500 block mb-1 uppercase tracking-wider">Họ và tên khách hàng</label>
                          <input
                            type="text"
                            required
                            placeholder="Nguyễn Văn B..."
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                          />
                        </div>

                        {/* Phone Input */}
                        <div>
                          <label className="text-[9.5px] font-black text-slate-500 block mb-1 uppercase tracking-wider">Điện thoại hotline liên hệ</label>
                          <input
                            type="tel"
                            required
                            placeholder="09xx xxx xxx..."
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                          />
                        </div>

                        {/* Address Input */}
                        <div>
                          <label className="text-[9.5px] font-black text-slate-500 block mb-1 uppercase tracking-wider">Địa chỉ giao nhận hàng</label>
                          <input
                            type="text"
                            required
                            placeholder="Số 15 đường Hàm Nghi, Đà Nẵng..."
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                          />
                        </div>

                        {/* Payment Selection Toggles */}
                        <div>
                          <label className="text-[9.5px] font-black text-slate-500 block mb-1.5 uppercase tracking-wider">Hình thức thanh toán</label>
                          <div className="grid grid-cols-2 gap-2.5">
                            <button
                              type="button"
                              onClick={() => setPaymentMethod('COD')}
                              className={`cursor-pointer rounded-lg border py-2 text-center text-xs font-bold transition-all ${
                                paymentMethod === 'COD'
                                  ? 'border-blue-600 bg-blue-50/50 text-blue-600 dark:border-blue-400 dark:bg-blue-950/20 dark:text-blue-400'
                                  : 'border-slate-100 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
                              }`}
                            >
                              Thanh toán COD
                            </button>
                            <button
                              type="button"
                              onClick={() => setPaymentMethod('BANK')}
                              className={`cursor-pointer rounded-lg border py-2 text-center text-xs font-bold transition-all ${
                                paymentMethod === 'BANK'
                                  ? 'border-blue-600 bg-blue-50/50 text-blue-600 dark:border-blue-400 dark:bg-blue-950/20 dark:text-blue-400'
                                  : 'border-slate-100 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300'
                              }`}
                            >
                              Internet Banking
                            </button>
                          </div>
                        </div>

                        {paymentMethod === 'BANK' && (
                          <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-2 text-[10px] text-blue-500 leading-normal" id="bank-instructions">
                            🏧 Quý khách vui lòng chuyển khoản số tiền tương đương về STK Ngân Hàng ACB: <strong>6688 9999</strong> • Chủ TK: <strong>CTY LAPTOP HUNG SY</strong>. Đơn hàng sẽ bắt đầu đóng gói ngay khi nhận được tín hiệu.
                          </div>
                        )}
                        
                        <button type="submit" className="hidden" id="dummy-submit" />
                      </form>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Price Calculations and checkout trigger */}
            {cartItems.length > 0 && !orderComplete && (
              <div className="border-t border-slate-100 bg-slate-50 p-5 dark:border-slate-800/80 dark:bg-slate-900/40" id="cart-footer">
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between text-slate-500">
                    <span>Tổng tiền gốc:</span>
                    <span className="font-mono line-through">{originalTotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Hùng Sỹ Khuyến Mãi:</span>
                    <span className="font-mono font-medium">-{totalSavings.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between font-display text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                    <span>TỔNG TIÊN THANH TOÁN:</span>
                    <span className="font-mono text-base text-blue-600 dark:text-blue-400">{currentTotal.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                {/* Main Action buttons row */}
                <div className="mt-5 flex space-x-2.5">
                  <button
                    onClick={() => {
                      const triggerBtn = document.getElementById('dummy-submit');
                      triggerBtn?.click();
                    }}
                    className="cursor-pointer flex-1 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/15 active:scale-95 transition-all text-center"
                  >
                    XÁC NHẬN ĐẶT HÀNG
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
