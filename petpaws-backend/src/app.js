import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js"; 
import appointmentRoutes from "./routes/appointment.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import petRoutes from "./routes/pet.routes.js";
import profileRoutes from "./routes/profile.routes.js";


const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes); 
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/profile", profileRoutes);


export default app;
