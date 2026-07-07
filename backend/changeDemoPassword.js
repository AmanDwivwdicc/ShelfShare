import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import User from "./models/User.js";

await connectDB();

const user = await User.findOne({
  email: "admin@shelfshare.com"
});

if (!user) {
  console.log("Demo user not found");
  process.exit();
}

user.password = await bcrypt.hash(
  "Aman2468@",
  10
);

await user.save();

console.log("Password updated!");

process.exit();