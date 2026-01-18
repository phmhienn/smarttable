
import { AI_RULES } from './constants';
import { PeakStatus, TimeSlot } from './types';

export const getStatusForTime = (time: string): TimeSlot => {
  // Find closest match or exact
  const found = AI_RULES.find(r => r.time === time);
  if (found) return found;
  
  // Logic to interpolate for times not in list
  const hour = parseInt(time.split(':')[0]);
  if (hour >= 11 && hour <= 13) return { time, status: PeakStatus.HIGH, score: 9 };
  if (hour >= 18 && hour <= 20) return { time, status: PeakStatus.HIGH, score: 10 };
  if (hour >= 17 && hour < 18) return { time, status: PeakStatus.MEDIUM, score: 6 };
  return { time, status: PeakStatus.LOW, score: 2 };
};

export const getRecommendedSlots = (currentStatus: TimeSlot): TimeSlot[] => {
  return AI_RULES.filter(slot => slot.status === PeakStatus.LOW).slice(0, 3);
};
