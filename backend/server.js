import express from "express";
import cors from "cors";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = ENV_VARS.PORT;

app.use("/api/auth", authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
