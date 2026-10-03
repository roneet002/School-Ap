import React, { useState } from 'react';
import {
  School,
  Users,
  ShieldCheck,
  BellRing,
  Download,
  Database,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Send,
  FileText,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboardView: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { triggerFcmNotification, exportDatabaseJson } = useApp();

  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim()) return;

    triggerFcmNotification(broadcastTitle, broadcastMessage || 'Important school advisory from Principal desk.', 'circular');
    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastSuccess(false);
      setBroadcastTitle('');
      setBroadcastMessage('');
    }, 2500);
  };

  return (
    <div className="p-4 space-y-5 animate-in fade-in pb-20">
      {/* Admin Header */}
      <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-3xl shadow-md">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-400">Principal & Director Console</span>
          <h2 className="text-base font-black">Dr. Rajesh Khanna</h2>
          <p className="text-xs text-slate-300">Executive Administration & Governance</p>
        </div>
        <button
          onClick={onBackToHome}
          className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold flex items-center gap-1 text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Student View</span>
        </button>
      </div>

      {/* School Overview Metrics */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Students</div>
          <div className="text-base font-black text-slate-900 mt-0.5">1,280</div>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Teachers</div>
          <div className="text-base font-black text-slate-900 mt-0.5">74</div>
        </div>
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Bus Fleet</div>
          <div className="text-base font-black text-slate-900 mt-0.5">18</div>
        </div>
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-emerald-700">Attendance</div>
          <div className="text-base font-black text-emerald-800 mt-0.5">94.8%</div>
        </div>
      </div>

      {/* Broadcast Circular to All Students & Parents */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-emerald-700" />
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wide">
              School-Wide Emergency Push & SMS Broadcast
            </h4>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            All 1,280 Devices
          </span>
        </div>

        {broadcastSuccess ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
            <div className="text-xs font-bold text-emerald-950">Broadcast Dispatched Successfully!</div>
            <p className="text-[11px] text-emerald-700">Sent via Firebase Cloud Messaging & SMS Gateway.</p>
          </div>
        ) : (
          <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
            <input
              type="text"
              required
              value={broadcastTitle}
              onChange={(e) => setBroadcastTitle(e.target.value)}
              placeholder="Circular Title (e.g. Unscheduled Winter Holiday Notice)..."
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
            />
            <textarea
              rows={2}
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Announcement details sent as push alert to all student and parent apps..."
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Notice Immediately</span>
            </button>
          </form>
        )}
      </div>

      {/* System & Database Control */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-slate-800" />
          <h4 className="font-black text-slate-900 text-xs uppercase tracking-wide">
            Database & System Infrastructure
          </h4>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-bold text-slate-800">PostgreSQL Relational DB Cluster</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">Connected (Port 5432)</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-bold text-slate-800">Firebase Cloud Messaging Service</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold">Active (APNs / FCM)</span>
          </div>
        </div>

        <button
          onClick={exportDatabaseJson}
          className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-sm flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Full School Database (PostgreSQL JSON Backup)</span>
        </button>
      </div>
    </div>
  );
};
