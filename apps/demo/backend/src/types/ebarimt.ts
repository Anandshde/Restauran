export interface EbarimtConfig {
  username: string;
  password: string;
  posId: string;
  vatRegNo: string;
  certPath: string;
  certPassword: string;
  wsdlUrl: string;
}

export interface EbarimtItem {
  code: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  vat: number;
  cityTax: number;
  barcode?: string;
}

export interface EbarimtInvoiceRequest {
  items: EbarimtItem[];
  totalAmount: number;
  vatAmount: number;
  cityTaxAmount: number;
  customerNo?: string; // Register number if available
  customerEmail?: string;
  branchNo: string;
  districtCode: string;
  posNo: string;
  orderNo: string;
}

export interface EbarimtResponse {
  success: boolean;
  billId?: string;
  qrData?: string;
  lottery?: string;
  error?: string;
}
