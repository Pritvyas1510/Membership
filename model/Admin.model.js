// Admin.model.js
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["admin", "sub_admin"],
    default: "sub_admin",
  },
  lastlogin: { type: Date },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },

  createdAt: { type: Date, default: Date.now },
});

export const Admin = mongoose.model("Admin", AdminSchema);
