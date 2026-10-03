import React, { useState } from 'react';
import { X, BookOpen, Clock, Upload, CheckCircle2, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HomeworkModal: React.FC = () => {
  const { closeModal, homeworkList, submitHomework, currentStudent, role } = useApp();
  const [selectedTab, setSelectedTab] = useState<'pending' | 'submitted' | 'evaluated'>('pending');
  const [submittingHwId, setSubmittingHwId] = useState<string | null>(null);
  const [attachedFileName, setAttachedFileName] = useState('Homework_Submission_Devraj.pdf');

  const filteredList = homeworkList.filter((item) => item.status === selectedTab);

  const handleSubmit = (id: string) => {
    submitHomework(id, attachedFileName);
    setSubmittingHwId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Daily Homework</h3>
              <p className="text-[11px] text-amber-100">{currentStudent.classSection} · Session 2026-27</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 px-4 pt-2 gap-2 text-xs font-bold bg-amber-50/50">
          <button
            onClick={() => setSelectedTab('pending')}
            className={`pb-2.5 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              selectedTab === 'pending'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Pending</span>
            <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">14</span>
          </button>
          <button
            onClick={() => setSelectedTab('submitted')}
            className={`pb-2.5 px-2 border-b-2 transition-all ${
              selectedTab === 'submitted'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Submitted
          </button>
          <button
            onClick={() => setSelectedTab('evaluated')}
            className={`pb-2.5 px-2 border-b-2 transition-all ${
              selectedTab === 'evaluated'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Evaluated & Graded
          </button>
        </div>

        {/* List Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {filteredList.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 mb-2" />
              <p className="font-semibold text-sm text-slate-600">No homework in this category</p>
              <p className="text-xs">All assignments up to date!</p>
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200/70 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                    {item.subject}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Due: {item.dueDate}</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-800 leading-snug">{item.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.description}</p>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">By: <strong>{item.teacherName}</strong></span>

                  {item.status === 'pending' && (
                    <button
                      onClick={() => setSubmittingHwId(item.id)}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-colors"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Submit Solution</span>
                    </button>
                  )}

                  {item.status === 'submitted' && (
                    <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Submitted ({item.submittedFile})</span>
                    </span>
                  )}

                  {item.status === 'evaluated' && (
                    <div className="text-right">
                      <span className="bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-md text-xs">
                        Grade: {item.grade}
                      </span>
                      {item.feedback && (
                        <p className="text-[10px] text-slate-600 mt-1 italic">"{item.feedback}"</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Inline Submit Drawer */}
                {submittingHwId === item.id && (
                  <div className="mt-3 p-3 bg-white rounded-xl border border-amber-200 shadow-xs space-y-2 animate-in fade-in">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span>Attach Assignment File / PDF</span>
                    </div>
                    <input
                      type="text"
                      value={attachedFileName}
                      onChange={(e) => setAttachedFileName(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      placeholder="e.g. math_homework_devraj.pdf"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setSubmittingHwId(null)}
                        className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSubmit(item.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs"
                      >
                        Confirm Upload
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
