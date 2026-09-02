import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Printer, Save, Share2, Building2, Truck, ShieldCheck, MapPin, Download } from 'lucide-react';
import { formatIndianCurrency } from '../utils/numberToWords';

export default function ElrForm({
  currentElr,
  onSave,
  onPrint,
  onDownloadPdf,
  companies,
  parties,
  activeCompanyId,
  onSelectCompany
}) {
  const [formData, setFormData] = useState(() => ({
    id: currentElr?.id || `elr-${Date.now()}`,
    lrNo: currentElr?.lrNo || String(Math.floor(Math.random() * 800 + 100)),
    date: currentElr?.date || new Date().toISOString().split('T')[0],
    companyId: currentElr?.companyId || activeCompanyId || 'sadguru',
    cautionText: currentElr?.cautionText || "The Consignment will not be detained/delivered re-routed or rebooked without consignee Bank's written permission",
    deliveryAddress: currentElr?.deliveryAddress || '',
    insurance: {
      hasInsurance: currentElr?.insurance?.hasInsurance || false,
      company: currentElr?.insurance?.company || '',
      policyNoOrDate: currentElr?.insurance?.policyNoOrDate || '',
      amount: currentElr?.insurance?.amount || '',
      risk: currentElr?.insurance?.risk || ''
    },
    consignor: {
      name: currentElr?.consignor?.name || '',
      address: currentElr?.consignor?.address || '',
      gstNo: currentElr?.consignor?.gstNo || ''
    },
    consignee: {
      name: currentElr?.consignee?.name || '',
      address: currentElr?.consignee?.address || '',
      gstNo: currentElr?.consignee?.gstNo || ''
    },
    ewayBillNo: currentElr?.ewayBillNo || '',
    lorryNo: currentElr?.lorryNo || 'MH04KU1405',
    fromLocation: currentElr?.fromLocation || 'BHIWANDI',
    toLocation: currentElr?.toLocation || 'AMAZON',
    articles: currentElr?.articles?.length ? currentElr.articles : [
      {
        id: '1',
        noOfArticles: '0',
        methodOfPacking: 'PKG',
        description: 'PICKUP\n\nInvoice Date 71',
        chargedWeight: '0',
        actualWeight: '0'
      }
    ],
    value: currentElr?.value || '',
    invNo: currentElr?.invNo || '',
    invValue: currentElr?.invValue || '',
    charges: {
      rate: currentElr?.charges?.rate || '',
      freight: currentElr?.charges?.freight || '',
      surcharges: currentElr?.charges?.surcharges || 'To Be',
      hamali: currentElr?.charges?.hamali || 'Billed At',
      stCharges: currentElr?.charges?.stCharges || 'Mumbai',
      riskCharge: currentElr?.charges?.riskCharge || '',
      total: currentElr?.charges?.total || ''
    },
    gstPayableBy: currentElr?.gstPayableBy || 'CONSIGNOR',
    termsNotice: currentElr?.termsNotice || 'NOT RESPONSIBLE FOR LEAKAGE & BREAKAGES IN TRANSIT',
    specialNotice: currentElr?.specialNotice || "The Consignment Covered by this set of Special Lorry Receipt From shall be store at the destination under the control of the Transport Operator and shall be delivered to or the of the Consignee Banks whose name is mentioned in the Lorry Receipt. It will under no circumstances be delivered to any one withoutthe written authority from the Consignee Banks of its order enclosed on the Consignee Copy or on a separate Letter of Authority"
  }));

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentElr) {
      setFormData(currentElr);
    }
  }, [currentElr]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleArticleChange = (index, field, value) => {
    setFormData(prev => {
      const newArticles = [...prev.articles];
      newArticles[index] = { ...newArticles[index], [field]: value };
      return { ...prev, articles: newArticles };
    });
  };

  const addArticleRow = () => {
    setFormData(prev => ({
      ...prev,
      articles: [
        ...prev.articles,
        {
          id: String(Date.now()),
          noOfArticles: '1',
          methodOfPacking: 'PKG',
          description: '',
          chargedWeight: '0',
          actualWeight: '0'
        }
      ]
    }));
  };

  const removeArticleRow = (index) => {
    if (formData.articles.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      articles: prev.articles.filter((_, i) => i !== index)
    }));
  };

  const handleSelectConsignor = (e) => {
    const partyId = e.target.value;
    const selected = parties.find(p => p.id === partyId);
    if (selected) {
      setFormData(prev => ({
        ...prev,
        consignor: {
          name: selected.name,
          address: selected.address || '',
          gstNo: selected.gstNo || ''
        }
      }));
    }
  };

  const handleSelectConsignee = (e) => {
    const partyId = e.target.value;
    const selected = parties.find(p => p.id === partyId);
    if (selected) {
      setFormData(prev => ({
        ...prev,
        consignee: {
          name: selected.name,
          address: selected.address || '',
          gstNo: selected.gstNo || ''
        }
      }));
    }
  };

  const handleSave = () => {
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const shareWhatsApp = () => {
    const activeComp = companies.find(c => c.id === formData.companyId) || companies[0];
    const text = `*E-LR / CONSIGNMENT NOTE*\n\n` +
      `*Transport:* ${activeComp.name}\n` +
      `*LR No:* ${formData.lrNo}\n` +
      `*Date:* ${formData.date}\n` +
      `*Lorry No:* ${formData.lorryNo}\n` +
      `*From:* ${formData.fromLocation} -> *To:* ${formData.toLocation}\n` +
      `*Consignor:* ${formData.consignor.name}\n` +
      `*Consignee:* ${formData.consignee.name}\n` +
      `*E-Way Bill:* ${formData.ewayBillNo || '-'}\n` +
      `*Freight Total:* ${formData.charges.total || 'To Be Billed'}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur border border-slate-700/80 rounded-2xl p-5 shadow-xl text-slate-100 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-xl">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Generate E-LR (Lorry Receipt / Bilty)</h2>
            <p className="text-xs text-slate-400">Generate authentic consignment note matching transport standards</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={shareWhatsApp}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
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

      {/* Top Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Company Profile */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Transporter Profile</label>
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

        {/* Consignment Note / LR No */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">LR / Consignment Note No.</label>
          <input
            type="text"
            value={formData.lrNo}
            onChange={(e) => handleInputChange('lrNo', e.target.value)}
            placeholder="e.g. 71"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Date */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">LR Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Lorry No */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Lorry / Vehicle No.</label>
          <input
            type="text"
            value={formData.lorryNo}
            onChange={(e) => handleInputChange('lorryNo', e.target.value)}
            placeholder="MH04KU1405"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* From Location */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">From (Source)</label>
          <input
            type="text"
            value={formData.fromLocation}
            onChange={(e) => handleInputChange('fromLocation', e.target.value)}
            placeholder="e.g. BHIWANDI"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* To Location */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">To (Destination)</label>
          <input
            type="text"
            value={formData.toLocation}
            onChange={(e) => handleInputChange('toLocation', e.target.value)}
            placeholder="e.g. AMAZON"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* E-Way Bill No */}
        <div className="md:col-span-6 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">E-Way Bill No. (Optional)</label>
          <input
            type="text"
            value={formData.ewayBillNo}
            onChange={(e) => handleInputChange('ewayBillNo', e.target.value)}
            placeholder="e.g. 281048291048"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Address of Delivery Of */}
        <div className="md:col-span-6 space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Address of Delivery Of (Optional)</label>
          <input
            type="text"
            value={formData.deliveryAddress}
            onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
            placeholder="Specific warehouse / gate address"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Consignor & Consignee Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Consignor Box */}
        <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Consignor (Sender)</h3>
            {parties.length > 0 && (
              <select
                onChange={handleSelectConsignor}
                defaultValue=""
                className="bg-slate-800 border border-slate-700 text-slate-300 rounded px-2 py-0.5 text-xs focus:outline-none"
              >
                <option value="" disabled>⚡ Fill Party</option>
                {parties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label className="text-[11px] text-slate-400">Consignor Name</label>
            <input
              type="text"
              value={formData.consignor.name}
              onChange={(e) => handleNestedChange('consignor', 'name', e.target.value)}
              placeholder="e.g. TRIOMPHE DIGITAL TECHNOLOGY INDIA PVT.LTD"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase font-bold"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400">Consignor Address</label>
            <textarea
              rows={3}
              value={formData.consignor.address}
              onChange={(e) => handleNestedChange('consignor', 'address', e.target.value)}
              placeholder="Unit No, Plot No, Road, City, Pincode"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400">Consignor GST No.</label>
            <input
              type="text"
              value={formData.consignor.gstNo}
              onChange={(e) => handleNestedChange('consignor', 'gstNo', e.target.value)}
              placeholder="27XXXXXXXXXXXXX"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase font-mono"
            />
          </div>
        </div>

        {/* Consignee Box */}
        <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Consignee (Receiver)</h3>
            {parties.length > 0 && (
              <select
                onChange={handleSelectConsignee}
                defaultValue=""
                className="bg-slate-800 border border-slate-700 text-slate-300 rounded px-2 py-0.5 text-xs focus:outline-none"
              >
                <option value="" disabled>⚡ Fill Party</option>
                {parties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label className="text-[11px] text-slate-400">Consignee Name</label>
            <input
              type="text"
              value={formData.consignee.name}
              onChange={(e) => handleNestedChange('consignee', 'name', e.target.value)}
              placeholder="e.g. AMEZON ISK3 ROYAL WEREHOUSING AND LOGI.LLP"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase font-bold"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400">Consignee Address</label>
            <textarea
              rows={3}
              value={formData.consignee.address}
              onChange={(e) => handleNestedChange('consignee', 'address', e.target.value)}
              placeholder="Survey No, Village, Post, District, Pincode"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400">Consignee GST No.</label>
            <input
              type="text"
              value={formData.consignee.gstNo}
              onChange={(e) => handleNestedChange('consignee', 'gstNo', e.target.value)}
              placeholder="27XXXXXXXXXXXXX"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase font-mono"
            />
          </div>
        </div>
      </div>

      {/* Articles / Goods Description Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">Articles & Consignment Contents</h3>
          <button
            type="button"
            onClick={addArticleRow}
            className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Article Row</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-900/60">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 border-b border-slate-700">
                <th className="p-2.5 font-semibold w-20">No. of Art.</th>
                <th className="p-2.5 font-semibold w-28">Packing</th>
                <th className="p-2.5 font-semibold">Description (said to Contain)</th>
                <th className="p-2.5 font-semibold w-24">Charged Wt</th>
                <th className="p-2.5 font-semibold w-24">Actual Wt</th>
                <th className="p-2.5 font-semibold w-10 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {formData.articles.map((art, index) => (
                <tr key={art.id || index}>
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={art.noOfArticles}
                      onChange={(e) => handleArticleChange(index, 'noOfArticles', e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white text-center font-bold"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={art.methodOfPacking}
                      onChange={(e) => handleArticleChange(index, 'methodOfPacking', e.target.value)}
                      placeholder="PKG / BOX / BAG"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white uppercase text-center font-bold"
                    />
                  </td>
                  <td className="p-1.5">
                    <textarea
                      rows={2}
                      value={art.description}
                      onChange={(e) => handleArticleChange(index, 'description', e.target.value)}
                      placeholder="e.g. PICKUP &#10;Invoice Date 71"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white uppercase font-bold"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={art.chargedWeight}
                      onChange={(e) => handleArticleChange(index, 'chargedWeight', e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white text-center font-bold"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={art.actualWeight}
                      onChange={(e) => handleArticleChange(index, 'actualWeight', e.target.value)}
                      placeholder="0"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white text-center font-bold"
                    />
                  </td>
                  <td className="p-1.5 text-center">
                    <button
                      type="button"
                      onClick={() => removeArticleRow(index)}
                      disabled={formData.articles.length <= 1}
                      className="text-slate-500 hover:text-red-400 disabled:opacity-30 transition p-1"
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

      {/* Charges Breakdown, Invoice Ref & GST Payable Settings */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left: Invoice Reference & Insurance */}
        <div className="md:col-span-6 bg-slate-900/80 border border-slate-700 p-4 rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Invoice & Insurance Details</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400">Invoice No.</label>
              <input
                type="text"
                value={formData.invNo}
                onChange={(e) => handleInputChange('invNo', e.target.value)}
                placeholder="e.g. INV-1092"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400">Invoice Value (₹)</label>
              <input
                type="text"
                value={formData.invValue}
                onChange={(e) => handleInputChange('invValue', e.target.value)}
                placeholder="e.g. 50,000"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.insurance.hasInsurance}
                onChange={(e) => handleNestedChange('insurance', 'hasInsurance', e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0"
              />
              <span>Consignment is Insured</span>
            </label>

            {formData.insurance.hasInsurance && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Insurance Company"
                  value={formData.insurance.company}
                  onChange={(e) => handleNestedChange('insurance', 'company', e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Policy No. / Date"
                  value={formData.insurance.policyNoOrDate}
                  onChange={(e) => handleNestedChange('insurance', 'policyNoOrDate', e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                />
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-300 block mb-1">GST Tax Payable By:</span>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-xs text-white font-medium cursor-pointer">
                <input
                  type="radio"
                  name="gstPayable"
                  value="CONSIGNOR"
                  checked={formData.gstPayableBy === 'CONSIGNOR'}
                  onChange={() => handleInputChange('gstPayableBy', 'CONSIGNOR')}
                  className="text-blue-600"
                />
                <span>CONSIGNOR</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-white font-medium cursor-pointer">
                <input
                  type="radio"
                  name="gstPayable"
                  value="CONSIGNEE"
                  checked={formData.gstPayableBy === 'CONSIGNEE'}
                  onChange={() => handleInputChange('gstPayableBy', 'CONSIGNEE')}
                  className="text-blue-600"
                />
                <span>CONSIGNEE</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Freight & Charges Grid */}
        <div className="md:col-span-6 bg-slate-900/80 border border-slate-700 p-4 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Freight Charges & Terms</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Rate:</span>
              <input
                type="text"
                value={formData.charges.rate}
                onChange={(e) => handleNestedChange('charges', 'rate', e.target.value)}
                placeholder="-"
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Freight:</span>
              <input
                type="text"
                value={formData.charges.freight}
                onChange={(e) => handleNestedChange('charges', 'freight', e.target.value)}
                placeholder="-"
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Surcharges:</span>
              <input
                type="text"
                value={formData.charges.surcharges}
                onChange={(e) => handleNestedChange('charges', 'surcharges', e.target.value)}
                placeholder="To Be"
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white font-semibold"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Hamali:</span>
              <input
                type="text"
                value={formData.charges.hamali}
                onChange={(e) => handleNestedChange('charges', 'hamali', e.target.value)}
                placeholder="Billed At"
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white font-semibold"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">S.T. Charges:</span>
              <input
                type="text"
                value={formData.charges.stCharges}
                onChange={(e) => handleNestedChange('charges', 'stCharges', e.target.value)}
                placeholder="Mumbai"
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white font-semibold"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Risk Charge:</span>
              <input
                type="text"
                value={formData.charges.riskCharge}
                onChange={(e) => handleNestedChange('charges', 'riskCharge', e.target.value)}
                placeholder="-"
                className="w-24 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-white"
              />
            </div>
          </div>

          <div className="border-t border-slate-800 pt-2 flex items-center justify-between">
            <span className="font-bold text-sm text-slate-200">Total / Remark:</span>
            <input
              type="text"
              value={formData.charges.total}
              onChange={(e) => handleNestedChange('charges', 'total', e.target.value)}
              placeholder="e.g. To Be Billed"
              className="w-36 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-right font-bold text-white text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
