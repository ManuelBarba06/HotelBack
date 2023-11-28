
import express from 'express'

import { seederRole } from '../controllers/roleController.js';
import { seederAbout } from '../controllers/aboutController.js'

const router = express.Router();

router.get('/role',seederRole)

router.get('/about', seederAbout)

export default router;