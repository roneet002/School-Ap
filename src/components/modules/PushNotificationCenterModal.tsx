import React from 'react';
import { X, Bell, BellRing, CheckCheck, Trash2, ShieldCheck, Flame, Radio } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PushNotificationCenterModal: React.FC = () => {
  const {
    closeModal,
    notifications,
    markAllNotificationsRead,
    triggerFcmNotification,
    unreadNotificationCount,
    t,
  } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Firebase Cloud Messaging</h3>
              <p className="text-[11px] text-amber-100">FCM Push Notification Hub</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* FCM Status Banner */}
        <div className="p-3 bg-amber-50/80 border-b border-amber-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>FCM Device Token Registered</span>
          </div>
          <button
            onClick={() => triggerFcmNotification('Test School Alert', 'This is a live Firebase Cloud Messaging push notification.')}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-[10px] shadow-xs"
          >
            Test Push Trigger
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 text-xs">
          <span className="text-slate-500 font-medium">
            {unreadNotificationCount > 0 ? `${unreadNotificationCount} unread alerts` : 'All alerts read'}
          </span>
          {unreadNotificationCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-amber-700 font-bold hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{t('mark_all_read')}</span>
            </button>
          )}
        </div>

        {/* Notification list */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border text-xs transition-colors ${
                item.isRead
                  ? 'bg-slate-50 border-slate-200/80 opacity-80'
                  : 'bg-amber-50/50 border-amber-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900">{item.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
