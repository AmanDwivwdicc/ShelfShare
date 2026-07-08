import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import connectDB from "./config/database.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import seedDummyBooks from "./utils/seedDummyBooks.js";
import chatRoutes from "./routes/chatRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import pushRoutes from "./routes/pushRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "ShelfShare API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/chat",chatRoutes);
app.use(
  "/api/conversations",
  conversationRoutes
  );
app.use("/api/push", pushRoutes);
  
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const seedDemoUser = async () => {
  const demoEmail = "demo@shelfshare.com";
  const exists = await User.findOne({ email: demoEmail });

  if (!exists) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);
    await User.create({
      name: "Demo User",
      email: demoEmail,
      password: hashedPassword,
    });
    console.log("Demo user created: demo@shelfshare.com / 123456");
  }
};

const startServer = async () => {
  await connectDB();
  await seedDemoUser();
  await seedDummyBooks();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
