
import React, { useState } from 'react';
import { Page, BookingData } from '../types';

interface BookingFormProps {
  data: BookingData;
  onNavigate: (page: Page, data: BookingData) => void;
}

const COMMON_TIME_SLOTS = ['11:00', '12:00', '13:00', '18:00', '19:00', '20:00', '21:00'];
const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const BookingForm: React.FC<BookingFormProps> = ({ data, onNavigate }) => {
  const [formData, setFormData] = useState<BookingData>(data);
  const [bookingMode, setBookingMode] = useState<'regular' | 'ai'>('regular');

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('prediction', formData);
  };

  const handleRegularSubmit = (time: string) => {
    const updatedData = { ...formData, time };
    setFormData(updatedData);
    onNavigate('table-selection', updatedData);
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Bắt đầu trải nghiệm của bạn</h2>
        <p className="text-slate-500 font-medium">Chọn phương thức đặt bàn phù hợp với nhu cầu của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section: General Config */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 h-full flex flex-col">
            <h3 className="text-xl font-black mb-8 text-slate-800 flex items-center gap-2">
              <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-sm">01</span>
              Thông tin chung
            </h3>
            
            <div className="space-y-8 flex-grow">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Ngày dùng bữa</label>
                <input 
                  type="date" 
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-slate-700"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Số lượng khách</label>
                <div className="grid grid-cols-4 gap-2">
                  {GUEST_OPTIONS.map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({...formData, guests: num})}
                      className={`py-3 rounded-xl font-black border text-xs transition-all ${
                        formData.guests === num 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-lg transform scale-105' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 font-bold italic mt-2">
                  * Đối với các yêu cầu đặt bàn trên 8 người, vui lòng liên hệ trực tiếp qua hotline.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Booking Modes */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Path A: Regular Booking */}
          <div 
            className={`bg-white p-8 rounded-[2.5rem] shadow-xl border-2 transition-all cursor-pointer group flex flex-col ${bookingMode === 'regular' ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-100 hover:border-slate-200'}`} 
            onClick={() => setBookingMode('regular')}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">📅</div>
              {bookingMode === 'regular' && <span className="bg-blue-500 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Đang chọn</span>}
            </div>
            <h3 className="text-xl font-black mb-2 text-slate-800">Đặt thông thường</h3>
            <p className="text-xs text-slate-500 mb-8 font-medium leading-relaxed">Chọn nhanh các khung giờ phổ biến để tiết kiệm thời gian.</p>
            
            <div className="grid grid-cols-2 gap-3 mb-8 flex-grow">
              {COMMON_TIME_SLOTS.map(time => (
                <button
                  key={time}
                  disabled={bookingMode !== 'regular'}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRegularSubmit(time);
                  }}
                  className={`py-3 px-4 rounded-xl font-black text-sm transition-all text-slate-700 border ${
                    bookingMode === 'regular' 
                    ? 'bg-slate-50 hover:bg-blue-500 hover:text-white border-slate-200 hover:scale-105 active:scale-95' 
                    : 'bg-slate-50/50 border-slate-100 opacity-50 cursor-default'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
              {bookingMode === 'regular' ? 'Bấm vào giờ để tiếp tục chọn bàn →' : 'Chọn chế độ này để xem giờ'}
            </p>
          </div>

          {/* Path B: AI Path */}
          <div 
            className={`bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border-2 transition-all relative overflow-hidden cursor-pointer group flex flex-col ${bookingMode === 'ai' ? 'border-orange-500 ring-4 ring-orange-500/10' : 'border-transparent opacity-80 hover:opacity-100'}`} 
            onClick={() => setBookingMode('ai')}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/40">🤖</div>
              {bookingMode === 'ai' && <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">Đang chọn</span>}
            </div>
            
            <h3 className="text-xl font-black mb-2 text-white relative z-10">Phân tích bằng AI</h3>
            <p className="text-xs text-slate-400 mb-8 font-medium leading-relaxed relative z-10">Dự báo mật độ khách để chọn thời điểm yên tĩnh nhất.</p>
            
            <form 
              onSubmit={handleAISubmit} 
              className="space-y-6 relative z-10 flex-grow"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Nhập giờ bạn muốn</label>
                <input 
                  type="time" 
                  required
                  disabled={bookingMode !== 'ai'}
                  className={`w-full px-5 py-4 bg-white/10 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-white placeholder-white/20 ${bookingMode !== 'ai' ? 'opacity-30' : ''}`}
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={bookingMode !== 'ai'}
                className={`w-full py-5 rounded-2xl text-sm font-black transition-all shadow-xl flex items-center justify-center gap-3 transform ${
                  bookingMode === 'ai'
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25 hover:-translate-y-1 active:scale-95'
                  : 'bg-white/5 text-white/20 cursor-default'
                }`}
              >
                Tiến hành dự báo
                <span className="text-lg">✨</span>
              </button>
            </form>

            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5 relative z-10">
              <div className="flex gap-3">
                <span className="text-orange-400 text-lg">💡</span>
                <p className="text-[10px] text-slate-400 font-medium leading-tight">
                  Sử dụng AI để tránh khung giờ cao điểm, đặc biệt vào cuối tuần và lễ tết.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingForm;
