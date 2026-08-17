export type TransactionType = 'TOPUP' | 'CHARGING' | 'REFUND';

export type TransactionStatus = 'SUCCESS' | 'PENDING' | 'FAILED';

export interface Transaction {
  id: string;

  type: TransactionType;

  title: string;

  description: string;

  amount: number;

  status: TransactionStatus;

  createdAt: string;
}

export let transactions: Transaction[] = [
  {
    id: 'TXN-001',

    type: 'TOPUP',

    title: 'Wallet Top Up',

    description: 'Mobile Banking',

    amount: 500,

    status: 'SUCCESS',

    createdAt: new Date().toLocaleString(),
  },

  {
    id: 'TXN-002',

    type: 'CHARGING',

    title: 'Charging Session',

    description: 'SunPower Bangna',

    amount: -150,

    status: 'SUCCESS',

    createdAt: new Date().toLocaleString(),
  },
];

export function addTransaction(transaction: Transaction) {
  transactions = [transaction, ...transactions];
}

export function getTransactions() {
  return transactions;
}

export function clearTransactions() {
  transactions = [];
}
