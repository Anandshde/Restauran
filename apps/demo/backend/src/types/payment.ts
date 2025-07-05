export interface PaymentItem {
  name: string;
  quantity: number;
  price: number;
}

export interface CheckoutSessionRequest {
  orderId: string;
  tableNumber: number;
  items: PaymentItem[];
  customerEmail?: string;
}

export interface EbarimtInvoice {
  items: {
    name: string;
    quantity: number;
    price: number;
    vat: number;
    cityTax: number;
  }[];
  totalAmount: number;
  vatAmount: number;
  cityTaxAmount: number;
  customerEmail?: string;
  registerNo?: string;
}
