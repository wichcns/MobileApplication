import { createMMKV } from 'react-native-mmkv';

import { ChargingSession } from '../types/Charging';

export type WalletTransactionType =
  | 'TOP_UP'
  | 'CHARGING'
  | 'REFUND'
  | 'ADJUSTMENT';

export type WalletTransaction = {
  id: string;

  type: WalletTransactionType;

  amount: number;

  balanceBefore: number;

  balanceAfter: number;

  description: string;

  date: string;

  // EV Information
  sessionId?: string;
  stationName?: string;
  chargerName?: string;
  energy?: number;
  paymentMethod?: string;
};

const storage = createMMKV();

const WALLET_KEY = 'wallet_data';

type WalletData = {
  balance: number;
  transactions: WalletTransaction[];
};

// ==========================================================
// LOAD WALLET
// ==========================================================

function loadWallet(): WalletData {
  const json = storage.getString(WALLET_KEY);

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      console.log('Load Wallet Error:', error);
    }
  }

  return {
    balance: 500,
    transactions: [],
  };
}

// ==========================================================
// SAVE WALLET
// ==========================================================

function saveWallet() {
  storage.set(WALLET_KEY, JSON.stringify(wallet));
}

// ==========================================================
// WALLET DATA
// ==========================================================

export let wallet: WalletData = loadWallet();

// ==========================================================
// ADD TRANSACTION
// ==========================================================

function addTransaction(transaction: WalletTransaction) {
  wallet.transactions.unshift(transaction);

  saveWallet();
}

// ==========================================================
// UPDATE WALLET BALANCE
// ==========================================================

export function updateWalletBalance(amount: number) {
  wallet.balance = Number((wallet.balance + amount).toFixed(2));

  saveWallet();
}

// ==========================================================
// TOP UP WALLET
// ==========================================================

export function topUpWallet(amount: number) {
  const before = wallet.balance;

  updateWalletBalance(amount);

  addTransaction({
    id: `TOPUP-${Date.now()}`,

    type: 'TOP_UP',

    amount,

    balanceBefore: before,

    balanceAfter: wallet.balance,

    description: 'Wallet Top Up',

    date: new Date().toLocaleString(),
  });
}

// ==========================================================
// CHARGING PAYMENT
// ==========================================================
// รองรับทั้ง:
//
// deductWallet(chargingSession)
//
// และ
//
// deductWallet(chargingSession, finalAmount)
//
// กรณีมี Coupon จะใช้ finalAmount
// ==========================================================

export function deductWallet(
  session: ChargingSession,
  amount: number = session.total,
): boolean {
  const before = wallet.balance;

  console.log('Wallet Balance:', wallet.balance);

  console.log('Charging Amount:', amount);

  // ========================================================
  // CHECK BALANCE
  // ========================================================

  if (wallet.balance < amount) {
    console.log('Insufficient Balance');

    return false;
  }

  // ========================================================
  // DEDUCT WALLET
  // ========================================================

  updateWalletBalance(-amount);

  // ========================================================
  // CREATE TRANSACTION
  // ========================================================

  addTransaction({
    id: `CHG-${Date.now()}`,

    type: 'CHARGING',

    amount: -amount,

    balanceBefore: before,

    balanceAfter: wallet.balance,

    description: 'EV Charging Payment',

    date: new Date().toLocaleString(),

    // EV Information
    sessionId: session.sessionId,

    stationName: session.stationName,

    chargerName: session.chargerName,

    energy: session.energy,

    paymentMethod: 'Wallet',
  });

  return true;
}

// ==========================================================
// REFUND
// ==========================================================

export function refundWallet(amount: number) {
  const before = wallet.balance;

  updateWalletBalance(amount);

  addTransaction({
    id: `REFUND-${Date.now()}`,

    type: 'REFUND',

    amount,

    balanceBefore: before,

    balanceAfter: wallet.balance,

    description: 'Charging Refund',

    date: new Date().toLocaleString(),
  });
}

// ==========================================================
// RESET WALLET
// ==========================================================

export function resetWallet() {
  wallet.balance = 500;

  wallet.transactions = [];

  saveWallet();
}
