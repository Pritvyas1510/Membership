// models/Member.model.js
import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },

    gender: { type: String },
    city: { type: String },
    region: { type: String },

    photoUrl: { type: String },       // Cloudinary image
    idCardUrl: { type: String },      // Generated ID card (PDF/Image)

    memberId: {
      type: String,
      unique: true,
    },

    joinedOn: {
      type: Date,
      default: Date.now,
    },

    interestedInHead: {
      type: Boolean,
      default: false,
    },

    headStatus: {
      type: String,
      enum: ["pending", "called", "approved", "rejected"],
      default: "pending",
    },

    isHead: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "rejected"],
      default: "active", // direct approve
    },
  },
  { timestamps: true }
);

export const Member = mongoose.model("Member", MemberSchema);
