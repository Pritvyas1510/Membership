import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./config/db.js";


dotenv.config();

const port = process.env.PORT || 8080;

connectDB();

app.listen(port , (req,res)=>{
    console.log(`Server is Runnnig on http://localhost:${port}`);
    
})