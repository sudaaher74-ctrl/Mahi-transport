import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Users, Building, Phone, Mail, MapPin, Check } from 'lucide-react';

export default function PartyMaster({ parties, onSaveParties }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingParty, setEditingParty] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    type: 'client', // 'client', 'consignor', 'consignee'
    address: '',
    gstNo: '',
    phone: '',
    email: ''
  });

  const filteredParties = parties.filter(p =>
    (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.gstNo && p.gstNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.address && p.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setFormData({
      id: `party-${Date.now()}`,
      name: '',
      type: 'client',
      address: '',
      gstNo: '',
      phone: '',
      email: ''
    });
    setEditingParty(null);
    setIsAdding(true);
  };

  const handleOpenEdit = (party) => {
    setFormData({ ...party });
    setEditingParty(party.id);
    setIsAdding(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    let updated;
    if (editingParty) {
      updated = parties.map(p => p.id === editingParty ? formData : p);
    } else {
      updated = [formData, ...parties];
    }

    onSaveParties(updated);
    setIsAdding(false);
    setEditingParty(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this party?')) {
      const updated = parties.filter(p => p.id !== id);
      onSaveParties(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-800/90 backdrop-blur border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Party Directory / Address Book</h2>
            <p className="text-xs text-slate-400">Save Consignors, Consignees, and Clients for quick 1-click auto-filling</p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Party</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by party name, GSTIN, city or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Add / Edit Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-white">
                {editingParty ? 'Edit Party Information' : 'Add New Party'}
              </h3>
              <button
                onClick={() => setIsAdding(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Party / Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. TRIOMPHE DIGITAL TECHNOLOGY INDIA PVT.LTD"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Party Role</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="client">Client / Bill M/S</option>
                    <option value="consignor">Consignor (Sender)</option>
                    <option value="consignee">Consignee (Receiver)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-medium block mb-1">GSTIN No. (Optional)</label>
                  <input
                    type="text"
                    value={formData.gstNo}
                    onChange={(e) => setFormData({ ...formData, gstNo: e.target.value })}
                    placeholder="27XXXXXXXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Complete Address</label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, Plot / Unit No, Area, City, Pincode"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Mobile / Landline"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold"
                >
                  Save Party
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Parties List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredParties.map(p => (
          <div key={p.id} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg hover:border-blue-500/50 transition flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-700 text-slate-300">
                  {p.type}
                </span>
                {p.gstNo && (
                  <span className="text-[10px] font-mono font-bold text-amber-400">
                    GST: {p.gstNo}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-sm text-white uppercase mt-2 leading-snug">{p.name}</h3>

              {p.address && (
                <div className="flex items-start space-x-1.5 text-xs text-slate-300 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2 text-[11px] leading-relaxed">{p.address}</span>
                </div>
              )}

              {p.phone && (
                <div className="flex items-center space-x-1.5 text-xs text-slate-400 mt-2">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>{p.phone}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-1.5 pt-2 border-t border-slate-700/60">
              <button
                onClick={() => handleOpenEdit(p)}
                className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-medium flex items-center space-x-1 transition"
              >
                <Edit2 className="w-3 h-3 text-blue-400" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg transition"
                title="Delete Party"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
