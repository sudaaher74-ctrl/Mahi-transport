import React from 'react';
import { FileText, Truck, Users, TrendingUp, PlusCircle, ArrowUpRight, Printer, Eye, Building2 } from 'lucide-react';
import { formatIndianCurrency } from '../utils/numberToWords';

export default function Dashboard({
  bills,
  elrs,
  parties,
  companies,
  onNavigateTab,
  onNewBill,
  onNewElr,
  onPrintDocument,
  onEditBill,
  onEditElr
}) {
  // Stats
  const totalBilled = bills.reduce((acc, b) => {
    const sub = b.items?.reduce((s, i) => s + (Number(i.amount) || 0), 0) || 0;
    return acc + sub;
  }, 0);

  const totalAdvance = bills.reduce((acc, b) => acc + (Number(b.lessAdvance) || 0), 0);
  const totalBalance = totalBilled - totalAdvance;

  const recentBills = [...bills].slice(0, 5);
  const recentElrs = [...elrs].slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>MAHI TRANSPORT Official Software</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Fast, Authentic Bill & E-LR Generator
          </h1>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            Generate 100% compliant physical format Invoices and E-LR (Lorry Receipts / Bilty) with live UPI QR code, automatic words calculation, party auto-complete, and pixel-perfect 1-page PDF export.
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={onNewBill}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-blue-600/30 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Create New Invoice / Bill</span>
            </button>

            <button
              onClick={onNewElr}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-rose-600/30 transition active:scale-95"
            >
              <Truck className="w-4 h-4" />
              <span>+ Create New E-LR (Lorry Receipt)</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Invoices */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Invoices</span>
            <span className="text-2xl font-black text-white mt-1 block">{bills.length}</span>
            <span className="text-[11px] text-blue-400 font-medium">Generated & Saved</span>
          </div>
          <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Total E-LRs */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total E-LRs (Bilty)</span>
            <span className="text-2xl font-black text-white mt-1 block">{elrs.length}</span>
            <span className="text-[11px] text-rose-400 font-medium">Consignments Logged</span>
          </div>
          <div className="p-3 bg-rose-600/20 border border-rose-500/30 rounded-2xl text-rose-400">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        {/* Total Billed Amount */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Billed</span>
            <span className="text-2xl font-black text-white mt-1 block">₹{formatIndianCurrency(totalBilled)}</span>
            <span className="text-[11px] text-amber-400 font-medium">Gross Freight Value</span>
          </div>
          <div className="p-3 bg-amber-600/20 border border-amber-500/30 rounded-2xl text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Net Balance Receivable */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Net Balance</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">₹{formatIndianCurrency(totalBalance)}</span>
            <span className="text-[11px] text-emerald-400 font-medium">After Advance Deductions</span>
          </div>
          <div className="p-3 bg-emerald-600/20 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Dual Recent Activity Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices Column */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm text-white">Recent Invoices / Bills</h3>
            </div>
            <button
              onClick={() => onNavigateTab('history')}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {recentBills.map(bill => {
              const total = bill.items.reduce((s, i) => s + (Number(i.amount) || 0), 0);
              const balance = total - (Number(bill.lessAdvance) || 0);
              return (
                <div
                  key={bill.id}
                  className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between transition"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-xs text-white">{bill.billNo}</span>
                      <span className="text-[10px] text-slate-400">• {bill.date}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200 uppercase mt-0.5 truncate max-w-[200px]">
                      {bill.clientName || 'Cash / Party'}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-400 block">₹{formatIndianCurrency(balance)}</span>
                      <span className="text-[10px] text-slate-400">{bill.items?.length} items</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onPrintDocument('bill', bill)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition"
                        title="Print Bill"
                      >
                        <Printer className="w-3.5 h-3.5 text-blue-400" />
                      </button>

                      <button
                        onClick={() => onEditBill(bill)}
                        className="p-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white rounded-lg transition text-xs font-medium px-2"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent E-LRs Column */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-rose-400" />
              <h3 className="font-bold text-sm text-white">Recent E-LRs (Lorry Receipts)</h3>
            </div>
            <button
              onClick={() => onNavigateTab('history')}
              className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {recentElrs.map(elr => {
              return (
                <div
                  key={elr.id}
                  className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between transition"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-xs text-white">LR #{elr.lrNo}</span>
                      <span className="text-[10px] text-slate-400">• {elr.date}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-200 uppercase mt-0.5 truncate max-w-[200px]">
                      {elr.consignee?.name || 'Receiver'}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {elr.fromLocation} ➔ {elr.toLocation} ({elr.lorryNo})
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <span className="text-xs font-black text-rose-300 block">{elr.charges?.total || 'To Be Billed'}</span>
                      <span className="text-[10px] text-slate-400">Pay: {elr.gstPayableBy}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onPrintDocument('elr', elr)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition"
                        title="Print E-LR"
                      >
                        <Printer className="w-3.5 h-3.5 text-rose-400" />
                      </button>

                      <button
                        onClick={() => onEditElr(elr)}
                        className="p-1.5 bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg transition text-xs font-medium px-2"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
