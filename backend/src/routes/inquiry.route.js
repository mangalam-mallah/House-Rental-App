import express from 'express'
import { createInquiry, getInquiriesForOwner, approveInquiry, rejectInquiry } from '../controllers/inquiry.controller.js'
import authenticate from '../middleware/authenticate.js'

const router = express.Router()
router.post('/', authenticate,createInquiry)
router.get("/owner", authenticate, getInquiriesForOwner)
router.put("/approve/:id", authenticate, approveInquiry)
router.put("/reject/:id", authenticate, rejectInquiry)


export default router