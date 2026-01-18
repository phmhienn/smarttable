
export type Page = 'home' | 'booking' | 'prediction' | 'table-selection' | 'confirmation' | 'success' | 'login' | 'register' | 'forgot-password' | 'history';

export interface BookingData {
  date: string;
  time: string;
  guests: number;
  tableId?: string;
}

export enum PeakStatus {
  LOW = 'Ít khách',
  MEDIUM = 'Trung bình',
  HIGH = 'Cao điểm'
}

export interface TimeSlot {
  time: string;
  status: PeakStatus;
  score: number; // 1-10 intensity
}

export interface User {
  name: string;
  email: string;
}

export interface BookingRecord extends BookingData {
  id: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  peakPrediction: PeakStatus;
}
