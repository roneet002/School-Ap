import React from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleIcon } from '../common/ModuleIcon';

interface ModuleItem {
  id: string;
  labelKey: string;
  defaultLabel: string;
  badge?: number;
  modalTarget: string;
}

export const ModulesGrid: React.FC = () => {
  const { openModal, t, searchQuery, unreadNotificationCount } = useApp();

  // The 30 exact modules from the screenshot
  const modules: ModuleItem[] = [
    // Row 1
    { id: 'attendance', labelKey: 'attendance', defaultLabel: 'Attendance', badge: 1, modalTarget: 'attendance' },
    { id: 'circular', labelKey: 'circular', defaultLabel: 'Circular', badge: 3, modalTarget: 'circular' },
    { id: 'homework', labelKey: 'homework', defaultLabel: 'Homework', badge: 14, modalTarget: 'homework' },
    { id: 'live_class', labelKey: 'live_class', defaultLabel: 'Live Class', modalTarget: 'live_class' },
    { id: 'fee_summary', labelKey: 'fee_summary', defaultLabel: 'Fee Summary', modalTarget: 'fee_summary' },

    // Row 2
    { id: 'fee_payment', labelKey: 'fee_payment', defaultLabel: 'Fee Payment', modalTarget: 'fee_payment' },
    { id: 'fee_paid_details', labelKey: 'fee_paid_details', defaultLabel: 'Fee Paid Details', modalTarget: 'fee_paid_details' },
    { id: 'fee_due_details', labelKey: 'fee_due_details', defaultLabel: 'Fee Due Details', modalTarget: 'fee_due_details' },
    { id: 'book_search', labelKey: 'book_search', defaultLabel: 'Book Search', modalTarget: 'book_search' },
    { id: 'books_history', labelKey: 'books_history', defaultLabel: 'Books History', modalTarget: 'books_history' },

    // Row 3
    { id: 'book_request', labelKey: 'book_request', defaultLabel: 'Book Request', modalTarget: 'book_request' },
    { id: 'new_books', labelKey: 'new_books', defaultLabel: 'New Books', modalTarget: 'new_books' },
    { id: 'exam_schedule', labelKey: 'exam_schedule', defaultLabel: 'Exam Schedule', modalTarget: 'exam_schedule' },
    { id: 'exam_report', labelKey: 'exam_report', defaultLabel: 'Exam Report', modalTarget: 'exam_report' },
    { id: 'transport', labelKey: 'transport', defaultLabel: 'Transport', modalTarget: 'transport' },

    // Row 4
    { id: 'leaves', labelKey: 'leaves', defaultLabel: 'Leaves', modalTarget: 'leaves' },
    { id: 'birthdays', labelKey: 'birthdays', defaultLabel: 'Birthdays', modalTarget: 'birthdays' },
    { id: 'messages', labelKey: 'messages', defaultLabel: 'Messages', modalTarget: 'messages' },
    { id: 'my_profile', labelKey: 'my_profile', defaultLabel: 'My Profile', modalTarget: 'my_profile' },
    { id: 'sms_history', labelKey: 'sms_history', defaultLabel: 'SMS History', modalTarget: 'sms_history' },

    // Row 5
    { id: 'my_diary', labelKey: 'my_diary', defaultLabel: 'My Diary', modalTarget: 'my_diary' },
    { id: 'events', labelKey: 'events', defaultLabel: 'Events', modalTarget: 'events' },
    { id: 'news_event', labelKey: 'news_event', defaultLabel: 'News Event', modalTarget: 'news_event' },
    { id: 'syllabus', labelKey: 'syllabus', defaultLabel: 'Syllabus', modalTarget: 'syllabus' },
    { id: 'time_table', labelKey: 'time_table', defaultLabel: 'Time Table', modalTarget: 'time_table' },

    // Row 6
    { id: 'my_teachers', labelKey: 'my_teachers', defaultLabel: 'My Teachers', modalTarget: 'my_teachers' },
    { id: 'project', labelKey: 'project', defaultLabel: 'Project', modalTarget: 'project' },
    { id: 'activity', labelKey: 'activity', defaultLabel: 'Activity', modalTarget: 'activity' },
    { id: 'my_notification', labelKey: 'my_notification', defaultLabel: 'My Notification', badge: unreadNotificationCount, modalTarget: 'my_notification' },
    { id: 'help', labelKey: 'help', defaultLabel: 'Help', modalTarget: 'help' },
  ];

  // Search query filtering
  const filteredModules = modules.filter((m) => {
    if (!searchQuery.trim()) return true;
    const label = t(m.labelKey);
    return (
      label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.defaultLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="pt-10 px-3 pb-8">
      {filteredModules.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-sm font-semibold text-slate-600">No modules match "{searchQuery}"</p>
          <p className="text-xs mt-1">Try searching for Attendance, Fees, Exam, or Books</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-x-1.5 gap-y-4 sm:gap-x-3 sm:gap-y-5">
          {filteredModules.map((item) => {
            const translatedLabel = t(item.labelKey);

            return (
              <button
                key={item.id}
                onClick={() => openModal(item.modalTarget)}
                className="flex flex-col items-center group text-center focus:outline-none cursor-pointer"
              >
                <ModuleIcon id={item.id} badge={item.badge} />
                <span className="text-[11px] font-medium text-slate-700 mt-2 line-clamp-2 leading-tight px-0.5 tracking-tight group-hover:text-emerald-800 group-hover:font-semibold transition-colors">
                  {translatedLabel}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
