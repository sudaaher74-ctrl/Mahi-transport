// Indian Number to Words Converter

const singleDigits = [
  '', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE',
  'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN',
  'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'
];

const tens = [
  '', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'
];

function convertBelowThousand(num) {
  let str = '';
  if (num >= 100) {
    str += singleDigits[Math.floor(num / 100)] + ' HUNDRED ';
    num %= 100;
  }
  if (num >= 20) {
    str += tens[Math.floor(num / 10)] + ' ';
    num %= 10;
  }
  if (num > 0) {
    str += singleDigits[num] + ' ';
  }
  return str.trim();
}

export function numberToWordsIndian(amount) {
  const num = Number(amount);
  if (isNaN(num) || num === 0) return 'ZERO ONLY';

  const absNum = Math.abs(num);
  const rupees = Math.floor(absNum);
  const paise = Math.round((absNum - rupees) * 100);

  let words = '';

  const crore = Math.floor(rupees / 10000000);
  let remainder = rupees % 10000000;

  const lakh = Math.floor(remainder / 100000);
  remainder = remainder % 100000;

  const thousand = Math.floor(remainder / 1000);
  remainder = remainder % 1000;

  const hundred = remainder;

  if (crore > 0) {
    words += convertBelowThousand(crore) + ' CRORE ';
  }
  if (lakh > 0) {
    words += convertBelowThousand(lakh) + ' LAKH ';
  }
  if (thousand > 0) {
    words += convertBelowThousand(thousand) + ' THOUSAND ';
  }
  if (hundred > 0) {
    words += convertBelowThousand(hundred) + ' ';
  }

  words = words.trim();

  if (paise > 0) {
    const paiseWords = convertBelowThousand(paise);
    if (words) {
      words += ' AND ' + paiseWords + ' PAISE';
    } else {
      words = paiseWords + ' PAISE';
    }
  }

  return (words + ' ONLY').replace(/\s+/g, ' ');
}

export function formatIndianCurrency(amount) {
  const num = Number(amount);
  if (isNaN(num)) return '0.00';
  return num.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: num % 1 !== 0 ? 2 : 0
  });
}
