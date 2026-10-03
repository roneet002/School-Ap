import React from 'react';
import { X, User, Phone, Mail, MapPin, Calendar, Heart, Download, QrCode, ShieldCheck, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileModal: React.FC = () => {
  const { closeModal, currentStudent } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-800 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base leading-tight">Student Identity Card</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Digital ID Badge Card */}
          <div className="bg-gradient-to-br from-[#057A55] to-[#024E36] rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
              <div>
                <div className="text-[10px] font-black tracking-widest uppercase text-emerald-200">
                  DEVRAJ ACADEMY
                </div>
                <div className="text-[9px] text-emerald-100">Senior Secondary High School</div>
              </div>
              <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-bold">2026-27</span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 overflow-hidden flex items-center justify-center shadow-md">
                <img
                  src={currentStudent.photoUrl}
                  alt={currentStudent.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-black text-base tracking-tight leading-tight">{currentStudent.name}</h4>
                <div className="text-xs text-emerald-100 font-semibold">{currentStudent.classSection}</div>
                <div className="text-[10px] text-emerald-200 mt-0.5">
                  Roll #{currentStudent.rollNo} · Adm: {currentStudent.admissionNo}
                </div>
              </div>
            </div>

            {/* Micro Details on Card */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/20 text-[11px]">
              <div>
                <span className="text-emerald-200 text-[10px] block">Blood Group:</span>
                <strong>{currentStudent.bloodGroup}</strong>
              </div>
              <div>
                <span className="text-emerald-200 text-[10px] block">Bus Route:</span>
                <strong>{currentStudent.busRouteNo.split(' ')[0]} {currentStudent.busRouteNo.split(' ')[1]}</strong>
              </div>
            </div>

            {/* Barcode Strip */}
            <div className="mt-3 pt-2 bg-white/10 rounded-xl p-2 text-center">
              <div className="h-6 flex justify-center items-center gap-0.5">
                {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 3, 1, 2].map((w, i) => (
                  <span
                    key={i}
                    className="bg-white h-full"
                    style={{ width: `${w * 1.5}px` }}
                  />
                ))}
              </div>
              <div className="text-[8px] font-mono tracking-widest text-emerald-200 mt-1">
                {currentStudent.admissionNo}
              </div>
            </div>
          </div>

          {/* Full Bio Data Details */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5 text-xs text-slate-700">
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Personal & Guardian Details</h5>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-400 text-[10px] block">Father Name:</span>
                <span className="font-semibold text-slate-800">{currentStudent.fatherName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Mother Name:</span>
                <span className="font-semibold text-slate-800">{currentStudent.motherName}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Date of Birth:</span>
                <span className="font-semibold text-slate-800">{currentStudent.dob}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Registered Mobile:</span>
                <span className="font-semibold text-slate-800">{currentStudent.phone}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <span className="text-slate-400 text-[10px] block">Residential Address:</span>
              <span className="font-semibold text-slate-800">{currentStudent.address}</span>
            </div>
          </div>

          <button
            onClick={() => alert('Downloading official laminated Student ID Card badge PDF...')}
            className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Digital Student ID Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
