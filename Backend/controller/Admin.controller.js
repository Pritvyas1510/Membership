import { Admin } from "../model/Admin.model.js";
import { Member } from "../model/Member.model.js";
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
      { expiresIn: "1d" },
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
      name: admin.name,
      email: admin.email,
      lastLogin: lastLoginIST,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const makeSubAdmin = async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({
        message: "Only Super Admin can promote member",
      });
    }

    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (member.isHead) {
      return res.status(400).json({
        message: "Member already a Head / Sub-Admin",
      });
    }

    const exists = await Admin.findOne({ email: member.email });
    if (exists) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = await Admin.create({
      name: member.name,
      email: member.email,
      password: hashedPassword,
      role: "sub_admin",
      createdBy: req.adminId,
    });

    // ✅ GUARANTEED UPDATE
    await Member.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          isHead: true,
          headStatus: "approved",
          interestedInHead: false,
        },
      },
      { new: true },
    );

    res.status(201).json({
      message: "Member promoted to Sub-Admin successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
