import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,

  otp: String,
  otpVerified: {
    type: Boolean,
    default: false
  },

  memberId: {
    type: String,
    unique: true,
    default: null
  },

  status: {
    type: String,
    enum: ["pending", "active", "rejected"],
    default: "pending"
  },

  createdAt: { type: Date, default: Date.now }
});

export const Member = mongoose.model("Member", MemberSchema);
