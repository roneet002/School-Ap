import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Clock,
  BookOpen,
  Calendar,
  ArrowLeft,
  FileCheck,
  Send,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeacherDashboardView: React.FC<{ onBackToHome: () => void }> = ({ onBackToHome }) => {
  const { leaveRequests, updateLeaveStatus, triggerFcmNotification } = useApp();

  const [studentList, setStudentList] = useState([
    { roll: 1, name: 'Aarav Mehta', status: 'Present' },
    { roll: 2, name: 'Ananya Roy', status: 'Present' },
    { roll: 3, name: 'Devraj Sharma', status: 'Present' },
    { roll: 4, name: 'Diya Patel', status: 'Present' },
    { roll: 5, name: 'Kabir Verma', status: 'Absent' },
    { roll: 6, name: 'Pranav Joshi', status: 'Present' },
    { roll: 7, name: 'Riya Singhania', status: 'Present' },
    { roll: 8, name: 'Simran Kaur', status: 'Present' },
  ]);

  const [hwTitle, setHwTitle] = useState('');
  const [hwSubject, setHwSubject] = useState('Mathematics');
  const [hwDueDate, setHwDueDate] = useState('06 Oct 2026');
  const [hwPosted, setHwPosted] = useState(false);

  const toggleStudentStatus = (roll: number) => {
    setStudentList((prev) =>
      prev.map((s) => (s.roll === roll ? { ...s, status: s.status === 'Present' ? 'Absent' : 'Present' } : s))
    );
  };

  const markAllPresent = () => {
    setStudentList((prev) => prev.map((s) => ({ ...s, status: 'Present' })));
    triggerFcmNotification('Class 10-A Attendance Marked', 'All 8 present records synchronized to cloud database.');
  };

  const handlePostHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle.trim()) return;
    setHwPosted(true);
    triggerFcmNotification('New Homework Assigned', `${hwSubject}: ${hwTitle} (Due: ${hwDueDate})`, 'system');
    setTimeout(() => {
      setHwPosted(false);
      setHwTitle('');
    }, 2000);
  };

  return (
    <div className="p-4 space-y-5 animate-in fade-in pb-20">
      {/* Teacher Top Bar */}
      <div className="flex items-center justify-between bg-emerald-800 text-white p-4 rounded-3xl shadow-md">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-300">Teacher Workspace</span>
          <h2 className="text-base font-black">Mrs. Sunita Verma</h2>
          <p className="text-xs text-emerald-100">Class Teacher 10-A · Mathematics Department</p>
        </div>
        <button
          onClick={onBackToHome}
          className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold flex items-center gap-1 text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Student View</span>
        </button>
      </div>

      {/* Class 10-A Stats */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Strength</div>
          <div className="text-lg font-black text-slate-800 mt-0.5">38</div>
        </div>
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-emerald-600">Present Today</div>
          <div className="text-lg font-black text-emerald-700 mt-0.5">36</div>
        </div>
        <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-rose-500">Absences</div>
          <div className="text-lg font-black text-rose-600 mt-0.5">02</div>
        </div>
      </div>

      {/* SECTION 1: ATTENDANCE REGISTER */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wide">
              Quick Class 10-A Roll Call
            </h4>
          </div>
          <button
            onClick={markAllPresent}
            className="px-2.5 py-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold rounded-lg text-[10px]"
          >
            Mark All Present ✓
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {studentList.map((s) => (
            <button
              key={s.roll}
              onClick={() => toggleStudentStatus(s.roll)}
              className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-colors ${
                s.status === 'Present'
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50/70 border-rose-300 text-rose-900'
              }`}
            >
              <div>
                <span className="text-[9px] font-mono opacity-70">#{s.roll}</span>
                <div className="font-bold text-[11px]">{s.name}</div>
              </div>
              <span className={`text-[10px] font-bold ${s.status === 'Present' ? 'text-emerald-700' : 'text-rose-600'}`}>
                {s.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 2: POST NEW HOMEWORK */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <h4 className="font-black text-slate-900 text-xs uppercase tracking-wide">
            Assign Homework / Task
          </h4>
        </div>

        {hwPosted ? (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold text-center">
            Homework published to student portals and push notifications dispatched!
          </div>
        ) : (
          <form onSubmit={handlePostHomework} className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={hwSubject}
                onChange={(e) => setHwSubject(e.target.value)}
                placeholder="Subject"
                className="p-2 rounded-xl border border-slate-200"
              />
              <input
                type="text"
                value={hwDueDate}
                onChange={(e) => setHwDueDate(e.target.value)}
                placeholder="Due Date"
                className="p-2 rounded-xl border border-slate-200"
              />
            </div>
            <input
              type="text"
              required
              value={hwTitle}
              onChange={(e) => setHwTitle(e.target.value)}
              placeholder="Assignment title & chapter exercises..."
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-xs"
            >
              Publish Homework to Class
            </button>
          </form>
        )}
      </div>

      {/* SECTION 3: LEAVE APPROVALS QUEUE */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <h4 className="font-black text-slate-900 text-xs uppercase tracking-wide">
            Pending Student Leave Approvals
          </h4>
        </div>

        <div className="space-y-2">
          {leaveRequests.map((req) => (
            <div key={req.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Devraj Sharma (Class 10-A)</span>
                <span className="text-[10px] text-slate-400">{req.appliedOn}</span>
              </div>
              <p className="text-[11px] text-slate-600">{req.fromDate}: {req.reasonText}</p>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                <span className="text-[10px] font-bold text-amber-700">{req.status}</span>
                {req.status === 'Pending' && (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => updateLeaveStatus(req.id, 'Rejected')}
                      className="px-2.5 py-0.5 bg-rose-100 text-rose-800 font-bold rounded text-[10px]"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => updateLeaveStatus(req.id, 'Approved')}
                      className="px-2.5 py-0.5 bg-emerald-600 text-white font-bold rounded text-[10px]"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
