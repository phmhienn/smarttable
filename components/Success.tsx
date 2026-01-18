
import React from 'react';
import { Page } from '../types';

interface SuccessProps {
  bookingId?: string;
  onNavigate: (page: Page) => void;
}

const Success: React.FC<SuccessProps> = ({ bookingId, onNavigate }) => {
  return (
    <div className="animate-in zoom-in-90 duration-500 py-20 px-6 max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-[3rem] shadow-2xl p-12 md:p-20 border border-slate-100 flex flex-col items-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-8 animate-bounce">
          ✅
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Bạn đã đặt bàn <br/><span className="text-orange-500">thành công!</span>
        </h2>
        
        <p className="text-lg text-slate-600 mb-12 max-w-sm mx-auto leading-relaxed">
          Cảm ơn bạn đã tin dùng SmartTable AI. Một email xác nhận đã được gửi đến bạn.
        </p>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 w-full mb-12 flex items-center gap-4 text-left">
          <div className="text-3xl">🤖</div>
          <div className="text-indigo-800 text-sm font-medium">
            "Sự lựa chọn của bạn rất thông minh. AI đã giúp bạn tối ưu hóa thời gian chờ đợi!"
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all shadow-xl transform hover:-translate-y-1 flex-1"
          >
            Quay về trang chủ
          </button>
          <button 
            onClick={() => onNavigate('history')}
            className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl text-lg font-bold transition-all shadow-md transform hover:-translate-y-1 flex-1"
          >
            Xem lịch sử đặt bàn
          </button>
        </div>
        
        <p className="mt-8 text-sm text-slate-400 font-medium">
          Mã đặt bàn: <span className="text-slate-900">{bookingId || 'ST-889922'}</span>
        </p>
      </div>
    </div>
  );
};

export default Success;
