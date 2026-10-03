import React from 'react';
import {
  X,
  User,
  GraduationCap,
  Calendar,
  CreditCard,
  BookOpen,
  Bus,
  MessageSquare,
  ShieldCheck,
  BellRing,
  Download,
  FolderArchive,
  Languages,
  LogOut,
  RefreshCw,
  Sparkles,
  Smartphone,
  Laptop,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language, Role } from '../../types';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({ isOpen, onClose }) => {
  const {
    currentStudent,
    role,
    loginAs,
    logout,
    language,
    setLanguage,
    t,
    openModal,
    isOffline,
    toggleOfflineMode,
    lastSyncedTime,
    exportDatabaseJson,
    triggerFcmNotification,
    viewMode,
    setViewMode,
  } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Body */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header with profile banner */}
        <div className="bg-gradient-to-br from-[#057A55] to-[#03543A] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mt-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 p-0.5 flex items-center justify-center font-black text-xl text-white shadow-inner">
              {currentStudent.name[0]}
            </div>
            <div>
              <h2 className="font-extrabold text-base leading-tight">{currentStudent.name}</h2>
              <p className="text-xs text-emerald-100">{currentStudent.classSection}</p>
              <p className="text-[10px] text-emerald-200 mt-0.5">Roll #{currentStudent.rollNo} · {currentStudent.admissionNo}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-emerald-100">
            <span>Role: <strong className="uppercase text-white">{role}</strong></span>
            <span className="bg-emerald-400/30 px-2 py-0.5 rounded-full text-white font-semibold">Active Session</span>
          </div>
        </div>

        {/* Scrollable Navigation items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 text-sm">
          {/* Quick Shortcuts */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              School Modules
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onClose();
                  openModal('my_profile');
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-xl font-medium transition-colors"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span>{t('my_profile')}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  openModal('attendance');
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-xl font-medium transition-colors"
              >
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>{t('attendance')}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  openModal('fee_summary');
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-xl font-medium transition-colors"
              >
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>{t('fees')} & Payments</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  openModal('transport');
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-xl font-medium transition-colors"
              >
                <Bus className="w-4 h-4 text-orange-600" />
                <span>{t('transport')} (GPS Live)</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  openModal('messages');
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-xl font-medium transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Live Chat Support</span>
              </button>
            </div>
          </div>

          {/* Role Switching */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Role-Based Access (RBAC)
            </div>
            <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1.5 rounded-xl">
              {(['student', 'teacher', 'accountant', 'admin'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => loginAs(r)}
                  className={`py-1.5 px-2 text-xs font-bold rounded-lg capitalize transition-all truncate ${
                    role === r ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 bg-white'
                  }`}
                >
                  {r === 'accountant' ? 'Accounts' : r}
                </button>
              ))}
            </div>
          </div>

          {/* Language selector */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Language (भाषा / Language)
            </div>
            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { code: 'en' as Language, label: 'English' },
                { code: 'hi' as Language, label: 'हिन्दी' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    language === l.code ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Offline Sync & Backup */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Cloud Sync & Data
            </div>
            <div className="space-y-2">
              <button
                onClick={toggleOfflineMode}
                className="w-full flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw className={`w-4 h-4 ${isOffline ? 'text-amber-500' : 'text-emerald-500 animate-spin'}`} />
                  <span className="font-semibold text-slate-700">
                    {isOffline ? 'Offline Mode Active' : 'Cloud Sync Active'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">{isOffline ? 'Local' : 'Live'}</span>
              </button>

              <button
                onClick={exportDatabaseJson}
                className="w-full flex items-center justify-center gap-2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export School Backup (JSON)</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  openModal('download_project');
                }}
                className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                <FolderArchive className="w-3.5 h-3.5" />
                <span>Download Complete Project (.ZIP)</span>
              </button>
            </div>
          </div>

          {/* FCM Push Notification trigger */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Firebase Push Alerts
            </div>
            <button
              onClick={() => {
                triggerFcmNotification('School Fee Reminder', 'Reminder: Term 3 Fee payment of ₹21,000 due this week.', 'fee');
                onClose();
              }}
              className="w-full flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <BellRing className="w-4 h-4 text-emerald-600" />
              <span>Test Push Notification (FCM)</span>
            </button>
          </div>

          {/* Device Viewport Mode Toggle */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Display Mode
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('mobile-frame')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                  viewMode === 'mobile-frame'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Frame</span>
              </button>
              <button
                onClick={() => setViewMode('full-responsive')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                  viewMode === 'full-responsive'
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Desktop Full</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>JWT Verified</span>
            </span>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="text-red-600 font-semibold hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
