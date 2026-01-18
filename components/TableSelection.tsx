
import React, { useState } from 'react';
import { Page, BookingData } from '../types';

interface TableSelectionProps {
  data: BookingData;
  onNavigate: (page: Page, data?: Partial<BookingData>) => void;
}

interface TableInfo {
  id: string;
  capacity: number;
  type: 'window' | 'corner' | 'center' | 'vip';
  status: 'available' | 'occupied';
  x: string;
  y: string;
}

const TABLES: TableInfo[] = [
  { id: 'T-01', capacity: 2, type: 'window', status: 'available', x: '10%', y: '15%' },
  { id: 'T-02', capacity: 2, type: 'window', status: 'available', x: '10%', y: '45%' },
  { id: 'T-03', capacity: 2, type: 'window', status: 'available', x: '10%', y: '75%' },
  { id: 'T-04', capacity: 4, type: 'corner', status: 'available', x: '40%', y: '15%' },
  { id: 'T-05', capacity: 4, type: 'center', status: 'occupied', x: '40%', y: '45%' },
  { id: 'T-06', capacity: 4, type: 'center', status: 'available', x: '40%', y: '75%' },
  { id: 'T-07', capacity: 6, type: 'vip', status: 'available', x: '75%', y: '20%' },
  { id: 'T-08', capacity: 8, type: 'vip', status: 'available', x: '75%', y: '60%' },
];

const TableSelection: React.FC<TableSelectionProps> = ({ data, onNavigate }) => {
  const [selectedTable, setSelectedTable] = useState<string | null>(data.tableId || null);

  // Logic đơn giản để đoán xem người dùng có bỏ qua AI không (chẳng hạn qua một flag hoặc logic flow)
  // Ở đây chúng ta giả định nếu đang chọn bàn, người dùng có quyền quay lại sửa thông tin gốc hoặc xem dự báo
  
  const handleSelect = (table: TableInfo) => {
    if (table.status === 'occupied' || table.capacity < data.guests) return;
    setSelectedTable(table.id);
  };

  const isRecommended = (table: TableInfo) => {
    if (data.guests <= 2 && table.type === 'window') return true;
    if (data.guests >= 4 && table.type === 'vip') return true;
    return false;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 py-12 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left: Interactive Map */}
        <div className="flex-grow">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">Bước 3/4</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Chọn vị trí bàn</h2>
            </div>
            <p className="text-slate-500 font-medium italic">"Gợi ý: Cặp đôi thường yêu thích vị trí cửa sổ cho sự lãng mạn."</p>
          </div>

          <div className="relative aspect-[16/9] bg-slate-50 rounded-[3rem] border-4 border-slate-200 overflow-hidden shadow-2xl group ring-1 ring-slate-200">
            {/* Floor Texture/Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            {/* Window View Label */}
            <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-blue-50/50 to-transparent flex flex-col items-center justify-center gap-4 text-blue-400 font-black text-xs uppercase tracking-[0.5em] [writing-mode:vertical-lr] border-r border-blue-100/30">
              🌆 VIEW THÀNH PHỐ
            </div>

            {/* Entrance */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-3 bg-slate-900 rounded-t-xl z-20"></div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-4 py-1 rounded-full shadow-sm border border-slate-100 z-20">Lối vào chính</div>

            {/* Tables Grid */}
            {TABLES.map((table) => {
              const isOccupied = table.status === 'occupied';
              const tooSmall = table.capacity < data.guests;
              const isDisabled = isOccupied || tooSmall;
              const isSelected = selectedTable === table.id;
              const isAIRecommended = isRecommended(table) && !isDisabled;

              return (
                <button
                  key={table.id}
                  onClick={() => handleSelect(table)}
                  disabled={isDisabled}
                  className={`absolute flex flex-col items-center justify-center transition-all duration-500 transform ${
                    isSelected ? 'scale-110 z-30' : 'hover:scale-105 z-10'
                  }`}
                  style={{ left: table.x, top: table.y }}
                >
                  {/* AI Recommendation Floating Badge */}
                  {isAIRecommended && !isSelected && (
                    <div className="absolute -top-12 animate-bounce flex flex-col items-center">
                      <div className="bg-indigo-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg flex items-center gap-1.5 whitespace-nowrap border-2 border-white">
                        <span>✨</span> Ưu tiên cho {data.guests} khách
                      </div>
                      <div className="w-2 h-2 bg-indigo-600 rotate-45 -mt-1 shadow-lg"></div>
                    </div>
                  )}

                  {/* Table Shape */}
                  <div className={`
                    ${table.capacity >= 6 ? 'w-24 h-16 rounded-2xl' : 'w-16 h-16 rounded-full'}
                    flex flex-col items-center justify-center border-4 transition-all duration-300 relative overflow-hidden
                    ${isDisabled 
                      ? 'bg-slate-100 border-slate-200 cursor-not-allowed grayscale' 
                      : isSelected 
                        ? 'bg-orange-500 border-white shadow-[0_0_40px_rgba(249,115,22,0.6)] text-white ring-4 ring-orange-500/30 animate-pulse-subtle' 
                        : isAIRecommended
                          ? 'bg-white border-indigo-400 shadow-xl shadow-indigo-100 text-indigo-600'
                          : 'bg-white border-slate-300 shadow-md text-slate-700 hover:border-orange-400 hover:shadow-orange-100'
                    }
                  `}>
                    {/* Status Content */}
                    {isSelected ? (
                      <div className="flex flex-col items-center animate-in zoom-in duration-300">
                        <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[10px] font-black leading-none">CỦA BẠN</span>
                      </div>
                    ) : isOccupied ? (
                      <div className="flex flex-col items-center opacity-40">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    ) : tooSmall ? (
                      <div className="flex flex-col items-center opacity-40">
                        <span className="text-[10px] font-black text-rose-400">SMALL</span>
                      </div>
                    ) : (
                      <span className="font-black text-lg">{table.id}</span>
                    )}

                    {/* Table Type Icon Overlay (Optional indicator for VIP etc) */}
                    {table.type === 'vip' && !isSelected && !isDisabled && (
                      <div className="absolute top-1 right-1 text-[8px] opacity-30">⭐</div>
                    )}
                  </div>
                  
                  {/* Table Footer Label */}
                  <div className={`mt-2 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors ${isSelected ? 'bg-orange-500 text-white' : 'text-slate-500'}`}>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Bàn {table.id}</span>
                    <span className="text-[8px] opacity-60">•</span>
                    <span className="text-[10px] font-black">{table.capacity} chỗ</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <LegendItem 
              color="bg-orange-500 ring-4 ring-orange-100" 
              label="Bàn bạn chọn" 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />} 
              isPrimary
            />
            <LegendItem 
              color="bg-white border-indigo-400" 
              label="AI gợi ý" 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
            />
            <LegendItem 
              color="bg-white border-slate-200" 
              label="Còn trống" 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />}
            />
            <LegendItem 
              color="bg-slate-100 opacity-60" 
              label="Đã đặt" 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
            />
            <LegendItem 
              color="bg-slate-50 border-slate-100 opacity-40" 
              label="Không đủ chỗ" 
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
            />
          </div>
        </div>

        {/* Right: Summary Sidebar */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl sticky top-24 text-white">
            <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Tóm tắt đơn đặt</h3>
            
            <div className="space-y-8 mb-12">
              <SummaryItem label="Ngày hẹn" value={data.date} icon="📅" />
              <SummaryItem label="Thời gian" value={data.time} icon="🕒" />
              <SummaryItem label="Khách" value={`${data.guests} người`} icon="👥" />
              <SummaryItem 
                label="Vị trí đã chọn" 
                value={selectedTable ? `Bàn ${selectedTable}` : '---'} 
                icon="🪑"
                highlight={!!selectedTable}
              />
            </div>

            <button 
              onClick={() => onNavigate('confirmation', { tableId: selectedTable! })}
              disabled={!selectedTable}
              className={`w-full py-5 rounded-2xl text-lg font-black transition-all shadow-xl flex items-center justify-center gap-3 group ${
                selectedTable 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25 transform hover:-translate-y-1' 
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Tiếp tục xác nhận
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            
            <div className="mt-8 flex flex-col gap-4">
              <button 
                onClick={() => onNavigate('prediction')}
                className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-orange-400 transition-colors"
              >
                ← Xem lại dự báo AI
              </button>
              <button 
                onClick={() => onNavigate('booking')}
                className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors"
              >
                ← Thay đổi thông tin gốc
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1.1); box-shadow: 0 0 40px rgba(249,115,22,0.6); }
          50% { transform: scale(1.12); box-shadow: 0 0 60px rgba(249,115,22,0.8); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

const LegendItem = ({ color, label, icon, isPrimary = false }: { color: string, label: string, icon: React.ReactNode, isPrimary?: boolean }) => (
  <div className="flex flex-col items-center text-center gap-2">
    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${color} ${isPrimary ? 'text-white' : 'text-slate-400'}`}>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </div>
    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">{label}</span>
  </div>
);

const SummaryItem = ({ label, value, icon, highlight = false }: { label: string, value: string, icon: string, highlight?: boolean }) => (
  <div className="flex items-start gap-4">
    <div className="text-xl bg-white/5 w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
      {icon}
    </div>
    <div>
      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</div>
      <div className={`text-lg font-black ${highlight ? 'text-orange-400 animate-pulse' : 'text-white'}`}>{value}</div>
    </div>
  </div>
);

export default TableSelection;
