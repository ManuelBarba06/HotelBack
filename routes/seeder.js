
import express from 'express'

import { seederRole } from '../controllers/roleController.js';
import { seederAbout } from '../controllers/aboutController.js'
import { seederRoom_type } from '../controllers/room_typeController.js';

const router = express.Router();

router.get('/role',seederRole)

router.get('/about', seederAbout)

router.get('/room_type', seederRoom_type)

export default router;