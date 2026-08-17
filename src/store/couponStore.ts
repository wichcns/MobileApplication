import { Promotion } from './promotionStore';

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

export let coupons: Coupon[] = [];

// ==========================================================
// ADD COUPON
// ==========================================================

export function addCoupon(promotion: Promotion) {
  const alreadyCollected = coupons.some(
    coupon =>
      coupon.promotionId === promotion.id && coupon.status !== 'expired',
  );

  if (alreadyCollected) {
    return false;
  }

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

  coupons = [...coupons, newCoupon];

  return true;
}

// ==========================================================
// GET AVAILABLE COUPONS
// ==========================================================

export function getAvailableCoupons() {
  return coupons.filter(coupon => coupon.status === 'available');
}

// ==========================================================
// USE COUPON
// ==========================================================

export function useCoupon(couponId: string) {
  const coupon = coupons.find(coupon => coupon.id === couponId);

  if (!coupon) {
    return false;
  }

  if (coupon.status !== 'available') {
    return false;
  }

  coupons = coupons.map(coupon =>
    coupon.id === couponId
      ? {
          ...coupon,
          status: 'used',
        }
      : coupon,
  );

  return true;
}

// ==========================================================
// EXPIRE COUPON
// ==========================================================

export function expireCoupon(couponId: string) {
  const coupon = coupons.find(coupon => coupon.id === couponId);

  if (!coupon) {
    return false;
  }

  if (coupon.status !== 'available') {
    return false;
  }

  coupons = coupons.map(coupon =>
    coupon.id === couponId
      ? {
          ...coupon,
          status: 'expired',
        }
      : coupon,
  );

  return true;
}

// ==========================================================
// REMOVE COUPON
// ==========================================================

export function removeCoupon(couponId: string) {
  coupons = coupons.filter(coupon => coupon.id !== couponId);
}

