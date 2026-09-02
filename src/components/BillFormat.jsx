import React from 'react';
import { numberToWordsIndian } from '../utils/numberToWords';
import logoImg from '../assets/logo.png';
import scannerImg from '../assets/scanner.png';

export default function BillFormat({ bill, company, id = "printable-bill-document" }) {
  if (!bill || !company) return null;

  // Calculate totals
  const totalAmount = bill.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const lessAdvance = Number(bill.lessAdvance) || 0;
  const balance = totalAmount - lessAdvance;
  const amountInWords = numberToWordsIndian(balance > 0 ? balance : totalAmount);

  return (
    <div 
      id={id}
      className="print-page-wrapper bg-white text-black font-serif text-[11.5px] leading-tight select-text"
      style={{
        width: '100%',
        maxWidth: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '6mm 6mm',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        letterSpacing: 'normal'
      }}
    >
      {/* Outer Border Box filling the full A4 height without empty trailing bottom space */}
      <div 
        className="border border-black flex flex-col justify-between"
        style={{
          width: '100%',
          minHeight: '283mm',
          boxSizing: 'border-box'
        }}
      >
        {/* TOP & MIDDLE SECTION: Header, Title, Parties, Table */}
        <div className="flex-1 flex flex-col">
          
          {/* 1. Header (Logo, Company Name, Address, Contact) */}
          <div className="pt-2.5 pb-2 px-3 flex items-center justify-between">
            {/* Logo on Left */}
            <div className="w-[95px] flex flex-col items-center justify-center">
              {company.logoType === 'badge-skt' ? (
                <div className="w-16 h-12 rounded-full border-2 border-red-600 flex items-center justify-center bg-black text-white font-bold text-lg">
                  <span className="text-red-500 font-extrabold">S</span>KT
                </div>
              ) : (
                <img 
                  src={company.logoUrl || logoImg} 
                  alt="Mahi Transport Logo" 
                  width={84}
                  className="w-[84px] h-auto object-contain"
                  style={{
                    width: '84px',
                    maxWidth: '84px',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              )}
            </div>

            {/* Centered Company Title & Address */}
            <div className="flex-1 text-center px-2">
              <h1 
                className="text-[25px] leading-tight font-extrabold uppercase text-red-600 mb-1"
                style={{
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                  letterSpacing: '0.02em'
                }}
              >
                {company.name || 'MAHI TRANSPORT'}
              </h1>
              
              <div 
                className="text-[11.5px] font-bold text-black mb-1 uppercase"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {company.subtitle || 'FLEET OWENERS & TRANSPORT CONTRACTORS'}
              </div>
              
              <div className="text-[10px] font-normal text-black mb-0.5 leading-snug">
                {company.address}
              </div>
              
              <div className="text-[10px] font-normal text-black">
                <span>{company.mobile}</span>
                {company.email && (
                  <span className="ml-2">Email id : {company.email}</span>
                )}
              </div>
            </div>

            {/* Spacer Right for symmetrical balance */}
            <div className="w-[50px]"></div>
          </div>

          {/* 2. INVOICE Title Banner */}
          <div 
            className="border-t border-b border-black py-1.5 text-center"
            style={{ backgroundColor: '#fde7da' }}
          >
            <span 
              className="font-bold text-[14px] text-black uppercase block tracking-wider"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              INVOICE
            </span>
          </div>

          {/* 3. M/S Party & Bill No / Date Grid */}
          <div className="grid grid-cols-12 border-b border-black text-[11.5px]">
            {/* Left Party Box */}
            <div className="col-span-8 p-2 px-3 border-r border-black flex flex-col justify-between min-h-[50px]">
              <div className="flex items-baseline space-x-1.5">
                <span className="font-bold whitespace-nowrap">M/S :</span>
                <span className="font-bold text-[12px] uppercase">
                  {bill.clientName || 'SACHIN GAYAKHE'}
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5 mt-1.5">
                <span className="font-bold whitespace-nowrap">A/C :</span>
                <span className="font-normal">{bill.accountNo || ''}</span>
              </div>
            </div>

            {/* Right Bill No & Date Box */}
            <div className="col-span-4 flex flex-col">
              <div className="py-1.5 px-3 border-b border-black flex items-center justify-between">
                <span className="font-bold text-[11px]">BILL NO :</span>
                <span className="font-bold text-[11.5px]">{bill.billNo}</span>
              </div>
              <div className="py-1.5 px-3 flex items-center justify-between">
                <span className="font-bold text-[11px]">DATE :</span>
                <span className="font-bold text-[11.5px]">
                  {bill.date ? (bill.date.includes('-') ? bill.date.split('-').reverse().join('/') : bill.date) : ''}
                </span>
              </div>
            </div>
          </div>

          {/* 4. Main Particulars Table with Continuous Vertical Lines running full length to bottom */}
          <div className="flex-1 flex flex-col relative">
            {/* Table Header */}
            <div className="flex border-b border-black text-center font-bold text-[11px] bg-white">
              <div className="w-[12%] border-r border-black py-1.5 px-1 flex items-center justify-center">Date</div>
              <div className="w-[15%] border-r border-black py-1.5 px-1 flex items-center justify-center">Vehicle No.</div>
              <div className="w-[35%] border-r border-black py-1.5 px-1 flex items-center justify-center">Perticulars</div>
              <div className="w-[12%] border-r border-black py-1.5 px-1 flex items-center justify-center">Size</div>
              <div className="w-[8%] border-r border-black py-1.5 px-0.5 flex items-center justify-center text-[10px]">Advance</div>
              <div className="w-[8%] border-r border-black py-1.5 px-0.5 flex items-center justify-center text-[10px]">Charges</div>
              <div className="w-[10%] border-r-0 py-1.5 px-1 flex items-center justify-center">Amount</div>
            </div>

            {/* Table Body - flex-1 stretches to connect seamlessly to bottom with zero empty space */}
            <div className="flex-1 flex relative text-[11px] min-h-[440px]">
              {/* Column 1: Date */}
              <div className="w-[12%] border-r border-black py-2.5 px-1 text-center flex flex-col space-y-3 font-normal">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="min-h-[20px] flex items-center justify-center whitespace-nowrap text-[10.5px]">{item.date}</div>
                ))}
              </div>

              {/* Column 2: Vehicle No */}
              <div className="w-[15%] border-r border-black py-2.5 px-1 text-center flex flex-col space-y-3 font-semibold uppercase">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="min-h-[20px] flex items-center justify-center whitespace-nowrap text-[10.5px]">{item.vehicleNo}</div>
                ))}
              </div>

              {/* Column 3: Perticulars */}
              <div className="w-[35%] border-r border-black py-2.5 px-2 text-center flex flex-col space-y-3 font-normal uppercase">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="min-h-[20px] flex items-center justify-center whitespace-nowrap text-[10.5px]">{item.particulars}</div>
                ))}
              </div>

              {/* Column 4: Size */}
              <div className="w-[12%] border-r border-black py-2.5 px-1 text-center flex flex-col space-y-3 font-normal uppercase">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="min-h-[20px] flex items-center justify-center whitespace-nowrap text-[10.5px]">{item.size}</div>
                ))}
              </div>

              {/* Column 5: Advance */}
              <div className="w-[8%] border-r border-black py-2.5 px-0.5 text-center flex flex-col space-y-3 font-normal">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="min-h-[20px] flex items-center justify-center text-[10.5px]">{item.advance || ''}</div>
                ))}
              </div>

              {/* Column 6: Charges */}
              <div className="w-[8%] border-r border-black py-2.5 px-0.5 text-center flex flex-col space-y-3 font-normal">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="min-h-[20px] flex items-center justify-center text-[10.5px]">{item.charges || ''}</div>
                ))}
              </div>

              {/* Column 7: Amount */}
              <div className="w-[10%] border-r-0 py-2.5 px-2 text-right flex flex-col space-y-3 font-semibold">
                {bill.items.map((item, idx) => (
                  <div key={idx} className="min-h-[20px] flex items-center justify-end text-[10.5px]">
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
          <div className="grid grid-cols-12 border-b border-black text-[11.5px]">
            {/* Left: Words */}
            <div className="col-span-7 p-2 px-3 flex flex-col justify-between border-r border-black min-h-[62px]">
              <div className="font-bold text-[11.5px]">Rs :</div>
              <div className="text-center font-bold text-[11.5px] uppercase leading-snug my-auto py-1">
                {amountInWords}
              </div>
            </div>

            {/* Right: Totals Grid */}
            <div className="col-span-5 text-[11.5px]">
              <div className="grid grid-cols-12 border-b border-black py-1.5 px-3 items-center" style={{ backgroundColor: '#fde7da' }}>
                <span className="col-span-7 font-bold">TOTAL</span>
                <span className="col-span-5 font-bold text-right">{totalAmount}</span>
              </div>
              <div className="grid grid-cols-12 border-b border-black py-1.5 px-3 items-center" style={{ backgroundColor: '#fde7da' }}>
                <span className="col-span-7 font-bold">LESS ADV.</span>
                <span className="col-span-5 font-bold text-right">{lessAdvance}</span>
              </div>
              <div className="grid grid-cols-12 py-1.5 px-3 items-center" style={{ backgroundColor: '#fde7da' }}>
                <span className="col-span-7 font-bold">BALANCE</span>
                <span className="col-span-5 font-bold text-right">{balance}</span>
              </div>
            </div>
          </div>

          {/* 6. PAN & GST Line with proper padding so text never collides with borders */}
          <div className="border-b border-black py-1 px-3 text-[10.5px]">
            <div className="font-bold leading-normal">
              PAN NO. : <span className="font-bold uppercase ml-1">{company.pan}</span>
            </div>
          </div>
          
          <div className="border-b border-black py-1 px-3 text-[10.5px]">
            <div className="font-bold uppercase leading-normal">
              {company.gstNote || 'GST TAX PAYABLE BY CONSIGNOR / CONSIGNEE'}
            </div>
          </div>

          {/* 7. Bank Details, QR Code & Proprietor Signature Footer */}
          <div className="grid grid-cols-12 text-[10.5px] min-h-[90px]">
            {/* Left Bank Details */}
            <div className="col-span-5 p-2 px-3 border-r border-black leading-snug flex flex-col justify-center space-y-0.5">
              <div className="font-bold underline mb-0.5">BANK DETAILS</div>
              <div className="font-bold">NAME : {company.bankDetails?.name || company.name}</div>
              <div className="font-bold">BANK NAME : {company.bankDetails?.bankName}</div>
              <div className="font-bold">BRANCH - {company.bankDetails?.branch}</div>
              <div className="font-bold">A/C NO. : {company.bankDetails?.accountNo}</div>
              <div className="font-bold">RTGS/NEFT/IFSC : {company.bankDetails?.ifsc}</div>
            </div>

            {/* Center UPI QR Code Scanner */}
            <div className="col-span-2 p-1 border-r border-black flex flex-col items-center justify-center">
              <div className="p-0.5 bg-white flex items-center justify-center">
                <img 
                  src={company.qrUrl || scannerImg} 
                  alt="Payment QR Scanner" 
                  width={66}
                  height={66}
                  className="w-[66px] h-[66px] object-contain"
                  style={{
                    width: '66px',
                    height: '66px',
                    maxWidth: '66px',
                    maxHeight: '66px',
                    display: 'block'
                  }}
                />
              </div>
            </div>

            {/* Right Proprietor Signature */}
            <div className="col-span-5 p-2 px-3 flex flex-col justify-between items-center text-center">
              <div className="w-full pt-1">
                <div 
                  className="font-bold text-[12px] uppercase"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  {company.proprietor || 'ABHISHEK M. BELKAR'}
                </div>
              </div>
              <div 
                className="font-bold text-[11.5px] pb-0.5"
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
