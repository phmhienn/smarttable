
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import BookingForm from './components/BookingForm';
import AIPrediction from './components/AIPrediction';
import TableSelection from './components/TableSelection';
import Confirmation from './components/Confirmation';
import Success from './components/Success';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import BookingHistory from './components/BookingHistory';
import { Page, BookingData, User, BookingRecord, PeakStatus } from './types';
import { getStatusForTime } from './utils';

const INITIAL_HISTORY: BookingRecord[] = [
  {
    id: 'ST-889922',
    date: '2024-03-25',
    time: '19:00',
    guests: 2,
    tableId: 'T-02',
    status: 'upcoming',
    peakPrediction: PeakStatus.HIGH
  },
  {
    id: 'ST-772211',
    date: '2024-03-15',
    time: '12:00',
    guests: 4,
    tableId: 'T-08',
    status: 'completed',
    peakPrediction: PeakStatus.HIGH
  }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem('gourmet_bookings');
    return saved ? JSON.parse(saved) : INITIAL_HISTORY;
  });
  const [lastBookingId, setLastBookingId] = useState<string>('');
  const [bookingData, setBookingData] = useState<BookingData>({
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    guests: 2
  });

  useEffect(() => {
    localStorage.setItem('gourmet_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const navigateTo = (page: Page, data?: Partial<BookingData>) => {
    if ((page === 'booking' || page === 'history') && !user) {
      setCurrentPage('login');
      return;
    }

    if (data) {
      setBookingData(prev => ({ ...prev, ...data }));
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => 
      b.id === id ? { ...b, status: 'cancelled' as const } : b
    ));
  };

  const handleAddBooking = (data: BookingData) => {
    const newId = `ST-${Math.floor(100000 + Math.random() * 900000)}`;
    const peakInfo = getStatusForTime(data.time);
    
    const newRecord: BookingRecord = {
      ...data,
      id: newId,
      status: 'upcoming',
      peakPrediction: peakInfo.status
    };
    
    setBookings(prev => [newRecord, ...prev]);
    setLastBookingId(newId);
    navigateTo('success');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateTo} />;
      case 'booking':
        return <BookingForm data={bookingData} onNavigate={navigateTo} />;
      case 'prediction':
        return <AIPrediction data={bookingData} onNavigate={navigateTo} />;
      case 'table-selection':
        return <TableSelection data={bookingData} onNavigate={navigateTo} />;
      case 'confirmation':
        return <Confirmation data={bookingData} onConfirm={handleAddBooking} onNavigate={navigateTo} />;
      case 'success':
        return <Success bookingId={lastBookingId} onNavigate={navigateTo} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'register':
        return <Register onRegister={handleLogin} onNavigate={navigateTo} />;
      case 'forgot-password':
        return <ForgotPassword onNavigate={navigateTo} />;
      case 'history':
        return <BookingHistory 
          bookings={bookings} 
          onCancel={handleCancelBooking}
          onNavigate={navigateTo} 
        />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onNavigate={navigateTo} activePage={currentPage} user={user} onLogout={handleLogout} />
      <main className="flex-grow pt-16">
        {renderPage()}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">The Gourmet Kitchen</h3>
            <p className="text-sm leading-relaxed">
              Nhà hàng hiện đại bậc nhất TP.HCM, nơi ẩm thực tinh hoa kết hợp cùng công nghệ dự báo thông minh.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo('home')}>Trang chủ</button></li>
              <li><button onClick={() => navigateTo('booking')}>Đặt bàn</button></li>
              <li><button onClick={() => navigateTo('history')}>Lịch sử đặt bàn</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <p className="text-sm">456 Lê Lợi, Quận 1, TP.HCM</p>
            <p className="text-sm">Email: reservation@gourmetkitchen.vn</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
