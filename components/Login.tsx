
import React, { useState } from 'react';
import { Page, User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: Page) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin({ name: email.split('@')[0], email });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-orange-500 p-8 text-white text-center">
          <h2 className="text-2xl font-bold">Chào mừng trở lại</h2>
          <p className="text-orange-100 text-sm mt-1">Đăng nhập để đặt bàn nhanh hơn</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Mật khẩu</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Đăng nhập"}
            </button>

            <div className="text-center">
              <button 
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
              >
                Quên mật khẩu?
              </button>
            </div>
          </div>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Chưa có tài khoản?{' '}
              <button 
                type="button"
                onClick={() => onNavigate('register')}
                className="font-bold text-orange-500 hover:text-orange-600 underline"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
