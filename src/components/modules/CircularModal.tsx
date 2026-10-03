import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, AlertCircle, BookmarkCheck, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CircularModal: React.FC = () => {
  const { closeModal, circulars, acknowledgeCircular } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Academic' | 'Sports' | 'Urgent'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(circulars[0]?.id || null);

  const filteredCirculars =
    selectedFilter === 'All'
      ? circulars
      : circulars.filter((c) => c.category === selectedFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">School Circulars & Notices</h3>
              <p className="text-[11px] text-pink-100">Official Directives from Principal Desk</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 p-3 bg-pink-50/50 border-b border-pink-100 text-xs font-bold overflow-x-auto">
          {(['All', 'Academic', 'Sports', 'Urgent'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1 rounded-xl transition-all ${
                selectedFilter === cat
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Circular List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {filteredCirculars.map((circ) => {
            const isExpanded = expandedId === circ.id;
            return (
              <div
                key={circ.id}
                className="p-4 bg-slate-50 hover:bg-slate-100/70 rounded-2xl border border-slate-200/80 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                          circ.category === 'Urgent'
                            ? 'bg-rose-100 text-rose-800'
                            : circ.category === 'Sports'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {circ.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {circ.date}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 leading-snug">{circ.title}</h4>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {isExpanded ? circ.details : circ.summary}
                </p>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-pink-600" />
                        <span className="font-semibold text-slate-700">{circ.fileAttachment}</span>
                      </div>
                      <button
                        onClick={() => alert(`Downloading circular attachment: ${circ.fileAttachment}`)}
                        className="text-pink-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">Ref: CIR/DPS/2026/089</span>
                      <button
                        onClick={() => acknowledgeCircular(circ.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          circ.acknowledged
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-pink-600 hover:bg-pink-700 text-white shadow-xs'
                        }`}
                      >
                        <BookmarkCheck className="w-3.5 h-3.5" />
                        <span>{circ.acknowledged ? 'Acknowledged by Parent ✓' : 'Acknowledge Notice'}</span>
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setExpandedId(isExpanded ? null : circ.id)}
                  className="mt-2 text-[11px] font-bold text-pink-600 hover:text-pink-800 block"
                >
                  {isExpanded ? 'Show Less ▲' : 'Read Full Circular & Details ▼'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
