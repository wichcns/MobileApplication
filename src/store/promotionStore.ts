// ============================================================
// PROMOTION TYPE
// ============================================================

export type Promotion = {
  id: string;

  merchant: string;

  title: string;

  description: string;

  discount: string;

  category: string;

  expiresAt: string;

  code: string;
};

// ============================================================
// PROMOTION STATE
// ============================================================
//
// IMPORTANT:
//
// Phase 1
// ไม่ใช้ Mock Data
//
// ข้อมูลจะถูกโหลดจาก Backend/API
//
// ============================================================

export let promotions: Promotion[] = [];

// ============================================================
// UPDATE PROMOTIONS
// ============================================================
//
// ใช้สำหรับนำข้อมูล Promotion ที่ได้จาก Backend
// มาเก็บไว้ใน Store
//
// ============================================================

export function setPromotions(data: Promotion[]) {
  if (!Array.isArray(data)) {
    console.log('Invalid promotions data');

    promotions = [];

    return;
  }

  promotions = data;
}

// ============================================================
// GET ALL PROMOTIONS
// ============================================================

export function getPromotions(): Promotion[] {
  return promotions;
}

// ============================================================
// GET PROMOTION BY ID
// ============================================================

export function getPromotionById(promotionId: string): Promotion | undefined {
  return promotions.find(promotion => promotion.id === promotionId);
}

// ============================================================
// GET PROMOTIONS BY CATEGORY
// ============================================================

export function getPromotionsByCategory(category: string): Promotion[] {
  return promotions.filter(promotion => promotion.category === category);
}

// ============================================================
// GET PROMOTION BY CODE
// ============================================================

export function getPromotionByCode(code: string): Promotion | undefined {
  return promotions.find(
    promotion => promotion.code.toLowerCase() === code.toLowerCase(),
  );
}

// ============================================================
// CHECK PROMOTION EXPIRY
// ============================================================
//
// ตรวจสอบว่า Promotion หมดอายุหรือยัง
//
// ============================================================

export function isPromotionExpired(promotion: Promotion): boolean {
  if (!promotion.expiresAt) {
    return true;
  }

  const expiryDate = new Date(promotion.expiresAt);

  if (Number.isNaN(expiryDate.getTime())) {
    return true;
  }

  return expiryDate.getTime() < Date.now();
}

// ============================================================
// GET ACTIVE PROMOTIONS
// ============================================================
//
// คืนเฉพาะ Promotion ที่ยังไม่หมดอายุ
//
// ============================================================

export function getActivePromotions(): Promotion[] {
  return promotions.filter(promotion => !isPromotionExpired(promotion));
}

// ============================================================
// CLEAR PROMOTIONS
// ============================================================
//
// ใช้ตอน Logout
// หรือเปลี่ยน User
//
// ============================================================

export function clearPromotions() {
  promotions = [];
}
