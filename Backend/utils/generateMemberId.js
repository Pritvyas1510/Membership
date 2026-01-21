import { Member } from "../model/Member.model.js";

export const generateMemberId = async () => {
  // Find last member (sorted by createdAt or memberId)
  const lastMember = await Member.findOne({})
    .sort({ createdAt: -1 })
    .select("memberId");

  let nextNumber = 1;

  if (lastMember && lastMember.memberId) {
    // Extract numeric part from MF0000001
    const lastNumber = parseInt(lastMember.memberId.replace("MF", ""), 10);
    nextNumber = lastNumber + 1;
  }

  // Pad number with zeros → 7 digits
  const paddedNumber = String(nextNumber).padStart(7, "0");

  return `MF${paddedNumber}`;
};
