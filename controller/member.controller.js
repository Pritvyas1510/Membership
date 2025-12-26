import { Member } from "../model/Member.model.js";
import { generateMemberId } from "../utils/generateMemberId.js";

export const registerMember = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      gender,
      city,
      region,
      interestedInHead,
    } = req.body;

    const exists = await Member.findOne({ phone });
    if (exists) {
      return res.status(400).json({ message: "Member already exists" });
    }

    // ✅ Generate sequential ID
    const memberId = await generateMemberId();

    const member = await Member.create({
      name,
      phone,
      email,
      gender,
      city,
      region,
      interestedInHead,
      memberId,
      photoUrl: req.file?.path,
      status: "active",
    });

    res.status(201).json({
      message: "Member registered successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL MEMBERS
export const getMembers = async (req, res) => {
  const members = await Member.find().sort({ createdAt: -1 });
  res.json(members);
};

// DELETE MEMBER
export const deleteMember = async (req, res) => {
  const member = await Member.findByIdAndDelete(req.params.id);
  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }
  res.json({ message: "Member deleted successfully" });
};

// REJECT MEMBER
export const rejectMember = async (req, res) => {
  const member = await Member.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );
  res.json({ message: "Member rejected", member });
};
