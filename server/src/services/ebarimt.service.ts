import { createClientAsync } from "soap";
import { readFileSync } from "fs";
import { createSign } from "crypto";
import {
  EbarimtConfig,
  EbarimtInvoiceRequest,
  EbarimtResponse,
} from "../types/ebarimt";

export class EbarimtService {
  private config: EbarimtConfig;
  private token: string | null = null;
  private client: any = null;

  constructor(config: EbarimtConfig) {
    this.config = config;
  }

  private async initialize() {
    if (!this.client) {
      this.client = await createClientAsync(this.config.wsdlUrl);
      await this.authenticate();
    }
  }

  private async authenticate() {
    try {
      console.log("🔐 Loading certificate from:", this.config.certPath);
      const certBuffer = readFileSync(this.config.certPath);
      const timestamp = new Date().toISOString();

      console.log("📝 Creating signature...");
      const signer = createSign("SHA256");
      signer.update(timestamp + this.config.username);
      const signature = signer.sign(
        {
          key: certBuffer,
          passphrase: this.config.certPassword,
        },
        "base64"
      );

      console.log("🔑 Authenticating with eBarimt...");
      const result = await this.client.putAsync({
        auth: {
          username: this.config.username,
          password: this.config.password,
          signature: signature,
          timestamp: timestamp,
        },
      });

      this.token = result[0].token;
      console.log("✅ Authentication successful");
    } catch (error) {
      console.error("❌ Authentication failed:", error);
      throw error;
    }
  }

  async sendInvoice(data: EbarimtInvoiceRequest): Promise<EbarimtResponse> {
    try {
      console.log("🔄 Initializing eBarimt client...");
      await this.initialize();

      console.log("📋 Preparing invoice data...");
      const invoiceData = {
        vat: {
          merchantId: this.config.vatRegNo,
          posNo: data.posNo,
          orderNo: data.orderNo,
          date: new Date().toISOString(),
          totalAmount: data.totalAmount,
          vatAmount: data.vatAmount,
          cityTax: data.cityTaxAmount,
          items: data.items.map((item) => ({
            code: item.code,
            name: item.name,
            qty: item.quantity,
            price: item.price,
            total: item.total,
            vat: item.vat,
            cityTax: item.cityTax,
          })),
          customerNo: data.customerNo || "",
          branchNo: data.branchNo,
          districtCode: data.districtCode,
        },
        token: this.token,
      };

      console.log("📤 Sending invoice to eBarimt...");
      const result = await this.client.putAsync({
        invoice: invoiceData,
      });

      if (result[0].success) {
        console.log("✅ Invoice created successfully");
        return {
          success: true,
          billId: result[0].billId,
          qrData: result[0].qrData,
          lottery: result[0].lottery,
        };
      } else {
        throw new Error(result[0].message || "Invoice creation failed");
      }
    } catch (error) {
      console.error("❌ Invoice creation failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
