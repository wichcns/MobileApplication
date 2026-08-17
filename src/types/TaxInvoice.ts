export interface TaxInvoice {
  companyName: string;

  taxId: string;

  address: string;

  province: string;

  district: string;

  subDistrict: string;

  postalCode: string;

  phone: string;

  email: string;

  requestedAt: string;

  status: 'NONE' | 'PENDING' | 'SUCCESS';
}
