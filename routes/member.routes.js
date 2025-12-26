import express from "express";
import {
  registerMember,
  getMembers,
  deleteMember,
  rejectMember,
} from "../controller/member.controller.js";

import upload from "../middleware/uploadMemberImage.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { allowRoles } from "../middleware/checkRole.js";

const router = express.Router();

/**
 * ✅ PUBLIC MEMBER REGISTRATION
 * No token required
 */
router.post(
  "/register",
  upload.single("photo"),
  registerMember
);

/**
 * 🔒 LIST MEMBERS
 * Admin & Sub-admin
 */
router.get(
  "/",
  adminAuth,
  allowRoles("admin", "sub_admin"),
  getMembers
);

/**
 * 🔒 DELETE MEMBER
 * Admin only
 */
router.delete(
  "/:id",
  adminAuth,
  allowRoles("admin"),
  deleteMember
);

/**
 * 🔒 REJECT MEMBER
 * Admin only
 */
router.patch(
  "/reject/:id",
  adminAuth,
  allowRoles("admin"),
  rejectMember
);

export default router;
