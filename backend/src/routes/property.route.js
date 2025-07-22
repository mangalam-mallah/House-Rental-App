import express from 'express'
import {createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty} from '../controllers/property.controller.js'
import upload from '../middleware/multer.middleware.js'
import checkAuth from '../middleware/mockAuth.middleware.js'

const router = express.Router()
router.get("/", getAllProperties);
router.get("/:id", getPropertyById)

router.post("/",checkAuth, upload.single('image'), createProperty) //Need to give id of owner manually 
router.put("/:id", checkAuth, upload.single('image'), updateProperty)

router.delete("/:id",deleteProperty)


export default router;