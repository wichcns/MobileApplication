export interface ChargingHistory {
  id: string;

  stationName: string;

  chargerName: string;

  connectorType: string;

  energy: number;

  duration: number;

  total: number;

  status: string;

  // Receipt

  receiptNumber?: string;

  receiptDate?: string;

  // Tax Invoice

  taxInvoiceRequested?: boolean;

  taxInvoiceNumber?: string;
}
