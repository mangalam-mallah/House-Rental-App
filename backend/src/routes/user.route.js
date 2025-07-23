import express from 'express'
import { login, signup, getUserProfile, updateUserProfile, refreshAccessToken } from '../controllers/user.controller.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();
router.post("/signup", signup)
router.post("/login", login)
router.post('/refresh-token', refreshAccessToken);

router.get("/:id",authenticate, getUserProfile)

router.put("/:id", authenticate, updateUserProfile)

export default router
