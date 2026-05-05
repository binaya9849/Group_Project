import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import Stripe from "stripe";

import { createTables } from "./utils/createTables.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

import authRouter from "./router/authRoutes.js";
import productRouter from "./router/productRoutes.js";
import adminRouter from "./router/adminRoutes.js";
import orderRouter from "./router/orderRoutes.js";

import database from "./database/db.js";

const app = express();

// ===============================
// Stripe
// ===============================
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ===============================
// CORS (IMPORTANT - KEEP FIRST)
// ===============================
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      process.env.DASHBOARD_URL || "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ===============================
// BODY PARSERS
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// COOKIE PARSER
// ===============================
app.use(cookieParser());

// ===============================
// FILE UPLOAD
// ===============================
app.use(
  fileUpload({
    tempFileDir: "./uploads",
    useTempFiles: true,
  })
);

// ===============================
// STRIPE WEBHOOK (MUST BE BEFORE express.json logic usage)
// ===============================
app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const paymentIntent_client_secret = paymentIntent.client_secret;

      try {
        const result = await database.query(
          `UPDATE payments 
           SET payment_status = 'Paid' 
           WHERE payment_intent_id = $1 
           RETURNING *`,
          [paymentIntent_client_secret]
        );

        const orderId = result.rows[0].order_id;

        await database.query(
          `UPDATE orders 
           SET paid_at = NOW() 
           WHERE id = $1`,
          [orderId]
        );

        const { rows: items } = await database.query(
          `SELECT product_id, quantity 
           FROM order_items 
           WHERE order_id = $1`,
          [orderId]
        );

        for (const item of items) {
          await database.query(
            `UPDATE products 
             SET stock = stock - $1 
             WHERE id = $2`,
            [item.quantity, item.product_id]
          );
        }
      } catch (error) {
        return res.status(500).send("Error updating payment data");
      }
    }

    res.json({ received: true });
  }
);

// ===============================
// ROUTES
// ===============================
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/order", orderRouter);

// ===============================
// INIT DB
// ===============================
createTables();

// ===============================
// ERROR HANDLER (LAST)
// ===============================
app.use(errorMiddleware);

export default app;