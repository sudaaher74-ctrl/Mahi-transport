import React, { useState } from 'react';
import { Building2, Save, Plus, Trash2, CheckCircle2, QrCode, CreditCard, Shield } from 'lucide-react';

export default function CompanySettings({ 
  companies, 
  onSaveCompanies, 
  activeCompanyId, 
  onSetActiveCompany 
}) {
  const [selectedCompId, setSelectedCompId] = useState(activeCompanyId || companies[0]?.id || 'mahi');
  const [companyList, setCompanyList] = useState(companies);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentComp = companyList.find(c => c.id === selectedCompId) || companyList[0];

  const handleFieldChange = (field, value) => {
    setCompanyList(prev => prev.map(c => {
      if (c.id === selectedCompId) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  const handleBankChange = (field, value) => {
    setCompanyList(prev => prev.map(c => {
      if (c.id === selectedCompId) {
        return {
          ...c,
          bankDetails: {
            ...c.bankDetails,
            [field]: value
          }
        };
      }
      return c;
    }));
  };

  const handleAddNewCompany = () => {
    const newId = `company-${Date.now()}`;
    const newCompany = {
      id: newId,
      name: 'NEW TRANSPORT COMPANY',
      subtitle: 'FLEET OWNERS & TRANSPORT CONTRACTORS',
      address: 'Shop No. 01, Transport Nagar, Navi Mumbai, Maharashtra 410218',
      mobile: 'Mobile: 9800000000',
      email: 'transport@gmail.com',
      pan: 'ABCDE1234F',
      transportId: '27ABCDE1234F1Z1',
      gstNote: 'GST TAX PAYABLE BY CONSIGNOR / CONSIGNEE',
      bankDetails: {
        name: 'NEW TRANSPORT COMPANY',
        bankName: 'HDFC BANK',
        branch: 'MAIN BRANCH',
        accountNo: '50200000000000',
        ifsc: 'HDFC0000123',
        upiId: '9800000000@upi'
      },
      proprietor: 'AUTHORIZED SIGNATORY',
      logoType: 'badge-mt',
      logoSub: 'Transport'
    };

    const updated = [...companyList, newCompany];
    setCompanyList(updated);
    setSelectedCompId(newId);
    onSaveCompanies(updated);
  };

  const handleDeleteCompany = (id) => {
    if (companyList.length <= 1) {
      alert('You must keep at least one company profile.');
      return;
    }
    if (confirm('Are you sure you want to delete this company profile?')) {
      const updated = companyList.filter(c => c.id !== id);
      setCompanyList(updated);
      setSelectedCompId(updated[0].id);
      onSaveCompanies(updated);
      if (activeCompanyId === id) {
        onSetActiveCompany(updated[0].id);
      }
    }
  };

  const handleSaveAll = () => {
    onSaveCompanies(companyList);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-800/90 backdrop-blur border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Transport Company Profiles & Settings</h2>
            <p className="text-xs text-slate-400">Configure business information, bank accounts, UPI QR payment IDs, and signatures</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddNewCompany}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Company</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{savedSuccess ? 'Settings Saved! ✓' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Company Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {companyList.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCompId(c.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 border ${
              selectedCompId === c.id
                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <span>{c.name}</span>
            {activeCompanyId === c.id && (
              <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-medium">Default</span>
            )}
          </button>
        ))}
      </div>

      {/* Main Settings Form */}
      {currentComp && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Company Details Left */}
          <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4 text-xs text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Basic Profile & Header</span>
              </h3>

              <div className="flex items-center space-x-2">
                {activeCompanyId !== currentComp.id && (
                  <button
                    type="button"
                    onClick={() => onSetActiveCompany(currentComp.id)}
                    className="px-2.5 py-1 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold"
                  >
                    Set as Default
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteCompany(currentComp.id)}
                  className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition"
                  title="Delete Company"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Company / Transporter Name *</label>
              <input
                type="text"
                value={currentComp.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="MAHI TRANSPORT"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Subtitle / Slogan</label>
              <input
                type="text"
                value={currentComp.subtitle}
                onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                placeholder="FLEET OWNERS & TRANSPORT CONTRACTORS"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Office Address</label>
              <textarea
                rows={2}
                value={currentComp.address}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                placeholder="Shop No, Complex, Sector, City, Pincode"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Mobile / Phone Numbers</label>
                <input
                  type="text"
                  value={currentComp.mobile}
                  onChange={(e) => handleFieldChange('mobile', e.target.value)}
                  placeholder="MOB-8286784878/7588168803"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Email ID</label>
                <input
                  type="text"
                  value={currentComp.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  placeholder="mahitransport7915@gmail.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">PAN Number</label>
                <input
                  type="text"
                  value={currentComp.pan}
                  onChange={(e) => handleFieldChange('pan', e.target.value)}
                  placeholder="EOKPB7914G"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Transport ID / GSTIN</label>
                <input
                  type="text"
                  value={currentComp.transportId || ''}
                  onChange={(e) => handleFieldChange('transportId', e.target.value)}
                  placeholder="27EOKPB7914G1Z5"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Proprietor / Signatory Name</label>
              <input
                type="text"
                value={currentComp.proprietor || ''}
                onChange={(e) => handleFieldChange('proprietor', e.target.value)}
                placeholder="ABHISHEK M. BELKAR"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Bank & UPI QR Settings Right */}
          <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-4 text-xs text-slate-100">
            <div className="pb-3 border-b border-slate-700">
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Bank & Instant UPI Payment</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Printed on the bottom left of every invoice with live scannable QR</p>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Account Holder Name</label>
              <input
                type="text"
                value={currentComp.bankDetails?.name || ''}
                onChange={(e) => handleBankChange('name', e.target.value)}
                placeholder="MAHI TRANSPORT"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Bank Name</label>
              <input
                type="text"
                value={currentComp.bankDetails?.bankName || ''}
                onChange={(e) => handleBankChange('bankName', e.target.value)}
                placeholder="ABHYUDAYA CO-OP. BANK LTD."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Branch Name</label>
              <input
                type="text"
                value={currentComp.bankDetails?.branch || ''}
                onChange={(e) => handleBankChange('branch', e.target.value)}
                placeholder="NEW PANVEL, SEC 17"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">A/C Number</label>
                <input
                  type="text"
                  value={currentComp.bankDetails?.accountNo || ''}
                  onChange={(e) => handleBankChange('accountNo', e.target.value)}
                  placeholder="018021100117278"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={currentComp.bankDetails?.ifsc || ''}
                  onChange={(e) => handleBankChange('ifsc', e.target.value)}
                  placeholder="ABHY0065018"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-2">
              <div className="flex items-center space-x-2">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-xs text-white">UPI Virtual Payment Address (VPA)</span>
              </div>
              <input
                type="text"
                value={currentComp.bankDetails?.upiId || ''}
                onChange={(e) => handleBankChange('upiId', e.target.value)}
                placeholder="8286784878@upi or mahitransport@okhdfcbank"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
              />
              <p className="text-[10px] text-slate-400">
                This UPI ID is automatically encoded into the QR code on the invoice for 1-scan mobile payments via GPay, PhonePe, Paytm, or BHIM.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
