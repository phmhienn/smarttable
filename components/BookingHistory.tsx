
import React, { useState, useMemo, useEffect } from 'react';
import { Page, BookingRecord, PeakStatus } from '../types';

interface BookingHistoryProps {
  bookings: BookingRecord[];
  onCancel: (id: string) => void;
  onNavigate: (page: Page) => void;
}

type FilterType = 'all' | 'upcoming' | 'completed' | 'cancelled';

const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings, onCancel, onNavigate }) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [viewingBooking, setViewingBooking] = useState<BookingRecord | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const filteredBookings = useMemo(() => {
    if (filter === 'all') return bookings;
    return bookings.filter(b => b.status === filter);
  }, [bookings, filter]);

  const handleConfirmCancel = () => {
    if (cancellingId) {
      onCancel(cancellingId);
      setCancellingId(null);
      showToast('Đã huỷ đặt bàn thành công!');
    }
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 py-20 px-6 max-w-5xl mx-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Lịch sử đặt bàn</h2>
          <p className="text-slate-500 font-medium">Theo dõi và quản lý các trải nghiệm ẩm thực của bạn</p>
        </div>
        <button 
          onClick={() => onNavigate('booking')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-orange-500/20 transition-all flex items-center gap-2 group transform hover:-translate-y-1"
        >
          <span className="text-xl group-hover:rotate-90 transition-transform">＋</span> 
          Đặt bàn mới
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl mb-10 w-fit border border-slate-200 shadow-inner">
        <FilterTab active={filter === 'all'} label="Tất cả" onClick={() => setFilter('all')} />
        <FilterTab active={filter === 'upcoming'} label="Sắp tới" onClick={() => setFilter('upcoming')} />
        <FilterTab active={filter === 'completed'} label="Hoàn tất" onClick={() => setFilter('completed')} />
        <FilterTab active={filter === 'cancelled'} label="Đã hủy" onClick={() => setFilter('cancelled')} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div 
              key={booking.id} 
              className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-lg border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:shadow-2xl hover:border-orange-200 ${booking.status === 'cancelled' ? 'opacity-70 grayscale-[0.3]' : ''}`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-[1.5rem] flex flex-col items-center justify-center border transition-colors ${
                  booking.status === 'cancelled' ? 'bg-slate-50 border-slate-200 text-slate-400' : 
                  booking.status === 'upcoming' ? 'bg-orange-50 border-orange-100 text-orange-500' : 
                  'bg-emerald-50 border-emerald-100 text-emerald-500'
                }`}>
                  <span className="text-[10px] font-black uppercase tracking-tighter">{new Date(booking.date).toLocaleDateString('vi-VN', { month: 'short' })}</span>
                  <span className="text-2xl font-black">{new Date(booking.date).getDate()}</span>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">ID: {booking.id}</span>
                    <StatusBadge status={booking.status} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 leading-none mb-2">
                    {booking.time} <span className="text-slate-300 mx-1">/</span> {booking.guests} khách
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vị trí: </span>
                    <span className="text-xs font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{booking.tableId || 'T-AUTO'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end">
                <button 
                  onClick={() => setViewingBooking(booking)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-transparent px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-sm"
                >
                  Xem chi tiết
                </button>
                {booking.status === 'upcoming' && (
                  <button 
                    onClick={() => setCancellingId(booking.id)}
                    className="bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-100 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2"
                  >
                    <span>✕</span> Huỷ
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="text-6xl mb-6 grayscale opacity-30">🍽️</div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Trống trải quá...</h3>
            <p className="text-slate-500 mb-10 max-w-xs mx-auto">Chúng tôi không tìm thấy lịch đặt bàn nào phù hợp với bộ lọc này.</p>
            <button 
              onClick={() => onNavigate('booking')}
              className="text-orange-500 font-black text-lg hover:text-orange-600 transition-colors"
            >
              Bắt đầu hành trình ẩm thực ngay →
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {viewingBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="bg-slate-900 p-8 text-white flex justify-between items-center relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-7xl select-none">🧾</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tight">Thẻ xác nhận đặt bàn</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Hệ thống Gourmet Kitchen AI</p>
              </div>
              <button 
                onClick={() => setViewingBooking(null)}
                className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-xl"
              >✕</button>
            </div>
            
            <div className="p-10 space-y-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Mã tham chiếu</div>
                  <div className="text-xl font-black text-slate-900">#{viewingBooking.id}</div>
                </div>
                <StatusBadge status={viewingBooking.status} />
              </div>

              <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                <DetailItem label="Ngày hẹn" value={viewingBooking.date} icon="📅" />
                <DetailItem label="Thời gian" value={viewingBooking.time} icon="🕒" />
                <DetailItem label="Số lượng" value={`${viewingBooking.guests} người`} icon="👥" />
                <DetailItem label="Vị trí bàn" value={viewingBooking.tableId || 'T-AUTO'} icon="🪑" highlight />
              </div>

              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl group-hover:scale-110 transition-transform">🤖</div>
                <div className="text-3xl">✨</div>
                <div>
                  <p className="text-indigo-900 text-[10px] font-black uppercase tracking-widest mb-1">Ghi chú từ AI</p>
                  <p className="text-indigo-800 text-sm leading-relaxed font-bold italic">
                    "{viewingBooking.peakPrediction === PeakStatus.HIGH 
                      ? "Chúng tôi ghi nhận mật độ khách cao vào khung giờ này. Bàn của bạn đã được ưu tiên giữ chỗ." 
                      : "Khung giờ lý tưởng! Nhân viên đã chuẩn bị sẵn sàng thực đơn đón tiếp bạn tại bàn."}"
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setViewingBooking(null)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-slate-900/20 active:scale-95"
                >
                  Đóng chi tiết
                </button>
                {viewingBooking.status === 'upcoming' && (
                  <button 
                    onClick={() => {
                      setViewingBooking(null);
                      setCancellingId(viewingBooking.id);
                    }}
                    className="flex-1 bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-100 py-5 rounded-2xl font-black transition-all active:scale-95"
                  >
                    Huỷ đặt bàn này
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ... Rest of the component (Toast, Confirmation Modal) ... */}
      {toast.visible && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
            <span className="text-emerald-400 text-xl">✓</span>
            <span className="font-bold text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      {cancellingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                ⚠️
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Xác nhận huỷ đặt bàn?</h3>
              <p className="text-slate-500 leading-relaxed mb-10">
                Bạn có chắc chắn muốn huỷ lịch đặt bàn này không? Hành động này không thể hoàn tác.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleConfirmCancel}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-rose-500/25"
                >
                  Xác nhận huỷ
                </button>
                <button 
                  onClick={() => setCancellingId(null)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 py-4 rounded-2xl font-bold text-lg transition-all"
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterTab = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 transform ${
      active 
        ? 'bg-white text-orange-600 shadow-xl ring-1 ring-black/5 scale-105 z-10' 
        : 'text-slate-500 hover:text-slate-800 hover:scale-102'
    }`}
  >
    {label}
  </button>
);

const DetailItem = ({ label, value, icon, highlight = false }: { label: string, value: string, icon: string, highlight?: boolean }) => (
  <div className="flex items-start gap-4">
    <div className="text-2xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-100 shrink-0">
      {icon}
    </div>
    <div>
      <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{label}</div>
      <div className={`text-xl font-black leading-tight ${highlight ? 'text-orange-500' : 'text-slate-900'}`}>{value}</div>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: BookingRecord['status'] }) => {
  const styles = {
    upcoming: 'bg-blue-500 text-white shadow-blue-500/20',
    completed: 'bg-emerald-500 text-white shadow-emerald-500/20',
    cancelled: 'bg-slate-400 text-white shadow-slate-400/20'
  };
  const labels = {
    upcoming: 'Sắp tới',
    completed: 'Đã dùng bữa',
    cancelled: 'Đã hủy'
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default BookingHistory;
