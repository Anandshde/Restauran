import axios from "axios";
import {
  QPayConfig,
  QPayToken,
  QPayInvoiceRequest,
  QPayInvoiceResponse,
} from "../types/qpay";

export class QPayService {
  private config: QPayConfig;
  private token: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config: QPayConfig) {
    this.config = config;
  }

  private async getToken(): Promise<string> {
    // Return existing token if still valid
    if (this.token && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    try {
      const response = await axios.post<QPayToken>(
        this.config.authUrl,
        {},
        {
          auth: {
            username: this.config.clientId,
            password: this.config.clientSecret,
          },
        }
      );

      this.token = response.data.access_token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000;

      return this.token;
    } catch (error) {
      console.error("QPay authentication error:", error);
      throw new Error("Failed to authenticate with QPay");
    }
  }

  async createInvoice(
    amount: number,
    orderId: string,
    description: string
  ): Promise<QPayInvoiceResponse> {
    try {
      const token = await this.getToken();

      const payload: QPayInvoiceRequest = {
        invoice_code: "FOOD_ORDER",
        sender_invoice_no: orderId,
        invoice_receiver_code: "terminal_1", // You might want to make this configurable
        invoice_description: description,
        amount: amount,
        callback_url: this.config.callbackUrl,
      };

      const response = await axios.post<QPayInvoiceResponse>(
        this.config.invoiceUrl,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("QPay invoice creation error:", error);
      throw new Error("Failed to create QPay invoice");
    }
  }
}
