
import React, { useState } from 'react';
import { Page } from '../types';

interface ForgotPasswordProps {
  onNavigate: (page: Page) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-slate-900 p-8 text-white text-center">
          <h2 className="text-2xl font-bold">Khôi phục mật khẩu</h2>
          <p className="text-slate-400 text-sm mt-1">Chúng tôi sẽ gửi liên kết qua email cho bạn</p>
        </div>
        
        <div className="p-8">
          {isSent ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto">
                ✉️
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Kiểm tra email của bạn</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư đến (hoặc thư rác).
                </p>
              </div>
              <button 
                onClick={() => onNavigate('login')}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold transition-all"
              >
                Quay lại đăng nhập
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Nhập Email đăng ký</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-orange-500/25"
              >
                Gửi yêu cầu
              </button>

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  ← Quay lại trang đăng nhập
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
