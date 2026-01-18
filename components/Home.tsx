
import React from 'react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="The Gourmet Kitchen interior" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="inline-block bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            The Gourmet Kitchen - Quận 1
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Thưởng thức tinh hoa – <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Không lo giờ cao điểm</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Nhà hàng đầu tiên tại Việt Nam áp dụng công nghệ thông minh để tối ưu hóa trải nghiệm thực khách. Đặt bàn hôm nay để nhận ưu đãi đặc biệt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('booking')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-orange-500/25 transform hover:-translate-y-1"
            >
              Đặt chỗ ngay
            </button>
            <button 
              onClick={() => onNavigate('booking')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:-translate-y-1"
            >
              Xem dự báo AI
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trải nghiệm khác biệt tại Gourmet Kitchen</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="🍳"
              title="Ẩm thực Fusion"
              description="Sự kết hợp hoàn hảo giữa kỹ thuật nấu ăn truyền thống và hương vị hiện đại."
            />
            <FeatureCard 
              icon="📊"
              title="Dự đoán thông minh"
              description="Hệ thống SmartTable dự đoán chính xác mật độ khách để bạn có không gian riêng tư nhất."
            />
            <FeatureCard 
              icon="🍷"
              title="Không gian sang trọng"
              description="Tọa lạc tại trung tâm Quận 1 với tầm nhìn panorama lung linh về đêm."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80" alt="Chef working" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Sứ mệnh của chúng tôi</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Tại The Gourmet Kitchen, chúng tôi tin rằng bữa ăn ngon không chỉ nằm ở hương vị, mà còn ở sự thoải mái. Công nghệ dự báo của chúng tôi sinh ra để loại bỏ sự phiền toái khi phải chờ đợi, mang lại cho bạn những giây phút thư giãn thực sự.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                <span className="font-semibold text-slate-800">Tiết kiệm 20-30 phút chờ đợi mỗi bữa ăn</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                <span className="font-semibold text-slate-800">Lựa chọn vị trí bàn đẹp nhất qua phân tích AI</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                <span className="font-semibold text-slate-800">Phục vụ tận tâm, cá nhân hóa theo sở thích</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-200 transition-all group">
    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export default Home;
