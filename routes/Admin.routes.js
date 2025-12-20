import express from "express";
import {
  adminLogin,
  getMembers,
  approveMember,
  rejectMember,
  registerMember,
  promoteMemberToSubAdmin,
} from "../controller/Admin.controller.js";

import { adminAuth } from "../middleware/adminAuth.js";
import { allowRoles } from "../middleware/checkRole.js";

const router = express.Router();

// LOGIN
router.post("/login", adminLogin);

// Admin.routes.js


// GET MEMBERS LIST
// GET MEMBERS LIST
router.get(
  "/members",
  adminAuth,
  allowRoles("admin", "sub_admin"),
  getMembers
);
router.post("/register", registerMember);
// APPROVE MEMBER (ONLY ADMIN)
router.patch(
  "/member/:id/approve",
  adminAuth,
  allowRoles("admin"),
  approveMember
);

// REJECT MEMBER (ONLY ADMIN)
router.patch(
  "/member/:id/reject",
  adminAuth,
  allowRoles("admin"),
  rejectMember
);

router.patch(
  "/member/:id/promote",
  adminAuth,
  allowRoles("admin"),
  promoteMemberToSubAdmin
);


export default router;
