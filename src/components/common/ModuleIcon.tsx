import React from 'react';
import {
  Calendar,
  FileText,
  BookOpen,
  Video,
  Receipt,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Search,
  Library,
  BookMarked,
  Sparkles,
  CalendarDays,
  FileCheck,
  Bus,
  Clock,
  Cake,
  Mail,
  User,
  MessageSquare,
  Book,
  CalendarCheck,
  Newspaper,
  BookCopy,
  Clock3,
  GraduationCap,
  FolderKanban,
  Flame,
  Bell,
  HelpCircle,
} from 'lucide-react';

interface ModuleIconProps {
  id: string;
  badge?: number;
}

export const ModuleIcon: React.FC<ModuleIconProps> = ({ id, badge }) => {
  const getIconConfig = () => {
    switch (id) {
      // Academics & Routine
      case 'attendance':
        return {
          icon: Calendar,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'circular':
        return {
          icon: FileText,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'homework':
        return {
          icon: BookOpen,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'live_class':
        return {
          icon: Video,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };

      // Fees & Finance
      case 'fee_summary':
        return {
          icon: Receipt,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-800',
        };
      case 'fee_payment':
        return {
          icon: CreditCard,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-800',
        };
      case 'fee_paid_details':
        return {
          icon: CheckCircle2,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'fee_due_details':
        return {
          icon: AlertCircle,
          tintBg: 'bg-slate-100/80',
          iconColor: 'text-slate-700',
        };

      // Library Suite
      case 'book_search':
        return {
          icon: Search,
          tintBg: 'bg-slate-100/80',
          iconColor: 'text-emerald-800',
        };
      case 'books_history':
        return {
          icon: Library,
          tintBg: 'bg-slate-100/80',
          iconColor: 'text-emerald-800',
        };
      case 'book_request':
        return {
          icon: BookMarked,
          tintBg: 'bg-slate-100/80',
          iconColor: 'text-emerald-800',
        };
      case 'new_books':
        return {
          icon: Sparkles,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };

      // Examination
      case 'exam_schedule':
        return {
          icon: CalendarDays,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'exam_report':
        return {
          icon: FileCheck,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };

      // Operations & Transport
      case 'transport':
        return {
          icon: Bus,
          tintBg: 'bg-slate-100/80',
          iconColor: 'text-slate-700',
        };
      case 'leaves':
        return {
          icon: Clock,
          tintBg: 'bg-slate-100/80',
          iconColor: 'text-slate-700',
        };
      case 'birthdays':
        return {
          icon: Cake,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'messages':
        return {
          icon: Mail,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'my_profile':
        return {
          icon: GraduationCap,
          tintBg: 'bg-emerald-100/70',
          iconColor: 'text-emerald-800',
        };
      case 'sms_history':
        return {
          icon: MessageSquare,
          tintBg: 'bg-slate-100/80',
          iconColor: 'text-slate-700',
        };

      // Daily Journal & Events
      case 'my_diary':
        return {
          icon: Book,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'events':
        return {
          icon: CalendarCheck,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'news_event':
        return {
          icon: Newspaper,
          tintBg: 'bg-slate-100/80',
          iconColor: 'text-slate-700',
        };
      case 'syllabus':
        return {
          icon: BookCopy,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'time_table':
        return {
          icon: Clock3,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };

      // Community & Guidance
      case 'my_teachers':
        return {
          icon: User,
          tintBg: 'bg-slate-100/80',
          iconColor: 'text-slate-800',
        };
      case 'project':
        return {
          icon: FolderKanban,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'activity':
        return {
          icon: Flame,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'my_notification':
        return {
          icon: Bell,
          tintBg: 'bg-emerald-50',
          iconColor: 'text-emerald-700',
        };
      case 'help':
        return {
          icon: HelpCircle,
          tintBg: 'bg-slate-100/80',
          iconColor: 'text-slate-700',
        };

      default:
        return {
          icon: Sparkles,
          tintBg: 'bg-slate-100',
          iconColor: 'text-slate-700',
        };
    }
  };

  const config = getIconConfig();
  const IconComponent = config.icon;

  return (
    <div className="relative">
      {/* EXACTLY 1 SINGLE OUTLINE on the card, NO inner border */}
      <div className="w-[58px] h-[58px] bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-md group-hover:border-emerald-500 group-active:scale-95">
        {/* Borderless inner soft background */}
        <div
          className={`w-11 h-11 rounded-xl ${config.tintBg} flex items-center justify-center transition-colors group-hover:bg-emerald-100/70`}
        >
          <IconComponent className={`w-5 h-5 ${config.iconColor} stroke-[2] transition-transform group-hover:scale-110`} />
        </div>
      </div>

      {/* Red Badge Counter (if badge > 0) */}
      {typeof badge === 'number' && badge > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-rose-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs border-2 border-white">
          {badge}
        </span>
      )}
    </div>
  );
};
