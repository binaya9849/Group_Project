import { config } from "dotenv";
config({ path: "./config/config.env" }); // ✅ LOAD ENV FIRST

import app from "./app.js";
import { v2 as cloudinary } from "cloudinary";

console.log("PORT:", process.env.PORT);
console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});