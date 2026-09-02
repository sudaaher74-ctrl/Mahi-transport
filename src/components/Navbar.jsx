import React, { useState } from 'react';
import { LayoutDashboard, FileText, Truck, History, Users, Settings, Building2, Download, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react';

export default function Navbar({
  activeTab,
  onSelectTab,
  companies,
  activeCompanyId,
  onSelectCompany,
  onDirectDownload,
  isDownloading
}) {
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bill', label: 'Bill / Invoice', icon: FileText },
    { id: 'elr', label: 'E-LR (Bilty)', icon: Truck },
    { id: 'history', label: 'Records History', icon: History },
    { id: 'parties', label: 'Parties Directory', icon: Users },
    { id: 'settings', label: 'Company Settings', icon: Settings },
  ];

  const handleMainDownloadClick = () => {
    if (activeTab === 'elr') {
      onDirectDownload('elr');
    } else {
      onDirectDownload('bill');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
              TP
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white flex items-center space-x-1.5">
                <span>Transport</span>
                <span className="text-blue-500">Suite</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5 font-medium tracking-wide">
                Invoice & E-LR Software
              </span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Section: Direct Download Button & Company Selector */}
          <div className="flex items-center space-x-2.5">
            {/* DIRECT DOWNLOAD PDF BUTTON (Navbar Quick Download) */}
            <div className="relative">
              <div className="inline-flex rounded-xl shadow-sm">
                <button
                  type="button"
                  onClick={handleMainDownloadClick}
                  disabled={isDownloading}
                  className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-l-xl flex items-center space-x-1.5 transition shadow-lg shadow-emerald-600/20 disabled:opacity-60 active:scale-95"
                  title="Direct 1-Click PDF Download without saving prompts"
                >
                  {isDownloading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {isDownloading 
                      ? 'Downloading...' 
                      : activeTab === 'elr' 
                        ? 'Download E-LR PDF' 
                        : 'Download Bill PDF'
                    }
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                  disabled={isDownloading}
                  className="px-2 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-r-xl border-l border-emerald-500/40 flex items-center transition"
                  title="More download options"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Download Options Dropdown */}
              {downloadDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 text-xs text-slate-200 space-y-0.5"
                  onMouseLeave={() => setDownloadDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Direct PDF Downloads
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setDownloadDropdownOpen(false);
                      onDirectDownload('bill');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-800 hover:text-white flex items-center space-x-2 transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download Invoice / Bill PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDownloadDropdownOpen(false);
                      onDirectDownload('elr');
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-800 hover:text-white flex items-center space-x-2 transition"
                  >
                    <Truck className="w-3.5 h-3.5 text-rose-400" />
                    <span>Download E-LR (Bilty) PDF</span>
                  </button>
                </div>
              )}
            </div>

            {/* Active Company Selector */}
            <div className="hidden sm:flex items-center space-x-2 bg-slate-800/90 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs">
              <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <select
                value={activeCompanyId}
                onChange={(e) => onSelectCompany(e.target.value)}
                className="bg-transparent text-slate-200 font-bold text-xs focus:outline-none cursor-pointer max-w-[140px] truncate"
              >
                {companies.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white font-normal">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 overflow-x-auto space-x-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold ${
                  isActive ? 'text-blue-400 font-bold' : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
