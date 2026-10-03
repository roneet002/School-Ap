import React, { useState } from 'react';
import {
  X,
  Video,
  Play,
  Clock,
  BookCopy,
  Book,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  Cake,
  MessageSquare,
  Flame,
  FolderKanban,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  Check,
  Send,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  mockLiveClasses,
  mockTimeTable,
  mockDiaryEntries,
  mockSchoolEvents,
  mockTeachersList,
  mockBirthdays,
  mockSmsHistory,
} from '../../data/mockData';

// --- LIVE CLASS MODAL ---
export const LiveClassModal: React.FC = () => {
  const { closeModal } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-red-600 to-rose-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base leading-tight">Live Classes & Online Lectures</h3>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {mockLiveClasses.map((cls) => (
            <div key={cls.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-xs">{cls.subject}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    cls.status === 'Live Now'
                      ? 'bg-red-500 text-white animate-pulse'
                      : cls.status === 'Scheduled'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {cls.status}
                </span>
              </div>
              <h4 className="font-bold text-slate-800 text-[13px]">{cls.topic}</h4>
              <div className="text-slate-500 flex justify-between text-[11px]">
                <span>Teacher: <strong>{cls.teacher}</strong></span>
                <span>Time: <strong>{cls.time}</strong></span>
              </div>

              {cls.status === 'Live Now' ? (
                <button
                  onClick={() => alert(`Launching Classroom Meeting: ${cls.topic}`)}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Live Lecture Now</span>
                </button>
              ) : cls.status === 'Completed' ? (
                <button
                  onClick={() => alert(`Opening lecture recording archive for: ${cls.topic}`)}
                  className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Watch Class Recording</span>
                </button>
              ) : (
                <div className="p-2 bg-sky-50 text-sky-800 text-center rounded-xl font-medium text-[11px]">
                  Classroom link activates 10 minutes prior to session
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- TIMETABLE MODAL ---
export const TimeTableModal: React.FC = () => {
  const { closeModal } = useApp();
  const [selectedDay, setSelectedDay] = useState<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'>('mon');

  const days: { key: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'; label: string }[] = [
    { key: 'mon', label: 'Mon' },
    { key: 'tue', label: 'Tue' },
    { key: 'wed', label: 'Wed' },
    { key: 'thu', label: 'Thu' },
    { key: 'fri', label: 'Fri' },
    { key: 'sat', label: 'Sat' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base leading-tight">Weekly Class Timetable</h3>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Day Selector */}
        <div className="grid grid-cols-6 border-b border-slate-200 p-2 gap-1 bg-amber-50/50">
          {days.map((d) => (
            <button
              key={d.key}
              onClick={() => setSelectedDay(d.key)}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                selectedDay === d.key
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {mockTimeTable.map((slot, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                slot.period.includes('Recess')
                  ? 'bg-amber-100/60 border-amber-300 text-amber-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">{slot.period}</span>
                <span className="font-black text-sm">{slot[selectedDay]}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 bg-white px-2 py-1 rounded-lg border border-slate-200">
                {slot.period.includes('Recess') ? 'Lunch Break' : 'Room 10-A'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SYLLABUS MODAL ---
export const SyllabusModal: React.FC = () => {
  const { closeModal } = useApp();

  const syllabi = [
    { subject: 'Mathematics', term: 'Term 1 & 2', chapters: 'Real Numbers, Polynomials, Triangles, Trigonometry, Statistics', progress: 68 },
    { subject: 'Science (Physics/Chem/Bio)', term: 'Full Year', chapters: 'Light, Electricity, Acids Bases & Salts, Carbon, Life Processes', progress: 75 },
    { subject: 'English Communicative', term: 'Term 1', chapters: 'Poetry, Formal Writing, Comprehension, Novel reading', progress: 80 },
    { subject: 'Social Sciences', term: 'Full Year', chapters: 'Nationalism in India, Manufacturing, Federalism, Money & Credit', progress: 62 },
    { subject: 'Computer Applications', term: 'Term 1 & 2', chapters: 'Cyber Ethics, HTML5 Tables, CSS Layouts, Python Functions', progress: 85 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookCopy className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base leading-tight">Academic Syllabus & Curriculum</h3>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {syllabi.map((s, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{s.subject}</span>
                <span className="font-bold text-emerald-700">{s.progress}% Covered</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">{s.chapters}</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${s.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MY DIARY MODAL ---
export const MyDiaryModal: React.FC = () => {
  const { closeModal } = useApp();
  const [diaryList, setDiaryList] = useState(mockDiaryEntries);

  const toggleSign = (id: string) => {
    setDiaryList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, acknowledgedByParent: !d.acknowledgedByParent } : d))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-amber-700 to-amber-800 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base leading-tight">My Daily Diary & Notes</h3>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {diaryList.map((entry) => (
            <div key={entry.id} className="p-4 bg-amber-50/40 rounded-2xl border border-amber-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                  {entry.category}
                </span>
                <span className="text-[11px] text-slate-500">{entry.date}</span>
              </div>
              <h5 className="font-bold text-slate-800">{entry.subject}</h5>
              <p className="text-slate-700 leading-relaxed italic">"{entry.note}"</p>
              <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Teacher: <strong>{entry.teacherName}</strong></span>
                <button
                  onClick={() => toggleSign(entry.id)}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                    entry.acknowledgedByParent
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{entry.acknowledgedByParent ? 'Parent Signed ✓' : 'Sign by Parent'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- EVENTS MODAL ---
export const EventsModal: React.FC = () => {
  const { closeModal } = useApp();
  const [events, setEvents] = useState(mockSchoolEvents);

  const toggleRsvp = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRegistered: !e.isRegistered } : e))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-red-600 to-rose-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base leading-tight">School Events & Festivities</h3>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded uppercase">
                  {ev.category}
                </span>
                <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                  {ev.date}
                </span>
              </div>
              <h4 className="font-black text-slate-900 text-sm">{ev.title}</h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">{ev.description}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                <span>Time: <strong>{ev.time}</strong></span>
                <span>Venue: <strong>{ev.location}</strong></span>
              </div>

              <button
                onClick={() => toggleRsvp(ev.id)}
                className={`w-full py-2 rounded-xl font-bold text-xs transition-all ${
                  ev.isRegistered
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                }`}
              >
                {ev.isRegistered ? 'Registered / Participating ✓' : 'Register for Event'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- TEACHERS DIRECTORY MODAL ---
export const TeachersDirectoryModal: React.FC = () => {
  const { closeModal } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-base leading-tight">Faculty & Subject Teachers</h3>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {mockTeachersList.map((t) => (
            <div key={t.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-slate-900 text-xs">{t.name}</h5>
                <p className="text-[11px] text-blue-700 font-semibold">{t.subject}</p>
                <p className="text-[10px] text-slate-500">{t.qualification}</p>
                <div className="flex gap-2 mt-1.5">
                  <a
                    href={`tel:${t.phone}`}
                    className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-bold text-[10px] flex items-center gap-1"
                  >
                    <Phone className="w-2.5 h-2.5" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`mailto:${t.email}`}
                    className="px-2 py-0.5 bg-sky-50 text-sky-800 rounded font-bold text-[10px] flex items-center gap-1"
                  >
                    <Mail className="w-2.5 h-2.5" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- BIRTHDAYS MODAL ---
export const BirthdaysModal: React.FC = () => {
  const { closeModal } = useApp();
  const [greeted, setGreeted] = useState<Record<string, boolean>>({});

  const handleGreet = (name: string) => {
    setGreeted((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cake className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base leading-tight">Class Birthdays</h3>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {mockBirthdays.map((b, i) => (
            <div key={i} className="p-3 bg-pink-50/50 rounded-2xl border border-pink-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-full object-cover border border-pink-300" />
                <div>
                  <h5 className="font-bold text-slate-900">{b.name}</h5>
                  <p className="text-[11px] text-pink-700 font-semibold">{b.date}</p>
                </div>
              </div>
              <button
                onClick={() => handleGreet(b.name)}
                disabled={greeted[b.name]}
                className="px-2.5 py-1 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-200 text-white font-bold rounded-lg text-[10px]"
              >
                {greeted[b.name] ? 'Wished! 🎈' : 'Wish 🎉'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SMS HISTORY MODAL ---
export const SmsHistoryModal: React.FC = () => {
  const { closeModal } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-cyan-600 to-teal-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base leading-tight">Automated SMS Logs</h3>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {mockSmsHistory.map((sms) => (
            <div key={sms.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <div className="text-[10px] font-bold text-slate-400">{sms.date}</div>
              <p className="text-slate-800 leading-relaxed font-medium">{sms.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- PROJECTS & ACTIVITIES MODAL ---
export const ProjectActivityModal: React.FC<{ type: 'project' | 'activity' }> = ({ type }) => {
  const { closeModal } = useApp();

  const projects = [
    { title: 'Solar Powered Smart Irrigation Model', subject: 'Science Fair', deadline: '20 Oct 2026', status: 'In Progress (80%)' },
    { title: 'Vedic Mathematics Fast Calculation Charts', subject: 'Math Club', deadline: '25 Oct 2026', status: 'Submitted' },
  ];

  const activities = [
    { name: 'Under-16 Football Team Practice', schedule: 'Tue & Thu 03:00 PM', coach: 'Coach Balwinder Singh' },
    { name: 'School Robotics & Drone Club', schedule: 'Saturday 10:00 AM', coach: 'Mrs. Neha Kapoor' },
    { name: 'Inter-House English Debate Society', schedule: 'Wednesday 02:30 PM', coach: 'Mrs. Radhika Sengupta' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-stone-700 to-slate-800 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            {type === 'project' ? <FolderKanban className="w-5 h-5 text-white" /> : <Flame className="w-5 h-5 text-white" />}
            <h3 className="font-extrabold text-base leading-tight">
              {type === 'project' ? 'Exhibition Projects' : 'Co-Curricular Activities & Clubs'}
            </h3>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {type === 'project'
            ? projects.map((p, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-900">{p.title}</span>
                    <span className="text-emerald-700 font-bold">{p.status}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Subject: {p.subject} · Due: {p.deadline}</div>
                </div>
              ))
            : activities.map((a, i) => (
                <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <h5 className="font-bold text-slate-900">{a.name}</h5>
                  <div className="text-[11px] text-slate-500">Timing: <strong>{a.schedule}</strong></div>
                  <div className="text-[11px] text-slate-500">Coordinator: <strong>{a.coach}</strong></div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

// --- HELP & SUPPORT MODAL ---
export const HelpSupportModal: React.FC = () => {
  const { closeModal } = useApp();
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-amber-600 to-orange-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base leading-tight">School Helpdesk & Support</h3>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-2">
            <div className="font-bold text-amber-900">Direct Emergency Helplines</div>
            <div className="flex justify-between items-center text-[11px] text-slate-700">
              <span>Admin Office Desk:</span>
              <a href="tel:+911145678900" className="font-bold text-amber-800 underline">+91 11 4567 8900</a>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-700">
              <span>Transport Coordinator:</span>
              <a href="tel:+919811054321" className="font-bold text-amber-800 underline">+91 98110 54321</a>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-700">
              <span>Accounts & Fees:</span>
              <a href="mailto:accounts@devrajacademy.edu" className="font-bold text-amber-800 underline">accounts@devrajacademy.edu</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-slate-700 mb-2">Submit a Support Ticket / Inquiry</h4>
            {ticketSent ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 text-center rounded-2xl text-xs font-bold">
                Ticket #TKT-8492 registered! School admin desk will respond within 24 hours.
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Subject (e.g. Bus stop change, fee slip mismatch)..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
                <textarea
                  rows={3}
                  placeholder="Describe your query in detail..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200"
                />
                <button
                  onClick={() => setTicketSent(true)}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-xs"
                >
                  Submit Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
