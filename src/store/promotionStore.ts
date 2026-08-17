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

export let promotions: Promotion[] = [
  {
    id: 'PROMO001',
    merchant: 'SunPower EV',
    title: 'Charge More, Pay Less',
    description: 'Get 20% off your EV charging session.',
    discount: '20% OFF',
    category: 'EV Charging',
    expiresAt: '31 Aug 2026',
    code: 'EV20',
  },

  {
    id: 'PROMO002',
    merchant: 'Green Hotel',
    title: 'Hotel Guest Charging',
    description: 'Save 100 THB when charging at selected locations.',
    discount: '100 THB OFF',
    category: 'Hotel',
    expiresAt: '15 Sep 2026',
    code: 'HOTEL100',
  },

  {
    id: 'PROMO003',
    merchant: 'Coffee Corner',
    title: 'Charge & Coffee',
    description: 'Get 50 THB discount at participating coffee shops.',
    discount: '50 THB OFF',
    category: 'Restaurant',
    expiresAt: '30 Sep 2026',
    code: 'COFFEE50',
  },

  {
    id: 'PROMO004',
    merchant: 'Travel Partner',
    title: 'Weekend Charging',
    description: 'Enjoy 15% off charging during your weekend trip.',
    discount: '15% OFF',
    category: 'Travel',
    expiresAt: '30 Sep 2026',
    code: 'TRAVEL15',
  },

  {
    id: 'PROMO005',
    merchant: 'Lifestyle Mall',
    title: 'EV Member Reward',
    description: 'Special discount for SunPower EV members.',
    discount: '80 THB OFF',
    category: 'Lifestyle',
    expiresAt: '31 Oct 2026',
    code: 'EV80',
  },
];
