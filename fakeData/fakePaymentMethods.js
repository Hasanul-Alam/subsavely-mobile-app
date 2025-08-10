const fakePaymentMethods = [
  // Cards
  {
    id: 1,
    type: "card",
    cardHolderName: "John Doe",
    cardNumber: "4539 4512 0398 7356",
    expiry: "12/27",
    cvv: "482",
  },
  {
    id: 2,
    type: "card",
    cardHolderName: "Emily Carter",
    cardNumber: "4716 9230 1928 3940",
    expiry: "05/28",
    cvv: "135",
  },
  {
    id: 3,
    type: "card",
    cardHolderName: "Liam Smith",
    cardNumber: "6011 5920 3948 2754",
    expiry: "09/26",
    cvv: "902",
  },

  // Bank Accounts
  {
    id: 4,
    type: "bank_account",
    accountHolderName: "Sarah Johnson",
    bankName: "First National Bank",
    accountNumber: "1029384756",
  },
  {
    id: 5,
    type: "bank_account",
    accountHolderName: "Michael Brown",
    bankName: "Global Trust Bank",
    accountNumber: "9384729103",
  },
  {
    id: 6,
    type: "bank_account",
    accountHolderName: "Olivia Martinez",
    bankName: "Heritage Savings",
    accountNumber: "7283946150",
  },

  // Mobile Banking
  {
    id: 7,
    type: "mobile_banking",
    accountOwnerName: "James Wilson",
    provider: "PayWave",
    mobileNumber: "+1 555-982-3045",
  },
  {
    id: 8,
    type: "mobile_banking",
    accountOwnerName: "Sophia Lee",
    provider: "QuickPay",
    mobileNumber: "+1 555-382-1094",
  },
  {
    id: 9,
    type: "mobile_banking",
    accountOwnerName: "Daniel Kim",
    provider: "MobiCash",
    mobileNumber: "+1 555-745-2398",
  },
  {
    id: 10,
    type: "mobile_banking",
    accountOwnerName: "Ava Thompson",
    provider: "EasyMoney",
    mobileNumber: "+1 555-113-5840",
  },
];

export default fakePaymentMethods;
