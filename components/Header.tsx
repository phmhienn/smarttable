
import React from 'react';
import { Page, User } from '../types';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  activePage: Page;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activePage, user, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center px-6 md:px-12 justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => onNavigate('home')}
      >
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
        <span className="text-xl font-bold tracking-tight text-slate-800">Gourmet <span className="text-orange-500">Kitchen</span></span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        <button 
          onClick={() => onNavigate('home')}
          className={`${activePage === 'home' ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'} transition-colors`}
        >
          Trang chủ
        </button>
        <button 
          onClick={() => onNavigate('booking')}
          className={`${activePage === 'booking' ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'} transition-colors`}
        >
          Đặt bàn
        </button>
        <button 
          onClick={() => onNavigate('history')}
          className={`${activePage === 'history' ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'} transition-colors`}
        >
          Lịch sử đặt bàn
        </button>
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <div className="text-xs font-bold text-slate-900">{user.name}</div>
              <button 
                onClick={onLogout}
                className="text-[10px] text-slate-400 hover:text-red-500 font-bold uppercase tracking-wider"
              >
                Đăng xuất
              </button>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 border border-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => onNavigate('login')}
            className="text-slate-600 hover:text-orange-500 text-sm font-bold px-4 py-2 transition-colors"
          >
            Đăng nhập
          </button>
        )}
        
        <button 
          onClick={() => onNavigate('booking')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md shadow-orange-200"
        >
          Đặt bàn ngay
        </button>
      </div>
    </header>
  );
};

export default Header;
