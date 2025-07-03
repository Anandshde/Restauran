import { readFileSync } from "fs";
import { createSign } from "crypto";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

async function verifyCertificate() {
  try {
    const certPath = process.env.EBARIMT_CERT_PATH!;
    const certPassword = process.env.EBARIMT_CERT_PASSWORD!;

    console.log("📄 Reading certificate from:", certPath);
    const certBuffer = readFileSync(certPath);

    console.log("🔑 Testing certificate signing...");
    const testData = "test-data";
    const signer = createSign("SHA256");
    signer.update(testData);

    const signature = signer.sign(
      {
        key: certBuffer,
        passphrase: certPassword,
      },
      "base64"
    );

    console.log("✅ Certificate is valid and can be used for signing");
    console.log("Test signature:", signature);
  } catch (error) {
    console.error("❌ Certificate verification failed:", error);
  }
}

// Run the verification
verifyCertificate();
