import React, { useState } from 'react';
import { Search, Filter, Printer, Edit, Trash2, Copy, FileText, Truck, Download, Upload, Eye } from 'lucide-react';
import { formatIndianCurrency } from '../utils/numberToWords';

export default function HistoryList({
  bills,
  elrs,
  companies,
  onEditBill,
  onEditElr,
  onDeleteBill,
  onDeleteElr,
  onDuplicateBill,
  onDuplicateElr,
  onPrintDocument,
  onDownloadDirect,
  onExportAllData,
  onImportData
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'bills', 'elrs'

  const filteredBills = bills.filter(b => {
    if (activeFilter === 'elrs') return false;
    const query = searchTerm.toLowerCase();
    return (
      (b.billNo && b.billNo.toLowerCase().includes(query)) ||
      (b.clientName && b.clientName.toLowerCase().includes(query)) ||
      (b.items && b.items.some(i => i.vehicleNo && i.vehicleNo.toLowerCase().includes(query)))
    );
  });

  const filteredElrs = elrs.filter(e => {
    if (activeFilter === 'bills') return false;
    const query = searchTerm.toLowerCase();
    return (
      (e.lrNo && e.lrNo.toLowerCase().includes(query)) ||
      (e.lorryNo && e.lorryNo.toLowerCase().includes(query)) ||
      (e.consignor?.name && e.consignor.name.toLowerCase().includes(query)) ||
      (e.consignee?.name && e.consignee.name.toLowerCase().includes(query)) ||
      (e.fromLocation && e.fromLocation.toLowerCase().includes(query)) ||
      (e.toLocation && e.toLocation.toLowerCase().includes(query))
    );
  });

  const getCompanyName = (companyId) => {
    const comp = companies.find(c => c.id === companyId);
    return comp ? comp.name : 'Mahi Transport';
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        onImportData(data);
        alert('Data imported successfully!');
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="bg-slate-800/90 backdrop-blur border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        {/* Search Box */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Bill No, LR No, Party Name, Vehicle No, Route..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            All Records ({bills.length + elrs.length})
          </button>
          <button
            onClick={() => setActiveFilter('bills')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeFilter === 'bills' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Invoices ({bills.length})
          </button>
          <button
            onClick={() => setActiveFilter('elrs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeFilter === 'elrs' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            E-LRs ({elrs.length})
          </button>
        </div>

        {/* Backup & Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onExportAllData}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
            title="Download JSON Backup of all records"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup</span>
          </button>

          <label className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Restore</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Invoices */}
        {filteredBills.map(bill => {
          const total = bill.items.reduce((s, i) => s + (Number(i.amount) || 0), 0);
          const balance = total - (Number(bill.lessAdvance) || 0);
          return (
            <div key={bill.id} className="bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/50 rounded-2xl p-4 shadow-lg transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                  <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-[11px] font-black uppercase flex items-center space-x-1">
                    <FileText className="w-3 h-3" />
                    <span>INVOICE</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">{bill.date}</span>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-slate-400 font-mono">BILL NO: <span className="text-white font-bold text-sm">{bill.billNo}</span></div>
                  <div className="text-sm font-bold text-white uppercase mt-0.5 truncate">{bill.clientName || 'Unnamed Client'}</div>
                  <div className="text-[11px] text-slate-400 mt-1 truncate">{getCompanyName(bill.companyId)}</div>
                </div>

                <div className="mt-3 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-xs flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Trips:</span>
                    <span className="font-bold text-slate-200">{bill.items?.length || 0} Entries</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Net Balance:</span>
                    <span className="font-black text-emerald-400 text-sm">₹{formatIndianCurrency(balance)}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => onDownloadDirect && onDownloadDirect('bill', bill)}
                    className="px-2.5 py-1.5 bg-emerald-700/60 hover:bg-emerald-600 text-white rounded-lg font-medium flex items-center space-x-1 transition"
                    title="Direct PDF Download"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>

                  <button
                    onClick={() => onPrintDocument('bill', bill)}
                    className="px-2.5 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-slate-200 rounded-lg font-medium flex items-center space-x-1 transition"
                  >
                    <Printer className="w-3.5 h-3.5 text-blue-400" />
                    <span>Print</span>
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onDuplicateBill(bill)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
                    title="Duplicate Bill"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onEditBill(bill)}
                    className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center space-x-1 transition"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => onDeleteBill(bill.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition"
                    title="Delete Bill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* E-LRs */}
        {filteredElrs.map(elr => {
          return (
            <div key={elr.id} className="bg-slate-800/80 border border-slate-700/80 hover:border-rose-500/50 rounded-2xl p-4 shadow-lg transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                  <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg text-[11px] font-black uppercase flex items-center space-x-1">
                    <Truck className="w-3 h-3" />
                    <span>E-LR / BILTY</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">{elr.date}</span>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-slate-400 font-mono">LR NO: <span className="text-white font-bold text-sm">{elr.lrNo}</span></div>
                  <div className="text-sm font-bold text-white uppercase mt-0.5 truncate">{elr.consignee?.name || 'Unnamed Consignee'}</div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                    <span className="truncate">{elr.fromLocation} ➔ {elr.toLocation}</span>
                    <span className="font-mono font-bold text-slate-300">{elr.lorryNo}</span>
                  </div>
                </div>

                <div className="mt-3 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 text-xs flex justify-between items-center">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Consignor:</span>
                    <span className="font-semibold text-slate-300 truncate max-w-[120px] block">{elr.consignor?.name || '-'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Freight Total:</span>
                    <span className="font-black text-rose-300 text-xs">{elr.charges?.total || 'To Be Billed'}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => onDownloadDirect && onDownloadDirect('elr', elr)}
                    className="px-2.5 py-1.5 bg-emerald-700/60 hover:bg-emerald-600 text-white rounded-lg font-medium flex items-center space-x-1 transition"
                    title="Direct PDF Download"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>

                  <button
                    onClick={() => onPrintDocument('elr', elr)}
                    className="px-2.5 py-1.5 bg-slate-700/80 hover:bg-slate-700 text-slate-200 rounded-lg font-medium flex items-center space-x-1 transition"
                  >
                    <Printer className="w-3.5 h-3.5 text-rose-400" />
                    <span>Print</span>
                  </button>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onDuplicateElr(elr)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
                    title="Duplicate E-LR"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onEditElr(elr)}
                    className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-medium flex items-center space-x-1 transition"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => onDeleteElr(elr.id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition"
                    title="Delete E-LR"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBills.length === 0 && filteredElrs.length === 0 && (
        <div className="text-center py-16 bg-slate-800/40 rounded-2xl border border-slate-700/60">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">No records found</h3>
          <p className="text-xs text-slate-500 mt-1">Try searching with a different term or generate a new Bill / E-LR</p>
        </div>
      )}
    </div>
  );
}
