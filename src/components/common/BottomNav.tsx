import React from 'react';
import { Home, FileCheck, CircleDollarSign, Library, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, openModal, t, role } = useApp();

  const navItems = [
    {
      id: 'home',
      label: t('home'),
      icon: Home,
      action: () => setActiveTab('home'),
    },
    {
      id: 'assignment',
      label: t('assignment'),
      icon: FileCheck,
      action: () => {
        setActiveTab('assignment');
        openModal('homework');
      },
    },
    {
      id: 'fees',
      label: t('fees'),
      icon: CircleDollarSign,
      action: () => {
        setActiveTab('fees');
        openModal('fee_summary');
      },
    },
    {
      id: 'library',
      label: t('library'),
      icon: Library,
      action: () => {
        setActiveTab('library');
        openModal('book_search');
      },
    },
    {
      id: 'portal',
      label: role === 'teacher' ? 'Teacher' : 'Switch Role',
      icon: UserCheck,
      action: () => openModal('role_switcher'),
    },
  ];

  return (
    <div className="relative z-30 pt-3">
      {/* Curved green wave bottom bar */}
      <div className="bg-[#057A55] text-white px-2 py-2 rounded-t-[1.75rem] shadow-[0_-4px_20px_rgba(5,122,85,0.2)]">
        <div className="grid grid-cols-5 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="flex flex-col items-center justify-center py-1 group active:scale-95 transition-transform"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-white text-[#057A55] shadow-md -translate-y-1' : 'text-emerald-100 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span
                  className={`text-[10px] mt-0.5 tracking-tight font-medium ${
                    isActive ? 'text-white font-bold' : 'text-emerald-200'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
