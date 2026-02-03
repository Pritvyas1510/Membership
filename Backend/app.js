import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import adminRoutes from "./routes/Admin.routes.js"
import memberRoutes from "./routes/member.routes.js"
import eventRoutes from "./routes/Event.routes.js"
const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/admin", adminRoutes);
app.use("/api/member",memberRoutes);
app.use("/api/event", eventRoutes);


export default app;