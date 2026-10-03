import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Receipt,
  Download,
  CheckCircle2,
  Send,
  ArrowLeft,
  Search,
  Filter,
  Users,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AccountantDashboardView: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { triggerFcmNotification } = useApp();

  const [counterStudentName, setCounterStudentName] = useState('Devraj Sharma (10-A)');
  const [counterAmount, setCounterAmount] = useState('21000');
  const [counterMode, setCounterMode] = useState('Cash');
  const [collectedSuccess, setCollectedSuccess] = useState(false);

  const [defaulters, setDefaulters] = useState([
    { id: 'def_1', name: 'Rohan Mehra', class: '10-B', due: 21000, daysOverdue: 14, phone: '+91 98101 99221', reminded: false },
    { id: 'def_2', name: 'Sneha Agarwal', class: '9-A', due: 18500, daysOverdue: 22, phone: '+91 98111 88332', reminded: false },
    { id: 'def_3', name: 'Arman Malik', class: '11-C', due: 24000, daysOverdue: 9, phone: '+91 98122 77443', reminded: false },
    { id: 'def_4', name: 'Tanvi Joshi', class: '8-A', due: 15000, daysOverdue: 30, phone: '+91 98133 66554', reminded: false },
  ]);

  const handleRemindDefaulter = (id: string, name: string) => {
    setDefaulters((prev) =>
      prev.map((d) => (d.id === id ? { ...d, reminded: true } : d))
    );
    triggerFcmNotification('Fee Reminder SMS Dispatched', `Automated payment reminder sent to parent of ${name}.`, 'fee');
  };

  const handleCounterCollection = (e: React.FormEvent) => {
    e.preventDefault();
    setCollectedSuccess(true);
    triggerFcmNotification(
      'Counter Payment Cleared',
      `₹${Number(counterAmount).toLocaleString()} collected for ${counterStudentName} via ${counterMode}.`,
      'fee'
    );
    setTimeout(() => {
      setCollectedSuccess(false);
    }, 2500);
  };

  return (
    <div className="p-4 space-y-5 animate-in fade-in pb-20">
      {/* Accountant Header */}
      <div className="flex items-center justify-between bg-emerald-900 text-white p-4 rounded-3xl shadow-md">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-300">Accounts & Bursar Portal</span>
          <h2 className="text-base font-black">Mr. Alok Mathur</h2>
          <p className="text-xs text-emerald-100">Head of School Accounts & Finance · Session 2026-27</p>
        </div>
        <button
          onClick={onBackToHome}
          className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold flex items-center gap-1 text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Student View</span>
        </button>
      </div>

      {/* Revenue Snapshot Cards */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Billed</div>
          <div className="text-base font-black text-slate-900 mt-0.5">₹2.84 Cr</div>
        </div>
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-emerald-700">Realized (Paid)</div>
          <div className="text-base font-black text-emerald-800 mt-0.5">₹2.41 Cr</div>
        </div>
        <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-rose-600">Pending Dues</div>
          <div className="text-base font-black text-rose-700 mt-0.5">₹43.2 Lakh</div>
        </div>
      </div>

      {/* Counter Fee Collection Point */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-emerald-700" />
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wide">
              Counter Offline Collection & Instant Receipt
            </h4>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            Counter Desk #1
          </span>
        </div>

        {collectedSuccess ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <div className="text-xs font-bold text-emerald-950">Payment Recorded Successfully!</div>
            <p className="text-[11px] text-emerald-800">
              Receipt #REC-2026-{Math.floor(100000 + Math.random() * 900000)} generated and synced with Student Ledger.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCounterCollection} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Student & Class</label>
                <input
                  type="text"
                  required
                  value={counterStudentName}
                  onChange={(e) => setCounterStudentName(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Fee Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={counterAmount}
                  onChange={(e) => setCounterAmount(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Collection Mode</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Cash', 'POS Card', 'Cheque', 'UPI / QR'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setCounterMode(m)}
                    className={`py-1.5 rounded-xl border font-bold text-[11px] transition-all ${
                      counterMode === m
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Collect Fee & Issue Printed Slip</span>
            </button>
          </form>
        )}
      </div>

      {/* Pending Fee Defaulters List */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wide">
              Pending Fee Defaulters Notice List
            </h4>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold">{defaulters.length} Pending Cases</span>
        </div>

        <div className="space-y-2">
          {defaulters.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-900">{item.name}</div>
                <div className="text-[11px] text-slate-500">
                  {item.class} · Overdue by <strong>{item.daysOverdue} days</strong>
                </div>
                <div className="text-[11px] font-mono text-rose-700 font-bold mt-0.5">
                  Due: ₹{item.due.toLocaleString()}
                </div>
              </div>

              <div>
                {item.reminded ? (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-bold">
                    SMS Sent ✓
                  </span>
                ) : (
                  <button
                    onClick={() => handleRemindDefaulter(item.id, item.name)}
                    className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-[10px] flex items-center gap-1 shadow-2xs"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Reminder</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
