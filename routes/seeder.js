
import express from 'express'
import { seederRole } from '../controllers/roleController.js';

const router = express.Router();

router.get('/role',seederRole)

export default router;