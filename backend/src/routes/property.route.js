import express from 'express';
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties
} from '../controllers/property.controller.js';

import upload from '../middleware/multer.middleware.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', getAllProperties);
router.get('/my-properties', authenticate, getMyProperties);
router.get('/:id', getPropertyById);
router.post('/', authenticate, upload.single('image'), createProperty);
router.put('/:id', authenticate, upload.single('image'), updateProperty);
router.delete('/:id', authenticate, deleteProperty);

export default router;
