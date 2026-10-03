import React, { useState } from 'react';
import { X, Send, User, CheckCheck, Play, Pause, Paperclip, MessageSquare, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MessagesChatModal: React.FC = () => {
  const { closeModal, chatMessages, sendChatMessage, currentStudent, role } = useApp();
  const [inputText, setInputText] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const quickPrompts = [
    'Sir, please check my submitted homework.',
    'What is the syllabus for Friday math test?',
    'Will school close early tomorrow?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg h-[90vh] max-h-[700px] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 px-5 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                AS
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-purple-800 absolute bottom-0 right-0"></span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm leading-tight">Mr. Arvind Saxena</h3>
              <p className="text-[10px] text-purple-200">Class Teacher 10-A · Online</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security badge */}
        <div className="py-1 px-4 bg-purple-50 text-[10px] text-purple-800 text-center flex items-center justify-center gap-1 border-b border-purple-100">
          <Shield className="w-3 h-3 text-purple-600" />
          <span>Encrypted Teacher-Parent Communication Channel</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/70">
          {/* Teacher Audio Voice Note sample */}
          <div className="flex items-start gap-2 max-w-[85%]">
            <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
              T
            </div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-purple-100 shadow-xs space-y-1.5">
              <div className="text-[10px] font-bold text-purple-800">Teacher Voice Note (0:24)</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs"
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="flex-1 space-y-1">
                  <div className="w-32 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className={`bg-purple-600 h-full ${isPlayingAudio ? 'w-2/3 animate-pulse' : 'w-1/4'}`}></div>
                  </div>
                  <div className="text-[9px] text-slate-400">Class 10-A Weekly Instructions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'student';
            return (
              <div
                key={msg.id}
                className={`flex items-end gap-1.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold shrink-0 mb-1">
                    T
                  </div>
                )}
                <div
                  className={`max-w-[78%] p-3 rounded-2xl text-xs space-y-1 shadow-xs ${
                    isUser
                      ? 'bg-purple-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 text-[9px] ${
                      isUser ? 'text-purple-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isUser && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick prompt pills */}
        <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px]">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setInputText(q)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full whitespace-nowrap"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Text Input Footer */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message to Class Teacher..."
            className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
