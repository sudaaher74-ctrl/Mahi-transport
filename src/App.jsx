import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import BillForm from './components/BillForm';
import BillFormat from './components/BillFormat';
import ElrForm from './components/ElrForm';
import ElrFormat from './components/ElrFormat';
import HistoryList from './components/HistoryList';
import PartyMaster from './components/PartyMaster';
import CompanySettings from './components/CompanySettings';
import {
  getCompanies, saveCompanies,
  getBills, saveBills,
  getElrs, saveElrs,
  getParties, saveParties,
  getActiveCompanyId, setActiveCompanyId
} from './utils/storage';
import { directDownloadPdf } from './utils/downloadPdf';
import { Eye, Printer, X, Sparkles, ZoomIn, ZoomOut, Check, ArrowLeft, Download, Loader2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companies, setCompanies] = useState(getCompanies);
  const [activeCompanyId, setActiveCompId] = useState(getActiveCompanyId);
  const [parties, setParties] = useState(getParties);
  const [bills, setBills] = useState(getBills);
  const [elrs, setElrs] = useState(getElrs);

  // Form states
  const [currentBill, setCurrentBill] = useState(bills[0] || null);
  const [currentElr, setCurrentElr] = useState(elrs[0] || null);

  // Print & PDF Download State
  const [printDoc, setPrintDoc] = useState(null); // { type: 'bill'|'elr', data: object }
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.85);

  // Persist handlers
  const handleSaveBill = (updatedBill) => {
    const exists = bills.some(b => b.id === updatedBill.id);
    let newBills;
    if (exists) {
      newBills = bills.map(b => b.id === updatedBill.id ? updatedBill : b);
    } else {
      newBills = [updatedBill, ...bills];
    }
    setBills(newBills);
    saveBills(newBills);
    setCurrentBill(updatedBill);
  };

  const handleSaveElr = (updatedElr) => {
    const exists = elrs.some(e => e.id === updatedElr.id);
    let newElrs;
    if (exists) {
      newElrs = elrs.map(e => e.id === updatedElr.id ? updatedElr : e);
    } else {
      newElrs = [updatedElr, ...elrs];
    }
    setElrs(newElrs);
    saveElrs(newElrs);
    setCurrentElr(updatedElr);
  };

  const handleSaveParties = (newParties) => {
    setParties(newParties);
    saveParties(newParties);
  };

  const handleSaveCompanies = (newCompanies) => {
    setCompanies(newCompanies);
    saveCompanies(newCompanies);
  };

  const handleSelectCompany = (id) => {
    setActiveCompId(id);
    setActiveCompanyId(id);
  };

  // Actions
  const handleNewBill = () => {
    const newBill = {
      id: `bill-${Date.now()}`,
      billNo: `${String(Math.floor(Math.random() * 900 + 100)).padStart(3, '0')}/2025-26`,
      date: new Date().toISOString().split('T')[0],
      companyId: activeCompanyId,
      clientName: '',
      accountNo: '',
      items: [
        {
          id: '1',
          date: new Date().toLocaleDateString('en-GB'),
          vehicleNo: 'MH46BB7915',
          particulars: 'VADAPE TO NHAWA SHEWA',
          size: '1*20FT CBT',
          advance: '',
          charges: '',
          amount: 4500
        }
      ],
      lessAdvance: 0,
      createdAt: new Date().toISOString()
    };
    setCurrentBill(newBill);
    setActiveTab('bill');
  };

  const handleNewElr = () => {
    const newElr = {
      id: `elr-${Date.now()}`,
      lrNo: String(Math.floor(Math.random() * 800 + 100)),
      date: new Date().toISOString().split('T')[0],
      companyId: activeCompanyId,
      cautionText: "The Consignment will not be detaineddelivered re-routed or rebooked without consignee Bank's written permission",
      deliveryAddress: '',
      insurance: {
        hasInsurance: false,
        company: '',
        policyNoOrDate: '',
        amount: '',
        risk: ''
      },
      consignor: {
        name: '',
        address: '',
        gstNo: ''
      },
      consignee: {
        name: '',
        address: '',
        gstNo: ''
      },
      ewayBillNo: '',
      lorryNo: 'MH04KU1405',
      fromLocation: 'BHIWANDI',
      toLocation: 'AMAZON',
      articles: [
        {
          id: '1',
          noOfArticles: '0',
          methodOfPacking: 'PKG',
          description: 'PICKUP\n\nInvoice Date',
          chargedWeight: '0',
          actualWeight: '0'
        }
      ],
      value: '',
      invNo: '',
      invValue: '',
      charges: {
        rate: '',
        freight: '',
        surcharges: 'To Be',
        hamali: 'Billed At',
        stCharges: 'Mumbai',
        riskCharge: '',
        total: ''
      },
      gstPayableBy: 'CONSIGNOR',
      termsNotice: 'NOT RESPONSIBLE FOR LEAKAGE & BREAKAGES IN TRANSIT',
      specialNotice: "The Consignment Covered by this set of Special Lorry Receipt From shall be store at the destination under the control of the Transport Operator and shall be delivered to or the of the Consignee Banks whose name is mentioned in the Lorry Receipt. It will under no circumstances be delivered to any one withoutthe written authority from the Consignee Banks of its order enclosed on the Consignee Copy or on a separate Letter of Authority",
      createdAt: new Date().toISOString()
    };
    setCurrentElr(newElr);
    setActiveTab('elr');
  };

  const handleEditBill = (bill) => {
    setCurrentBill(bill);
    setActiveTab('bill');
  };

  const handleEditElr = (elr) => {
    setCurrentElr(elr);
    setActiveTab('elr');
  };

  const handleDeleteBill = (id) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      const updated = bills.filter(b => b.id !== id);
      setBills(updated);
      saveBills(updated);
      if (currentBill?.id === id) {
        setCurrentBill(updated[0] || null);
      }
    }
  };

  const handleDeleteElr = (id) => {
    if (confirm('Are you sure you want to delete this E-LR?')) {
      const updated = elrs.filter(e => e.id !== id);
      setElrs(updated);
      saveElrs(updated);
      if (currentElr?.id === id) {
        setCurrentElr(updated[0] || null);
      }
    }
  };

  const handleDuplicateBill = (bill) => {
    const dup = {
      ...bill,
      id: `bill-${Date.now()}`,
      billNo: `${String(Math.floor(Math.random() * 900 + 100)).padStart(3, '0')}/2025-26`,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    const newBills = [dup, ...bills];
    setBills(newBills);
    saveBills(newBills);
    setCurrentBill(dup);
    setActiveTab('bill');
  };

  const handleDuplicateElr = (elr) => {
    const dup = {
      ...elr,
      id: `elr-${Date.now()}`,
      lrNo: String(Math.floor(Math.random() * 800 + 100)),
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    const newElrs = [dup, ...elrs];
    setElrs(newElrs);
    saveElrs(newElrs);
    setCurrentElr(dup);
    setActiveTab('elr');
  };

  // Trigger Print
  const handlePrintDocument = (type, data) => {
    setPrintDoc({ type, data });
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Direct 1-Click PDF Download without saving prompts
  const handleDirectDownload = async (type = 'bill', specificData = null) => {
    setIsDownloading(true);
    try {
      if (type === 'bill') {
        const targetBill = specificData || currentBill;
        if (targetBill && activeTab !== 'bill') {
          setCurrentBill(targetBill);
          await new Promise(r => setTimeout(r, 60));
        }
        const cleanNo = (targetBill?.billNo || '001').replace(/[^a-zA-Z0-9_-]/g, '_');
        await directDownloadPdf('printable-bill-document', `Bill_${cleanNo}.pdf`);
      } else {
        const targetElr = specificData || currentElr;
        if (targetElr && activeTab !== 'elr') {
          setCurrentElr(targetElr);
          await new Promise(r => setTimeout(r, 60));
        }
        const cleanNo = (targetElr?.lrNo || '001').replace(/[^a-zA-Z0-9_-]/g, '_');
        await directDownloadPdf('printable-elr-document', `ELR_${cleanNo}.pdf`);
      }
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Export / Import Backup
  const handleExportAllData = () => {
    const data = {
      companies,
      parties,
      bills,
      elrs,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transport_data_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (data) => {
    if (data.companies) {
      setCompanies(data.companies);
      saveCompanies(data.companies);
    }
    if (data.parties) {
      setParties(data.parties);
      saveParties(data.parties);
    }
    if (data.bills) {
      setBills(data.bills);
      saveBills(data.bills);
    }
    if (data.elrs) {
      setElrs(data.elrs);
      saveElrs(data.elrs);
    }
  };

  const currentActiveCompany = companies.find(c => c.id === activeCompanyId) || companies[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation Bar with Direct Download Button */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        companies={companies}
        activeCompanyId={activeCompanyId}
        onSelectCompany={handleSelectCompany}
        onDirectDownload={handleDirectDownload}
        isDownloading={isDownloading}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 no-print">
        {activeTab === 'dashboard' && (
          <Dashboard
            bills={bills}
            elrs={elrs}
            parties={parties}
            companies={companies}
            onNavigateTab={setActiveTab}
            onNewBill={handleNewBill}
            onNewElr={handleNewElr}
            onPrintDocument={handlePrintDocument}
            onEditBill={handleEditBill}
            onEditElr={handleEditElr}
          />
        )}

        {/* BILL / INVOICE GENERATOR VIEW (Split-Screen Form + Live Preview) */}
        {activeTab === 'bill' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Form Input Editor Left */}
              <div className="xl:col-span-6">
                <BillForm
                  currentBill={currentBill}
                  onSave={handleSaveBill}
                  onPrint={() => handlePrintDocument('bill', currentBill)}
                  onDownloadPdf={() => handleDirectDownload('bill', currentBill)}
                  companies={companies}
                  parties={parties}
                  activeCompanyId={activeCompanyId}
                  onSelectCompany={handleSelectCompany}
                />
              </div>

              {/* Live Preview Paper Right */}
              <div className="xl:col-span-6 sticky top-20 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-slate-200">Live 1:1 Print Preview</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPreviewScale(s => Math.max(0.6, s - 0.1))}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-[11px] text-slate-400">{Math.round(previewScale * 100)}%</span>
                    <button
                      onClick={() => setPreviewScale(s => Math.min(1.2, s + 0.1))}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDirectDownload('bill', currentBill)}
                      disabled={isDownloading}
                      className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1 shadow-sm disabled:opacity-60"
                      title="Direct PDF Download"
                    >
                      {isDownloading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
                    </button>

                    <button
                      onClick={() => handlePrintDocument('bill', currentBill)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-auto max-h-[calc(100vh-180px)] p-2 flex justify-center bg-slate-950/70 rounded-xl border border-slate-800/80">
                  <div
                    style={{
                      transform: `scale(${previewScale})`,
                      transformOrigin: 'top center',
                      marginBottom: `${(1 - previewScale) * -200}px`
                    }}
                    className="preview-paper"
                  >
                    <BillFormat
                      id="printable-bill-document"
                      bill={currentBill}
                      company={companies.find(c => c.id === currentBill?.companyId) || currentActiveCompany}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* E-LR / BILTY GENERATOR VIEW (Split-Screen Form + Live Preview) */}
        {activeTab === 'elr' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              {/* Form Input Editor Left */}
              <div className="xl:col-span-6">
                <ElrForm
                  currentElr={currentElr}
                  onSave={handleSaveElr}
                  onPrint={() => handlePrintDocument('elr', currentElr)}
                  onDownloadPdf={() => handleDirectDownload('elr', currentElr)}
                  companies={companies}
                  parties={parties}
                  activeCompanyId={activeCompanyId}
                  onSelectCompany={handleSelectCompany}
                />
              </div>

              {/* Live Preview Paper Right */}
              <div className="xl:col-span-6 sticky top-20 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                    <span className="font-bold text-slate-200">Live 1:1 E-LR Preview</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPreviewScale(s => Math.max(0.6, s - 0.1))}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-[11px] text-slate-400">{Math.round(previewScale * 100)}%</span>
                    <button
                      onClick={() => setPreviewScale(s => Math.min(1.2, s + 0.1))}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDirectDownload('elr', currentElr)}
                      disabled={isDownloading}
                      className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1 shadow-sm disabled:opacity-60"
                      title="Direct PDF Download"
                    >
                      {isDownloading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
                    </button>

                    <button
                      onClick={() => handlePrintDocument('elr', currentElr)}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-auto max-h-[calc(100vh-180px)] p-2 flex justify-center bg-slate-950/70 rounded-xl border border-slate-800/80">
                  <div
                    style={{
                      transform: `scale(${previewScale})`,
                      transformOrigin: 'top center',
                      marginBottom: `${(1 - previewScale) * -200}px`
                    }}
                    className="preview-paper"
                  >
                    <ElrFormat
                      id="printable-elr-document"
                      elr={currentElr}
                      company={companies.find(c => c.id === currentElr?.companyId) || currentActiveCompany}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RECORDS & ARCHIVE TAB */}
        {activeTab === 'history' && (
          <HistoryList
            bills={bills}
            elrs={elrs}
            companies={companies}
            onEditBill={handleEditBill}
            onEditElr={handleEditElr}
            onDeleteBill={handleDeleteBill}
            onDeleteElr={handleDeleteElr}
            onDuplicateBill={handleDuplicateBill}
            onDuplicateElr={handleDuplicateElr}
            onPrintDocument={handlePrintDocument}
            onDownloadDirect={handleDirectDownload}
            onExportAllData={handleExportAllData}
            onImportData={handleImportData}
          />
        )}

        {/* PARTY MASTER TAB */}
        {activeTab === 'parties' && (
          <PartyMaster
            parties={parties}
            onSaveParties={handleSaveParties}
          />
        )}

        {/* COMPANY SETTINGS TAB */}
        {activeTab === 'settings' && (
          <CompanySettings
            companies={companies}
            onSaveCompanies={handleSaveCompanies}
            activeCompanyId={activeCompanyId}
            onSetActiveCompany={handleSelectCompany}
          />
        )}
      </main>

      {/* Hidden container for printing */}
      <div id="print-root" className="hidden print-only">
        {printDoc?.type === 'bill' && (
          <BillFormat
            bill={printDoc.data}
            company={companies.find(c => c.id === printDoc.data?.companyId) || currentActiveCompany}
          />
        )}
        {printDoc?.type === 'elr' && (
          <ElrFormat
            elr={printDoc.data}
            company={companies.find(c => c.id === printDoc.data?.companyId) || currentActiveCompany}
          />
        )}
      </div>

      {/* Hidden offscreen container for direct PDF downloads when on other tabs */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none opacity-0" aria-hidden="true">
        {activeTab !== 'bill' && currentBill && (
          <BillFormat
            id="printable-bill-document"
            bill={currentBill}
            company={companies.find(c => c.id === currentBill?.companyId) || currentActiveCompany}
          />
        )}
        {activeTab !== 'elr' && currentElr && (
          <ElrFormat
            id="printable-elr-document"
            elr={currentElr}
            company={companies.find(c => c.id === currentElr?.companyId) || currentActiveCompany}
          />
        )}
      </div>
    </div>
  );
}
