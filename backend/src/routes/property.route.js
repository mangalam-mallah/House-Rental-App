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

// GET all properties
router.get('/', getAllProperties);

// GET properties by logged-in owner
router.get('/my-properties', authenticate, getMyProperties);

// GET property by ID
router.get('/:id', getPropertyById);

// POST a new property (with image upload)
router.post('/', authenticate, upload.single('image'), createProperty);

// PUT (update) property by ID
router.put('/:id', authenticate, upload.single('image'), updateProperty);

// DELETE property by ID
router.delete('/:id', authenticate, deleteProperty);

export default router;
