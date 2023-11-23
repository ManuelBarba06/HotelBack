import express from 'express'
import { check } from 'express-validator';

import { createRole } from '../controllers/roleController.js';

const router = express.Router();

router.post('/',
    [
        check('name_role', 'Its necessary the name of the role').not().isEmpty(),
        check('role', 'Its necessary a number for the role').isLength({min: 1})
    ],
    createRole
);

export default router;