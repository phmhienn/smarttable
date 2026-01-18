
import { PeakStatus, TimeSlot } from './types';

export const AI_RULES: TimeSlot[] = [
  { time: '10:00', status: PeakStatus.LOW, score: 2 },
  { time: '11:00', status: PeakStatus.MEDIUM, score: 5 },
  { time: '12:00', status: PeakStatus.HIGH, score: 10 },
  { time: '13:00', status: PeakStatus.HIGH, score: 9 },
  { time: '14:00', status: PeakStatus.MEDIUM, score: 4 },
  { time: '15:00', status: PeakStatus.LOW, score: 2 },
  { time: '16:00', status: PeakStatus.LOW, score: 2 },
  { time: '17:00', status: PeakStatus.LOW, score: 3 },
  { time: '18:00', status: PeakStatus.MEDIUM, score: 6 },
  { time: '19:00', status: PeakStatus.HIGH, score: 10 },
  { time: '20:00', status: PeakStatus.HIGH, score: 9 },
  { time: '21:00', status: PeakStatus.MEDIUM, score: 5 },
  { time: '22:00', status: PeakStatus.LOW, score: 3 },
];

export const COLORS = {
  primary: '#f97316', // Orange 500
  secondary: '#1e293b', // Slate 800
};
