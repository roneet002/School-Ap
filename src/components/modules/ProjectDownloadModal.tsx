import React, { useState } from 'react';
import {
  X,
  Download,
  FolderArchive,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  FileCode2,
  FolderTree,
  Laptop,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import JSZip from 'jszip';
import { useApp } from '../../context/AppContext';

export const ProjectDownloadModal: React.FC = () => {
  const { closeModal } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Automatically bundle all source files in the project using Vite's glob import
  const rawFiles = import.meta.glob(
    [
      '/src/**/*.{ts,tsx,css,json}',
      '/index.html',
      '/package.json',
      '/tsconfig.json',
      '/vite.config.ts',
      '/metadata.json',
      '/.env.example',
    ],
    { query: '?raw', eager: true }
  );

  const handleDownloadZip = async () => {
    try {
      setIsGenerating(true);
      const zip = new JSZip();

      // Add a README file with setup instructions
      const readmeContent = `# Devraj School Portal & ERP
Complete Cross-Platform School Management System (React 19, TypeScript, Vite, Tailwind CSS).

## 🚀 Desktop Setup Instructions

1. **Extract this ZIP file** anywhere on your PC Desktop:
   \`C:\\Users\\<YourName>\\Desktop\\devraj-school-portal\`

2. **Open your Terminal / Command Prompt / VS Code** inside this extracted folder.

3. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

4. **Start Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open in Browser**:
   Open \`http://localhost:3000\` or \`http://localhost:5173\` in your Chrome / Edge browser.

---

## 👥 Pre-Configured Test Credentials:
- **Student**: student@devrajacademy.edu / student@123 (Devraj Sharma, 10-A)
- **Teacher**: teacher@devrajacademy.edu / teacher@123 (Mrs. Sunita Verma)
- **Accounts**: accounts@devrajacademy.edu / accounts@123 (Mr. Alok Mathur)
- **Admin**: admin@devrajacademy.edu / admin@123 (Dr. Rajesh Khanna)
`;
      zip.file('README.md', readmeContent);

      // Add all project source files
      for (const [filePath, fileModule] of Object.entries(rawFiles)) {
        const cleanPath = filePath.replace(/^\//, '');
        const content = typeof fileModule === 'string' ? fileModule : (fileModule as any)?.default || '';
        if (content) {
          zip.file(cleanPath, content);
        }
      }

      // Generate the ZIP
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = downloadUrl;
      downloadAnchor.download = 'devraj-school-erp-complete-project.zip';
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      URL.revokeObjectURL(downloadUrl);

      setIsGenerating(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('ZIP generation error:', err);
      setIsGenerating(false);
      alert('Unable to pack zip in current session. You can also use the AI Studio top Export button.');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <FolderArchive className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Download Code & Project Structure</h3>
              <p className="text-[11px] text-emerald-100">Save complete codebase to your PC Desktop</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs text-slate-700">
          {/* Main 1-Click ZIP Download Button */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-black text-sm text-emerald-950">
                  1-Click Complete Project (.ZIP) Download
                </h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Includes all components, types, translations, icons, configurations & README.
                </p>
              </div>
              <span className="text-[10px] font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full">
                Ready to Run
              </span>
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={isGenerating}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <span>Packing Project Files into ZIP...</span>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Downloaded! Check your browser downloads folder</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Entire Project as ZIP</span>
                </>
              )}
            </button>
          </div>

          {/* AI Studio Platform Option Explanation */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Laptop className="w-4 h-4 text-slate-700" />
              <span>Alternative: AI Studio Platform Export</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Aap Google AI Studio screen ke bilkul <strong>Top Right Corner</strong> me diye gaye{' '}
              <strong>"Export"</strong> ya <strong>"Download" / "Fork"</strong> icon par click karke bhi directly pura
              codebase download ya GitHub repo me push kar sakte hain.
            </p>
          </div>

          {/* Quick Terminal Setup Instructions */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-600" />
              <span>PC Desktop Setup Steps</span>
            </h5>

            <div className="bg-slate-900 text-slate-200 rounded-2xl p-3.5 font-mono text-[11px] space-y-2.5">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1">
                <span>Step 1: Install Dependencies</span>
                <button
                  onClick={() => copyToClipboard('npm install', 'step1')}
                  className="hover:text-white flex items-center gap-1 text-[10px]"
                >
                  {copiedCmd === 'step1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCmd === 'step1' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-emerald-400">npm install</div>

              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 pt-1">
                <span>Step 2: Start Local Dev Server</span>
                <button
                  onClick={() => copyToClipboard('npm run dev', 'step2')}
                  className="hover:text-white flex items-center gap-1 text-[10px]"
                >
                  {copiedCmd === 'step2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCmd === 'step2' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="text-emerald-400">npm run dev</div>
            </div>
          </div>

          {/* Folder Hierarchy Preview */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <h5 className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5 text-emerald-700" />
              <span>Project Directory Structure</span>
            </h5>
            <div className="font-mono text-[10px] text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
              📁 devraj-school-portal/<br />
              ├── 📁 src/<br />
              │&nbsp;&nbsp;&nbsp;├── 📁 components/<br />
              │&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── 📁 common/ (Header, BottomNav, ModuleIcon, etc.)<br />
              │&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── 📁 home/ (ModulesGrid.tsx)<br />
              │&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── 📁 modules/ (Attendance, Fees, Exams, Dashboards, etc.)<br />
              │&nbsp;&nbsp;&nbsp;├── 📁 context/ (AppContext.tsx)<br />
              │&nbsp;&nbsp;&nbsp;├── 📁 data/ (mockData.ts)<br />
              │&nbsp;&nbsp;&nbsp;├── 📁 i18n/ (translations.ts)<br />
              │&nbsp;&nbsp;&nbsp;└── 📁 types/ (index.ts)<br />
              ├── 📄 index.html<br />
              ├── 📄 package.json<br />
              ├── 📄 vite.config.ts<br />
              └── 📄 README.md
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
