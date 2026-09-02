import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { numberToWordsIndian } from '../utils/numberToWords';
import logoImg from '../assets/logo.png';

export default function BillFormat({ bill, company, id = "printable-bill-document" }) {
  if (!bill || !company) return null;

  // Calculate totals
  const totalAmount = bill.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const lessAdvance = Number(bill.lessAdvance) || 0;
  const balance = totalAmount - lessAdvance;
  const amountInWords = numberToWordsIndian(balance > 0 ? balance : totalAmount);

  // UPI payment URI for QR Code
  const upiId = company.bankDetails?.upiId || '8286784878@upi';
  const payeeName = company.name || 'MAHI TRANSPORT';
  const qrValue = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${balance > 0 ? balance : ''}&cu=INR&tn=${encodeURIComponent('Bill No ' + bill.billNo)}`;

  return (
    <div 
      id={id}
      className="print-page-wrapper bg-white text-black font-serif text-[12px] leading-tight select-text"
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
      {/* Outer Border Box matching physical reference */}
      <div 
        className="border border-black flex flex-col justify-between"
        style={{
          width: '100%',
          minHeight: '276mm',
          boxSizing: 'border-box'
        }}
      >
        {/* TOP SECTION: Header, Title, Parties, Table */}
        <div className="flex-1 flex flex-col">
          
          {/* 1. Header (Logo, Company Name, Address, Contact) */}
          <div className="pt-2 pb-2 px-3 flex items-center justify-between">
            {/* Logo on Left */}
            <div className="w-[105px] flex flex-col items-center justify-center">
              {company.logoType === 'badge-skt' ? (
                <div className="w-16 h-12 rounded-full border-2 border-red-600 flex items-center justify-center bg-black text-white font-black text-lg tracking-wider">
                  <span className="text-red-500 font-extrabold">S</span>KT
                </div>
              ) : (
                <img 
                  src={company.logoUrl || logoImg} 
                  alt="Mahi Transport Logo" 
                  className="w-[92px] h-auto object-contain"
                />
              )}
            </div>

            {/* Centered Company Title & Address */}
            <div className="flex-1 text-center px-1">
              <h1 
                className="text-[28px] leading-tight font-black uppercase tracking-wider"
                style={{
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                  color: '#ff0000',
                  textShadow: '1px 1px 0 #000, -0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000',
                  letterSpacing: '0.04em'
                }}
              >
                {company.name || 'MAHI TRANSPORT'}
              </h1>
              
              <div 
                className="text-[12px] font-black tracking-wider text-black mt-1 uppercase"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {company.subtitle || 'FLEET OWENERS & TRANSPORT CONTRACTORS'}
              </div>
              
              <div className="text-[10.5px] font-normal text-black mt-0.5 leading-snug">
                {company.address}
              </div>
              
              <div className="text-[10.5px] font-normal text-black mt-0.5">
                {company.mobile} Email id : {company.email}
              </div>
            </div>

            {/* Spacer Right */}
            <div className="w-[60px]"></div>
          </div>

          {/* 2. INVOICE Title Banner */}
          <div 
            className="border-t border-b border-black py-1 text-center"
            style={{ backgroundColor: '#fde7da' }}
          >
            <span 
              className="font-bold text-[15px] tracking-[0.2em] text-black uppercase"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              INVOICE
            </span>
          </div>

          {/* 3. M/S Party & Bill No / Date Grid */}
          <div className="grid grid-cols-12 border-b border-black text-[11.5px]">
            {/* Left Party Box */}
            <div className="col-span-8 p-1.5 px-2 border-r border-black flex flex-col justify-between min-h-[50px]">
              <div className="flex items-baseline">
                <span className="font-bold whitespace-nowrap mr-1">M/S :</span>
                <span className="font-bold text-[12px] uppercase">
                  {bill.clientName || 'SACHIN GAYAKHE'}
                </span>
              </div>
              <div className="flex items-baseline mt-2">
                <span className="font-bold whitespace-nowrap mr-1">A/C :</span>
                <span className="font-normal">{bill.accountNo || ''}</span>
              </div>
            </div>

            {/* Right Bill No & Date Box */}
            <div className="col-span-4 flex flex-col">
              <div className="p-1 px-2 border-b border-black flex items-center">
                <span className="font-bold text-[11px] mr-2">BILL NO :</span>
                <span className="font-bold text-[11.5px]">{bill.billNo}</span>
              </div>
              <div className="p-1 px-2 flex items-center">
                <span className="font-bold text-[11px] mr-2">DATE :</span>
                <span className="font-bold text-[11.5px]">
                  {bill.date ? (bill.date.includes('-') ? bill.date.split('-').reverse().join('/') : bill.date) : ''}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Main Particulars Table with Continuous Vertical Borders */}
          <div className="flex-1 flex flex-col relative">
            {/* Table Header */}
            <div className="flex border-b border-black text-center font-bold text-[11px] bg-white">
              <div className="w-[13%] border-r border-black py-1 px-1">Date</div>
              <div className="w-[15%] border-r border-black py-1 px-1">Vehicle No.</div>
              <div className="w-[32%] border-r border-black py-1 px-1">Perticulars</div>
              <div className="w-[14%] border-r border-black py-1 px-1">Size</div>
              <div className="w-[8%] border-r border-black py-1 px-0.5 text-[10.5px]">Advance</div>
              <div className="w-[8%] border-r border-black py-1 px-0.5 text-[10.5px]">Charges</div>
              <div className="w-[10%] border-r-0 py-1 px-1">Amount</div>
            </div>

            {/* Table Body with uninterrupted vertical column lines extending all the way down */}
            <div className="flex-1 flex relative text-[11px] min-h-[380px]">
              {/* Column 1: Date */}
              <div className="w-[13%] border-r border-black py-2 px-1 text-center flex flex-col space-y-4 font-normal">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="h-5 flex items-center justify-center whitespace-nowrap">{item.date}</div>
                ))}
              </div>

              {/* Column 2: Vehicle No */}
              <div className="w-[15%] border-r border-black py-2 px-1 text-center flex flex-col space-y-4 font-normal uppercase">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="h-5 flex items-center justify-center font-semibold whitespace-nowrap">{item.vehicleNo}</div>
                ))}
              </div>

              {/* Column 3: Perticulars */}
              <div className="w-[32%] border-r border-black py-2 px-1 text-center flex flex-col space-y-4 font-normal uppercase">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="h-5 flex items-center justify-center">{item.particulars}</div>
                ))}
              </div>

              {/* Column 4: Size */}
              <div className="w-[14%] border-r border-black py-2 px-1 text-center flex flex-col space-y-4 font-normal uppercase">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="h-5 flex items-center justify-center whitespace-nowrap">{item.size}</div>
                ))}
              </div>

              {/* Column 5: Advance */}
              <div className="w-[8%] border-r border-black py-2 px-0.5 text-center flex flex-col space-y-4 font-normal">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="h-5 flex items-center justify-center">{item.advance || ''}</div>
                ))}
              </div>

              {/* Column 6: Charges */}
              <div className="w-[8%] border-r border-black py-2 px-0.5 text-center flex flex-col space-y-4 font-normal">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="h-5 flex items-center justify-center">{item.charges || ''}</div>
                ))}
              </div>

              {/* Column 7: Amount */}
              <div className="w-[10%] border-r-0 py-2 px-1 text-right flex flex-col space-y-4 font-normal">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="h-5 flex items-center justify-end pr-1 font-semibold">
                    {item.amount ? Number(item.amount).toFixed(0) : ''}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Totals, Words, Bank Details, QR & Signature */}
        <div className="border-t border-black">
          
          {/* 5. Total, Less Advance, Balance & Amount in Words */}
          <div className="grid grid-cols-12 border-b border-black text-[12px]">
            {/* Left: Words */}
            <div className="col-span-7 p-2 flex flex-col justify-between border-r border-black min-h-[58px]">
              <div className="font-bold text-[12px]">Rs :</div>
              <div className="text-center font-bold text-[11.5px] uppercase tracking-wide my-auto py-1">
                {amountInWords}
              </div>
            </div>

            {/* Right: Totals Grid */}
            <div className="col-span-5 text-[12px]">
              <div className="grid grid-cols-12 border-b border-black p-0.5 px-2" style={{ backgroundColor: '#fde7da' }}>
                <span className="col-span-7 font-bold">TOTAL</span>
                <span className="col-span-5 font-bold text-right">{totalAmount}</span>
              </div>
              <div className="grid grid-cols-12 border-b border-black p-0.5 px-2" style={{ backgroundColor: '#fde7da' }}>
                <span className="col-span-7 font-bold">LESS ADV.</span>
                <span className="col-span-5 font-bold text-right">{lessAdvance}</span>
              </div>
              <div className="grid grid-cols-12 p-0.5 px-2" style={{ backgroundColor: '#fde7da' }}>
                <span className="col-span-7 font-bold">BALANCE</span>
                <span className="col-span-5 font-bold text-right">{balance}</span>
              </div>
            </div>
          </div>

          {/* 6. PAN & GST Line */}
          <div className="border-b border-black px-2 py-0.5 text-[10.5px]">
            <div className="font-bold">
              PAN NO. <span className="font-bold uppercase">{company.pan}</span>
            </div>
          </div>
          
          <div className="border-b border-black px-2 py-0.5 text-[10.5px]">
            <div className="font-bold uppercase">
              {company.gstNote || 'GST TAX PAYABLE BY CONSIGNOR / CONSIGNEE'}
            </div>
          </div>

          {/* 7. Bank Details, QR Code & Proprietor Signature Footer */}
          <div className="grid grid-cols-12 text-[10px] min-h-[85px]">
            {/* Left Bank Details */}
            <div className="col-span-5 p-1.5 px-2 border-r border-black leading-[1.3] flex flex-col justify-center">
              <div className="font-bold underline mb-0.5">BANK DETAILS</div>
              <div className="font-bold">NAME : {company.bankDetails?.name || company.name}</div>
              <div className="font-bold">BANK NAME : {company.bankDetails?.bankName}</div>
              <div className="font-bold">BRANCH - {company.bankDetails?.branch}</div>
              <div className="font-bold">A/C NO. : {company.bankDetails?.accountNo}</div>
              <div className="font-bold">RTGS/NEFT/IFSC : {company.bankDetails?.ifsc}</div>
            </div>

            {/* Center UPI QR Code */}
            <div className="col-span-2 p-1 border-r border-black flex flex-col items-center justify-center">
              <div className="p-1 bg-white">
                <QRCodeSVG 
                  value={qrValue} 
                  size={62} 
                  level="M"
                  includeMargin={false}
                />
              </div>
            </div>

            {/* Right Proprietor Signature */}
            <div className="col-span-5 p-2 flex flex-col justify-between items-center text-center">
              <div className="w-full pt-1">
                <div 
                  className="font-bold text-[12px] tracking-wide uppercase"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  {company.proprietor || 'ABHISHEK M. BELKAR'}
                </div>
              </div>
              <div 
                className="font-bold text-[11.5px] tracking-wide mb-1"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Proprietor
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
