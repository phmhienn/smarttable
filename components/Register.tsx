
import React, { useState } from 'react';
import { Page, User } from '../types';

interface RegisterProps {
  onRegister: (user: User) => void;
  onNavigate: (page: Page) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      alert("Mật khẩu không khớp!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      onRegister({ name: formData.name, email: formData.email });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-orange-500 p-8 text-white text-center">
          <h2 className="text-2xl font-bold">Tạo tài khoản mới</h2>
          <p className="text-orange-100 text-sm mt-1">Trở thành hội viên The Gourmet Kitchen</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Họ và tên</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Nguyễn Văn A"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Mật khẩu</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              value={formData.confirm}
              onChange={(e) => setFormData({...formData, confirm: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center mt-4"
          >
            {isLoading ? "Đang xử lý..." : "Đăng ký thành viên"}
          </button>

          <div className="text-center pt-2">
            <p className="text-sm text-slate-500">
              Đã có tài khoản?{' '}
              <button 
                type="button"
                onClick={() => onNavigate('login')}
                className="font-bold text-orange-500 hover:text-orange-600 underline"
              >
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
