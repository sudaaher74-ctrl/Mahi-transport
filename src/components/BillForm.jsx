import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Printer, Save, Copy, RotateCcw, Share2, Sparkles, Building2, UserCheck, Download } from 'lucide-react';
import { numberToWordsIndian, formatIndianCurrency } from '../utils/numberToWords';

export default function BillForm({ 
  currentBill, 
  onSave, 
  onPrint, 
  onDownloadPdf,
  companies, 
  parties, 
  activeCompanyId,
  onSelectCompany 
}) {
  const [formData, setFormData] = useState(() => ({
    id: currentBill?.id || `bill-${Date.now()}`,
    billNo: currentBill?.billNo || `${String(Math.floor(Math.random() * 900 + 100)).padStart(3, '0')}/2025-26`,
    date: currentBill?.date || new Date().toISOString().split('T')[0],
    companyId: currentBill?.companyId || activeCompanyId || 'mahi',
    clientName: currentBill?.clientName || '',
    accountNo: currentBill?.accountNo || '',
    items: currentBill?.items?.length ? currentBill.items : [
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
    lessAdvance: currentBill?.lessAdvance || 0
  }));

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentBill) {
      setFormData(currentBill);
    }
  }, [currentBill]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const addItemRow = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: String(Date.now()),
          date: new Date().toLocaleDateString('en-GB'),
          vehicleNo: prev.items[prev.items.length - 1]?.vehicleNo || '',
          particulars: prev.items[prev.items.length - 1]?.particulars || '',
          size: prev.items[prev.items.length - 1]?.size || '1*20FT CBT',
          advance: '',
          charges: '',
          amount: ''
        }
      ]
    }));
  };

  const removeItemRow = (index) => {
    if (formData.items.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  // Calculations
  const totalAmount = formData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const lessAdvance = Number(formData.lessAdvance) || 0;
  const balance = totalAmount - lessAdvance;
  const amountInWords = numberToWordsIndian(balance > 0 ? balance : totalAmount);

  const handleSave = () => {
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSelectParty = (e) => {
    const partyId = e.target.value;
    const selected = parties.find(p => p.id === partyId);
    if (selected) {
      setFormData(prev => ({ ...prev, clientName: selected.name }));
    }
  };

  const shareWhatsApp = () => {
    const activeComp = companies.find(c => c.id === formData.companyId) || companies[0];
    const text = `*INVOICE / BILL DETAILS*\n\n` +
      `*Transport:* ${activeComp.name}\n` +
      `*Bill No:* ${formData.billNo}\n` +
      `*Date:* ${formData.date}\n` +
      `*Client:* ${formData.clientName}\n` +
      `*Total Amount:* ₹${formatIndianCurrency(totalAmount)}\n` +
      `*Less Advance:* ₹${formatIndianCurrency(lessAdvance)}\n` +
      `*Balance Payable:* ₹${formatIndianCurrency(balance)}\n` +
      `*In Words:* ${amountInWords}\n\n` +
      `*Bank Details:* ${activeComp.bankDetails?.bankName || ''}\n` +
      `*A/C:* ${activeComp.bankDetails?.accountNo || ''}\n` +
      `*IFSC:* ${activeComp.bankDetails?.ifsc || ''}\n` +
      `*UPI:* ${activeComp.bankDetails?.upiId || ''}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur border border-slate-700/80 rounded-2xl p-5 shadow-xl text-slate-100 space-y-6">
      {/* Header Bar with Company selector and Print Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Generate Transport Invoice</h2>
            <p className="text-xs text-slate-400">Fill in particulars to generate pixel-perfect bill</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={shareWhatsApp}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
            title="Share Bill summary on WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPdf}
            className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow-sm"
            title="Directly download PDF file without saving prompt"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{savedSuccess ? 'Saved! ✓' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Top Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Company Profile Selection */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span>Transport Header / Profile</span>
          </label>
          <select
            value={formData.companyId}
            onChange={(e) => {
              handleInputChange('companyId', e.target.value);
              onSelectCompany(e.target.value);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Bill Number */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Bill No.</label>
          <input
            type="text"
            value={formData.billNo}
            onChange={(e) => handleInputChange('billNo', e.target.value)}
            placeholder="e.g. 022/2025-26"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Date */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Invoice Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Client / Party Name */}
        <div className="md:col-span-8 space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300">M/S : Client / Party Name</label>
            {parties.length > 0 && (
              <select
                onChange={handleSelectParty}
                defaultValue=""
                className="bg-slate-900/80 border border-slate-700 text-slate-300 rounded px-2 py-0.5 text-xs focus:outline-none"
              >
                <option value="" disabled>⚡ Quick Fill from Parties</option>
                {parties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            )}
          </div>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => handleInputChange('clientName', e.target.value)}
            placeholder="e.g. SACHIN GAYAKHE"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Account Reference */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">A/C : Account Ref (Optional)</label>
          <input
            type="text"
            value={formData.accountNo}
            onChange={(e) => handleInputChange('accountNo', e.target.value)}
            placeholder="e.g. A/C No. or PO Ref"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Itemized Particulars Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center space-x-1.5">
            <span>Trip & Freight Particulars</span>
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-normal">
              {formData.items.length} {formData.items.length === 1 ? 'row' : 'rows'}
            </span>
          </h3>

          <button
            type="button"
            onClick={addItemRow}
            className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Trip Row</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-900/60">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                <th className="p-2.5 font-semibold w-24">Date</th>
                <th className="p-2.5 font-semibold w-32">Vehicle No.</th>
                <th className="p-2.5 font-semibold">Particulars (Route)</th>
                <th className="p-2.5 font-semibold w-28">Size</th>
                <th className="p-2.5 font-semibold w-20">Advance</th>
                <th className="p-2.5 font-semibold w-20">Charges</th>
                <th className="p-2.5 font-semibold w-28 text-right">Amount (₹)</th>
                <th className="p-2.5 font-semibold w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {formData.items.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-slate-800/40">
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={item.date}
                      onChange={(e) => handleItemChange(index, 'date', e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={item.vehicleNo}
                      onChange={(e) => handleItemChange(index, 'vehicleNo', e.target.value)}
                      placeholder="MH46BB7915"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white uppercase font-mono"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={item.particulars}
                      onChange={(e) => handleItemChange(index, 'particulars', e.target.value)}
                      placeholder="e.g. VADAPE TO NHAWA SHEWA"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white uppercase"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={item.size}
                      onChange={(e) => handleItemChange(index, 'size', e.target.value)}
                      placeholder="1*20FT CBT"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white uppercase"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={item.advance}
                      onChange={(e) => handleItemChange(index, 'advance', e.target.value)}
                      placeholder="-"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white text-center"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={item.charges}
                      onChange={(e) => handleItemChange(index, 'charges', e.target.value)}
                      placeholder="-"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white text-center"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                      placeholder="4500"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white text-right font-bold"
                    />
                  </td>
                  <td className="p-1.5 text-center">
                    <button
                      type="button"
                      onClick={() => removeItemRow(index)}
                      disabled={formData.items.length <= 1}
                      className="text-slate-500 hover:text-red-400 disabled:opacity-30 transition p-1"
                      title="Remove Row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Card with Auto Indian Words & Advance calculation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-900/80 border border-slate-700 p-4 rounded-xl">
        {/* Words and Advance Left */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount in Words</span>
            <div className="mt-1 p-2.5 bg-slate-800/80 border border-slate-700/60 rounded-lg text-xs font-black text-amber-300 font-serif tracking-wide">
              {amountInWords}
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <label className="text-xs font-medium text-slate-300 whitespace-nowrap">Less Advance (₹):</label>
            <input
              type="number"
              value={formData.lessAdvance}
              onChange={(e) => handleInputChange('lessAdvance', e.target.value)}
              placeholder="0"
              className="w-36 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white font-bold text-right"
            />
          </div>
        </div>

        {/* Calculations Breakdown Right */}
        <div className="md:col-span-5 bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs space-y-2">
          <div className="flex justify-between items-center text-slate-300">
            <span>Sub Total:</span>
            <span className="font-bold text-sm text-white">₹{formatIndianCurrency(totalAmount)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Less Advance:</span>
            <span className="font-bold text-sm text-rose-400">- ₹{formatIndianCurrency(lessAdvance)}</span>
          </div>
          <div className="border-t border-slate-700 pt-2 flex justify-between items-center font-bold">
            <span className="text-amber-400 text-sm">Net Balance:</span>
            <span className="text-lg text-emerald-400 font-black">₹{formatIndianCurrency(balance)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
