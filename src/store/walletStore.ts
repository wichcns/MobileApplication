import { createMMKV } from 'react-native-mmkv';

import { ChargingSession } from '../types/Charging';

// ============================================================
// TYPES
// ============================================================

export type WalletTransactionType =
  | 'TOP_UP'
  | 'CHARGING'
  | 'REFUND'
  | 'ADJUSTMENT';

export type WalletTransaction = {
  id: string;

  type: WalletTransactionType;

  /**
   * จำนวนเงินของ Transaction
   *
   * TOP_UP      = positive
   * REFUND      = positive
   * ADJUSTMENT  = สามารถ positive / negative
   * CHARGING    = negative
   */
  amount: number;

  /**
   * Wallet balance ก่อน Transaction
   */
  balanceBefore: number;

  /**
   * Wallet balance หลัง Transaction
   */
  balanceAfter: number;

  /**
   * รายละเอียด Transaction
   */
  description: string;

  /**
   * Transaction timestamp
   */
  date: string;

  // ==========================================================
  // EV INFORMATION
  // ==========================================================

  sessionId?: string;

  stationName?: string;

  chargerName?: string;

  energy?: number;

  paymentMethod?: string;
};

// ============================================================
// WALLET DATA
// ============================================================

type WalletData = {
  balance: number;

  transactions: WalletTransaction[];
};

// ============================================================
// MMKV
// ============================================================

const storage = createMMKV();

const WALLET_KEY = 'wallet_data';

// ============================================================
// LOAD WALLET
// ============================================================

function loadWallet(): WalletData {
  const json = storage.getString(WALLET_KEY);

  // ----------------------------------------------------------
  // ไม่มีข้อมูล Wallet
  // ----------------------------------------------------------
  //
  // IMPORTANT:
  //
  // ไม่ใส่ Mock Balance เช่น 500
  //
  // เพราะ Phase 1 เราจะไม่สร้างยอดเงินจริงปลอม
  //
  // Backend จะเป็นแหล่งข้อมูลจริงในขั้นตอนถัดไป
  //
  // ----------------------------------------------------------

  if (!json) {
    return {
      balance: 0,
      transactions: [],
    };
  }

  try {
    const parsed = JSON.parse(json);

    // --------------------------------------------------------
    // Validate Data
    // --------------------------------------------------------

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof parsed.balance !== 'number' ||
      !Array.isArray(parsed.transactions)
    ) {
      console.log('Invalid Wallet Data');

      return {
        balance: 0,
        transactions: [],
      };
    }

    return {
      balance: Number(parsed.balance.toFixed(2)),
      transactions: parsed.transactions,
    };
  } catch (error) {
    console.log('Load Wallet Error:', error);

    return {
      balance: 0,
      transactions: [],
    };
  }
}

// ============================================================
// SAVE WALLET
// ============================================================

function saveWallet() {
  storage.set(WALLET_KEY, JSON.stringify(wallet));
}

// ============================================================
// WALLET DATA
// ============================================================
//
// Load จาก MMKV
//
// ไม่มี Mock Balance
//
// ถ้าไม่มีข้อมูล:
// balance = 0
//
// ============================================================

export let wallet: WalletData = loadWallet();

// ============================================================
// NORMALIZE AMOUNT
// ============================================================

function normalizeAmount(amount: number): number {
  if (!Number.isFinite(amount)) {
    return 0;
  }

  return Number(amount.toFixed(2));
}

// ============================================================
// VALIDATE POSITIVE AMOUNT
// ============================================================

function isValidPositiveAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount > 0;
}

// ============================================================
// ADD TRANSACTION
// ============================================================

function addTransaction(transaction: WalletTransaction) {
  wallet.transactions.unshift(transaction);

  saveWallet();
}

// ============================================================
// GET WALLET BALANCE
// ============================================================

export function getWalletBalance(): number {
  return wallet.balance;
}

// ============================================================
// GET WALLET TRANSACTIONS
// ============================================================

export function getWalletTransactions(): WalletTransaction[] {
  return wallet.transactions;
}

// ============================================================
// FIND TRANSACTION BY ID
// ============================================================

export function getWalletTransactionById(
  transactionId: string,
): WalletTransaction | undefined {
  return wallet.transactions.find(
    transaction => transaction.id === transactionId,
  );
}

// ============================================================
// FIND CHARGING TRANSACTION BY SESSION
// ============================================================
//
// ใช้ป้องกันการหักเงิน Charging Session เดิมซ้ำ
//
// ============================================================

export function getChargingTransactionBySessionId(
  sessionId: string,
): WalletTransaction | undefined {
  if (!sessionId) {
    return undefined;
  }

  return wallet.transactions.find(
    transaction =>
      transaction.type === 'CHARGING' && transaction.sessionId === sessionId,
  );
}

// ============================================================
// CHECK WHETHER SESSION HAS BEEN PAID
// ============================================================

export function hasChargingSessionBeenPaid(sessionId: string): boolean {
  return Boolean(getChargingTransactionBySessionId(sessionId));
}

// ============================================================
// UPDATE WALLET BALANCE
// ============================================================
//
// ใช้สำหรับการเปลี่ยนยอด Wallet
//
// IMPORTANT:
// ไม่ควรเรียกจาก UI โดยตรงเพื่อชำระเงิน
//
// สำหรับ Charging ให้ใช้ deductWallet()
// สำหรับ Top Up ให้ใช้ topUpWallet()
// สำหรับ Refund ให้ใช้ refundWallet()
//
// ============================================================

export function updateWalletBalance(amount: number): boolean {
  if (!Number.isFinite(amount)) {
    console.log('Invalid wallet balance amount:', amount);

    return false;
  }

  const newBalance = Number((wallet.balance + amount).toFixed(2));

  // ----------------------------------------------------------
  // ป้องกัน Balance ติดลบ
  // ----------------------------------------------------------

  if (newBalance < 0) {
    console.log('Wallet balance cannot be negative');

    return false;
  }

  wallet.balance = newBalance;

  saveWallet();

  return true;
}

// ============================================================
// TOP UP WALLET
// ============================================================
//
// IMPORTANT:
//
// Phase 1 ยังไม่เชื่อม Payment Gateway
//
// Function นี้เตรียมไว้สำหรับการรับยอด Top Up
// จากระบบจริงในขั้นตอนต่อไป
//
// ============================================================

export function topUpWallet(amount: number): boolean {
  // ----------------------------------------------------------
  // Validate amount
  // ----------------------------------------------------------

  if (!isValidPositiveAmount(amount)) {
    console.log('Invalid Top Up amount:', amount);

    return false;
  }

  const normalizedAmount = normalizeAmount(amount);

  const before = wallet.balance;

  // ----------------------------------------------------------
  // Update balance
  // ----------------------------------------------------------

  const updated = updateWalletBalance(normalizedAmount);

  if (!updated) {
    return false;
  }

  // ----------------------------------------------------------
  // Create Transaction
  // ----------------------------------------------------------

  addTransaction({
    id: `TOPUP-${Date.now()}`,

    type: 'TOP_UP',

    amount: normalizedAmount,

    balanceBefore: before,

    balanceAfter: wallet.balance,

    description: 'Wallet Top Up',

    date: new Date().toISOString(),

    paymentMethod: 'Wallet Top Up',
  });

  return true;
}

// ============================================================
// CHARGING PAYMENT
// ============================================================
//
// รองรับ:
//
// deductWallet(session)
//
// หรือ:
//
// deductWallet(session, finalAmount)
//
//
//
// finalAmount จะเป็นยอดหลัง Coupon
//
// ============================================================

export function deductWallet(
  session: ChargingSession,
  amount: number = session.total,
): boolean {
  // ==========================================================
  // VALIDATE SESSION
  // ==========================================================

  if (!session) {
    console.log('Charging Session is required');

    return false;
  }

  // ==========================================================
  // VALIDATE SESSION ID
  // ==========================================================

  if (!session.sessionId) {
    console.log('Charging Session ID is required');

    return false;
  }

  // ==========================================================
  // VALIDATE AMOUNT
  // ==========================================================

  if (!Number.isFinite(amount)) {
    console.log('Invalid Charging Amount:', amount);

    return false;
  }

  const normalizedAmount = normalizeAmount(amount);

  // ==========================================================
  // ZERO PAYMENT
  // ==========================================================
  //
  // กรณี Coupon ลด 100%
  //
  // finalAmount = 0
  //
  // ไม่ต้องหัก Wallet
  //
  // แต่ PaymentScreen ยังสามารถ completePayment()
  // ได้ตาม Flow
  //
  // ==========================================================

  if (normalizedAmount < 0) {
    console.log('Charging amount cannot be negative');

    return false;
  }

  // ==========================================================
  // CHECK DUPLICATE PAYMENT
  // ==========================================================
  //
  // ป้องกัน:
  //
  // User กด Confirm Payment ซ้ำ
  //
  // หรือ Navigation กลับมา Payment อีกครั้ง
  //
  // แล้ว Session เดิมถูกหักเงินซ้ำ
  //
  // ==========================================================

  const existingTransaction = getChargingTransactionBySessionId(
    session.sessionId,
  );

  if (existingTransaction) {
    console.log('Charging Session already paid:', session.sessionId);

    return false;
  }

  // ==========================================================
  // CHECK WALLET BALANCE
  // ==========================================================

  if (wallet.balance < normalizedAmount) {
    console.log('Insufficient Wallet Balance');

    console.log('Wallet Balance:', wallet.balance);

    console.log('Charging Amount:', normalizedAmount);

    return false;
  }

  // ==========================================================
  // ZERO AMOUNT PAYMENT
  // ==========================================================
  //
  // กรณี Coupon ลด 100%
  //
  // finalAmount = 0
  //
  // ไม่ต้องหัก Wallet
  // แต่ยังถือว่า Charging Payment สำเร็จ
  //
  // ต้องสร้าง CHARGING Transaction amount = 0
  // เพื่อ:
  // - บันทึกว่า Session นี้ชำระเงินแล้ว
  // - ป้องกันการจ่ายซ้ำ
  // - ให้ Transaction History ตรวจสอบได้
  //
  // ==========================================================

  if (normalizedAmount === 0) {
    console.log('Charging payment amount is 0');
    console.log('Charging payment completed by coupon');

    const currentBalance = wallet.balance;

    addTransaction({
      id: `CHG-${Date.now()}`,

      type: 'CHARGING',

      amount: 0,

      balanceBefore: currentBalance,

      balanceAfter: currentBalance,

      description: 'EV Charging Payment - Coupon',

      date: new Date().toISOString(),

      // ======================================================
      // EV INFORMATION
      // ======================================================

      sessionId: session.sessionId,

      stationName: session.stationName,

      chargerName: session.chargerName,

      energy: session.energy,

      paymentMethod: 'Coupon',
    });

    return true;
  }

  // ==========================================================
  // DEDUCT WALLET
  // ==========================================================

  const before = wallet.balance;

  const updated = updateWalletBalance(-normalizedAmount);

  if (!updated) {
    console.log('Unable to deduct wallet balance');

    return false;
  }

  // ==========================================================
  // CREATE CHARGING TRANSACTION
  // ==========================================================

  addTransaction({
    id: `CHG-${Date.now()}`,

    type: 'CHARGING',

    amount: -normalizedAmount,

    balanceBefore: before,

    balanceAfter: wallet.balance,

    description: 'EV Charging Payment',

    date: new Date().toISOString(),

    // ========================================================
    // EV INFORMATION
    // ========================================================

    sessionId: session.sessionId,

    stationName: session.stationName,

    chargerName: session.chargerName,

    energy: session.energy,

    paymentMethod: 'Wallet',
  });

  return true;
}

// ============================================================
// REFUND WALLET
// ============================================================

export function refundWallet(
  amount: number,
  session?: ChargingSession,
): boolean {
  // ----------------------------------------------------------
  // Validate amount
  // ----------------------------------------------------------

  if (!isValidPositiveAmount(amount)) {
    console.log('Invalid Refund amount:', amount);

    return false;
  }

  const normalizedAmount = normalizeAmount(amount);

  // ----------------------------------------------------------
  // Prevent duplicate refund
  // ----------------------------------------------------------

  if (
    session?.sessionId &&
    wallet.transactions.some(
      transaction =>
        transaction.type === 'REFUND' &&
        transaction.sessionId === session.sessionId,
    )
  ) {
    console.log('Refund already processed:', session.sessionId);

    return false;
  }

  const before = wallet.balance;

  // ----------------------------------------------------------
  // Update Balance
  // ----------------------------------------------------------

  const updated = updateWalletBalance(normalizedAmount);

  if (!updated) {
    return false;
  }

  // ----------------------------------------------------------
  // Create Refund Transaction
  // ----------------------------------------------------------

  addTransaction({
    id: `REFUND-${Date.now()}`,

    type: 'REFUND',

    amount: normalizedAmount,

    balanceBefore: before,

    balanceAfter: wallet.balance,

    description: 'Charging Refund',

    date: new Date().toISOString(),

    sessionId: session?.sessionId,

    stationName: session?.stationName,

    chargerName: session?.chargerName,

    energy: session?.energy,

    paymentMethod: session?.paymentMethod,
  });

  return true;
}

// ============================================================
// ADJUST WALLET
// ============================================================
//
// สำหรับ Admin / Backend Adjustment
//
// amount:
// positive = เพิ่มเงิน
// negative = ลดเงิน
//
// ============================================================

export function adjustWallet(
  amount: number,
  description = 'Wallet Adjustment',
): boolean {
  if (!Number.isFinite(amount)) {
    return false;
  }

  if (amount === 0) {
    return false;
  }

  const normalizedAmount = normalizeAmount(amount);

  const before = wallet.balance;

  const updated = updateWalletBalance(normalizedAmount);

  if (!updated) {
    return false;
  }

  addTransaction({
    id: `ADJUST-${Date.now()}`,

    type: 'ADJUSTMENT',

    amount: normalizedAmount,

    balanceBefore: before,

    balanceAfter: wallet.balance,

    description,

    date: new Date().toISOString(),

    paymentMethod: 'Adjustment',
  });

  return true;
}

// ============================================================
// RESET WALLET
// ============================================================
//
// IMPORTANT:
//
// ไม่ Reset เป็น 500 แล้ว
//
// Reset = ล้างข้อมูล Local Wallet
//
// ใช้สำหรับ:
// - Logout
// - Clear local account data
// - Development
//
// ไม่ควรเรียกใน Production Flow ปกติ
//
// ============================================================

export function resetWallet() {
  wallet = {
    balance: 0,

    transactions: [],
  };

  storage.remove(WALLET_KEY);
}

// ============================================================
// RELOAD WALLET
// ============================================================
//
// ใช้กรณีต้องการโหลดข้อมูลจาก MMKV ใหม่
//
// ============================================================

export function reloadWallet(): WalletData {
  wallet = loadWallet();

  return wallet;
}
