
import React, { useEffect, useState } from 'react';
import { Page, BookingData, TimeSlot, PeakStatus } from '../types';
import { getStatusForTime, getRecommendedSlots } from '../utils';
import { AI_RULES } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface AIPredictionProps {
  data: BookingData;
  onNavigate: (page: Page, data?: Partial<BookingData>) => void;
}

const AIPrediction: React.FC<AIPredictionProps> = ({ data, onNavigate }) => {
  const currentSlot = getStatusForTime(data.time);
  const recommendations = getRecommendedSlots(currentSlot);
  const [aiAdvice, setAiAdvice] = useState<string>("Đang phân tích dữ liệu chuyên sâu...");

  useEffect(() => {
    const fetchAIAdvice = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Bạn là một chuyên gia vận hành nhà hàng cao cấp. Người dùng muốn đặt bàn cho ${data.guests} người vào lúc ${data.time} ngày ${data.date}. 
        Khung giờ này được đánh giá là: ${currentSlot.status}. 
        Hãy đưa ra lời khuyên ngắn gọn (khoảng 2 câu) bằng tiếng Việt để họ có trải nghiệm tốt nhất.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });
        
        setAiAdvice(response.text || "AI khuyên bạn nên đặt bàn sớm để có vị trí đẹp.");
      } catch (error) {
        setAiAdvice(
          currentSlot.status === PeakStatus.HIGH 
            ? "AI nhận thấy khung giờ này sẽ rất đông. Bạn nên cân nhắc đặt sớm hơn 30 phút để chọn được vị trí bàn tốt nhất."
            : "Tuyệt vời! Đây là khung giờ lý tưởng để chọn những bàn cạnh cửa sổ với tầm nhìn đẹp nhất."
        );
      }
    };

    fetchAIAdvice();
  }, [data, currentSlot]);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 py-12 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Phân tích AI cho ngày {data.date}</h2>
        <p className="text-slate-500 font-medium">Sử dụng dữ liệu thời gian thực để tối ưu trải nghiệm</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <span className="text-2xl">📊</span> Biểu đồ dự báo lưu lượng
            </h3>
            <div className="h-64 flex items-end gap-2 md:gap-4 mb-8 pt-10 px-2">
              {AI_RULES.map((slot) => (
                <div key={slot.time} className="flex-1 flex flex-col items-center gap-2 group relative">
                  <div 
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      slot.time === data.time 
                        ? 'bg-orange-500 scale-x-110 shadow-lg shadow-orange-500/40' 
                        : slot.status === PeakStatus.HIGH 
                          ? 'bg-slate-300 group-hover:bg-slate-400' 
                          : 'bg-slate-200 group-hover:bg-slate-300'
                    }`}
                    style={{ height: `${slot.score * 10}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1.5 rounded-lg whitespace-nowrap z-10 shadow-xl font-bold">
                      {slot.status}
                    </div>
                  </div>
                  <span className={`text-[10px] md:text-xs font-bold ${slot.time === data.time ? 'text-orange-500 font-black' : 'text-slate-400'}`}>
                    {slot.time}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="text-4xl">🕒</div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Giờ bạn chọn</div>
                  <div className="text-2xl font-black text-slate-900">{data.time}</div>
                </div>
              </div>
              <div className={`px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest ${
                currentSlot.status === PeakStatus.HIGH ? 'bg-rose-100 text-rose-600 shadow-sm' : 
                currentSlot.status === PeakStatus.MEDIUM ? 'bg-amber-100 text-amber-600 shadow-sm' : 'bg-emerald-100 text-emerald-600 shadow-sm'
              }`}>
                {currentSlot.status}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl group-hover:scale-110 transition-transform">🤖</div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-orange-500/30">AI</span>
                Phân tích & Khuyến nghị
              </h3>
              <p className="text-xl text-slate-300 leading-relaxed font-medium italic">
                "{aiAdvice}"
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800">
              <span className="text-xl">✨</span> Khung giờ tối ưu khác
            </h3>
            <div className="space-y-4">
              {recommendations.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => onNavigate('prediction', { time: slot.time })}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/50 hover:border-orange-500 hover:bg-white hover:shadow-lg transition-all group"
                >
                  <div className="text-left">
                    <div className="font-black text-slate-900">{slot.time}</div>
                    <div className="text-[10px] text-emerald-600 font-black uppercase tracking-tighter">{slot.status}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg transition-all">
                    →
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onNavigate('table-selection')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-[2.5rem] text-xl font-black transition-all shadow-2xl shadow-orange-500/40 transform hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            Chọn vị trí bàn 
            <span className="text-2xl">🪑</span>
          </button>
          
          <button 
            onClick={() => onNavigate('booking')}
            className="w-full bg-white text-slate-500 border border-slate-200 p-5 rounded-2xl text-sm font-bold transition-all hover:bg-slate-50 hover:text-slate-900"
          >
            Quay lại thay đổi thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPrediction;
