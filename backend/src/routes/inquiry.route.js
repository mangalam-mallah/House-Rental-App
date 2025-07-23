import express from 'express'
import { createInquiry, getInquiryForProperty, approveInquiry, rejectInquiry } from '../controllers/inquiry.controller.js'
import auth from '../middleware/auth.middleware.js'

const router = express.Router()
router.post('/', auth("renter"),createInquiry)
router.get("/property/:propertyId", auth("owner"), getInquiryForProperty)
router.put("/approve/:id", auth("owner"), approveInquiry)
router.put("/reject/:id", auth("owner"), rejectInquiry)


export default router