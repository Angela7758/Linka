import React from 'react';
import { 
  Heart, 
  Image as ImageIcon, 
  ChevronLeft, 
  Activity, 
  Thermometer, 
  Wind, 
  Footprints, 
  Moon, 
  Plus, 
  Download,
  CheckCircle2,
  MoreVertical,
  Camera,
  Settings,
  Bell,
  User,
  Smartphone,
  Shield,
  Trash2,
  ChevronRight,
  Search,
  Bluetooth,
  AlertTriangle,
  Share2,
  TrendingUp,
  Watch,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area
} from 'recharts';
import { cn } from '../lib/utils';
import { HealthStats, MoodEntry, Alert, Photo } from '../types';

export const Card = ({ children, className, onClick, key }: { children: React.ReactNode; className?: string; onClick?: () => void; key?: React.Key }) => (
  <div 
    key={key}
    onClick={onClick}
    className={cn(
      "bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50",
      onClick && "cursor-pointer active:scale-[0.98] transition-transform",
      className
    )}
  >
    {children}
  </div>
);

export const Button = ({ children, className, variant = 'primary', onClick }: { children: React.ReactNode; className?: string; variant?: 'primary' | 'outline'; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full py-4 rounded-2xl font-bold transition-all active:scale-95",
      variant === 'primary' ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "bg-white text-slate-900 border-2 border-slate-100",
      className
    )}
  >
    {children}
  </button>
);

export const HealthDetails = ({ onBack, onConnect }: { onBack: () => void, onConnect?: () => void }) => {
  const heartRateData = [
    { x: 0, y: 10 }, { x: 1, y: 12 }, { x: 2, y: 10 }, { x: 3, y: 25 }, 
    { x: 4, y: 5 }, { x: 5, y: 10 }, { x: 6, y: 12 }, { x: 7, y: 10 },
    { x: 8, y: 10 }, { x: 9, y: 12 }, { x: 10, y: 10 }, { x: 11, y: 25 }, 
    { x: 12, y: 5 }, { x: 13, y: 10 }, { x: 14, y: 12 }, { x: 15, y: 10 },
    { x: 16, y: 10 }, { x: 17, y: 12 }, { x: 18, y: 10 }, { x: 19, y: 25 }, 
    { x: 20, y: 5 }, { x: 21, y: 10 }, { x: 22, y: 12 }, { x: 23, y: 10 }
  ];

  return (
    <div className="min-h-screen bg-[#f8f7f4] pb-24">
      {/* Header */}
      <div className="p-6 flex items-center justify-between bg-[#1e293b] sticky top-0 z-50">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <h1 className="text-3xl font-bold text-white">Ma Santé</h1>
        <button 
          onClick={onConnect}
          className="flex flex-col items-center active:scale-95 transition-transform"
        >
          <div className="relative">
            <Smartphone className="w-8 h-8 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1e293b]" />
          </div>
          <span className="text-[10px] font-bold text-white/70">Connecté</span>
        </button>
      </div>

      <div className="p-6 space-y-4">
        {/* Heart Rate Card */}
        <Card className="p-6">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium text-slate-500">Heart rate monitor</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Normal</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">❤️</span>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold text-slate-900">72</span>
              <span className="text-2xl font-bold text-slate-900">bpm</span>
            </div>
          </div>
          
          <div className="h-24 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={heartRateData}>
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={false} 
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <p className="text-center text-blue-500 text-lg font-bold">Votre cœur bat normalement</p>
        </Card>

        {/* Blood Pressure Card */}
        <Card className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🩸</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-slate-900">125/82</span>
              <span className="text-xl font-bold text-slate-900">mmHg</span>
            </div>
          </div>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Normale</span>
        </Card>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-500">Oxygen</span>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🫁</span>
              <span className="text-2xl font-bold">97%</span>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-500">Temperature</span>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌡️</span>
              <span className="text-2xl font-bold">36.8°C</span>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-500">Steps</span>
              <div className="w-5 h-5 rounded-full border-2 border-green-500 border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🚶</span>
              <span className="text-2xl font-bold">3,241</span>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-500">Sleep</span>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Bon</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">😴</span>
              <span className="text-2xl font-bold">7h12</span>
            </div>
          </Card>
        </div>

        {/* Status Message */}
        <div className="bg-green-50 rounded-[32px] p-6 flex items-center gap-4 border border-green-100">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <p className="text-green-900 text-xl font-bold leading-tight">
            Tout va bien ! Tous vos indicateurs sont normaux.
          </p>
        </div>
      </div>
    </div>
  );
};

export const PhotoGallery = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-white pb-24">
    <div className="p-6 flex items-center justify-between border-b border-slate-50 sticky top-0 bg-white z-10">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">Photos de famille</h1>
      </div>
      <button className="p-2">
        <Camera className="w-6 h-6 text-slate-900" />
      </button>
    </div>

    <div className="p-4 columns-2 gap-4 space-y-4">
      {[
        { id: 1, url: 'https://picsum.photos/seed/kids/800/1000', sender: 'Jean', likes: 12, date: 'il y a 2h', caption: 'Les petits-enfants au parc 🌳' },
        { id: 2, url: 'https://picsum.photos/seed/cake/400/400', sender: 'Yo-Yo', likes: 14, date: 'Hier', caption: 'Anniversaire de mamie 🎂' },
        { id: 3, url: 'https://picsum.photos/seed/family/400/300', sender: 'Sophie', likes: 22, date: 'Hier', caption: 'Pique-nique en famille' },
        { id: 4, url: 'https://picsum.photos/seed/dog/300/400', sender: 'Thomas', likes: 8, date: '26 Oct', caption: 'Balade à la plage 🏖️' },
        { id: 5, url: 'https://picsum.photos/seed/baby/400/500', sender: 'Claire', likes: 35, date: '25 Oct', caption: 'Le petit dernier dort bien' },
        { id: 6, url: 'https://picsum.photos/seed/xmas/400/400', sender: 'Famille', likes: 42, date: '24 Oct', caption: 'Noël approche !' },
      ].map((photo) => (
        <div key={photo.id} className="relative rounded-2xl overflow-hidden shadow-sm break-inside-avoid">
          <img src={photo.url} alt={photo.caption} className="w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
            <p className="text-xs font-bold mb-1">{photo.caption}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] opacity-80">envoyé par {photo.sender}, {photo.date}</span>
              <div className="flex items-center gap-1 bg-black/20 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                <Heart className="w-2.5 h-2.5 fill-white" />
                <span className="text-[10px] font-bold">{photo.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <button 
      className="fixed bottom-24 right-6 w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-200 z-20 active:scale-95 transition-transform"
      onClick={() => {}}
    >
      <Camera className="w-8 h-8" />
    </button>
  </div>
);

export const AlertCenter = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-slate-50 pb-24">
    <div className="p-6 flex items-center justify-between bg-white border-b border-slate-100">
      <button onClick={onBack} className="p-2 -ml-2">
        <ChevronLeft className="w-6 h-6 text-slate-900" />
      </button>
      <h1 className="text-2xl font-bold text-slate-900">Centre d'alertes</h1>
      <div className="w-10" />
    </div>

    <div className="p-6 space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['Toutes', 'Urgentes', 'Santé ⏰', 'Humeur', 'Activité'].map((tab, i) => (
          <button key={i} className={cn(
            "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border",
            i === 0 ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200"
          )}>
            {tab}
          </button>
        ))}
      </div>

      <Card className="p-0 overflow-hidden border-l-4 border-l-brand-accent">
        <div className="bg-rose-50 p-4">
          <div className="flex items-center gap-2 text-brand-accent mb-1">
            <Bell className="w-4 h-4 fill-brand-accent" />
            <span className="text-xs font-bold uppercase tracking-wider">Urgence Santé</span>
          </div>
          <p className="text-xs font-bold text-rose-400 mb-1 uppercase">Critical Health</p>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Fréquence cardiaque anormale détectée (142 bpm)</h3>
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Heart className="w-4 h-4 text-brand-accent fill-brand-accent" />
              </div>
              <span className="font-bold">142 bpm</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Activity className="w-4 h-4 text-brand-accent" />
              </div>
              <span className="font-bold">165/95</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 py-3 bg-brand-accent">Appeler Yo-Yo</Button>
            <Button variant="outline" className="flex-1 py-3 border-brand-accent text-brand-accent">Statut SAMU</Button>
          </div>
        </div>
      </Card>

      {[
        { type: 'urgent', title: 'URGENT', desc: 'Aucune réponse', color: 'text-brand-accent', border: 'border-brand-accent' },
        { type: 'warning', title: 'WARNING', desc: 'Changement d\'humeur', color: 'text-orange-500', border: 'border-orange-500' },
        { type: 'info', title: 'INFO', desc: 'Résumé hebdomadaire', color: 'text-blue-500', border: 'border-blue-500' },
      ].map((alert, i) => (
        <div key={i}>
          <Card className={cn("flex items-center gap-4 p-4 border-l-4", alert.border)}>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center bg-slate-50", alert.color)}>
              {alert.type === 'urgent' ? <AlertTriangle className="w-5 h-5" /> : alert.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <span className={cn("text-[10px] font-bold uppercase", alert.color)}>{alert.title}</span>
              <p className="font-bold text-slate-900">{alert.desc}</p>
            </div>
          </Card>
        </div>
      ))}

      <Card className="flex items-center gap-4 p-4 opacity-50 bg-slate-50">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <span className="font-bold text-slate-500">Alertes terminées</span>
      </Card>
    </div>
  </div>
);

export const DailySummary = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-slate-50 pb-24">
    <div className="p-6 flex items-center justify-between bg-white border-b border-slate-100">
      <button onClick={onBack} className="p-2 -ml-2">
        <ChevronLeft className="w-6 h-6 text-slate-900" />
      </button>
      <h1 className="text-2xl font-bold text-slate-900">Résumé du 30 mars</h1>
      <button className="p-2">
        <Share2 className="w-6 h-6 text-slate-900" />
      </button>
    </div>

    <div className="p-6 space-y-6">
      <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-3 border border-green-100">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <span className="text-green-800 font-bold text-lg">Journée positive dans l'ensemble</span>
      </div>

      <Card className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Résumé des conversations</h3>
        <p className="text-slate-700 leading-relaxed">
          La journée de Yo-Yo a été agréable. Elle était de bonne humeur après une promenade au parc où elle a croisé sa <strong>voisine Hélène</strong>. Elle a exprimé beaucoup de joie en parlant de la prochaine visite de ses petits-enfants.
        </p>
        <div className="flex gap-2">
          {['Promenade', 'Voisine', 'Petits-enfants'].map((tag, i) => (
            <span key={i} className="bg-blue-50 text-brand-blue text-xs font-bold px-3 py-1 rounded-lg">
              {tag}
            </span>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Santé et Bien-être</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm">😊 Humeur:</span>
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">8/10</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-sm">💊 Médicaments:</span>
            <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-0.5 rounded-full">✅ Tous pris</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Footprints className="w-4 h-4 text-slate-400" />
          <span className="text-slate-700 text-sm">Activité: Promenade 30 min 👥 Social</span>
        </div>
      </Card>

      <Card className="space-y-4 border-2 border-blue-100">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Résumé Santé Connectée</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <Heart className="w-5 h-5 text-brand-accent fill-brand-accent" />
            <p className="text-xs text-slate-400">Fréq. Cardiaque:</p>
            <p className="font-bold">72 bpm avg</p>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-accent w-2/3" />
            </div>
          </div>
          <div className="space-y-1">
            <Activity className="w-5 h-5 text-blue-500" />
            <p className="text-xs text-slate-400">Tension:</p>
            <p className="font-bold">125/82</p>
          </div>
          <div className="space-y-1">
            <Wind className="w-5 h-5 text-blue-400" />
            <p className="text-xs text-slate-400">SpO2:</p>
            <p className="font-bold">97%</p>
          </div>
          <div className="space-y-1">
            <div className="flex gap-4">
              <div className="space-y-1">
                <Footprints className="w-5 h-5 text-slate-900" />
                <p className="text-[10px] text-slate-400">Pas:</p>
                <p className="text-xs font-bold">3,241</p>
              </div>
              <div className="space-y-1">
                <Moon className="w-5 h-5 text-slate-900" />
                <p className="text-[10px] text-slate-400">Sommeil:</p>
                <p className="text-xs font-bold">7h12</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-2 border-blue-500 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
            <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Linka" alt="Linka" className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Suggestion Linka</h3>
        </div>
        <p className="text-slate-700 text-sm italic">
          Encouragez Yo-Yo à multiplier les interactions sociales en extérieur, cela semble améliorer considérablement son bien-être émotionnel.
        </p>
      </Card>

      <div className="space-y-3">
        <Button variant="outline" className="flex items-center justify-center gap-2">
          <Download className="w-5 h-5" /> Télécharger le rapport
        </Button>
        <button className="w-full text-brand-blue font-bold text-sm py-2">Partager avec le médecin</button>
      </div>
    </div>
  </div>
);

export const SettingsView = ({ onBack, onProfileClick }: { onBack: () => void, onProfileClick?: () => void }) => (
  <div className="min-h-screen bg-white pb-24">
    <div className="p-6 flex items-center gap-4 sticky top-0 bg-white z-50">
      <button onClick={onBack} className="p-2 -ml-2 active:scale-90 transition-transform">
        <ChevronLeft className="w-8 h-8 text-slate-900" />
      </button>
      <h1 className="text-3xl font-black text-slate-900">Paramètres</h1>
    </div>

    <div className="px-4 space-y-4">
      {/* Profile Card */}
      <Card 
        onClick={onProfileClick}
        className="flex items-center gap-4 p-3 border-2 border-[#1e40af] rounded-2xl"
      >
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200" 
            alt="Yo-Yo Dupont" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-900">Yo-Yo Dupont</h2>
          <p className="text-slate-400 font-bold">Profil Senior</p>
        </div>
      </Card>

      {/* Général Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider ml-2">Général</h3>
        <Card className="p-4 space-y-4 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">Taille de la police</span>
            <span className="text-sm font-bold text-slate-700">Mode Sombre</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xs font-bold text-slate-400">AA</span>
              <div className="flex-1 h-1 bg-slate-200 rounded-full relative">
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-md" />
              </div>
              <span className="text-lg font-black text-slate-900">A</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-6 bg-slate-200 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
              <span className="text-[10px] font-bold text-slate-400">Désactivé</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Check-in Quotidien */}
      <div className="space-y-2">
        <div className="flex justify-between px-2">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Check-in quotidien</h3>
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Style de conversation</h3>
        </div>
        <Card className="p-4 flex gap-4 border-slate-200 shadow-sm">
          <div className="flex-1 relative">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-900 appearance-none">
              <option>09:00</option>
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90" />
          </div>
          <div className="flex-1 relative">
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-900 appearance-none">
              <option>Amical</option>
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90" />
          </div>
        </Card>
      </div>

      {/* Appareil Connecté */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 ml-2">
          <Watch className="w-4 h-4 text-slate-900" />
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Appareil connecté</h3>
        </div>
        <Card className="p-4 space-y-4 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm font-black text-slate-900">Apple Watch Series 9</span>
            </div>
            <div className="flex items-center gap-1 text-slate-900">
              <span className="text-xs font-bold">Batterie: 78%</span>
              <Smartphone className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">Détection de chute</span>
            <div className="w-10 h-5 bg-blue-600 rounded-full relative">
              <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">Alertes Santé</span>
            <div className="w-10 h-5 bg-blue-600 rounded-full relative">
              <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </Card>
      </div>

      {/* Chaîne d'Urgence */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 ml-2">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Chaîne d'urgence</h3>
        </div>
        <Card className="p-0 overflow-hidden border-slate-200 shadow-sm">
          {[
            { id: 1, name: 'Jean Dupont (Fils)', priority: true },
            { id: 2, name: 'SAMU', priority: true },
            { id: 3, name: 'Dr. Martin (Médecin)', priority: true },
          ].map((contact, i) => (
            <div key={contact.id} className={cn("p-3 flex items-center gap-3", i !== 0 && "border-t border-slate-100")}>
              <MoreVertical className="w-4 h-4 text-slate-300" />
              <div className="w-6 h-6 bg-blue-900 text-white rounded-md flex items-center justify-center text-xs font-bold">
                {contact.id}
              </div>
              <span className="flex-1 text-sm font-bold text-slate-700">{contact.name}</span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-1 rounded-md uppercase">Priorité</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Seuils d'Alerte */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 ml-2">
          <Watch className="w-4 h-4 text-slate-900" />
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Seuils d'alerte santé</h3>
        </div>
        <Card className="p-4 space-y-6 border-slate-200 shadow-sm">
          {[
            { label: 'Fréquence Cardiaque (BPM)', value: '40', range: '40-120', pos: '30%' },
            { label: 'Pression Artérielle (mmHg)', value: '', range: '90/60-140/90', pos: '60%', double: true },
            { label: 'SpO2 (%)', value: '90-100', range: '90-100', pos: '80%' },
            { label: 'Température (°C)', value: '35.0-37.5', range: '35.0-37.5', pos: '40%' },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-900">
                <span>{item.label}: {item.value}</span>
                <span>{item.range}</span>
              </div>
              <div className="h-1 bg-slate-100 rounded-full relative">
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-sm" style={{ left: item.pos }} />
                {item.double && <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-sm" style={{ left: '70%' }} />}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-bold text-slate-700">Délai d'appel auto: 30s</span>
            <div className="relative">
              <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 font-bold text-slate-900 appearance-none pr-8">
                <option>30s</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90" />
            </div>
          </div>
        </Card>
      </div>

      {/* Confidentialité */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 ml-2">
          <Watch className="w-4 h-4 text-slate-900" />
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Confidentialité</h3>
        </div>
        <Card className="p-4 space-y-4 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">Partage de données avec la famille Activé</span>
            <div className="w-10 h-5 bg-blue-600 rounded-full relative">
              <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">Partage de données avec les secours Activé</span>
            <div className="w-10 h-5 bg-blue-600 rounded-full relative">
              <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </Card>
      </div>

      <button className="w-full py-4 bg-[#ef4444] text-white font-black rounded-xl shadow-lg shadow-rose-100 active:scale-[0.98] transition-transform">
        Supprimer le compte
      </button>
    </div>
  </div>
);

export const MoodHistory = ({ onBack }: { onBack: () => void }) => {
  const data = [
    { name: '20 Nov', mood: 8 },
    { name: '21 Nov', mood: 7 },
    { name: '22 Nov', mood: 4 },
    { name: '23 Nov', mood: 6 },
    { name: '24 Nov', mood: 7 },
    { name: '25 Nov', mood: 8 },
    { name: '26 Nov', mood: 9 },
  ];

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 bg-white sticky top-0 z-50">
        <button onClick={onBack} className="p-2 -ml-2 active:scale-90 transition-transform">
          <ChevronLeft className="w-8 h-8 text-slate-900" />
        </button>
        <h1 className="text-2xl font-black text-slate-900 flex-1 text-center mr-8">Humeur de Yo-Yo</h1>
      </div>

      <div className="px-6">
        {/* Tabs */}
        <div className="flex border-b border-slate-100 mb-8">
          {['Semaine', 'Mois', '3 Mois'].map((tab, i) => (
            <button
              key={tab}
              className={cn(
                "flex-1 py-4 text-sm font-bold transition-all border-b-4",
                i === 0 ? "text-blue-600 border-blue-600" : "text-slate-400 border-transparent"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-64 w-full mb-8 relative">
           {/* Y-Axis Emojis */}
           <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xl z-10 py-2">
             <span>🤩</span>
             <span>😐</span>
             <span>😢</span>
           </div>
           
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={data} margin={{ left: 30, right: 10, top: 10, bottom: 20 }}>
               <defs>
                 <linearGradient id="colorMoodHistory" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
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
               <YAxis hide domain={[0, 10]} />
               <Tooltip 
                 content={({ active, payload }) => {
                   if (active && payload && payload.length) {
                     return (
                       <div className="bg-white p-2 rounded-xl shadow-xl border border-slate-100 font-bold text-xs">
                         {payload[0].value}/10
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
                 strokeWidth={4}
                 fillOpacity={1} 
                 fill="url(#colorMoodHistory)" 
                 dot={{ r: 6, fill: '#3b82f6', strokeWidth: 3, stroke: '#fff' }}
               />
             </AreaChart>
           </ResponsiveContainer>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-4 border-none shadow-sm bg-slate-50/50">
            <div className="flex items-center gap-2 text-emerald-500 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-black">12% improvement</span>
            </div>
            <p className="text-[10px] font-bold text-slate-500 leading-tight">
              Amélioration globale cette semaine.
            </p>
          </Card>
          <Card className="p-4 border-none shadow-sm bg-slate-50/50">
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-black">Wednesday's mood drop</span>
            </div>
            <p className="text-[10px] font-bold text-slate-500 leading-tight">
              Baisse significative notée.
            </p>
          </Card>
        </div>

        {/* List */}
        <div className="space-y-3">
          {[
            { day: 'Lundi', date: '20 Nov', emoji: '😊', score: 8, note: 'Conversation positive, a apprécié le jardinage.' },
            { day: 'Mardi', date: '21 Nov', emoji: '😐', score: 7, note: 'Fatiguée, mais a bien mangé.' },
            { day: 'Mercredi', date: '22 Nov', emoji: '😢', score: 4, note: 'S\'est sentie isolée, appel court avec des pleurs.', highlight: true },
          ].map((entry, i) => (
            <Card key={i} className={cn("p-4 flex items-center gap-4 border-none shadow-sm", entry.highlight && "border-l-4 border-l-amber-500")}>
              <div className="min-w-[60px]">
                <p className="text-sm font-black text-slate-900">{entry.day}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{entry.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{entry.emoji}</span>
                <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-full">
                  {entry.score}/10
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-600 flex-1 leading-tight">
                {entry.note}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DevicePairing = ({ onBack, onActivate }: { onBack: () => void, onActivate?: () => void }) => {
  const [isSearching, setIsSearching] = React.useState(true);

  return (
    <div className="min-h-screen bg-[#f8faff] pb-8">
      {/* Header */}
      <div className="p-6 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 active:scale-90 transition-transform">
          <ChevronLeft className="w-8 h-8 text-[#1e293b]" />
        </button>
        <h1 className="text-2xl font-bold text-[#1e293b] flex-1 text-center mr-8">Connecter un appareil</h1>
      </div>

      <div className="px-6 flex flex-col items-center">
        {/* Watch Illustration */}
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          {/* Animated Waves */}
          <div className="absolute inset-0 border-2 border-blue-100 rounded-full animate-ping opacity-20" />
          <div className="absolute -inset-4 border-2 border-blue-50 rounded-full animate-ping opacity-10" style={{ animationDelay: '0.5s' }} />
          
          <div className="relative z-10 w-32 h-44 bg-white rounded-[40px] shadow-2xl border-4 border-slate-100 flex flex-col items-center p-2">
            <div className="w-full h-full bg-[#1e293b] rounded-[32px] flex items-center justify-center">
              <span className="text-white font-black text-xl tracking-tighter">Linka</span>
            </div>
          </div>
          
          {/* Signal Icons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-40">
            <div className="w-4 h-1 bg-blue-400 rounded-full" />
            <div className="w-6 h-1 bg-blue-400 rounded-full" />
            <div className="w-8 h-1 bg-blue-400 rounded-full" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-end opacity-40">
            <div className="w-4 h-1 bg-blue-400 rounded-full" />
            <div className="w-6 h-1 bg-blue-400 rounded-full" />
            <div className="w-8 h-1 bg-blue-400 rounded-full" />
          </div>
        </div>

        {/* Compatible Devices */}
        <div className="w-full mb-8">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Appareils compatibles</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { name: 'Apple', icon: '🍎' },
              { name: 'Samsung', icon: '📱' },
              { name: 'Fitbit', icon: '💠' },
              { name: 'Xiaomi', icon: '🟠' },
            ].map((brand) => (
              <div key={brand.name} className="flex flex-col items-center gap-2 min-w-[70px]">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-center justify-center text-2xl">
                  {brand.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-500">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Searching Section */}
        <div className="w-full flex flex-col items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <Bluetooth className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-bold text-slate-900">Recherche d'appareils en cours...</p>
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>

        {/* Found Device */}
        <Card className="w-full p-4 flex items-center justify-between mb-8 border-none shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Apple Watch Series 9</h4>
              <p className="text-[10px] font-bold text-slate-400">de Yo-Yo</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Activity className="w-4 h-4 text-slate-300" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-100 active:scale-95 transition-transform">
              Connecter
            </button>
          </div>
        </Card>

        {/* Permissions */}
        <div className="w-full space-y-4 mb-8">
          <h3 className="text-sm font-bold text-slate-900">Autorisations de suivi santé</h3>
          <div className="grid grid-cols-2 gap-y-3">
            {[
              'Rythme cardiaque',
              'Détection de chute',
              'Pression artérielle (BP)',
              'Analyse du sommeil',
              'Oxygène sanguin (SpO2)',
              'Suivi des pas'
            ].map((perm) => (
              <div key={perm} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] font-bold text-slate-700">{perm}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onActivate}
          className="w-full py-5 bg-[#e9547d] text-white rounded-2xl font-bold text-lg shadow-xl shadow-rose-100 active:scale-[0.98] transition-transform"
        >
          Activer le suivi santé
        </button>
      </div>
    </div>
  );
};


