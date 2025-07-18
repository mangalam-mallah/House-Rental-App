import express from 'express'
import { login, signup, getUserProfile, updateUserProfile } from '../controllers/user.controller.js';

const router = express.Router();
router.post("/signup", signup)
router.post("/login", login)

router.get("/:id", getUserProfile)

router.put("/:id", updateUserProfile)

export default router