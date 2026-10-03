import React, { useState } from 'react';
import {
  Menu,
  ChevronDown,
  Search,
  Mic,
  MicOff,
  Bell,
  Wifi,
  Battery,
  User,
  Users,
  Calendar,
  X,
  Languages,
  Database,
  Shield,
  Layers,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { primaryStudent, siblingStudent } from '../../data/mockData';
import { Language, Role } from '../../types';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const {
    currentStudent,
    setStudent,
    academicYear,
    setAcademicYear,
    searchQuery,
    setSearchQuery,
    isListening,
    toggleVoiceSearch,
    unreadNotificationCount,
    openModal,
    t,
    language,
    setLanguage,
    role,
    loginAs,
    isOffline,
  } = useApp();

  const [showStudentMenu, setShowStudentMenu] = useState(false);
  const [showYearMenu, setShowYearMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const students = [primaryStudent, siblingStudent];
  const academicYears = ['2026-27', '2025-26', '2024-25'];

  return (
    <div className="relative bg-gradient-to-b from-[#036244] to-[#057A55] text-white pt-2 pb-6 px-4 rounded-b-[2rem] shadow-md transition-all">
      {/* Mobile Top Status Bar */}
      <div className="flex items-center justify-between text-xs font-semibold px-2 py-1 opacity-90 select-none">
        <span className="tracking-tight text-[13px] font-bold">12:03</span>
        <div className="flex items-center gap-2">
          {isOffline && (
            <span className="text-[10px] bg-amber-500/80 text-white px-1.5 py-0.5 rounded-sm">Offline</span>
          )}
          <div className="flex items-center gap-1 text-[11px]">
            <span className="font-bold tracking-tighter">5G</span>
            <Wifi className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-1.5 py-0.5 rounded-md text-[11px]">
            <span>74</span>
            <Battery className="w-3.5 h-3.5 fill-white" />
          </div>
        </div>
      </div>

      {/* Main Top Bar: Hamburger, Student Selector, Academic Session */}
      <div className="flex items-center justify-between mt-2 px-1">
        {/* Left: Hamburger & Student Dropdown */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 -ml-2 rounded-xl text-white hover:bg-white/15 active:scale-95 transition-transform"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Student Selector */}
          <div className="relative">
            <button
              onClick={() => setShowStudentMenu(!showStudentMenu)}
              className="flex items-center gap-1.5 font-extrabold text-lg tracking-wide uppercase hover:opacity-90 active:scale-98 transition-all"
            >
              <span>{currentStudent.name.split(' ')[0]}</span>
              <ChevronDown className="w-4 h-4 stroke-[3]" />
            </button>

            {/* Dropdown Menu */}
            {showStudentMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl text-slate-800 z-50 p-2 border border-slate-100 animate-in fade-in zoom-in-95 duration-100">
                <div className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                  {t('switch_student')}
                </div>
                {students.map((std) => (
                  <button
                    key={std.id}
                    onClick={() => {
                      setStudent(std);
                      setShowStudentMenu(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-sm transition-colors ${
                      currentStudent.id === std.id ? 'bg-emerald-50 text-emerald-800 font-semibold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        {std.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-bold">{std.name}</div>
                        <div className="text-[10px] text-slate-500">{std.classSection}</div>
                      </div>
                    </div>
                    {currentStudent.id === std.id && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Academic Year Pill & Language Trigger */}
        <div className="flex items-center gap-2">
          {/* Language indicator */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="px-2 py-1 bg-white/15 hover:bg-white/25 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="uppercase text-[11px] font-bold">{language}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl text-slate-800 z-50 p-1 border border-slate-100">
                {[
                  { code: 'en' as Language, label: 'English' },
                  { code: 'hi' as Language, label: 'हिन्दी (Hindi)' },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      language === l.code ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span>{l.label}</span>
                    {language === l.code && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Academic Session Pill */}
          <div className="relative">
            <button
              onClick={() => setShowYearMenu(!showYearMenu)}
              className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold tracking-tight border border-white/30 active:scale-95 transition-all"
            >
              <span>{academicYear}</span>
              <ChevronDown className="w-3 h-3 stroke-[3]" />
            </button>

            {showYearMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl text-slate-800 z-50 p-1 border border-slate-100">
                {academicYears.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => {
                      setAcademicYear(yr);
                      setShowYearMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      academicYear === yr ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span>{yr}</span>
                    {academicYear === yr && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Search Bar with Voice Mic & Bell Icon */}
      <div className="mt-4 -mb-10 px-1 relative z-20">
        <div className="flex items-center gap-2">
          {/* Search Input Box */}
          <div className="flex-1 bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center px-3.5 py-2.5 transition-all focus-within:ring-2 focus-within:ring-emerald-400">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full text-xs text-slate-800 placeholder-slate-400 font-medium focus:outline-none bg-transparent"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}

            {/* Voice Mic Button */}
            <button
              onClick={toggleVoiceSearch}
              className={`p-1.5 rounded-full ml-1 transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-emerald-600 hover:bg-emerald-50'
              }`}
              title={isListening ? 'Listening...' : 'Voice Search'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 stroke-[2.2]" />}
            </button>
          </div>

          {/* Notification Bell with Red Badge */}
          <button
            onClick={() => openModal('my_notification')}
            className="w-11 h-11 bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center relative hover:bg-slate-50 active:scale-95 transition-transform"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-emerald-700 stroke-[2.2]" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadNotificationCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
