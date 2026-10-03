import React from 'react';
import { useApp } from '../../context/AppContext';
import { AttendanceModal } from './AttendanceModal';
import { HomeworkModal } from './HomeworkModal';
import { CircularModal } from './CircularModal';
import { FeesSuiteModal } from './FeesSuiteModal';
import { LibrarySuiteModal } from './LibrarySuiteModal';
import { ExamSuiteModal } from './ExamSuiteModal';
import { TransportModal } from './TransportModal';
import { LeavesModal } from './LeavesModal';
import { MessagesChatModal } from './MessagesChatModal';
import { ProfileModal } from './ProfileModal';
import { PushNotificationCenterModal } from './PushNotificationCenterModal';
import { RoleSwitcherModal } from './RoleSwitcherModal';
import { ProjectDownloadModal } from './ProjectDownloadModal';
import {
  LiveClassModal,
  TimeTableModal,
  SyllabusModal,
  MyDiaryModal,
  EventsModal,
  TeachersDirectoryModal,
  BirthdaysModal,
  SmsHistoryModal,
  ProjectActivityModal,
  HelpSupportModal,
} from './AcademicModules';

export const ModalManager: React.FC = () => {
  const { activeModal } = useApp();

  if (!activeModal) return null;

  switch (activeModal) {
    case 'attendance':
      return <AttendanceModal />;
    case 'homework':
      return <HomeworkModal />;
    case 'circular':
      return <CircularModal />;

    // Fee suite
    case 'fee_summary':
      return <FeesSuiteModal initialTab="summary" />;
    case 'fee_payment':
      return <FeesSuiteModal initialTab="payment" />;
    case 'fee_paid_details':
      return <FeesSuiteModal initialTab="paid" />;
    case 'fee_due_details':
      return <FeesSuiteModal initialTab="due" />;

    // Library suite
    case 'book_search':
      return <LibrarySuiteModal initialTab="search" />;
    case 'books_history':
      return <LibrarySuiteModal initialTab="history" />;
    case 'book_request':
      return <LibrarySuiteModal initialTab="request" />;
    case 'new_books':
      return <LibrarySuiteModal initialTab="new" />;

    // Exam suite
    case 'exam_schedule':
      return <ExamSuiteModal initialTab="schedule" />;
    case 'exam_report':
      return <ExamSuiteModal initialTab="report" />;

    case 'transport':
      return <TransportModal />;
    case 'leaves':
      return <LeavesModal />;
    case 'messages':
      return <MessagesChatModal />;
    case 'my_profile':
      return <ProfileModal />;
    case 'live_class':
      return <LiveClassModal />;
    case 'time_table':
      return <TimeTableModal />;
    case 'syllabus':
      return <SyllabusModal />;
    case 'my_diary':
      return <MyDiaryModal />;
    case 'events':
    case 'news_event':
      return <EventsModal />;
    case 'my_teachers':
      return <TeachersDirectoryModal />;
    case 'birthdays':
      return <BirthdaysModal />;
    case 'sms_history':
      return <SmsHistoryModal />;
    case 'project':
      return <ProjectActivityModal type="project" />;
    case 'activity':
      return <ProjectActivityModal type="activity" />;
    case 'my_notification':
      return <PushNotificationCenterModal />;
    case 'help':
      return <HelpSupportModal />;
    case 'role_switcher':
      return <RoleSwitcherModal />;
    case 'download_project':
      return <ProjectDownloadModal />;

    default:
      return null;
  }
};
