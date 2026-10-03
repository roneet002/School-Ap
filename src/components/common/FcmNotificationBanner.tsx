import React from 'react';
import { BellRing, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FcmNotificationBanner: React.FC = () => {
  const { fcmBanner, closeFcmBanner } = useApp();

  if (!fcmBanner) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 w-11/12 max-w-sm z-50 animate-in slide-in-from-top-4 duration-300">
      <div className="bg-slate-900/95 text-white backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-white/20 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <BellRing className="w-4 h-4 animate-bounce" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              Firebase Cloud Messaging (FCM)
            </span>
            <button
              onClick={closeFcmBanner}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <h4 className="text-xs font-bold text-white truncate mt-0.5">{fcmBanner.title}</h4>
          <p className="text-[11px] text-slate-300 leading-tight mt-0.5">{fcmBanner.message}</p>
        </div>
      </div>
    </div>
  );
};
