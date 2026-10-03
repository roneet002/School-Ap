import React, { useState } from 'react';
import { X, Award, Calendar, FileText, CheckCircle2, Download, Printer, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockExamSchedule, mockExamReport } from '../../data/mockData';

interface ExamSuiteModalProps {
  initialTab?: 'schedule' | 'report';
}

export const ExamSuiteModal: React.FC<ExamSuiteModalProps> = ({ initialTab = 'schedule' }) => {
  const { closeModal, currentStudent } = useApp();
  const [activeTab, setActiveTab] = useState<'schedule' | 'report'>(initialTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-700 to-indigo-800 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Examinations & Marksheets</h3>
              <p className="text-[11px] text-violet-100">Periodic Assessments & Term Examinations</p>
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
        <div className="grid grid-cols-2 border-b border-slate-200 text-center text-xs font-bold bg-violet-50/50">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'schedule' ? 'border-violet-600 text-violet-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Exam Schedule (Datesheet)
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'report' ? 'border-violet-600 text-violet-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Exam Report Card
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-3">
              <div className="p-3 bg-violet-50 rounded-2xl border border-violet-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-violet-900">Periodic Assessment - 2 (PA-2)</span>
                  <p className="text-[11px] text-violet-700">Starts: 15 October 2026 · Hall Ticket Required</p>
                </div>
                <button
                  onClick={() => alert('Downloading Admit Card / Hall Ticket PDF with barcode...')}
                  className="px-2.5 py-1 bg-violet-600 text-white font-bold rounded-lg text-[10px] shadow-xs flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Admit Card</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {mockExamSchedule.map((exam) => (
                  <div key={exam.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{exam.subject}</span>
                      <span className="font-black text-violet-700 bg-violet-100/80 px-2 py-0.5 rounded text-[11px]">
                        {exam.date}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Timing: <strong>{exam.timing}</strong></span>
                      <span>Venue: <strong>{exam.roomNo}</strong></span>
                    </div>

                    <div className="pt-1 border-t border-slate-200/80 text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-700">Syllabus:</span> {exam.syllabus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REPORT CARD */}
          {activeTab === 'report' && (
            <div className="space-y-4">
              {/* Overall Card */}
              <div className="p-4 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl text-white shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                      {mockExamReport.term}
                    </span>
                    <h4 className="text-base font-black">{mockExamReport.examName}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black">{mockExamReport.percentage}%</span>
                    <p className="text-[10px] opacity-80">Class Rank #{mockExamReport.rank}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/20 text-xs">
                  <div>
                    <span className="opacity-80 text-[10px]">Total Score:</span>
                    <div className="font-bold">{mockExamReport.obtainedMarks} / {mockExamReport.totalMarks}</div>
                  </div>
                  <div>
                    <span className="opacity-80 text-[10px]">Cumulative GPA:</span>
                    <div className="font-bold">{mockExamReport.gpa} (Grade A1)</div>
                  </div>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-4 bg-slate-100 p-2.5 text-[10px] font-bold text-slate-500 uppercase">
                  <span className="col-span-2">Subject</span>
                  <span className="text-center">Marks</span>
                  <span className="text-right">Grade</span>
                </div>
                <div className="divide-y divide-slate-200 text-xs">
                  {mockExamReport.subjects.map((sub, idx) => (
                    <div key={idx} className="grid grid-cols-4 p-2.5 items-center">
                      <span className="col-span-2 font-bold text-slate-800">{sub.subject}</span>
                      <span className="text-center font-mono font-semibold text-slate-700">
                        {sub.obtainedMarks} / {sub.maxMarks}
                      </span>
                      <span className="text-right font-extrabold text-violet-700">{sub.grade}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teacher remark */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900">
                <span className="font-bold block mb-0.5">Teacher Remark:</span>
                <p className="italic text-[11px] text-amber-800 leading-relaxed">
                  "{mockExamReport.teacherRemarks}"
                </p>
              </div>

              <button
                onClick={() => alert('Generating official digitally signed CBSE Report Card PDF...')}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Download Report Card PDF</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
