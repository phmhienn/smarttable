
import React from 'react';
import { Page, BookingData, PeakStatus } from '../types';
import { getStatusForTime } from '../utils';

interface ConfirmationProps {
  data: BookingData;
  onConfirm: (data: BookingData) => void;
  onNavigate: (page: Page) => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ data, onConfirm, onNavigate }) => {
  const status = getStatusForTime(data.time);

  return (
    <div className="animate-in slide-in-from-right-8 duration-500 py-20 px-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-orange-500 p-10 text-white text-center">
          <h2 className="text-3xl font-black mb-2 tracking-tight">Xác nhận đặt bàn</h2>
          <p className="text-orange-100 font-medium">Kiểm tra lại thông tin trước khi hoàn tất</p>
        </div>

        <div className="p-10 md:p-16 space-y-10">
          <div className="grid grid-cols-2 gap-10 border-b border-slate-100 pb-10">
            <div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Ngày đặt</div>
              <div className="text-xl font-black text-slate-900">{data.date}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Giờ hẹn</div>
              <div className="text-xl font-black text-slate-900">{data.time}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Số khách</div>
              <div className="text-xl font-black text-slate-900">{data.guests} người</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Mã bàn chọn</div>
              <div className="text-xl font-black text-orange-500">{data.tableId || 'T-AUTO'}</div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl group-hover:scale-110 transition-transform">📊</div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Phân tích mật độ AI</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Khung giờ này được AI dự đoán là <span className="text-slate-900 font-black italic">"{status.status.toLowerCase()}"</span>. 
              {status.status === PeakStatus.LOW 
                ? " Đây là thời điểm vàng để thưởng thức không gian yên tĩnh và riêng tư nhất." 
                : " Chúng tôi đã chuẩn bị sẵn sàng nhân sự để phục vụ bạn chu đáo nhất dù là giờ cao điểm."}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => onConfirm(data)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-[2rem] text-xl font-black transition-all shadow-2xl shadow-slate-900/20 transform hover:-translate-y-1"
            >
              Xác nhận và Hoàn tất
            </button>
            <button 
              onClick={() => onNavigate('table-selection')}
              className="w-full text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors py-2"
            >
              Thay đổi vị trí bàn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
