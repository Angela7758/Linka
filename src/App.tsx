import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Image as ImageIcon, 
  Bell, 
  AlertTriangle, 
  Mic, 
  ChevronRight, 
  ChevronDown,
  Home, 
  Calendar, 
  Settings, 
  User, 
  Users, 
  Phone, 
  Share2, 
  Activity, 
  Thermometer, 
  Wind, 
  Footprints, 
  Moon, 
  Plus, 
  ChevronLeft, 
  Volume2, 
  Send,
  MoreVertical,
  Download,
  CheckCircle2,
  X,
  Play,
  Pause,
  MessageSquare,
  FileText,
  Smartphone,
  MapPin,
  Watch,
  Video,
  Stethoscope,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from './lib/utils';
import { UserRole, HealthStats, MoodEntry, Alert, Photo } from './types';
import { 
  HealthDetails, 
  PhotoGallery, 
  SettingsView, 
  AlertCenter, 
  DailySummary,
  DevicePairing,
  MoodHistory
} from './components/Screens';

// --- Mock Data ---
const MOCK_HEALTH: HealthStats = {
  heartRate: 72,
  bloodPressure: { systolic: 125, diastolic: 82 },
  spO2: 97,
  temperature: 36.8,
  steps: 3241,
  sleep: "7h12"
};

const MOCK_MOOD_HISTORY: MoodEntry[] = [
  { date: '20 Nov', score: 8, emoji: '😊', note: 'Conversation positive, a apprécié le jardinage.' },
  { date: '21 Nov', score: 7, emoji: '😐', note: 'Fatiguée, mais a bien mangé.' },
  { date: '22 Nov', score: 4, emoji: '😢', note: 'S\'est sentie isolée, appel court avec des pleurs.' },
  { date: '23 Nov', score: 6, emoji: '😐', note: 'Reposée.' },
  { date: '24 Nov', score: 7, emoji: '😊', note: 'Visite de Sophie.' },
  { date: '25 Nov', score: 8, emoji: '😊', note: 'Bonne journée.' },
  { date: '26 Nov', score: 9, emoji: '🥰', note: 'Très heureuse.' },
];

const MOCK_ALERTS: Alert[] = [
  { id: '1', type: 'emergency', title: 'URGENCE SANTÉ', description: 'Fréquence cardiaque anormale détectée (142 bpm)', timestamp: '10:24', status: 'active' },
  { id: '2', type: 'urgent', title: 'URGENT', description: 'Aucune réponse', timestamp: '09:30', status: 'active' },
  { id: '3', type: 'warning', title: 'WARNING', description: 'Changement d\'humeur', timestamp: 'Hier', status: 'active' },
  { id: '4', type: 'info', title: 'INFO', description: 'Résumé hebdomadaire', timestamp: 'Lundi', status: 'active' },
];

const MOCK_PHOTOS: Photo[] = [
  { id: '1', url: 'https://picsum.photos/seed/kids/800/600', sender: 'Jean', likes: 12, date: 'il y a 2h', caption: 'Les petits-enfants au parc 🌳' },
  { id: '2', url: 'https://picsum.photos/seed/cake/400/400', sender: 'Yo-Yo', likes: 14, date: 'Hier', caption: 'Anniversaire de mamie 🎂' },
  { id: '3', url: 'https://picsum.photos/seed/family/400/300', sender: 'Sophie', likes: 22, date: 'Hier', caption: 'Pique-nique en famille' },
  { id: '4', url: 'https://picsum.photos/seed/dog/300/400', sender: 'Thomas', likes: 8, date: '26 Oct', caption: 'Balade à la plage 🏖️' },
  { id: '5', url: 'https://picsum.photos/seed/baby/400/500', sender: 'Claire', likes: 35, date: '25 Oct', caption: 'Le petit dernier dort bien' },
];

// --- Components ---

const Card = ({ children, className, onClick, ...props }: { children: React.ReactNode; className?: string; onClick?: () => void; [key: string]: any }) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-white rounded-3xl p-5 card-shadow border border-slate-100",
      onClick && "cursor-pointer active:scale-[0.98] transition-transform",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  onClick 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'; 
  className?: string;
  onClick?: () => void;
}) => {
  const variants = {
    primary: "bg-brand-blue text-white shadow-lg shadow-blue-200",
    secondary: "bg-brand-light text-brand-blue",
    outline: "bg-white border-2 border-brand-blue text-brand-blue",
    danger: "bg-brand-accent text-white shadow-lg shadow-rose-200"
  };

  return (
    <button 
      onClick={onClick}
      className={cn("w-full py-4 px-6 rounded-2xl font-semibold transition-all active:scale-95", variants[variant], className)}
    >
      {children}
    </button>
  );
};

// --- Screens ---

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  const [mood, setMood] = useState(50);
  
  const moodIcons = [
    { 
      icon: (color: string) => (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      ),
      style: { left: '13.0%', top: '69.4%', transform: 'translate(-50%, -50%)' }
    },
    { 
      icon: (color: string) => (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10"/><path d="M8 15h8"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      ),
      style: { left: '34.7%', top: '26.1%', transform: 'translate(-50%, -50%)' }
    },
    { 
      icon: (color: string) => (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      ),
      style: { left: '65.3%', top: '26.1%', transform: 'translate(-50%, -50%)' }
    },
    { 
      icon: (color: string) => (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><path d="M9 10l1-1-1-1"/><path d="M15 10l-1-1 1-1"/>
        </svg>
      ),
      style: { left: '87.0%', top: '69.4%', transform: 'translate(-50%, -50%)' }
    },
  ];

  const getActiveIndex = () => {
    if (mood <= 25) return 0;
    if (mood <= 50) return 1;
    if (mood <= 75) return 2;
    return 3;
  };

  const activeIndex = getActiveIndex();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-8 relative overflow-hidden">
      {/* Background Wavy Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50 100 Q100 50 250 150 T550 100" stroke="#1e40af" strokeWidth="0.5" fill="none" />
          <path d="M-50 150 Q100 100 250 200 T550 150" stroke="#1e40af" strokeWidth="0.5" fill="none" />
          <path d="M-50 200 Q100 150 250 250 T550 200" stroke="#1e40af" strokeWidth="0.5" fill="none" />
          <path d="M-50 600 Q100 550 250 650 T550 600" stroke="#1e40af" strokeWidth="0.5" fill="none" />
          <path d="M-50 650 Q100 600 250 700 T550 650" stroke="#1e40af" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="z-10 w-full flex flex-col items-center">
        <h1 className="text-4xl font-black text-slate-900 mb-6 mt-12">Mood Dashboard</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-2 flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-slate-500" />
          <span className="text-slate-700 font-medium">March 17, 2023</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
        
        <p className="text-slate-500 mb-12">Welcome back, <span className="font-bold text-slate-700">Yo-Yo</span></p>
        
        <Card className="w-full aspect-square flex flex-col items-center justify-center relative mb-12 bg-white/80 backdrop-blur-sm p-8">
          <div className="relative w-full aspect-[2/1] flex items-end justify-center mb-12">
            {/* Semi-circle background with segments */}
            <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full">
              {/* Main Arc */}
              <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#f1f5f9" strokeWidth="30" strokeLinecap="round" />
              
              {/* Highlight active segment */}
              <path 
                d={
                  activeIndex === 0 ? "M20 100 A80 80 0 0 1 43.4 43.4" :
                  activeIndex === 1 ? "M43.4 43.4 A80 80 0 0 1 100 20" :
                  activeIndex === 2 ? "M100 20 A80 80 0 0 1 156.6 43.4" :
                  "M156.6 43.4 A80 80 0 0 1 180 100"
                }
                fill="none" 
                stroke="#dbeafe" 
                strokeWidth="30" 
                className="transition-all duration-300"
              />

              {/* Segment Dividers */}
              <line x1="43.4" y1="43.4" x2="43.4" y2="100" stroke="white" strokeWidth="2" opacity="0.5" />
              <line x1="100" y1="20" x2="100" y2="100" stroke="white" strokeWidth="2" opacity="0.5" />
              <line x1="156.6" y1="43.4" x2="156.6" y2="100" stroke="white" strokeWidth="2" opacity="0.5" />
              
              {/* Inner white circle to create the "hollow" look */}
              <circle cx="100" cy="100" r="65" fill="white" />
            </svg>
            
            {/* Icons on the arc */}
            <div className="absolute inset-0 w-full h-full">
              {moodIcons.map((m, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    scale: activeIndex === i ? 1.2 : 1,
                    boxShadow: activeIndex === i ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  }}
                  className={cn(
                    "absolute w-12 h-12 bg-white rounded-full flex items-center justify-center border transition-all duration-300",
                    activeIndex === i ? "z-20 border-slate-200" : "z-10 border-slate-100 opacity-80"
                  )}
                  style={m.style}
                >
                  {m.icon(activeIndex === i ? "#1e40af" : "#64748b")}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="w-full px-2 mt-8">
            <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              {/* Progress fill */}
              <div 
                className="absolute left-0 top-0 h-full bg-[#1e293b] transition-all duration-150"
                style={{ width: `${mood}%` }}
              />
            </div>
            <div className="relative w-full -mt-2">
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-slate-50 cursor-pointer z-30 flex items-center justify-center"
                style={{ left: `${mood}%`, transform: `translate(-50%, -50%)` }}
              >
                <div className="w-2 h-2 bg-slate-100 rounded-full" />
              </motion.div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={mood} 
                onChange={(e) => setMood(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-12 opacity-0 cursor-pointer z-40 -top-6"
              />
            </div>
          </div>
        </Card>
        
        <div className="w-full space-y-6">
          <Button onClick={onStart} className="py-5 text-xl font-black">
            Track Today's Mood
          </Button>
          <button onClick={onStart} className="w-full text-slate-900 font-black text-lg">
            View History & Insights
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileSelection = ({ onSelect }: { onSelect: (role: UserRole) => void }) => (
  <div className="min-h-screen flex flex-col p-8 bg-slate-50">
    <div className="mt-12 mb-12 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Bienvenue sur Linka</h1>
      <p className="text-slate-500 text-lg">Choisissez votre profil</p>
    </div>

    <div className="space-y-6 max-w-md mx-auto w-full">
      <Card 
        onClick={() => onSelect('senior')}
        className="flex items-center gap-6 p-6 cursor-pointer hover:border-brand-blue transition-colors border-2 border-transparent"
      >
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Granny" alt="Senior" className="w-20 h-20" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900">Je suis un Senior</h2>
          <p className="text-slate-500">Recevoir un accompagnement quotidien</p>
        </div>
      </Card>

      <Card 
        onClick={() => onSelect('proche')}
        className="flex items-center gap-6 p-6 cursor-pointer hover:border-brand-blue transition-colors border-2 border-transparent"
      >
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie" alt="Proche" className="w-20 h-20" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900">Je suis un Proche</h2>
          <p className="text-slate-500">Suivre le bien-être d'un senior</p>
        </div>
      </Card>
    </div>

    <div className="mt-auto text-center pb-8">
      <p className="text-slate-400">Besoin d'aide ? <span className="text-brand-blue font-medium">Contactez le support</span></p>
    </div>
  </div>
);

const SeniorDashboard = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="p-8 pt-12 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-1 flex items-center gap-2">
            Bonjour, Yo-Yo 👋
          </h1>
          <p className="text-xl font-bold text-slate-400">Lundi 31 Mars</p>
        </div>
        <button 
          onClick={() => onNavigate('detailed-dashboard')}
          className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg active:scale-90 transition-transform"
        >
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200" 
            alt="Yo-Yo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>

      <div className="px-6 flex flex-col items-center gap-10">
        {/* Circular Button */}
        <div 
          onClick={() => onNavigate('chat')}
          className="relative group cursor-pointer mt-4"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-full blur-3xl opacity-20 group-active:opacity-40 transition-opacity" />
          <div className="relative w-72 h-72 bg-[#1e40af] rounded-full flex flex-col items-center justify-center text-white shadow-[0_20px_60px_rgba(30,64,175,0.3)] active:scale-95 transition-transform border-[12px] border-white/10">
            <Mic className="w-24 h-24 mb-4" />
            <span className="text-3xl font-bold text-center px-10 leading-tight">Parler avec Linka</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full">
          <Card onClick={() => onNavigate('health')} className="p-8 flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Ma Santé</span>
          </Card>
          <Card onClick={() => onNavigate('photos')} className="p-8 flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-blue-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Mes Photos</span>
          </Card>
          <Card onClick={() => onNavigate('agenda')} className="p-8 flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center">
              <Calendar className="w-10 h-10 text-purple-500" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Mes Rappels</span>
          </Card>
          <Card onClick={() => onNavigate('emergency')} className="p-8 bg-rose-500 border-none flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">URGENCE</span>
          </Card>
        </div>

        <Card className="p-8 w-full">
          <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">COMMENT VOUS SENTEZ-VOUS ?</h3>
          <div className="flex justify-between items-center px-4">
            {['😔', '😐', '😊', '🤩'].map((emoji, i) => (
              <button 
                key={i} 
                onClick={() => onNavigate('mood-history')}
                className="w-16 h-16 text-4xl bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-blue-50 transition-colors active:scale-90"
              >
                {emoji}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const CircularProgress = ({ value, label, sublabel, color, icon: Icon }: { value: number, label: string, sublabel: string, color: string, icon: any }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-3xl shadow-sm border border-slate-100 flex-1">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="8"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-4 h-4 mb-1" style={{ color }} />
          <span className="text-lg font-black text-slate-900 leading-none">{value}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase">/100</span>
        </div>
      </div>
      <p className="mt-2 text-xs font-bold text-slate-900">{label}</p>
      <p className="text-[10px] font-bold text-slate-400 uppercase">{sublabel}</p>
    </div>
  );
};

const DetailedDashboard = ({ onNavigate, onBack }: { onNavigate: (screen: string) => void, onBack?: () => void }) => {
  const moodData = [
    { name: 'Lun', mood: 2 },
    { name: 'Mar', mood: 3 },
    { name: 'Mer', mood: 2.5 },
    { name: 'Jeu', mood: 3.5 },
    { name: 'Ven', mood: 4 },
    { name: 'Sam', mood: 3.8 },
    { name: 'Dim', mood: 4.5 },
  ];

  const moodEmojis = ['😢', '😐', '😊', '🤩', '🔥'];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      {/* Header */}
      <div className="p-6 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          {onBack && (
            <button onClick={onBack} className="p-2 -ml-2 active:scale-90 transition-transform">
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
          )}
          <h1 className="text-2xl font-black text-slate-900">Tableau de bord</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-slate-400" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
          </div>
          <button 
            onClick={() => onNavigate('settings')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm active:scale-90 transition-transform"
          >
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
              alt="Caregiver" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Senior Profile Card */}
        <Card 
          onClick={() => onNavigate('settings')}
          className="p-4 flex items-center gap-4 border-none shadow-sm"
        >
          <div className="relative">
            <div className="w-20 h-20 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200" 
                alt="Yo-Yo Dupont" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-slate-900">Yo-Yo Dupont</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Active aujourd'hui
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 text-slate-400 text-xs font-bold">
              <Watch className="w-3 h-3" />
              Il y a 2h • <span className="text-lg leading-none">😊</span>
            </div>
          </div>
        </Card>

        {/* Score Circles */}
        <div className="flex gap-4">
          <CircularProgress 
            value={87} 
            label="Wellness" 
            sublabel="87/100" 
            color="#3b82f6" 
            icon={Heart}
          />
          <CircularProgress 
            value={92} 
            label="Health" 
            sublabel="92/100" 
            color="#10b981" 
            icon={Smartphone}
          />
        </div>

        {/* Vitals Section */}
        <div>
          <h3 className="text-sm font-black text-slate-900 mb-4">Vitals en temps réel</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { label: 'Heart Rate', value: '72', unit: 'bpm', color: '#10b981' },
              { label: 'Blood Pressure', value: '125/82', unit: '', color: '#3b82f6' },
              { label: 'SpO2', value: '97', unit: '%', color: '#06b6d4' },
              { label: 'Temp', value: '36.8', unit: '°C', color: '#f59e0b' },
            ].map((vital, i) => (
              <Card key={i} className="p-4 min-w-[140px] flex-shrink-0 border-none shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: vital.color }} />
                  <span className="text-[10px] font-black text-slate-900 uppercase">{vital.label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-slate-900">{vital.value}</span>
                  <span className="text-[10px] font-bold text-slate-400">{vital.unit}</span>
                </div>
                <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">⌚ Apple Watch</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Mood Chart */}
        <div>
          <h3 className="text-sm font-black text-slate-900 mb-4">Tendance d'humeur (7 jours)</h3>
          <Card 
            onClick={() => onNavigate('mood-history')}
            className="p-6 h-64 border-none shadow-sm relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moodData}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                />
                <YAxis hide domain={[0, 5]} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const value = payload[0].value as number;
                      const emojiIndex = Math.min(Math.floor(value), 4);
                      return (
                        <div className="bg-white p-2 rounded-xl shadow-xl border border-slate-100 flex items-center gap-2">
                          <span className="text-xl">{moodEmojis[emojiIndex]}</span>
                          <span className="text-xs font-black text-slate-900">{value}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorMood)" 
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    const emojiIndex = Math.min(Math.floor(payload.mood), 4);
                    return (
                      <text x={cx} y={cy - 10} textAnchor="middle" fontSize="16">
                        {moodEmojis[emojiIndex]}
                      </text>
                    );
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-black text-slate-900 mb-4">Actions rapides</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { icon: Video, label: 'Appel Vidéo' },
              { icon: Stethoscope, label: 'Santé', screen: 'health' },
              { icon: Calendar, label: 'Synthèse du jour', screen: 'summary' },
              { icon: Bell, label: 'Alertes', screen: 'alerts' },
              { icon: FileText, label: 'Rapports', screen: 'reports' },
            ].map((action, i) => (
              <button 
                key={i}
                onClick={() => action.screen && onNavigate(action.screen)}
                className="flex flex-col items-center gap-2 min-w-[80px]"
              >
                <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center transition-transform active:scale-90 shadow-sm text-slate-600">
                  <action.icon className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black text-slate-600 text-center leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-sm font-black text-slate-900 mb-4">Activité Récente</h3>
          <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {[
              { time: '09:30', color: 'bg-emerald-500', text: 'Prise de constantes vitale: 72bpm, 97% SpO2' },
              { time: '08:00', color: 'bg-blue-500', text: 'Rappel de médicaments: Pris (Metformine, Atorvastatine)' },
              { time: '07:15', color: 'bg-emerald-500', text: 'Réveil matinal enregistré via montre' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 items-start relative">
                <div className={cn("w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 mt-1", activity.color)} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-400">{activity.time}</span>
                    <div className={cn("w-1.5 h-1.5 rounded-full", activity.color)} />
                  </div>
                  <p className="text-xs font-bold text-slate-600 mt-0.5">{activity.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

const AgendaView = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-slate-50 pb-24">
    <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Agenda</h1>
      </div>
      <Plus className="w-6 h-6 text-brand-blue" />
    </div>
    
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Aujourd'hui</h3>
        <div className="space-y-4">
          <Card className="flex items-center gap-4 border-l-4 border-l-brand-blue">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex flex-col items-center justify-center text-brand-blue">
              <span className="text-xs font-bold">LUN</span>
              <span className="text-lg font-bold">28</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">Kinésithérapeute</h4>
              <p className="text-sm text-slate-500">14:30 • À domicile</p>
            </div>
            <div className="w-2 h-2 bg-brand-blue rounded-full" />
          </Card>
          
          <Card className="flex items-center gap-4 opacity-60">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400">
              <span className="text-xs font-bold">LUN</span>
              <span className="text-lg font-bold">28</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 line-through">Médicaments matin</h4>
              <p className="text-sm text-slate-500">09:00 • Terminé</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Demain</h3>
        <div className="space-y-4">
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400">
              <span className="text-xs font-bold">MAR</span>
              <span className="text-lg font-bold">29</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">Courses avec Sophie</h4>
              <p className="text-sm text-slate-500">10:00 • Supermarché</p>
            </div>
          </Card>
          
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400">
              <span className="text-xs font-bold">MAR</span>
              <span className="text-lg font-bold">29</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">Appel Famille</h4>
              <p className="text-sm text-slate-500">18:30 • WhatsApp</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

const ChatView = ({ onBack }: { onBack: () => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour, Yo-Yo! Comment vous sentez-vous aujourd'hui? Avez-vous bien dormi?", sender: 'linka' },
    { id: 2, text: "Bonjour Linka. Oui, j'ai bien dormi. Je me sens un peu fatiguée mais ça va.", sender: 'user' },
    { id: 3, text: "C'est bon à entendre. N'oubliez pas de prendre vos médicaments après le petit-déjeuner. Voulez-vous que je vous rappelle l'heure?", sender: 'linka' },
  ]);
  const [inputText, setInputText] = useState('');
  const [playingId, setPlayingId] = useState<number | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);

  const playMessage = async (msg: any) => {
    if (playingId === msg.id) {
      setPlayingId(null);
      return;
    }

    setPlayingId(msg.id);

    // If it's a real recorded voice message
    if (msg.audioUrl) {
      const audio = new Audio(msg.audioUrl);
      audio.onended = () => setPlayingId(null);
      audio.onerror = (e) => {
        console.error("Audio Playback Error:", e);
        setPlayingId(null);
      };
      audio.play().catch(err => {
        console.error("Audio play() failed:", err);
        setPlayingId(null);
      });
      return;
    }

    // Otherwise use TTS
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const textToSpeak = msg.isVoice ? "Ceci est un message vocal de Yo-Yo." : msg.text;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: textToSpeak }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: msg.sender === 'linka' ? 'Zephyr' : 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const binaryString = atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Int16Array(len / 2);
        for (let i = 0; i < len; i += 2) {
          bytes[i / 2] = binaryString.charCodeAt(i) | (binaryString.charCodeAt(i + 1) << 8);
        }

        const audioBuffer = audioContext.createBuffer(1, bytes.length, 24000);
        const channelData = audioBuffer.getChannelData(0);
        for (let i = 0; i < bytes.length; i++) {
          channelData[i] = bytes[i] / 32768;
        }

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.onended = () => setPlayingId(null);
        source.start();
      } else {
        setPlayingId(null);
      }
    } catch (error) {
      console.error("TTS Error:", error);
      setPlayingId(null);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user'
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const isActuallyRecordingRef = React.useRef(false);

  const startRecording = async (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    if (isActuallyRecordingRef.current) return;
    
    console.log("Attempting to start recording...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted.");
      
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg';
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      console.log("MediaRecorder initialized with mimeType:", mimeType);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      isActuallyRecordingRef.current = true;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log("Recording stopped. Processing audio...");
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("Audio URL created:", audioUrl);
        
        const voiceMessage = {
          id: Date.now(),
          text: "🎤 Message vocal",
          sender: 'user',
          isVoice: true,
          audioUrl: audioUrl
        };
        setMessages(prev => [...prev, voiceMessage]);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
        isActuallyRecordingRef.current = false;
      };

      mediaRecorder.start();
      console.log("MediaRecorder started.");
      setIsRecording(true);
    } catch (error) {
      console.error("Recording Error:", error);
      isActuallyRecordingRef.current = false;
      setIsRecording(false);
      alert("Impossible d'accéder au microphone. Veuillez vérifier les permissions.");
    }
  };

  const stopRecording = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    console.log("Attempting to stop recording...");
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      console.log("MediaRecorder.stop() called.");
      setIsRecording(false);
    } else {
      console.log("MediaRecorder was not recording.");
      setIsRecording(false);
      isActuallyRecordingRef.current = false;
    }
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      <div className="p-6 flex items-center justify-between border-b border-slate-50">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Linka</h1>
        <button className="p-2 -mr-2">
          <Volume2 className="w-6 h-6 text-slate-900" />
        </button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-brand-blue rounded-full flex items-center justify-center shadow-lg shadow-blue-100 mb-2">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Linka" alt="Linka" className="w-14 h-14" />
          </div>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <button 
              onClick={() => playMessage(msg)}
              className={cn(
                "p-4 rounded-3xl max-w-[80%] shadow-md text-lg text-left flex items-start gap-3 transition-all active:scale-95",
                msg.sender === 'user' 
                  ? "bg-slate-100 text-slate-900 rounded-tr-none" 
                  : "bg-brand-blue text-white rounded-tl-none",
                playingId === msg.id && "ring-4 ring-brand-blue/20"
              )}
            >
              <div className={cn(
                "mt-1 p-1 rounded-full",
                msg.sender === 'user' ? "bg-slate-200" : "bg-white/20"
              )}>
                {playingId === msg.id ? (
                  <Pause className="w-4 h-4 animate-pulse" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </div>
              <p>{msg.text}</p>
            </button>
          </div>
        ))}

        {isRecording && (
          <div className="flex justify-center py-4">
            <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
              <div className="w-2 h-2 bg-rose-600 rounded-full" />
              <span className="text-sm font-bold">Enregistrement en cours...</span>
            </div>
          </div>
        )}

        <div className="py-8 flex justify-center">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map((h, i) => (
              <div key={i} className="w-1 bg-brand-blue rounded-full" style={{ height: `${h * 4}px` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-50 flex items-center gap-4">
        <button 
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseLeave={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${isRecording ? 'bg-rose-600 scale-110 shadow-rose-200' : 'bg-brand-blue shadow-blue-100'}`}
        >
          <Mic className="w-6 h-6" />
        </button>
        <div className="flex-1 relative">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Écrire un message..." 
            className="w-full bg-slate-100 border-none rounded-full py-4 px-6 pr-12 focus:ring-2 focus:ring-brand-blue"
          />
          <button 
            onClick={handleSendMessage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-blue"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const EmergencyView = ({ onBack }: { onBack: () => void }) => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24 overflow-y-auto">
      {/* Red Banner */}
      <div className="bg-[#ef4444] p-4 flex items-center gap-4 text-white sticky top-0 z-50 shadow-lg">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Watch className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-tight">Alerte automatique — Fréquence cardiaque élevée détectée (142 bpm)</span>
          </div>
          <p className="text-lg font-bold">Appel d'urgence dans {seconds}s</p>
        </div>
        <button 
          onClick={onBack}
          className="bg-white text-[#ef4444] px-4 py-2 rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-transform"
        >
          Annuler
        </button>
      </div>

      <div className="p-8 flex flex-col items-center">
        <h1 className="text-4xl font-black text-slate-900 mb-12">Besoin d'aide ?</h1>

        {/* Pulsing Emergency Button */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-[#ef4444] rounded-full animate-ping opacity-20" />
          <div className="absolute -inset-4 bg-[#ef4444] rounded-full opacity-10" />
          <button className="relative w-64 h-64 bg-[#ef4444] rounded-full flex flex-col items-center justify-center text-white shadow-[0_20px_50px_rgba(239,68,68,0.4)] active:scale-95 transition-transform">
            <Phone className="w-20 h-20 mb-4 fill-white" />
            <span className="text-3xl font-black text-center leading-tight">APPEL<br />D'URGENCE</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <button className="w-full bg-white border-4 border-[#1e40af] p-6 rounded-full flex items-center gap-6 active:scale-[0.98] transition-transform">
            <div className="w-12 h-12 flex items-center justify-center">
              <Phone className="w-10 h-10 text-[#1e40af]" />
            </div>
            <span className="text-2xl font-bold text-[#1e40af] text-left leading-tight">
              Appeler [Nom du proche]
            </span>
          </button>

          <button className="w-full bg-white border-4 border-[#1e40af] p-6 rounded-full flex items-center gap-6 active:scale-[0.98] transition-transform">
            <div className="w-12 h-12 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-[#1e40af]" />
            </div>
            <span className="text-2xl font-bold text-[#1e40af] text-left leading-tight">
              Partager ma position
            </span>
          </button>

          <button className="w-full bg-white border-4 border-[#1e40af] p-6 rounded-full flex items-center gap-6 active:scale-[0.98] transition-transform">
            <div className="w-12 h-12 flex items-center justify-center">
              <Watch className="w-10 h-10 text-[#1e40af]" />
            </div>
            <span className="text-2xl font-bold text-[#1e40af] text-left leading-tight">
              Envoyer données santé
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const BottomNav = ({ activeTab, onNavigate, role }: { activeTab: string, onNavigate: (screen: string) => void, role: UserRole }) => {
  const seniorTabs = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'health', icon: Activity, label: 'Santé' },
    { id: 'photos', icon: ImageIcon, label: 'Photos' },
    { id: 'settings', icon: Settings, label: 'Paramètres' },
  ];

  const procheTabs = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'monitor', icon: Play, label: 'Moniteur' },
    { id: 'agenda', icon: Calendar, label: 'Planning' },
    { id: 'chat', icon: MessageSquare, label: 'Message' },
    { id: 'profile', icon: User, label: 'Profil' },
  ];

  const tabs = role === 'senior' ? seniorTabs : procheTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 max-w-md mx-auto">
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-300",
            activeTab === tab.id ? "text-blue-600 scale-110" : "text-slate-400"
          )} 
          onClick={() => onNavigate(tab.id)}
        >
          <div className={cn(
            "p-1 rounded-lg transition-colors",
            activeTab === tab.id && tab.id === 'monitor' ? "bg-blue-600 text-white" : ""
          )}>
            <tab.icon className={cn("w-6 h-6", activeTab === tab.id && tab.id !== 'monitor' && "fill-blue-50")} />
          </div>
          <span className="text-[10px] font-black">
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [role, setRole] = useState<UserRole>(null);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showWelcome, setShowWelcome] = useState(true);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    if (showWelcome) {
      return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
    }

    if (!role) {
      return <ProfileSelection onSelect={setRole} />;
    }

    if (currentScreen === 'home' || currentScreen === 'monitor') {
      if (role === 'senior') return <SeniorDashboard onNavigate={handleNavigate} />;
      if (role === 'proche') return <DetailedDashboard onNavigate={handleNavigate} />;
    }

    if (currentScreen === 'detailed-dashboard') {
      return <DetailedDashboard onNavigate={handleNavigate} onBack={() => handleNavigate('home')} />;
    }

    if (currentScreen === 'chat') {
      return <ChatView onBack={() => handleNavigate('home')} />;
    }

    if (currentScreen === 'emergency') {
      return <EmergencyView onBack={() => handleNavigate('home')} />;
    }

    if (currentScreen === 'health') {
      return <HealthDetails onBack={() => handleNavigate('home')} onConnect={() => handleNavigate('device-pairing')} />;
    }

    if (currentScreen === 'device-pairing') {
      return <DevicePairing onBack={() => handleNavigate('health')} onActivate={() => handleNavigate('home')} />;
    }

    if (currentScreen === 'photos') {
      return <PhotoGallery onBack={() => handleNavigate('home')} />;
    }

    if (currentScreen === 'settings') {
      return <SettingsView onBack={() => handleNavigate('home')} onProfileClick={() => handleNavigate('detailed-dashboard')} />;
    }

    if (currentScreen === 'alerts') {
      return <AlertCenter onBack={() => handleNavigate('home')} />;
    }

    if (currentScreen === 'summary') {
      return <DailySummary onBack={() => handleNavigate('home')} />;
    }

    if (currentScreen === 'agenda') {
      return <AgendaView onBack={() => handleNavigate('home')} />;
    }

    if (currentScreen === 'mood-history') {
      return <MoodHistory onBack={() => handleNavigate('home')} />;
    }

    if (role === 'senior') {
      return <SeniorDashboard onNavigate={handleNavigate} />;
    }

    if (role === 'proche') {
      return <DetailedDashboard onNavigate={handleNavigate} />;
    }

    return null;
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={role + currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      {role && <BottomNav activeTab={currentScreen} onNavigate={handleNavigate} role={role} />}
    </div>
  );
}
