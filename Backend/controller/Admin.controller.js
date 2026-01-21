import { Admin } from "../model/Admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Email not found" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    admin.lastlogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const lastLoginIST = admin.lastlogin.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    });

    res.json({
      message: "Login successful",
      token,
      role: admin.role,
      lastLogin: lastLoginIST,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
