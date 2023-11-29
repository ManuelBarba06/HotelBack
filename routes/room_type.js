
import express from 'express'

import { getAllRoom_type, getOneRoom_type } from '../controllers/room_typeController.js';

const router = express.Router();

router.get('/', getAllRoom_type)
router.get('/:id', getOneRoom_type)

export default router;