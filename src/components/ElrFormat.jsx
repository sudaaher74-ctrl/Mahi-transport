import React from 'react';

export default function ElrFormat({ elr, company, id = "printable-elr-document" }) {
  if (!elr || !company) return null;

  return (
    <div 
      id={id}
      className="print-page-wrapper bg-white text-black font-serif text-[11.5px] leading-tight select-text" 
      style={{ 
        width: '100%', 
        maxWidth: '210mm', 
        minHeight: '297mm', 
        margin: '0 auto', 
        padding: '8mm 6mm',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Outer Border Box */}
      <div 
        className="border border-black p-2 flex flex-col justify-between" 
        style={{ 
          minHeight: '276mm',
          boxSizing: 'border-box'
        }}
      >
        
        <div>
          {/* Header Section */}
          <div className="flex items-start justify-between pb-1">
            {/* Logo Left */}
            <div className="w-[100px] flex flex-col items-center justify-center pt-1">
              <div className="relative w-16 h-12 flex items-center justify-center">
                {/* Red Oval Ring */}
                <div className="absolute inset-0 rounded-full border-[3px] border-red-600 bg-black flex items-center justify-center shadow-sm">
                  <div className="flex items-center font-black tracking-tighter">
                    <span className="text-red-500 text-2xl font-extrabold italic" style={{ fontFamily: 'sans-serif' }}>S</span>
                    <span className="text-white text-xl font-extrabold" style={{ fontFamily: 'sans-serif' }}>KT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Header Center */}
            <div className="flex-1 text-center px-1">
              <h1 
                className="text-[26px] font-black uppercase tracking-wider leading-tight" 
                style={{ 
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                  color: '#ff0000',
                  textShadow: '1px 1px 0 #000, -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000',
                  letterSpacing: '0.03em'
                }}
              >
                {company.name || 'SHREE SADGURU KRUPA TRANSPORT'}
              </h1>
              <div 
                className="text-[12px] font-black tracking-wider text-blue-700 mt-0.5 uppercase"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {company.subtitle || 'FLEET OWNERS & TRANSPORT CONTRACTORS'}
              </div>
              <div className="text-[10px] font-normal text-black mt-0.5 leading-snug">
                {company.address}
              </div>
              <div className="text-[10px] font-normal text-black mt-0.5">
                {company.mobile} Email_id : {company.email}
              </div>
            </div>

            {/* Spacer */}
            <div className="w-[60px]"></div>
          </div>

          {/* PAN NO and Transport ID and AT OWNER'S RISK banner */}
          <div className="grid grid-cols-12 items-center py-1 text-[11px]">
            <div className="col-span-4 font-bold">
              PAN NO :- <span className="font-bold uppercase">{company.pan || 'AUKPB3418R'}</span>
            </div>
            <div 
              className="col-span-4 text-center font-black text-blue-700 text-[13px] tracking-wider uppercase"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              AT OWNER'S RISK
            </div>
            <div className="col-span-4 text-right font-bold">
              TRANSPORT ID :- <span className="font-bold uppercase">{company.transportId || '27AUKPB3418R1Z8'}</span>
            </div>
          </div>

          {/* 3-Column Top Section: Caution/Consignment Note | Insurance | Red Notice & Lorry Info */}
          <div className="grid grid-cols-12 border-t border-b border-black text-[10.5px]">
            {/* Left 4 Cols: Caution + Consignment Note */}
            <div className="col-span-4 border-r border-black flex flex-col justify-between p-1 space-y-1.5">
              {/* Caution Box */}
              <div className="border border-black p-1 text-[9px] text-center leading-tight">
                <div className="font-bold uppercase text-[9.5px] mb-0.5">CAUTION</div>
                <div>{elr.cautionText || "The Consignment will not be detaineddelivered re-routed or rebooked without consignee Bank's written permission"}</div>
              </div>

              {/* Address of Delivery */}
              <div className="text-[10px]">
                <span className="font-bold">Address of delivery Of</span>
                <div className="border-b border-black h-3.5 mt-0.5">{elr.deliveryAddress || ''}</div>
              </div>

              {/* Consignment Note Box */}
              <div className="border border-black">
                <div className="border-b border-black text-center font-bold py-0.5 text-[10px]">
                  Consignment Note
                </div>
                <div className="grid grid-cols-2 p-1 text-[10px]">
                  <div>
                    <span className="font-bold">No.</span>
                    <div className="font-black text-[14px] text-center py-0.5">{elr.lrNo}</div>
                  </div>
                  <div className="border-l border-black pl-1.5">
                    <span className="font-bold">Date</span>
                    <div className="font-bold text-center py-1">
                      {elr.date ? (elr.date.includes('-') ? elr.date.split('-').reverse().join('/') : elr.date) : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle 4 Cols: Insurance Box */}
            <div className="col-span-4 border-r border-black p-1 flex flex-col justify-between text-[10.5px]">
              <div className="border border-black p-1 h-full flex flex-col justify-between text-[10px]">
                <div className="text-center font-bold tracking-widest underline uppercase mb-0.5">
                  I N S U R A N C E
                </div>
                <div className="text-[9.5px] leading-tight space-y-0.5">
                  <p>The Customer has started that</p>
                  <div className="flex items-start space-x-1">
                    <span className="font-bold">*</span>
                    <span>he has not insured the consignment</span>
                  </div>
                  <div className="text-center font-bold text-[9px]">OR</div>
                  <div className="flex items-start space-x-1">
                    <span className="font-bold">*</span>
                    <span>he has insured the consignment</span>
                  </div>
                </div>

                <div className="space-y-1 text-[9.5px] mt-1">
                  <div className="flex items-center">
                    <span className="w-14">Company</span>
                    <span className="flex-1 border-b border-black text-center font-medium">{elr.insurance?.company || ''}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24">Policy No . OR Date</span>
                    <span className="flex-1 border-b border-black text-center font-medium">{elr.insurance?.policyNoOrDate || ''}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center">
                      <span>Amount</span>
                      <span className="flex-1 border-b border-black ml-1 text-center">{elr.insurance?.amount || ''}</span>
                    </div>
                    <div className="flex items-center">
                      <span>Risk</span>
                      <span className="flex-1 border-b border-black ml-1 text-center">{elr.insurance?.risk || ''}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Red Notice Box + Lorry/Route Details */}
            <div className="col-span-4 p-1 flex flex-col justify-between">
              {/* Red Notice Box */}
              <div className="border border-red-600 p-1 text-[8.5px] leading-tight text-red-600 font-semibold mb-1">
                <div className="text-center font-bold uppercase underline mb-0.5 text-[9px]">NOTICE</div>
                <p className="text-[8px] text-justify leading-snug">
                  {elr.specialNotice || "The Consignment Covered by this set of Special Lorry Receipt From shall be store at the destination under the control of the Transport Operator and shall be delivered to or the of the Consignee Banks whose name is mentioned in the Lorry Receipt. It will under no circumstances be delivered to any one withoutthe written authority from the Consignee Banks of its order enclosed on the Consignee Copy or on a separate Letter of Authority"}
                </p>
              </div>

              {/* Lorry & Route Grid */}
              <div className="border border-black text-[10px]">
                <div className="grid grid-cols-12 border-b border-black p-0.5 px-1">
                  <span className="col-span-7 font-bold text-[9.5px]">Consignor Gst No.</span>
                  <span className="col-span-5 font-bold text-[9.5px] text-right">{elr.consignor?.gstNo || ''}</span>
                </div>
                <div className="grid grid-cols-12 border-b border-black p-0.5 px-1">
                  <span className="col-span-7 font-bold text-[9.5px]">Consignor Gst No.</span>
                  <span className="col-span-5 font-bold text-[9.5px] text-right">{elr.consignee?.gstNo || ''}</span>
                </div>
                <div className="grid grid-cols-12 border-b border-black p-0.5 px-1">
                  <span className="col-span-6 font-bold text-[9.5px]">E-Way Bill No.</span>
                  <span className="col-span-6 font-bold text-[9.5px] text-right">{elr.ewayBillNo || ''}</span>
                </div>
                <div className="grid grid-cols-12 border-b border-black p-0.5 px-1">
                  <span className="col-span-4 font-bold">Lorry No.</span>
                  <span className="col-span-8 font-black text-right uppercase tracking-wider">{elr.lorryNo}</span>
                </div>
                <div className="grid grid-cols-12 border-b border-black p-0.5 px-1">
                  <span className="col-span-3 font-bold">From</span>
                  <span className="col-span-9 font-black uppercase text-right">{elr.fromLocation}</span>
                </div>
                <div className="grid grid-cols-12 p-0.5 px-1">
                  <span className="col-span-3 font-bold">To</span>
                  <span className="col-span-9 font-black uppercase text-right">{elr.toLocation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Consignor and Consignee Full Width Rows */}
          <div className="border-b border-black text-[11px]">
            {/* Consignor Row */}
            <div className="p-1 px-2 border-b border-black">
              <div className="flex items-start">
                <span className="font-bold w-24 text-[11.5px]">Consignor</span>
                <div className="flex-1">
                  <div className="font-black text-[12px] uppercase tracking-wide underline">
                    {elr.consignor?.name || 'TRIOMPHE DIGITAL TECHNOLOGY INDIA PVT.LTD'}
                  </div>
                  <div className="text-[10px] underline text-black mt-0.5 leading-tight whitespace-pre-line font-medium">
                    {elr.consignor?.address || '8, UNIT NO 803 PLOT NO 1, SECTOR 1, RUPA SOLITAIRE MILLENNIUM BUISNESS PARK ROAD,\nMAHAPE, NAVI MUMBAI, THANE, 400710'}
                  </div>
                </div>
              </div>
            </div>

            {/* Consignee Row */}
            <div className="p-1 px-2">
              <div className="flex items-start">
                <span className="font-bold w-24 text-[11.5px]">Consignee</span>
                <div className="flex-1">
                  <div className="font-black text-[12px] uppercase tracking-wide underline">
                    {elr.consignee?.name || 'AMEZON ISK3 ROYAL WEREHOUSING AND LOGI.LLP'}
                  </div>
                  <div className="text-[10px] underline text-black mt-0.5 leading-tight whitespace-pre-line font-medium">
                    {elr.consignee?.address || 'Survey Number 45\nHissa No.4A, Village Pise Village, Aamne Post\nBHIWANDI, MAHARASHTRA 421302'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Articles and Charges Split Table */}
          <div className="grid grid-cols-12 border-b border-black text-[10.5px]">
            {/* Left 8 Cols: Goods Description and Weights */}
            <div className="col-span-8 border-r border-black flex flex-col justify-between">
              <div className="grid grid-cols-12 border-b border-black font-bold text-[10px] text-center bg-white">
                <div className="col-span-2 border-r border-black py-1 px-0.5">No.Of Article</div>
                <div className="col-span-2 border-r border-black py-1 px-0.5">METHOD OF PACKING</div>
                <div className="col-span-5 border-r border-black py-1 px-1">DESCRIPTION (said to Contain)</div>
                <div className="col-span-3 py-0.5">
                  <div>Weight</div>
                  <div className="grid grid-cols-2 border-t border-black text-[9px] font-normal">
                    <span className="border-r border-black font-bold">Charged Kgs.</span>
                    <span className="font-bold">Actual Kgs.</span>
                  </div>
                </div>
              </div>

              {/* Continuous vertical columns */}
              <div className="grid grid-cols-12 min-h-[90px] text-[10.5px]">
                <div className="col-span-2 border-r border-black p-1 text-center font-bold">
                  {elr.articles?.map((a, i) => <div key={i}>{a.noOfArticles}</div>)}
                </div>
                <div className="col-span-2 border-r border-black p-1 text-center font-bold uppercase">
                  {elr.articles?.map((a, i) => <div key={i}>{a.methodOfPacking}</div>)}
                </div>
                <div className="col-span-5 border-r border-black p-1 text-center font-bold uppercase whitespace-pre-line">
                  {elr.articles?.map((a, i) => <div key={i}>{a.description}</div>)}
                </div>
                <div className="col-span-3 grid grid-cols-2 h-full">
                  <div className="border-r border-black p-1 text-center font-bold">
                    {elr.articles?.map((a, i) => <div key={i}>{a.chargedWeight}</div>)}
                  </div>
                  <div className="p-1 text-center font-bold">
                    {elr.articles?.map((a, i) => <div key={i}>{a.actualWeight}</div>)}
                  </div>
                </div>
              </div>

              {/* Value / Inv No Footer Rows */}
              <div className="border-t border-black text-[10.5px]">
                <div className="grid grid-cols-12 border-b border-black p-0.5 px-1">
                  <span className="col-span-3 font-bold">Value</span>
                  <span className="col-span-9 font-medium">{elr.value || ''}</span>
                </div>
                <div className="grid grid-cols-12 p-0.5 px-1">
                  <div className="col-span-6 flex items-center">
                    <span className="font-bold mr-1">Inv. No.:</span>
                    <span className="font-bold">{elr.invNo || ''}</span>
                  </div>
                  <div className="col-span-6 flex items-center">
                    <span className="font-bold mr-1">Inv.Value :</span>
                    <span className="font-bold">{elr.invValue || ''}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Freight and Charges Breakdown */}
            <div className="col-span-4 flex flex-col justify-between">
              <div className="grid grid-cols-12 border-b border-black font-bold text-[10px] text-center bg-white">
                <div className="col-span-4 border-r border-black py-1">Rate</div>
                <div className="col-span-8 py-0.5">
                  <div className="text-[9px]">AMOUNT /TOPAY /PAID/DUE</div>
                  <div className="grid grid-cols-2 border-t border-black text-[9px] font-normal">
                    <span className="border-r border-black font-bold">Rs.</span>
                    <span className="font-bold">P.</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-black text-[10px] font-semibold">
                <div className="grid grid-cols-12">
                  <div className="col-span-4 border-r border-black p-0.5 text-center">{elr.charges?.rate || ''}</div>
                  <div className="col-span-8 grid grid-cols-2 p-0.5">
                    <span className="border-r border-black pl-1 font-bold">FREIGHT</span>
                    <span className="text-right pr-1">{elr.charges?.freight || ''}</span>
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-4 border-r border-black p-0.5"></div>
                  <div className="col-span-8 grid grid-cols-2 p-0.5">
                    <span className="border-r border-black pl-1 font-bold text-[9px]">SURCHARGES</span>
                    <span className="text-right pr-1 font-bold text-[9.5px]">{elr.charges?.surcharges || 'To Be'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-4 border-r border-black p-0.5"></div>
                  <div className="col-span-8 grid grid-cols-2 p-0.5">
                    <span className="border-r border-black pl-1 font-bold">HAMALI</span>
                    <span className="text-right pr-1 font-bold text-[9.5px]">{elr.charges?.hamali || 'Billed At'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-4 border-r border-black p-0.5"></div>
                  <div className="col-span-8 grid grid-cols-2 p-0.5">
                    <span className="border-r border-black pl-1 font-bold">S.T.CH.</span>
                    <span className="text-right pr-1 font-bold text-[9.5px]">{elr.charges?.stCharges || 'Mumbai'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <div className="col-span-4 border-r border-black p-0.5"></div>
                  <div className="col-span-8 grid grid-cols-2 p-0.5">
                    <span className="border-r border-black pl-1 font-bold text-[9px]">RISK CHARGE</span>
                    <span className="text-right pr-1">{elr.charges?.riskCharge || ''}</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 font-black text-[11px]">
                  <div className="col-span-4 border-r border-black p-0.5"></div>
                  <div className="col-span-8 grid grid-cols-2 p-0.5">
                    <span className="border-r border-black pl-1">Total</span>
                    <span className="text-right pr-1">{elr.charges?.total || ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Signatory Footer */}
        <div className="pt-1">
          {/* GST Payable Checkboxes */}
          <div className="flex items-center space-x-4 text-[11.5px]">
            <span className="font-bold uppercase">GST PAYABLE BY CONSIGNOR</span>
            <span className="inline-block w-4 h-4 border border-black text-center text-xs leading-3">
              {elr.gstPayableBy === 'CONSIGNOR' ? '' : ''}
            </span>

            <span className="font-bold uppercase ml-4">CONSIGNEE</span>
            <span className="inline-block w-4 h-4 border border-black text-center text-xs leading-3">
              {elr.gstPayableBy === 'CONSIGNEE' ? '' : ''}
            </span>
          </div>

          {/* Legal Notice Bottom */}
          <div className="flex items-end justify-between mt-2">
            <div className="font-bold text-[11px] uppercase tracking-wide">
              {elr.termsNotice || 'NOT RESPONSIBLE FOR LEAKAGE & BREAKAGES IN TRANSIT'}
            </div>

            {/* Signature Area Right */}
            <div className="text-right">
              <div 
                className="font-bold text-red-600 text-[12px] tracking-wide mb-6"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {company.name || 'Shree Sadguru Krupa Transport'}
              </div>
              <div 
                className="text-blue-800 font-bold text-[11px] tracking-wider"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Signature
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
