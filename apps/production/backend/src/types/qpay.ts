export interface QPayConfig {
  clientId: string;
  clientSecret: string;
  invoiceUrl: string;
  authUrl: string;
  callbackUrl: string;
}

export interface QPayToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface QPayInvoiceRequest {
  invoice_code: string;
  sender_invoice_no: string;
  invoice_receiver_code: string;
  invoice_description: string;
  amount: number;
  callback_url: string;
}

export interface QPayInvoiceResponse {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
  payment_urls: {
    qPay: string;
  };
}
