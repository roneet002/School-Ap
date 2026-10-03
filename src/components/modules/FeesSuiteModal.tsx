import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Receipt,
  AlertCircle,
  CheckCircle2,
  Download,
  QrCode,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Printer,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FeesSuiteModalProps {
  initialTab?: 'summary' | 'payment' | 'paid' | 'due';
}

export const FeesSuiteModal: React.FC<FeesSuiteModalProps> = ({ initialTab = 'summary' }) => {
  const { closeModal, currentStudent, feeSummary, payFeeInstallment, academicYear } = useApp();
  const [activeTab, setActiveTab] = useState<'summary' | 'payment' | 'paid' | 'due'>(initialTab);

  // Stripe & payment form state
  const [selectedInstallmentId, setSelectedInstallmentId] = useState<string>('inst_03');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'upi'>('stripe');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [cardName, setCardName] = useState('Rakesh Sharma');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Selected receipt for preview
  const [viewingReceipt, setViewingReceipt] = useState<any | null>(null);

  const pendingInstallments = feeSummary.installments.filter((i) => i.status !== 'Paid');
  const paidInstallments = feeSummary.installments.filter((i) => i.status === 'Paid');

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      payFeeInstallment(selectedInstallmentId, paymentMethod === 'stripe' ? 'Stripe Card' : 'UPI Instant');
      setTimeout(() => {
        setPaymentSuccess(false);
        setActiveTab('paid');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">School Fees Portal</h3>
              <p className="text-[11px] text-emerald-100">Devraj Sharma · Class 10-A · Session {academicYear}</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Tabs matching the 4 tiles from screenshot */}
        <div className="grid grid-cols-4 border-b border-slate-200 text-center text-xs font-bold bg-emerald-50/50">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'summary' ? 'border-emerald-600 text-emerald-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Fee Summary
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'payment' ? 'border-emerald-600 text-emerald-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Fee Payment
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'paid' ? 'border-emerald-600 text-emerald-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Fee Paid
          </button>
          <button
            onClick={() => setActiveTab('due')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'due' ? 'border-emerald-600 text-emerald-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Fee Due
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: FEE SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Annual</div>
                  <div className="text-base font-black text-slate-800 mt-0.5">₹{feeSummary.totalFee.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="text-[10px] uppercase font-bold text-emerald-600">Total Paid</div>
                  <div className="text-base font-black text-emerald-700 mt-0.5">₹{feeSummary.paidFee.toLocaleString()}</div>
                </div>
                <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
                  <div className="text-[10px] uppercase font-bold text-rose-500">Remaining Due</div>
                  <div className="text-base font-black text-rose-600 mt-0.5">₹{feeSummary.dueFee.toLocaleString()}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600">Fee Payment Progress</span>
                  <span className="text-emerald-700">
                    {Math.round((feeSummary.paidFee / feeSummary.totalFee) * 100)}% Cleared
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(feeSummary.paidFee / feeSummary.totalFee) * 100}%` }}
                  />
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Installments Schedule</h4>
                {feeSummary.installments.map((inst) => (
                  <div
                    key={inst.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 shadow-xs"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800">{inst.term}</div>
                      <div className="text-[11px] text-slate-500">Due Date: {inst.dueDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-slate-900">₹{inst.amount.toLocaleString()}</div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          inst.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {inst.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {feeSummary.dueFee > 0 && (
                <button
                  onClick={() => setActiveTab('payment')}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Next Installment (₹21,000)</span>
                </button>
              )}
            </div>
          )}

          {/* TAB 2: FEE PAYMENT (STRIPE & UPI GATEWAY) */}
          {activeTab === 'payment' && (
            <div className="space-y-4">
              {paymentSuccess ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-3xl animate-in zoom-in-95">
                  <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-600 mb-2" />
                  <h3 className="text-base font-extrabold text-emerald-900">Payment Processed Successfully!</h3>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your school tuition fee installment has been credited. Official receipt generated.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePaySubmit} className="space-y-4">
                  {/* Select installment */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Select Quarter to Pay</label>
                    <select
                      value={selectedInstallmentId}
                      onChange={(e) => setSelectedInstallmentId(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      {pendingInstallments.length > 0 ? (
                        pendingInstallments.map((inst) => (
                          <option key={inst.id} value={inst.id}>
                            {inst.term} - ₹{inst.amount.toLocaleString()} (Due: {inst.dueDate})
                          </option>
                        ))
                      ) : (
                        <option value="">No pending fees! All quarters paid.</option>
                      )}
                    </select>
                  </div>

                  {/* Payment method selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Select Payment Gateway</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('stripe')}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                          paymentMethod === 'stripe'
                            ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                        <div>
                          <div className="text-xs font-bold text-slate-800">Stripe Card</div>
                          <div className="text-[10px] text-slate-500">Credit / Debit Card</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                          paymentMethod === 'upi'
                            ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <QrCode className="w-5 h-5 text-teal-600" />
                        <div>
                          <div className="text-xs font-bold text-slate-800">UPI / QR Code</div>
                          <div className="text-[10px] text-slate-500">GPay, PhonePe, Paytm</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Stripe Card Inputs */}
                  {paymentMethod === 'stripe' && (
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">Card Information</span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>256-bit TLS Encrypted</span>
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Card Number"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
                        />
                        <input
                          type="password"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="CVC"
                          maxLength={4}
                          className="text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
                        />
                      </div>

                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Cardholder Name"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  )}

                  {/* UPI QR View */}
                  {paymentMethod === 'upi' && (
                    <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 text-center space-y-3">
                      <div className="w-32 h-32 bg-white mx-auto rounded-xl p-2 border border-teal-200 flex items-center justify-center shadow-xs">
                        <QrCode className="w-28 h-28 text-slate-800" />
                      </div>
                      <div className="text-xs font-bold text-teal-900">
                        Scan QR Code using PhonePe / Google Pay / BHIM
                      </div>
                      <div className="text-[11px] text-teal-700 font-mono">
                        UPI ID: devrajacademy.fees@okhdfcbank
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing || pendingInstallments.length === 0}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span>Connecting to Payment Gateway...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pay ₹21,000 Securely</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: FEE PAID DETAILS (RECEIPTS) */}
          {activeTab === 'paid' && (
            <div className="space-y-3">
              {viewingReceipt ? (
                /* Full Printable Receipt Viewer */
                <div className="p-5 bg-amber-50/40 rounded-2xl border border-amber-200 text-slate-800 space-y-3 animate-in fade-in">
                  <div className="flex justify-between items-start border-b border-amber-200/80 pb-3">
                    <div>
                      <h4 className="text-sm font-black text-emerald-800">DEVRAJ ACADEMY HIGH SCHOOL</h4>
                      <p className="text-[10px] text-slate-500">Affiliation Code: CBSE-2026/9941</p>
                      <p className="text-[10px] text-slate-500">Sector 14, Ring Road, New Delhi</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        OFFICIAL RECEIPT
                      </span>
                      <p className="text-[11px] font-mono font-bold mt-1">{viewingReceipt.receiptNo}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 text-xs gap-1 py-1">
                    <div><strong>Student:</strong> {currentStudent.name}</div>
                    <div><strong>Class:</strong> {currentStudent.classSection}</div>
                    <div><strong>Roll No:</strong> {currentStudent.rollNo}</div>
                    <div><strong>Date Paid:</strong> {viewingReceipt.paidDate}</div>
                    <div><strong>Payment Method:</strong> {viewingReceipt.paymentMethod}</div>
                    <div><strong>Amount Paid:</strong> ₹{viewingReceipt.amount.toLocaleString()}</div>
                  </div>

                  <div className="border-t border-amber-200 pt-3 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setViewingReceipt(null)}
                      className="text-slate-600 hover:underline"
                    >
                      ← Back to list
                    </button>
                    <button
                      onClick={() => alert(`Printing receipt ${viewingReceipt.receiptNo}`)}
                      className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / Download PDF</span>
                    </button>
                  </div>
                </div>
              ) : (
                paidInstallments.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-3.5 bg-slate-50 hover:bg-slate-100/70 rounded-2xl border border-slate-200 flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <div className="font-bold text-slate-800">{inst.term}</div>
                      <div className="text-[11px] text-slate-500">Paid on: {inst.paidDate}</div>
                      <div className="text-[10px] text-emerald-700 font-mono mt-0.5">{inst.receiptNo}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-black text-slate-900">₹{inst.amount.toLocaleString()}</div>
                      <button
                        onClick={() => setViewingReceipt(inst)}
                        className="px-2.5 py-1 bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs"
                      >
                        <Receipt className="w-3 h-3" />
                        <span>View Receipt</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: FEE DUE DETAILS */}
          {activeTab === 'due' && (
            <div className="space-y-3">
              {pendingInstallments.length === 0 ? (
                <div className="text-center py-10 text-emerald-700">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500 mb-2" />
                  <p className="font-bold text-sm">No Pending Fees</p>
                  <p className="text-xs text-slate-500">All fees for session {academicYear} are cleared.</p>
                </div>
              ) : (
                pendingInstallments.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs">{inst.term}</span>
                      <span className="text-xs font-black text-rose-700">₹{inst.amount.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-rose-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Due Date: <strong>{inst.dueDate}</strong></span>
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Tuition fees, lab fees, and library subscription charge included.
                    </p>

                    <button
                      onClick={() => {
                        setSelectedInstallmentId(inst.id);
                        setActiveTab('payment');
                      }}
                      className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                    >
                      Pay ₹{inst.amount.toLocaleString()} Now
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
