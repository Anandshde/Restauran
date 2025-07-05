import dotenv from "dotenv";
import path from "path";
import { EbarimtService } from "../services/ebarimt.service";
import { EbarimtConfig } from "../types/ebarimt";

dotenv.config({ path: path.join(__dirname, "../../.env") });

async function testEbarimtInvoice() {
  try {
    console.log("🔑 Initializing eBarimt service...");

    const config: EbarimtConfig = {
      username: process.env.EBARIMT_USERNAME!,
      password: process.env.EBARIMT_PASSWORD!,
      posId: process.env.EBARIMT_POS_ID!,
      vatRegNo: process.env.EBARIMT_VAT_REG_NO!,
      certPath: process.env.EBARIMT_CERT_PATH!,
      certPassword: process.env.EBARIMT_CERT_PASSWORD!,
      wsdlUrl: process.env.EBARIMT_WSDL_URL!,
    };

    // Verify all required env variables
    Object.entries(config).forEach(([key, value]) => {
      if (!value) throw new Error(`Missing ${key} in environment variables`);
    });

    const ebarimtService = new EbarimtService(config);

    // Test invoice data
    const testInvoice = {
      items: [
        {
          code: "TEST001",
          name: "Test Item 1",
          quantity: 2,
          price: 10000,
          total: 20000,
          vat: 2000,
          cityTax: 0,
        },
      ],
      totalAmount: 20000,
      vatAmount: 2000,
      cityTaxAmount: 0,
      branchNo: process.env.EBARIMT_BRANCH_NO!,
      districtCode: process.env.EBARIMT_DISTRICT_CODE!,
      posNo: process.env.EBARIMT_POS_ID!,
      orderNo: `TEST-${Date.now()}`,
      customerEmail: "test@example.com", // Optional
    };

    console.log("📤 Sending test invoice...");
    const response = await ebarimtService.sendInvoice(testInvoice);

    if (response.success) {
      console.log("✅ Invoice created successfully!");
      console.log("Bill ID:", response.billId);
      console.log("Lottery:", response.lottery);
      console.log("QR Data available:", !!response.qrData);
    } else {
      console.error("❌ Invoice creation failed:", response.error);
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Run the test
testEbarimtInvoice();
