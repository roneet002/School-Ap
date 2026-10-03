import React, { useState } from 'react';
import { X, Bus, Phone, Navigation, Clock, Bell, MapPin, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockTransportDetails } from '../../data/mockData';

export const TransportModal: React.FC = () => {
  const { closeModal } = useApp();
  const [alarmActive, setAlarmActive] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Live GPS Transport Tracking</h3>
              <p className="text-[11px] text-amber-100">{mockTransportDetails.routeNumber} · {mockTransportDetails.busNumber}</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Status Banner */}
        <div className="p-4 bg-amber-50 border-b border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-bold text-amber-900">
                GPS Active · Status: <strong className="text-emerald-700">{mockTransportDetails.status}</strong>
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded-lg border border-amber-200">
              Speed: {mockTransportDetails.currentSpeed}
            </span>
          </div>

          <div className="mt-2 text-xs text-slate-700">
            Current Location: <strong>{mockTransportDetails.currentStop}</strong>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Driver & Conductor Card */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Driver</span>
                <div className="font-bold text-slate-900">{mockTransportDetails.driverName}</div>
              </div>
              <a
                href={`tel:${mockTransportDetails.driverPhone}`}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Call Driver</span>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-slate-600 text-[11px]">
              <span>Conductor: <strong>{mockTransportDetails.conductorName}</strong></span>
              <span>{mockTransportDetails.conductorPhone}</span>
            </div>
          </div>

          {/* Proximity Alarm Alert */}
          <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-sky-600" />
              <div>
                <div className="font-bold text-sky-950">Bus Stop Arrival Alert</div>
                <div className="text-[10px] text-sky-700">Receive chime when bus is 500m away</div>
              </div>
            </div>
            <button
              onClick={() => setAlarmActive(!alarmActive)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                alarmActive ? 'bg-sky-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  alarmActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Interactive Route Stop Timeline */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Route #14 Stops Timeline
            </h4>
            <div className="space-y-4 relative pl-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {mockTransportDetails.stops.map((stop, idx) => {
                const isYourStop = stop.name.includes('Your Stop');
                return (
                  <div key={idx} className="relative flex items-start gap-3 text-xs">
                    {/* Circle icon */}
                    <div
                      className={`w-4 h-4 rounded-full -ml-[19px] z-10 flex items-center justify-center border-2 ${
                        stop.passed
                          ? 'bg-emerald-500 border-white'
                          : isYourStop
                          ? 'bg-amber-500 border-white ring-2 ring-amber-300'
                          : 'bg-slate-300 border-white'
                      }`}
                    >
                      {stop.passed && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${isYourStop ? 'text-amber-800 font-black' : 'text-slate-800'}`}>
                          {stop.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">{stop.time}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {stop.passed ? 'Departed' : isYourStop ? 'Approaching in ~2 mins' : 'Upcoming'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
