import React, { useState } from 'react';
import { X, BookOpen, Search, Bookmark, History, PlusCircle, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockBooks } from '../../data/mockData';
import { BookItem } from '../../types';

interface LibrarySuiteModalProps {
  initialTab?: 'search' | 'history' | 'request' | 'new';
}

export const LibrarySuiteModal: React.FC<LibrarySuiteModalProps> = ({ initialTab = 'search' }) => {
  const { closeModal } = useApp();
  const [activeTab, setActiveTab] = useState<'search' | 'history' | 'request' | 'new'>(initialTab);
  const [searchFilter, setSearchFilter] = useState('');
  const [requestedTitle, setRequestedTitle] = useState('');
  const [requestedAuthor, setRequestedAuthor] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const filteredBooks = mockBooks.filter(
    (b) =>
      b.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.author.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const issuedBooks = mockBooks.filter((b) => b.isIssued);

  const handleBookRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedTitle.trim()) return;
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setRequestedTitle('');
      setRequestedAuthor('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 to-indigo-800 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">School Digital Library</h3>
              <p className="text-[11px] text-purple-100">Over 15,000+ Titles, Reference Books & Journals</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Tabs */}
        <div className="grid grid-cols-4 border-b border-slate-200 text-center text-xs font-bold bg-purple-50/50">
          <button
            onClick={() => setActiveTab('search')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'search' ? 'border-purple-600 text-purple-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Book Search
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'history' ? 'border-purple-600 text-purple-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab('request')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'request' ? 'border-purple-600 text-purple-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            Book Request
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`py-2.5 border-b-2 transition-all ${
              activeTab === 'new' ? 'border-purple-600 text-purple-800 bg-white' : 'border-transparent text-slate-500'
            }`}
          >
            New Books
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: SEARCH */}
          {activeTab === 'search' && (
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search by Title, Author (e.g. Verma, Physics, Python)..."
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1 hover:bg-slate-100/60"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900">{book.title}</h4>
                      <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                        {book.category}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px]">Author: {book.author}</p>
                    <div className="flex justify-between items-center pt-1 text-[11px] text-slate-600">
                      <span>Location: <strong>{book.shelfLocation}</strong></span>
                      <span className={book.copiesAvailable > 0 ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                        {book.copiesAvailable > 0 ? `${book.copiesAvailable} Available` : 'All Issued'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Currently Issued Books ({issuedBooks.length})
              </h4>
              {issuedBooks.map((b) => (
                <div key={b.id} className="p-3.5 bg-purple-50/50 rounded-2xl border border-purple-200 text-xs space-y-2">
                  <div className="font-bold text-purple-950">{b.title}</div>
                  <p className="text-slate-600 text-[11px]">Author: {b.author}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                    <span className="flex items-center gap-1 text-amber-700 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Due Date: {b.dueDate}</span>
                    </span>
                    <button
                      onClick={() => alert(`Renewal request sent for "${b.title}". Extended by 7 days!`)}
                      className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] shadow-xs"
                    >
                      Renew Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: REQUEST */}
          {activeTab === 'request' && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900 leading-relaxed">
                If a required textbook, reference guide, or novel is not currently in our catalog, place a procurement request below.
              </div>

              {requestSubmitted ? (
                <div className="p-6 text-center bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <div className="text-xs font-bold text-emerald-900">Book Request Received</div>
                  <div className="text-[11px] text-emerald-700 mt-1">Our school librarian will review procurement.</div>
                </div>
              ) : (
                <form onSubmit={handleBookRequest} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Book Title *</label>
                    <input
                      type="text"
                      required
                      value={requestedTitle}
                      onChange={(e) => setRequestedTitle(e.target.value)}
                      placeholder="e.g. Higher Algebra by Hall & Knight"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Author Name (Optional)</label>
                    <input
                      type="text"
                      value={requestedAuthor}
                      onChange={(e) => setRequestedAuthor(e.target.value)}
                      placeholder="e.g. H.S. Hall and S.R. Knight"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Submit Book Request to Librarian
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: NEW BOOKS */}
          {activeTab === 'new' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Fresh Arrivals in School Library
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { title: 'AI & Machine Learning for Teens', author: 'Dr. Vivek Garg', tag: 'Computer Sc' },
                  { title: 'The Story of India’s Freedom Struggle', author: 'Bipin Chandra', tag: 'History' },
                  { title: 'Olympiad Mathematics Challenger', author: 'MTG Editorial', tag: 'Math' },
                  { title: 'Cosmos & Beyond', author: 'Carl Sagan', tag: 'Astronomy' },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                    <span className="text-[9px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
                      {item.tag}
                    </span>
                    <h5 className="font-bold text-slate-900 mt-1 leading-snug">{item.title}</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
