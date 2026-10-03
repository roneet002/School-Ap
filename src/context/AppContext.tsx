import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  Role,
  Language,
  HomeworkItem,
  CircularItem,
  FeeSummary,
  LeaveRequest,
  ChatMessage,
  NotificationItem,
  AttendanceRecord,
} from '../types';
import {
  primaryStudent,
  siblingStudent,
  mockFeeSummary,
  mockHomeworkList,
  mockCirculars,
  mockLeaveRequests,
  mockChatMessages,
  mockNotifications,
  mockRecentAttendanceRecords,
} from '../data/mockData';
import { translations } from '../i18n/translations';

interface AppContextType {
  // Student & Academic
  currentStudent: StudentProfile;
  setStudent: (student: StudentProfile) => void;
  academicYear: string;
  setAcademicYear: (year: string) => void;

  // Authentication & RBAC
  role: Role;
  setRole: (role: Role) => void;
  jwtToken: string;
  isLoggedIn: boolean;
  loginAs: (role: Role) => void;
  logout: () => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;

  // Navigation & Modals
  activeModal: string | null;
  openModal: (modalName: string) => void;
  closeModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Search & Voice
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isListening: boolean;
  toggleVoiceSearch: () => void;

  // Firebase Push Notifications (FCM)
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markAllNotificationsRead: () => void;
  triggerFcmNotification: (title: string, message: string, category?: NotificationItem['category']) => void;
  fcmBanner: { title: string; message: string } | null;
  closeFcmBanner: () => void;

  // Data States for user interaction
  homeworkList: HomeworkItem[];
  submitHomework: (id: string, fileName: string) => void;
  circulars: CircularItem[];
  acknowledgeCircular: (id: string) => void;
  feeSummary: FeeSummary;
  payFeeInstallment: (installmentId: string, paymentMethod: string) => void;
  leaveRequests: LeaveRequest[];
  applyLeave: (leave: Omit<LeaveRequest, 'id' | 'appliedOn' | 'status'>) => void;
  updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected') => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  attendanceRecords: AttendanceRecord[];
  addAttendanceRecord: (record: AttendanceRecord) => void;

  // Offline Sync & Backup
  isOffline: boolean;
  toggleOfflineMode: () => void;
  lastSyncedTime: string;
  exportDatabaseJson: () => void;

  // Viewport display toggle
  viewMode: 'mobile-frame' | 'full-responsive';
  setViewMode: (mode: 'mobile-frame' | 'full-responsive') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(primaryStudent);
  const [academicYear, setAcademicYear] = useState<string>('2026-27');
  const [role, setRole] = useState<Role>('student');
  const [jwtToken, setJwtToken] = useState<string>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.devraj.sharma.10a.mock_jwt');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>('en');

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [fcmBanner, setFcmBanner] = useState<{ title: string; message: string } | null>(null);

  const [homeworkList, setHomeworkList] = useState<HomeworkItem[]>(mockHomeworkList);
  const [circulars, setCirculars] = useState<CircularItem[]>(mockCirculars);
  const [feeSummary, setFeeSummary] = useState<FeeSummary>(mockFeeSummary);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockRecentAttendanceRecords);

  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now (Cloud sync)');
  const [viewMode, setViewMode] = useState<'mobile-frame' | 'full-responsive'>('mobile-frame');

  // Translation helper
  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  // Unread notifications count
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Push notification trigger
  const triggerFcmNotification = (title: string, message: string, category: NotificationItem['category'] = 'system') => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      category,
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setFcmBanner({ title, message });

    // Auto dismiss banner after 5s
    setTimeout(() => {
      setFcmBanner(null);
    }, 5000);
  };

  const closeFcmBanner = () => setFcmBanner(null);

  // Homework submit
  const submitHomework = (id: string, fileName: string) => {
    setHomeworkList((prev) =>
      prev.map((hw) =>
        hw.id === id
          ? {
              ...hw,
              status: 'submitted',
              submittedFile: fileName,
              submissionDate: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : hw
      )
    );
    triggerFcmNotification('Homework Submitted Successfully', `Your submission for assignment has been received.`, 'system');
  };

  // Acknowledge circular
  const acknowledgeCircular = (id: string) => {
    setCirculars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isRead: true, acknowledged: true } : c))
    );
  };

  // Pay Fee Installment
  const payFeeInstallment = (installmentId: string, paymentMethod: string) => {
    setFeeSummary((prev) => {
      const updatedInstallments = prev.installments.map((inst) => {
        if (inst.id === installmentId) {
          return {
            ...inst,
            status: 'Paid' as const,
            paidDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            receiptNo: `REC-2026-${Math.floor(100000 + Math.random() * 900000)}`,
            paymentMethod,
          };
        }
        return inst;
      });

      const newPaid = updatedInstallments.filter((i) => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
      const newDue = prev.totalFee - newPaid;

      return {
        ...prev,
        paidFee: newPaid,
        dueFee: newDue,
        installments: updatedInstallments,
      };
    });

    triggerFcmNotification(
      'Fee Payment Successful',
      `Payment receipt generated via ${paymentMethod}. Amount updated.`,
      'fee'
    );
  };

  // Apply Leave
  const applyLeave = (leave: Omit<LeaveRequest, 'id' | 'appliedOn' | 'status'>) => {
    const newLeave: LeaveRequest = {
      ...leave,
      id: `lv_${Date.now()}`,
      appliedOn: 'Today',
      status: 'Pending',
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);
    triggerFcmNotification('Leave Application Submitted', 'Sent to Class Teacher Mr. Arvind Saxena for approval.', 'attendance');
  };

  const updateLeaveStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setLeaveRequests((prev) =>
      prev.map((lv) => (lv.id === id ? { ...lv, status, teacherRemarks: `Reviewed by Teacher (${status})` } : lv))
    );
  };

  // Chat message send
  const sendChatMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: role === 'teacher' ? 'teacher' : 'student',
      senderName: role === 'teacher' ? 'Mrs. Sunita Verma' : currentStudent.name,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
    };
    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated quick response from Teacher or School Desk if student sends
    if (role === 'student') {
      setTimeout(() => {
        const replyMsg: ChatMessage = {
          id: `msg_reply_${Date.now()}`,
          sender: 'teacher',
          senderName: 'Mr. Arvind Saxena (Class Teacher)',
          text: 'Thank you for your update Devraj. I have noted this down.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered',
        };
        setChatMessages((prev) => [...prev, replyMsg]);
        triggerFcmNotification('New Message from Class Teacher', 'Mr. Arvind Saxena replied to your message.', 'system');
      }, 1500);
    }
  };

  // Add Attendance record
  const addAttendanceRecord = (record: AttendanceRecord) => {
    setAttendanceRecords((prev) => [record, ...prev]);
  };

  // Offline toggle
  const toggleOfflineMode = () => {
    setIsOffline((prev) => {
      const next = !prev;
      setLastSyncedTime(next ? 'Working Offline (Local Storage Cache)' : 'Cloud Synced via Firebase');
      return next;
    });
  };

  // Export JSON backup
  const exportDatabaseJson = () => {
    const backupData = {
      student: currentStudent,
      academicYear,
      fees: feeSummary,
      homework: homeworkList,
      circulars,
      leaves: leaveRequests,
      attendance: attendanceRecords,
      exportTimestamp: new Date().toISOString(),
      version: '1.0.0-PostgreSQL-Compatible',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Devraj_School_ERP_Backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    triggerFcmNotification('Database Backup Downloaded', 'School ERP state exported successfully.', 'system');
  };

  // Voice search toggle
  const toggleVoiceSearch = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate listening and picking up query
      setTimeout(() => {
        const demoQueries = ['Homework', 'Fee Payment', 'Exam Schedule', 'Attendance', 'Transport'];
        const randomQuery = demoQueries[Math.floor(Math.random() * demoQueries.length)];
        setSearchQuery(randomQuery);
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const loginAs = (newRole: Role) => {
    setRole(newRole);
    setIsLoggedIn(true);
    setJwtToken(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${newRole}_jwt_${Date.now()}`);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentStudent,
        setStudent: setCurrentStudent,
        academicYear,
        setAcademicYear,
        role,
        setRole,
        jwtToken,
        isLoggedIn,
        loginAs,
        logout,
        language,
        setLanguage,
        t,
        activeModal,
        openModal,
        closeModal,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        isListening,
        toggleVoiceSearch,
        notifications,
        unreadNotificationCount,
        markAllNotificationsRead,
        triggerFcmNotification,
        fcmBanner,
        closeFcmBanner,
        homeworkList,
        submitHomework,
        circulars,
        acknowledgeCircular,
        feeSummary,
        payFeeInstallment,
        leaveRequests,
        applyLeave,
        updateLeaveStatus,
        chatMessages,
        sendChatMessage,
        attendanceRecords,
        addAttendanceRecord,
        isOffline,
        toggleOfflineMode,
        lastSyncedTime,
        exportDatabaseJson,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
