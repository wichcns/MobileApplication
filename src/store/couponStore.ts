import { createMMKV } from 'react-native-mmkv';

import { Promotion } from './promotionStore';

// ============================================================
// TYPES
// ============================================================

export type CouponStatus = 'available' | 'used' | 'expired';

export type Coupon = {
  id: string;

  promotionId: string;

  merchant: string;

  title: string;

  description: string;

  discount: string;

  category: string;

  expiresAt: string;

  code: string;

  status: CouponStatus;

  collectedAt: string;
};

// ============================================================
// MMKV
// ============================================================

const storage = createMMKV();

const COUPON_KEY = 'coupon_data';

// ============================================================
// LOAD COUPONS
// ============================================================

function loadCoupons(): Coupon[] {
  const json = storage.getString(COUPON_KEY);

  if (!json) {
    return [];
  }

  try {
    const parsed = JSON.parse(json);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.log('Load Coupon Error:', error);

    return [];
  }
}

// ============================================================
// SAVE COUPONS
// ============================================================

function saveCoupons() {
  storage.set(COUPON_KEY, JSON.stringify(coupons));
}

// ============================================================
// COUPON DATA
// ============================================================

// Coupon ของ User จะถูกโหลดจาก MMKV
//
// ไม่มี Mock Coupon
//
// ถ้ายังไม่มี Coupon
// จะเริ่มต้นด้วย []

export let coupons: Coupon[] = loadCoupons();

// ============================================================
// ADD COUPON
// ============================================================

export function addCoupon(promotion: Promotion): boolean {
  // ----------------------------------------------------------
  // CHECK DUPLICATE
  // ----------------------------------------------------------

  const alreadyCollected = coupons.some(
    coupon =>
      coupon.promotionId === promotion.id && coupon.status !== 'expired',
  );

  if (alreadyCollected) {
    return false;
  }

  // ----------------------------------------------------------
  // CREATE COUPON
  // ----------------------------------------------------------

  const newCoupon: Coupon = {
    id: `COUPON_${Date.now()}`,

    promotionId: promotion.id,

    merchant: promotion.merchant,

    title: promotion.title,

    description: promotion.description,

    discount: promotion.discount,

    category: promotion.category,

    expiresAt: promotion.expiresAt,

    code: promotion.code,

    status: 'available',

    collectedAt: new Date().toISOString(),
  };

  // ----------------------------------------------------------
  // UPDATE MEMORY
  // ----------------------------------------------------------

  coupons = [...coupons, newCoupon];

  // ----------------------------------------------------------
  // SAVE TO MMKV
  // ----------------------------------------------------------

  saveCoupons();

  return true;
}

// ============================================================
// GET ALL COUPONS
// ============================================================

export function getCoupons(): Coupon[] {
  return coupons;
}

// ============================================================
// GET AVAILABLE COUPONS
// ============================================================

export function getAvailableCoupons(): Coupon[] {
  return coupons.filter(coupon => coupon.status === 'available');
}

// ============================================================
// GET USED COUPONS
// ============================================================

export function getUsedCoupons(): Coupon[] {
  return coupons.filter(coupon => coupon.status === 'used');
}

// ============================================================
// GET EXPIRED COUPONS
// ============================================================

export function getExpiredCoupons(): Coupon[] {
  return coupons.filter(coupon => coupon.status === 'expired');
}

// ============================================================
// GET COUPON BY ID
// ============================================================

export function getCouponById(couponId: string): Coupon | undefined {
  return coupons.find(coupon => coupon.id === couponId);
}

// ============================================================
// USE COUPON
// ============================================================

export function useCoupon(couponId: string): boolean {
  // ----------------------------------------------------------
  // FIND COUPON
  // ----------------------------------------------------------

  const coupon = coupons.find(coupon => coupon.id === couponId);

  if (!coupon) {
    return false;
  }

  // ----------------------------------------------------------
  // CHECK STATUS
  // ----------------------------------------------------------

  if (coupon.status !== 'available') {
    return false;
  }

  // ----------------------------------------------------------
  // CHECK EXPIRATION
  // ----------------------------------------------------------

  const expiryDate = new Date(coupon.expiresAt);

  if (
    !Number.isNaN(expiryDate.getTime()) &&
    expiryDate.getTime() < Date.now()
  ) {
    coupons = coupons.map(item =>
      item.id === couponId
        ? {
            ...item,
            status: 'expired',
          }
        : item,
    );

    saveCoupons();

    return false;
  }

  // ----------------------------------------------------------
  // UPDATE STATUS
  // ----------------------------------------------------------

  coupons = coupons.map(item =>
    item.id === couponId
      ? {
          ...item,
          status: 'used',
        }
      : item,
  );

  // ----------------------------------------------------------
  // SAVE
  // ----------------------------------------------------------

  saveCoupons();

  return true;
}

// ============================================================
// EXPIRE COUPON
// ============================================================

export function expireCoupon(couponId: string): boolean {
  // ----------------------------------------------------------
  // FIND COUPON
  // ----------------------------------------------------------

  const coupon = coupons.find(coupon => coupon.id === couponId);

  if (!coupon) {
    return false;
  }

  // ----------------------------------------------------------
  // CHECK STATUS
  // ----------------------------------------------------------

  if (coupon.status !== 'available') {
    return false;
  }

  // ----------------------------------------------------------
  // UPDATE STATUS
  // ----------------------------------------------------------

  coupons = coupons.map(item =>
    item.id === couponId
      ? {
          ...item,
          status: 'expired',
        }
      : item,
  );

  // ----------------------------------------------------------
  // SAVE
  // ----------------------------------------------------------

  saveCoupons();

  return true;
}

// ============================================================
// REMOVE COUPON
// ============================================================

export function removeCoupon(couponId: string): void {
  coupons = coupons.filter(coupon => coupon.id !== couponId);

  saveCoupons();
}

// ============================================================
// CLEAR ALL COUPONS
// ============================================================
//
// ใช้เฉพาะ:
// - Logout
// - Reset Account
// - Development
//
// ไม่ควรเรียกอัตโนมัติ
// ============================================================

export function clearCoupons(): void {
  coupons = [];

  storage.remove(COUPON_KEY);
}

// ============================================================
// RELOAD COUPONS
// ============================================================

export function reloadCoupons(): Coupon[] {
  coupons = loadCoupons();

  return coupons;
}

// ============================================================
// CHECK COUPON EXPIRATION
// ============================================================

export function checkExpiredCoupons(): Coupon[] {
  const now = Date.now();

  let changed = false;

  coupons = coupons.map(coupon => {
    // --------------------------------------------------------
    // เฉพาะ available เท่านั้น
    // --------------------------------------------------------

    if (coupon.status !== 'available') {
      return coupon;
    }

    // --------------------------------------------------------
    // ตรวจสอบวันหมดอายุ
    // --------------------------------------------------------

    const expiryDate = new Date(coupon.expiresAt);

    if (!Number.isNaN(expiryDate.getTime()) && expiryDate.getTime() < now) {
      changed = true;

      return {
        ...coupon,
        status: 'expired',
      };
    }

    return coupon;
  });

  // ----------------------------------------------------------
  // SAVE ONLY WHEN CHANGED
  // ----------------------------------------------------------

  if (changed) {
    saveCoupons();
  }

  return coupons;
}
