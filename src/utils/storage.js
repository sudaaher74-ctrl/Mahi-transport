// Storage management and initial pre-loaded profiles matching client's sample formats

export const DEFAULT_COMPANIES = [
  {
    id: 'mahi',
    name: 'MAHI TRANSPORT',
    subtitle: 'FLEET OWENERS & TRANSPORT CONTRACTORS',
    address: 'Shop No. 02, Sai Krupa Complex, Plot No. 55, Sector- 11,Kamothe, Navi Mumbai-410 209.',
    mobile: 'MOB-8286784878/7588168803',
    email: 'mahitransport7915@gmail.com',
    pan: 'EOKPB7914G',
    gstNote: 'GST TAX PAYABLE BY CONSIGNOR / CONSIGNEE',
    transportId: '27EOKPB7914G1Z5',
    bankDetails: {
      name: 'MAHI TRANSPORT',
      bankName: 'ABHYUDAYA CO-OP. BANK LTD.',
      branch: 'NEW PANVEL, SEC 17',
      accountNo: '018021100117278',
      ifsc: 'ABHY0065018',
      upiId: '8286784878@upi'
    },
    proprietor: 'ABHISHEK M. BELKAR',
    logoType: 'badge-mt',
    logoText: 'mt',
    logoSub: 'Mahi Transport',
    themeColor: '#e50914'
  },
  {
    id: 'sadguru',
    name: 'SHREE SADGURU KRUPA TRANSPORT',
    subtitle: 'FLEET OWNERS & TRANSPORT CONTRACTORS',
    address: 'Shop No. 02, Sai Krupa Complex, Plot No. 55, Sector- 11,Kamothe, Navi Mumbai - 410 209.',
    mobile: 'Mobile No.9702362182 / 7588168803',
    email: 'tshreesadgurukrupa@gmail.com',
    pan: 'AUKPB3418R',
    transportId: '27AUKPB3418R1Z8',
    gstNote: 'GST TAX PAYABLE BY CONSIGNOR / CONSIGNEE',
    bankDetails: {
      name: 'SHREE SADGURU KRUPA TRANSPORT',
      bankName: 'STATE BANK OF INDIA',
      branch: 'KAMOTHE, NAVI MUMBAI',
      accountNo: '38920194820',
      ifsc: 'SBIN0011032',
      upiId: '9702362182@upi'
    },
    proprietor: 'Shree Sadguru Krupa Transport',
    logoType: 'badge-skt',
    logoText: 'SKT',
    logoSub: 'Transport',
    themeColor: '#e11d48'
  }
];

export const DEFAULT_PARTIES = [
  {
    id: 'p1',
    name: 'SACHIN GAYAKHE',
    type: 'client',
    address: 'Vadape, Bhiwandi, Thane, Maharashtra 421302',
    gstNo: '',
    phone: '9820000000',
    email: ''
  },
  {
    id: 'p2',
    name: 'TRIOMPHE DIGITAL TECHNOLOGY INDIA PVT.LTD',
    type: 'consignor',
    address: '8, UNIT NO 803 PLOT NO 1, SECTOR 1, RUPA SOLITAIRE MILLENNIUM BUISNESS PARK ROAD, MAHAPE, NAVI MUMBAI, THANE, 400710',
    gstNo: '27AABCT8892A1ZV',
    phone: '',
    email: ''
  },
  {
    id: 'p3',
    name: 'AMEZON ISK3 ROYAL WEREHOUSING AND LOGI.LLP',
    type: 'consignee',
    address: 'Survey Number 45, Hissa No.4A, Village Pise Village, Aamne Post, BHIWANDI, MAHARASHTRA 421302',
    gstNo: '27AAGCA1234M1Z2',
    phone: '',
    email: ''
  }
];

export const DEFAULT_BILLS = [
  {
    id: 'bill-demo-001',
    billNo: '022/2025-26',
    date: '2026-03-02',
    companyId: 'mahi',
    clientName: 'SACHIN GAYAKHE',
    accountNo: '',
    items: [
      {
        id: '1',
        date: '31/01/2026',
        vehicleNo: 'MH46BB7915',
        particulars: 'VADAPE TO NHAWA SHEWA',
        size: '1*20FT CBT',
        advance: '',
        charges: '',
        amount: 4500
      },
      {
        id: '2',
        date: '26/02/2026',
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
  }
];

export const DEFAULT_ELRS = [
  {
    id: 'elr-demo-001',
    lrNo: '71',
    date: '2026-06-25',
    companyId: 'sadguru',
    cautionText: "The Consignment will not be detained/delivered re-routed or rebooked without consignee Bank's written permission",
    deliveryAddress: '',
    insurance: {
      hasInsurance: false,
      company: '',
      policyNoOrDate: '',
      amount: '',
      risk: ''
    },
    consignor: {
      name: 'TRIOMPHE DIGITAL TECHNOLOGY INDIA PVT.LTD',
      address: '8, UNIT NO 803 PLOT NO 1, SECTOR 1, RUPA SOLITAIRE MILLENNIUM BUISNESS PARK ROAD,\nMAHAPE, NAVI MUMBAI, THANE, 400710',
      gstNo: ''
    },
    consignee: {
      name: 'AMEZON ISK3 ROYAL WEREHOUSING AND LOGI.LLP',
      address: 'Survey Number 45\nHissa No.4A, Village Pise Village, Aamne Post\nBHIWANDI, MAHARASHTRA 421302',
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
        description: 'PICKUP\n\nInvoice Date 71',
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
    gstPayableBy: 'CONSIGNOR', // 'CONSIGNOR' or 'CONSIGNEE'
    termsNotice: 'NOT RESPONSIBLE FOR LEAKAGE & BREAKAGES IN TRANSIT',
    specialNotice: 'The Consignment Covered by this set of Special Lorry Receipt From shall be store at the destination under the control of the Transport Operator and shall be delivered to or the of the Consignee Banks whose name is mentioned in the Lorry Receipt. It will under no circumstances be delivered to any one withoutthe written authority from the Consignee Banks of its order enclosed on the Consignee Copy or on a separate Letter of Authority',
    createdAt: new Date().toISOString()
  }
];

// Helper functions for LocalStorage
const KEYS = {
  COMPANIES: 'transport_companies_v1',
  BILLS: 'transport_bills_v1',
  ELRS: 'transport_elrs_v1',
  PARTIES: 'transport_parties_v1',
  ACTIVE_COMPANY: 'transport_active_company_id'
};

export const getStorageData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch (err) {
    console.error('Error reading storage:', key, err);
    return fallback;
  }
};

export const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving storage:', key, err);
  }
};

export const getCompanies = () => getStorageData(KEYS.COMPANIES, DEFAULT_COMPANIES);
export const saveCompanies = (companies) => setStorageData(KEYS.COMPANIES, companies);

export const getBills = () => getStorageData(KEYS.BILLS, DEFAULT_BILLS);
export const saveBills = (bills) => setStorageData(KEYS.BILLS, bills);

export const getElrs = () => getStorageData(KEYS.ELRS, DEFAULT_ELRS);
export const saveElrs = (elrs) => setStorageData(KEYS.ELRS, elrs);

export const getParties = () => getStorageData(KEYS.PARTIES, DEFAULT_PARTIES);
export const saveParties = (parties) => setStorageData(KEYS.PARTIES, parties);

export const getActiveCompanyId = () => {
  try {
    return localStorage.getItem(KEYS.ACTIVE_COMPANY) || 'mahi';
  } catch {
    return 'mahi';
  }
};

export const setActiveCompanyId = (id) => {
  try {
    localStorage.setItem(KEYS.ACTIVE_COMPANY, id);
  } catch (e) {
    console.error(e);
  }
};
