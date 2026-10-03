import React, { useState } from 'react';
import { X, Calendar, PlusCircle, CheckCircle2, XCircle, Clock, FileText, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeaveRequest } from '../../types';

export const LeavesModal: React.FC = () => {
  const { closeModal, leaveRequests, applyLeave, updateLeaveStatus, role } = useApp();
  const [activeTab, setActiveTab] = useState<'history' | 'apply'>('history');

  const [fromDate, setFromDate] = useState('2026-10-15');
  const [toDate, setToDate] = useState('2026-10-16');
  const [reasonType, setReasonType] = useState<LeaveRequest['reasonType']>('Medical');
  const [reasonText, setReasonText] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reasonText.trim()) return;

    applyLeave({
      fromDate,
      toDate,
      reasonType,
      reasonText,
    });

    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setActiveTab('history');
      setReasonText('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Student Leave Application</h3>
              <p className="text-[11px] text-blue-100">Official Leave Sanction & Absence Records</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2 Tabs */}
        <div className="grid grid-cols-2 border-b border-slate-200 text-center text-xs font-bold bg-blue-50/50">
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'history' ? 'border-blue-600 text-blue-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Leave History ({leaveRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'apply' ? 'border-blue-600 text-blue-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            + Apply New Leave
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {activeTab === 'history' && (
            <div className="space-y-3">
              {leaveRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 hover:bg-slate-100/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {req.fromDate} {req.fromDate !== req.toDate && `to ${req.toDate}`}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        req.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <div className="text-slate-700">
                    <strong className="text-slate-900 font-semibold">{req.reasonType}:</strong> {req.reasonText}
                  </div>

                  {req.teacherRemarks && (
                    <div className="p-2 bg-emerald-50 rounded-xl text-[11px] text-emerald-800 italic">
                      Class Teacher: "{req.teacherRemarks}"
                    </div>
                  )}

                  {/* Teacher quick approval buttons */}
                  {role === 'teacher' && req.status === 'Pending' && (
                    <div className="pt-2 border-t border-slate-200 flex gap-2 justify-end">
                      <button
                        onClick={() => updateLeaveStatus(req.id, 'Rejected')}
                        className="px-3 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => updateLeaveStatus(req.id, 'Approved')}
                        className="px-3 py-1 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-xs font-bold shadow-xs"
                      >
                        Approve Leave
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'apply' && (
            <div>
              {appliedSuccess ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-3xl">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 mb-2" />
                  <h4 className="font-bold text-sm text-emerald-900">Application Submitted!</h4>
                  <p className="text-xs text-emerald-700 mt-1">Notification sent to Class Teacher Mr. Arvind Saxena.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">From Date</label>
                      <input
                        type="date"
                        required
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">To Date</label>
                      <input
                        type="date"
                        required
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Reason Category</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Medical', 'Family Function', 'Emergency', 'Other'] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setReasonType(r)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border text-left transition-all ${
                            reasonType === r
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Reason Details / Doctor Remarks *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={reasonText}
                      onChange={(e) => setReasonText(e.target.value)}
                      placeholder="Please mention medical reason, symptoms, or travel details..."
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Leave Application</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
