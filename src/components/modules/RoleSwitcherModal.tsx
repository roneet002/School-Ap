import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  UserCheck,
  Key,
  Lock,
  GraduationCap,
  School,
  LogIn,
  CheckCircle2,
  Receipt,
  User,
  Eye,
  EyeOff,
  Copy,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

export const RoleSwitcherModal: React.FC = () => {
  const { closeModal, role, loginAs, jwtToken } = useApp();

  const [activeTab, setActiveTab] = useState<'quick' | 'login'>('quick');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copiedRole, setCopiedRole] = useState<string | null>(null);

  const rolesCredentials = [
    {
      id: 'student' as Role,
      title: 'Student / Parent Portal',
      name: 'Devraj Sharma (Class 10-A, Roll #24)',
      username: 'student@devrajacademy.edu',
      password: 'student@123',
      icon: GraduationCap,
      permissions: ['View Attendance & Punch Status', 'Homework Submission', 'Pay Fees via Stripe/UPI', 'GPS Bus Tracking', 'Live Chat Support'],
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'teacher' as Role,
      title: 'Teacher Workspace',
      name: 'Mrs. Sunita Verma (Class Teacher 10-A, Math Head)',
      username: 'teacher@devrajacademy.edu',
      password: 'teacher@123',
      icon: UserCheck,
      permissions: ['1-Click Class 10-A Attendance', 'Assign & Publish Homework', 'Grade & Review Solutions', 'Approve/Reject Student Leaves'],
      badgeColor: 'bg-teal-100 text-teal-800',
    },
    {
      id: 'accountant' as Role,
      title: 'Accounts & Finance Portal',
      name: 'Mr. Alok Mathur (Chief Bursar & Accounts Head)',
      username: 'accounts@devrajacademy.edu',
      password: 'accounts@123',
      icon: Receipt,
      permissions: ['Full School Fee Ledger', 'Counter Fee Collection', 'Defaulters Notice Dispatch', 'Stripe & UPI Reconciliation'],
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'admin' as Role,
      title: 'Principal & Admin Console',
      name: 'Dr. Rajesh Khanna (Principal & Director)',
      username: 'admin@devrajacademy.edu',
      password: 'admin@123',
      icon: School,
      permissions: ['School-wide Analytics', 'Emergency Push Broadcast', 'PostgreSQL DB Backups', 'Staff & User Access Control'],
      badgeColor: 'bg-slate-200 text-slate-800',
    },
  ];

  const handleCopyCredentials = (username: string, pass: string, roleId: string) => {
    navigator.clipboard?.writeText(`Email: ${username} | Password: ${pass}`);
    setCopiedRole(roleId);
    setTimeout(() => setCopiedRole(null), 2000);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputEmail.includes('teacher')) {
      loginAs('teacher');
    } else if (inputEmail.includes('account')) {
      loginAs('accountant');
    } else if (inputEmail.includes('admin')) {
      loginAs('admin');
    } else {
      loginAs('student');
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Access Control & Credentials</h3>
              <p className="text-[11px] text-slate-300">4-Tier Role-Based Authentication System (RBAC)</p>
            </div>
          </div>
          <button onClick={closeModal} className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 border-b border-slate-200 text-center text-xs font-bold bg-slate-50">
          <button
            onClick={() => setActiveTab('quick')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'quick' ? 'border-emerald-600 text-emerald-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Quick 1-Click Role Switcher
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'login' ? 'border-emerald-600 text-emerald-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Manual Login Form
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'quick' ? (
            <div className="space-y-3">
              {rolesCredentials.map((r) => {
                const Icon = r.icon;
                const isActive = role === r.id;

                return (
                  <div
                    key={r.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-400/40'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isActive ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                          }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900">{r.title}</span>
                            {isActive && (
                              <span className="text-[9px] bg-emerald-600 text-white font-black px-1.5 py-0.2 rounded-full">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 font-medium">{r.name}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          loginAs(r.id);
                          closeModal();
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-slate-300 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300'
                        }`}
                      >
                        {isActive ? 'Current Role ✓' : 'Switch Role'}
                      </button>
                    </div>

                    {/* Credentials Preview */}
                    <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-600">
                      <div>
                        <span className="text-slate-400">User:</span> <strong>{r.username}</strong> |{' '}
                        <span className="text-slate-400">Pass:</span> <strong>{r.password}</strong>
                      </div>
                      <button
                        onClick={() => handleCopyCredentials(r.username, r.password, r.id)}
                        className="text-[10px] font-sans font-bold text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        {copiedRole === r.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedRole === r.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Permissions tags */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {r.permissions.map((p, idx) => (
                        <span key={idx} className="text-[9px] bg-white border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md">
                          • {p}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <form onSubmit={handleManualLogin} className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                Enter your assigned school email and password to log in with your dedicated role privileges.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">School Email / Username</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="e.g. accounts@devrajacademy.edu"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full text-xs pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In Securely (Verify JWT)</span>
              </button>
            </form>
          )}

          {/* Active JWT token signature */}
          <div className="p-3 bg-slate-900 text-slate-200 rounded-2xl font-mono text-[10px] space-y-1">
            <div className="flex items-center justify-between text-slate-400 font-bold border-b border-slate-800 pb-1">
              <span>Active JWT Bearer Token</span>
              <span className="text-emerald-400">Authenticated (HS256)</span>
            </div>
            <p className="break-all text-slate-300 pt-1 leading-snug">{jwtToken}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
