export type UserRole = 'senior' | 'proche' | null;

export interface HealthStats {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  spO2: number;
  temperature: number;
  steps: number;
  sleep: string;
}

export interface MoodEntry {
  date: string;
  score: number;
  emoji: string;
  note: string;
}

export interface Alert {
  id: string;
  type: 'emergency' | 'urgent' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  status: 'active' | 'resolved';
}

export interface Photo {
  id: string;
  url: string;
  sender: string;
  likes: number;
  date: string;
  caption: string;
}
