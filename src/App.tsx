import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { SidebarDrawer } from './components/common/SidebarDrawer';
import { ModulesGrid } from './components/home/ModulesGrid';
import { ModalManager } from './components/modules/ModalManager';
import { FcmNotificationBanner } from './components/common/FcmNotificationBanner';
import { TeacherDashboardView } from './components/modules/TeacherDashboardView';
import { AccountantDashboardView } from './components/modules/AccountantDashboardView';
import { AdminDashboardView } from './components/modules/AdminDashboardView';
import {
  Smartphone,
  Laptop,
  Languages,
  RefreshCw,
  Download,
  ShieldCheck,
  Sparkles,
  FolderArchive,
  UserCheck,
  Receipt,
  School,
  GraduationCap,
} from 'lucide-react';
import { Language, Role } from './types';

const MainLayout: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    role,
    setRole,
    language,
    setLanguage,
    isOffline,
    toggleOfflineMode,
    exportDatabaseJson,
    currentStudent,
    openModal,
  } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900/95 text-slate-900 flex flex-col items-center justify-start p-0 md:p-6 transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Top Desktop Helper Toolbar */}
      <aside aria-label="Desktop Control Bar" className="w-full max-w-4xl hidden md:flex items-center justify-between bg-slate-800/95 backdrop-blur-md px-4 py-2.5 rounded-2xl mb-4 text-xs text-white border border-slate-700/80 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-black text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>DEVRAJ SCHOOL ERP</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>4-Tier RBAC Access</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* 4 Roles Switcher Pills */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setRole('student')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                role === 'student' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              <span>Student</span>
            </button>
            <button
              onClick={() => setRole('teacher')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                role === 'teacher' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3 h-3" />
              <span>Teacher</span>
            </button>
            <button
              onClick={() => setRole('accountant')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                role === 'accountant' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Receipt className="w-3 h-3" />
              <span>Accounts</span>
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1 ${
                role === 'admin' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <School className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>

          {/* Languages: Only EN and HI */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
            {(['en', 'hi'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-2 py-0.5 uppercase text-[10px] font-black rounded-lg transition-all ${
                  language === l ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {l === 'en' ? 'EN' : 'हिन्दी'}
              </button>
            ))}
          </div>

          {/* Display Mode */}
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('mobile-frame')}
              title="Mobile App View"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'mobile-frame' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('full-responsive')}
              title="Full Desktop View"
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'full-responsive' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Save / Export Desktop Project */}
          <button
            onClick={() => openModal('download_project')}
            title="Download Complete Codebase (.ZIP) & Desktop Setup"
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <FolderArchive className="w-3.5 h-3.5" />
            <span className="text-[11px]">Download Code (.ZIP)</span>
          </button>
        </div>
      </aside>

      {/* Main Container Frame */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col justify-between overflow-hidden bg-white shadow-2xl ${
          viewMode === 'mobile-frame'
            ? 'max-w-[430px] min-h-[910px] md:rounded-[3rem] md:border-[10px] md:border-slate-800 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]'
            : 'max-w-4xl min-h-[850px] md:rounded-3xl border border-slate-200'
        }`}
      >
        {/* Dynamic Island / Speaker notch on mobile chassis */}
        {viewMode === 'mobile-frame' && (
          <div className="hidden md:flex justify-center pt-2 bg-[#036244]">
            <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-end px-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700"></span>
            </div>
          </div>
        )}

        {/* Scrollable Main Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Green Top Header */}
          <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

          {/* Body Content switched based on active role */}
          {role === 'teacher' ? (
            <TeacherDashboardView onBackToHome={() => setRole('student')} />
          ) : role === 'accountant' ? (
            <AccountantDashboardView onBackToHome={() => setRole('student')} />
          ) : role === 'admin' ? (
            <AdminDashboardView onBackToHome={() => setRole('student')} />
          ) : (
            <ModulesGrid />
          )}
        </div>

        {/* Curved Green Bottom Bar */}
        <BottomNav />
      </div>

      {/* Slide-out Drawer */}
      <SidebarDrawer isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* All Functional Modals */}
      <ModalManager />

      {/* Simulated Live Firebase Push Notification Alert */}
      <FcmNotificationBanner />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
