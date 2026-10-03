export type Role = 'student' | 'teacher' | 'accountant' | 'admin';

export type Language = 'en' | 'hi';

export interface StudentProfile {
  id: string;
  name: string;
  admissionNo: string;
  rollNo: number;
  classSection: string;
  academicYear: string;
  dob: string;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  address: string;
  photoUrl: string;
  busRouteNo: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Holiday';
  remark?: string;
  inTime?: string;
  outTime?: string;
}

export interface SubjectAttendance {
  subject: string;
  totalClasses: number;
  attended: number;
  percentage: number;
}

export interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  teacherName: string;
  status: 'pending' | 'submitted' | 'evaluated';
  submittedFile?: string;
  submissionDate?: string;
  grade?: string;
  feedback?: string;
}

export interface CircularItem {
  id: string;
  title: string;
  category: 'Academic' | 'Events' | 'Urgent' | 'Sports';
  date: string;
  summary: string;
  details: string;
  isRead: boolean;
  acknowledged?: boolean;
  fileAttachment?: string;
}

export interface FeeSummary {
  totalFee: number;
  paidFee: number;
  dueFee: number;
  dueDate: string;
  installments: FeeInstallment[];
}

export interface FeeInstallment {
  id: string;
  term: string;
  dueDate: string;
  amount: number;
  lateFee: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  receiptNo?: string;
  paymentMethod?: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  copiesAvailable: number;
  shelfLocation: string;
  isIssued?: boolean;
  dueDate?: string;
  fineAmount?: number;
}

export interface ExamScheduleItem {
  id: string;
  subject: string;
  examName: string;
  date: string;
  timing: string;
  roomNo: string;
  totalMarks: number;
  syllabus: string;
}

export interface ExamReportSubject {
  subject: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  status: 'Pass' | 'Fail';
}

export interface ExamReport {
  examName: string;
  term: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  gpa: string;
  rank: number;
  teacherRemarks: string;
  subjects: ExamReportSubject[];
}

export interface LiveClassItem {
  id: string;
  subject: string;
  topic: string;
  teacher: string;
  time: string;
  duration: string;
  status: 'Live Now' | 'Scheduled' | 'Completed';
  meetingLink: string;
}

export interface TransportDetails {
  routeNumber: string;
  routeName: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  conductorName: string;
  conductorPhone: string;
  pickupTime: string;
  dropTime: string;
  pickupStop: string;
  currentStop: string;
  currentSpeed: string;
  status: 'On the way' | 'Delayed' | 'Arrived at School' | 'Trip Completed';
  stops: { name: string; time: string; passed: boolean }[];
}

export interface LeaveRequest {
  id: string;
  fromDate: string;
  toDate: string;
  reasonType: 'Medical' | 'Family Function' | 'Emergency' | 'Other';
  reasonText: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
  teacherRemarks?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'teacher' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface DiaryEntry {
  id: string;
  date: string;
  subject: string;
  note: string;
  teacherName: string;
  category: 'Academic' | 'Behavior' | 'Achievement' | 'Notice';
  acknowledgedByParent: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'Sports' | 'Cultural' | 'Academic' | 'Holiday';
  isRegistered?: boolean;
}

export interface TeacherInfo {
  id: string;
  name: string;
  subject: string;
  classes: string;
  email: string;
  phone: string;
  cabin: string;
  qualification: string;
  avatar: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'fee' | 'attendance' | 'exam' | 'circular' | 'system';
  isRead: boolean;
}
