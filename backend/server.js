import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const isProduction = process.env.NODE_ENV === "production";

// Enhanced CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "https://e-commerce-smoky-xi.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["set-cookie"]
  })
);

// Handle preflight requests
app.options("*", cors());

// Cookie parser with secure options
app.use(cookieParser());

// Configure cookie settings middleware
app.use((req, res, next) => {
  // Set secure cookie options for auth routes
  res.cookie = function(name, value, options) {
    const cookieOptions = {
      ...options,
      sameSite: isProduction ? 'None' : 'Lax',
      secure: isProduction,
      httpOnly: true,
      path: '/'
    };
    return express.response.cookie.call(this, name, value, cookieOptions);
  };
  next();
});

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.get("/", (req, res) => {
  res.send("API is running....");
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

connectDB();
export default app;
