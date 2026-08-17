import { TaxInvoice } from '../types/TaxInvoice';

export let taxInvoice: TaxInvoice = {
  companyName: '',
  taxId: '',
  address: '',
  province: '',
  district: '',
  subDistrict: '',
  postalCode: '',
  phone: '',
  email: '',
  requestedAt: '',
  status: 'NONE',
};

export function updateTaxInvoice(data: Partial<TaxInvoice>) {
  taxInvoice = {
    ...taxInvoice,
    ...data,
  };
}

export function submitTaxInvoice() {
  updateTaxInvoice({
    requestedAt: new Date().toLocaleString(),
    status: 'SUCCESS',
  });
}

export function clearTaxInvoice() {
  taxInvoice = {
    companyName: '',
    taxId: '',
    address: '',
    province: '',
    district: '',
    subDistrict: '',
    postalCode: '',
    phone: '',
    email: '',
    requestedAt: '',
    status: 'NONE',
  };
}
