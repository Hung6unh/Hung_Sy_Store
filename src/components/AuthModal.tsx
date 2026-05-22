import React, { useState } from 'react';
import { X, Eye, EyeOff, Check, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccessMsg('');

    // Basic common email validations
    if (!email.includes('@')) {
      setFormError('Địa chỉ email không chính xác!');
      return;
    }

    if (password.length < 6) {
      setFormError('Mật khẩu định dạng yếu! Yêu cầu ít nhất 6 ký tự.');
      return;
    }

    if (activeTab === 'REGISTER') {
      if (!fullName) {
        setFormError('Vui lòng điền họ và tên hợp pháp!');
        return;
      }
      if (password !== repeatPassword) {
        setFormError('Mật khẩu nhập lại không chính xác!');
        return;
      }

      setSuccessMsg('Đăng ký tài khoản mới thành công! Hùng Sỹ đang tự phát nhập...');
      setTimeout(() => {
        onLoginSuccess(fullName);
        onClose();
      }, 1500);

    } else {
      // Login simulation logic
      setSuccessMsg(`Chào mừng quay trở lại, ${email.split('@')[0]}! Đang đồng bộ...`);
      setTimeout(() => {
        onLoginSuccess(email.split('@')[0]);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md" id="hs-auth-modal">
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl dark:bg-slate-950 dark:border-slate-800 p-6 sm:p-8 animate-scale-in" id="hs-auth-box">
        
        {/* Close trigger button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-slate-50 p-1.5 text-slate-500 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
          id="close-auth-modal-btn"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* Brand visual watermark header */}
        <div className="flex flex-col items-center text-center mt-2.5 mb-6" id="auth-brand-logo">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-display text-2xl font-bold text-white shadow-lg shadow-blue-500/20 mb-3">
            HS
          </div>
          <h2 className="font-display text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">KẾT NỐI HÙNG SỸ CLUB</h2>
          <p className="font-sans text-xs text-slate-400 mt-1">Đăng nhập để nhận ưu đãi VIP & tích lũy lên tới 5%</p>
        </div>

        {/* Sign in vs Sign up tabs toggler */}
        <div className="grid grid-cols-2 gap-1 border-b border-slate-100 pb-3 mb-6 dark:border-slate-800/80" id="auth-tabs">
          <button
            onClick={() => {
              setActiveTab('LOGIN');
              setFormError('');
              setSuccessMsg('');
            }}
            className={`cursor-pointer pb-2 font-display text-xs font-bold uppercase transition ${
              activeTab === 'LOGIN'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            ĐĂNG NHẬP
          </button>
          <button
            onClick={() => {
              setActiveTab('REGISTER');
              setFormError('');
              setSuccessMsg('');
            }}
            className={`cursor-pointer pb-2 font-display text-xs font-bold uppercase transition ${
              activeTab === 'REGISTER'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            ĐĂNG KÝ MỚI
          </button>
        </div>

        {/* Validation Errors Notifications Alerts */}
        {formError && (
          <div className="flex items-center space-x-2 rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs font-semibold text-rose-500 mb-4 animate-slide-in" id="auth-error">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Success Notifications Messages */}
        {successMsg && (
          <div className="flex items-center space-x-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-xs font-semibold text-emerald-500 mb-4 animate-slide-in" id="auth-success">
            <Check className="h-4.5 w-4.5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form layout */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* If Register tab, displays Name field */}
          {activeTab === 'REGISTER' && (
            <div>
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider">Họ và tên của bạn</label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn Hoàng..."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs font-semibold outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
              />
            </div>
          )}

          {/* Email input field */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider">Địa chỉ Email đăng nhập</label>
            <input
              type="email"
              required
              placeholder="example@gmail.com..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs font-semibold outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
            />
          </div>

          {/* Password with Eye Hide/Show Toggle */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider">Mật khẩu bảo mật</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Nhập ít nhất 6 ký tự..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-xs font-semibold outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Repeat password for Registration tab */}
          {activeTab === 'REGISTER' && (
            <div>
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider">Nhập lại khẩu lệnh</label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Trùng khớp mật khẩu trên..."
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs font-semibold outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
              />
            </div>
          )}

          {/* Submits buttons CTA */}
          <button
            type="submit"
            className="cursor-pointer w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-display text-xs font-extrabold py-3 shadow-lg shadow-blue-500/10 active:scale-95 transition-all mt-4"
          >
            <ShieldCheck className="h-4.5 w-4.5" />
            {activeTab === 'LOGIN' ? 'XÁC THỰC ĐĂNG NHẬP' : 'TẠO TÀI KHOẢN MỚI'}
          </button>
        </form>

        {/* Security badge statement footer info */}
        <div className="mt-6 flex justify-center items-center gap-1 text-[10px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
          <span>Hệ thống bảo mật chứng chỉ SSL AES-256 bit khép kín.</span>
        </div>

      </div>
    </div>
  );
}
