import { Request, Response } from "express";
import { QPayService } from "../services/qpay.service";
import Order from "../models/Order";
import { EbarimtService } from "../services/ebarimt.service";

const qpayService = new QPayService({
  clientId: process.env.QPAY_CLIENT_ID!,
  clientSecret: process.env.QPAY_CLIENT_SECRET!,
  invoiceUrl: process.env.QPAY_INVOICE_URL!,
  authUrl: process.env.QPAY_AUTH_URL!,
  callbackUrl: `${process.env.API_URL}/api/payment/qpay-webhook`,
});

const ebarimtService = new EbarimtService({
  username: process.env.EBARIMT_USERNAME!,
  password: process.env.EBARIMT_PASSWORD!,
  posId: process.env.EBARIMT_POS_ID!,
  vatRegNo: process.env.EBARIMT_VAT_REG_NO!,
  certPath: process.env.EBARIMT_CERT_PATH!,
  certPassword: process.env.EBARIMT_CERT_PASSWORD!,
  wsdlUrl: process.env.EBARIMT_WSDL_URL!,
});

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const description = `Table ${order.tableNumber} - Order #${orderId}`;

    const qpayResponse = await qpayService.createInvoice(
      order.total,
      orderId,
      description
    );

    res.json({
      success: true,
      qrImage: qpayResponse.qr_image,
      qrText: qpayResponse.qr_text,
      paymentUrls: qpayResponse.payment_urls,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ error: "Failed to create payment" });
  }
};

export const handleQPayWebhook = async (req: Request, res: Response) => {
  try {
    const { payment_id, sender_invoice_no, payment_status } = req.body;

    // Verify payment status
    if (payment_status !== "PAID") {
      res.status(400).json({ error: "Invalid payment status" });
      return;
    }

    // Find and update order
    const order = await Order.findById(sender_invoice_no);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    // Mark order as paid
    order.paid = true;
    order.paymentId = payment_id;
    await order.save();

    // Generate eBarimt
    const ebarimtData = {
      items: order.items.map((item) => ({
        code: "DEFAULT",
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        vat: item.price * item.quantity * 0.1,
        cityTax: 0,
      })),
      totalAmount: order.total,
      vatAmount: order.total * 0.1,
      cityTaxAmount: 0,
      orderNo: (order as any)._id.toString(),
      branchNo: process.env.EBARIMT_BRANCH_NO!,
      districtCode: process.env.EBARIMT_DISTRICT_CODE!,
      posNo: process.env.EBARIMT_POS_ID!,
    };

    const ebarimtResponse = await ebarimtService.sendInvoice(ebarimtData);

    if (ebarimtResponse.success) {
      order.barimt = {
        billId: ebarimtResponse.billId!,
        qrData: ebarimtResponse.qrData!,
        lottery: ebarimtResponse.lottery!,
      };
      await order.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Webhook handling error:", error);
    res.status(500).json({ error: "Failed to process payment webhook" });
  }
};
