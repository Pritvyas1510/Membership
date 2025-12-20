import express from "express"
import cors from "cors"
import adminRoutes from "./routes/Admin.routes.js"
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);

app.use("/",(req,res)=>{
    res.send("Membership Home page")
})

export default app;