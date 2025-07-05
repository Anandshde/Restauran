import dotenv from "dotenv";
import path from "path";
import { connect } from "mongoose";
import Admin from "../models/Admin";
import readline from "readline";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../../.env") });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function setupAdmin() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    console.log("📦 Connecting to MongoDB...");
    await connect(mongoUri);
    console.log("✅ Connected to MongoDB successfully");

    // Get admin credentials
    console.log("\n🔐 Admin Setup");
    console.log("-------------");
    const email = await question("Enter admin email: ");
    const password = await question("Enter admin password: ");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      const confirm = await question(
        "\n⚠️  An admin with this email already exists. Do you want to update the password? (y/n): "
      );

      if (confirm.toLowerCase() === "y") {
        existingAdmin.password = password;
        await existingAdmin.save();
        console.log("✅ Admin password updated successfully");
      } else {
        console.log("❌ Operation cancelled");
      }
    } else {
      // Create new admin
      const admin = new Admin({ email, password });
      await admin.save();
      console.log("✅ New admin created successfully");
    }

    // Display success message
    console.log("\n🎉 Admin Setup Complete");
    console.log("----------------------");
    console.log("Email:", email);
    console.log(
      "You can now use these credentials to log in to the admin dashboard"
    );
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    rl.close();
    process.exit(0);
  }
}

// Run the setup
setupAdmin();
