import express from 'express'
import { createInquiry, getInquiryForProperty, approveInquiry, rejectInquiry } from '../controllers/inquiry.controller.js'
import auth from '../middleware/auth.middleware.js'

const router = express.Router()
router.post('/', auth("renter", "6879232a47cc4e6267c355e5"),createInquiry)
router.get("/property/:propertyId", auth("owner", "687923c547cc4e6267c355ec"), getInquiryForProperty)
router.put("/approve/:id", auth("owner", "687923c547cc4e6267c355ec"), approveInquiry)
router.put("/reject/:id", auth("owner", "687923c547cc4e6267c355ec"), rejectInquiry)

export default router