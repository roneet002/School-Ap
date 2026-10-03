import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, XCircle, Clock, AlertTriangle, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockSubjectAttendance } from '../../data/mockData';

export const AttendanceModal: React.FC = () => {
  const { closeModal, currentStudent, attendanceRecords, addAttendanceRecord, role } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'calendar' | 'subjects' | 'mark'>('calendar');
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  // Teacher marking state
  const [markStatus, setMarkStatus] = useState<'Present' | 'Absent' | 'Late'>('Present');
  const [markRemark, setMarkRemark] = useState('');
  const [markedToday, setMarkedToday] = useState(false);

  const handleMarkToday = () => {
    addAttendanceRecord({
      date: new Date().toISOString().split('T')[0],
      status: markStatus,
      inTime: markStatus !== 'Absent' ? '07:50 AM' : undefined,
      outTime: markStatus !== 'Absent' ? '02:00 PM' : undefined,
      remark: markRemark || (markStatus === 'Late' ? 'Late arrival noted' : 'Regular punch-in'),
    });
    setMarkedToday(true);
  };

  // Calendar dates mock calculation
  const calendarDays = [
    { day: 1, status: 'Present' },
    { day: 2, status: 'Holiday' },
    { day: 3, status: 'Present' },
    { day: 4, status: 'Holiday' },
    { day: 5, status: 'Present' },
    { day: 6, status: 'Present' },
    { day: 7, status: 'Present' },
    { day: 8, status: 'Late' },
    { day: 9, status: 'Present' },
    { day: 10, status: 'Holiday' },
    { day: 11, status: 'Holiday' },
    { day: 12, status: 'Present' },
    { day: 13, status: 'Present' },
    { day: 14, status: 'Present' },
    { day: 15, status: 'Present' },
    { day: 16, status: 'Present' },
    { day: 17, status: 'Holiday' },
    { day: 18, status: 'Holiday' },
    { day: 19, status: 'Absent' },
    { day: 20, status: 'Present' },
    { day: 21, status: 'Present' },
    { day: 22, status: 'Present' },
    { day: 23, status: 'Present' },
    { day: 24, status: 'Holiday' },
    { day: 25, status: 'Holiday' },
    { day: 26, status: 'Present' },
    { day: 27, status: 'Present' },
    { day: 28, status: 'Present' },
    { day: 29, status: 'Late' },
    { day: 30, status: 'Present' },
    { day: 31, status: 'Holiday' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Student Attendance</h3>
              <p className="text-[11px] text-sky-100">{currentStudent.name} · {currentStudent.classSection}</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Attendance Summary Stat Cards */}
        <div className="grid grid-cols-4 gap-2 p-4 bg-sky-50/60 border-b border-sky-100 text-center">
          <div className="bg-white p-2.5 rounded-xl border border-sky-100 shadow-xs">
            <div className="text-lg font-black text-sky-700">94.2%</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Overall %</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-emerald-100 shadow-xs">
            <div className="text-lg font-black text-emerald-600">82</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Present</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-rose-100 shadow-xs">
            <div className="text-lg font-black text-rose-500">03</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Absent</div>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-amber-100 shadow-xs">
            <div className="text-lg font-black text-amber-500">02</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase">Late</div>
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="flex border-b border-slate-200 px-4 pt-2 gap-4 text-xs font-bold text-slate-500">
          <button
            onClick={() => setActiveSubTab('calendar')}
            className={`pb-2.5 border-b-2 transition-all ${
              activeSubTab === 'calendar' ? 'border-sky-600 text-sky-700' : 'border-transparent hover:text-slate-800'
            }`}
          >
            Monthly Calendar
          </button>
          <button
            onClick={() => setActiveSubTab('subjects')}
            className={`pb-2.5 border-b-2 transition-all ${
              activeSubTab === 'subjects' ? 'border-sky-600 text-sky-700' : 'border-transparent hover:text-slate-800'
            }`}
          >
            Subject Breakdown
          </button>
          <button
            onClick={() => setActiveSubTab('mark')}
            className={`pb-2.5 border-b-2 transition-all ${
              activeSubTab === 'mark' ? 'border-sky-600 text-sky-700' : 'border-transparent hover:text-slate-800'
            }`}
          >
            {role === 'teacher' ? 'Mark Class Attendance' : 'Self Check-in Verification'}
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {activeSubTab === 'calendar' && (
            <div>
              {/* Month selector */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-extrabold text-sm text-slate-800">{selectedMonth}</span>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1">
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {/* Offset for Thursday start */}
                <div className="h-9"></div>
                <div className="h-9"></div>
                <div className="h-9"></div>
                <div className="h-9"></div>

                {calendarDays.map((d) => {
                  let bgColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                  if (d.status === 'Absent') bgColor = 'bg-rose-50 text-rose-800 border-rose-200';
                  if (d.status === 'Late') bgColor = 'bg-amber-50 text-amber-800 border-amber-200';
                  if (d.status === 'Holiday') bgColor = 'bg-slate-100 text-slate-400 border-slate-200';

                  return (
                    <div
                      key={d.day}
                      className={`h-9 rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition-transform hover:scale-105 cursor-pointer ${bgColor}`}
                      title={`Day ${d.day}: ${d.status}`}
                    >
                      <span>{d.day}</span>
                      <span className="text-[7px] -mt-0.5 tracking-tighter opacity-80">
                        {d.status === 'Holiday' ? 'OFF' : d.status[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl mt-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Present
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  Absent
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  Late
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  Holiday
                </span>
              </div>

              {/* Recent History Table */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Recent Attendance Logs
                </h4>
                <div className="space-y-1.5">
                  {attendanceRecords.slice(0, 5).map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-800">{rec.date}</div>
                        <div className="text-[10px] text-slate-500">
                          {rec.inTime ? `Entry: ${rec.inTime} · Exit: ${rec.outTime}` : rec.remark}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          rec.status === 'Present'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rec.status === 'Absent'
                            ? 'bg-rose-100 text-rose-800'
                            : rec.status === 'Late'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'subjects' && (
            <div className="space-y-3">
              {mockSubjectAttendance.map((sub) => (
                <div key={sub.subject} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-bold text-slate-800">{sub.subject}</span>
                    <span className="font-extrabold text-sky-700">{sub.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        sub.percentage >= 90
                          ? 'bg-emerald-500'
                          : sub.percentage >= 75
                          ? 'bg-sky-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Attended: {sub.attended} / {sub.totalClasses} classes</span>
                    <span>Min required: 75%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'mark' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900">
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Bio-metric RFID / Mobile Punch Simulation</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Date: <strong>{new Date().toLocaleDateString('en-GB')}</strong>. School Gate RFID reader online.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Attendance Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Present', 'Late', 'Absent'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setMarkStatus(st)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        markStatus === st
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Remarks (Optional)</label>
                <input
                  type="text"
                  value={markRemark}
                  onChange={(e) => setMarkRemark(e.target.value)}
                  placeholder="e.g. Bus delay, medical certificate..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <button
                onClick={handleMarkToday}
                disabled={markedToday}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
              >
                {markedToday ? 'Attendance Recorded for Today ✓' : 'Punch Attendance Now'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
