import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import packageRoute from "./routes/packageRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
await connectDB();

app.use(express.json());
const __dirname = path.resolve();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use("/api/admin", adminRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/packages", packageRoute);
app.use("/api/booking", bookingRoutes);

//serve frontend from backend
app.use(express.static(path.join(__dirname, "/frontend/dist")));
//for unkonwn route hits shows frontend home screen
app.get(/.*/, (_, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

//ROUTES

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on server localhost:${PORT}`);
});

