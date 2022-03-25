const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const positionController = require('../controllers/positionController');

router.post('/create',
    [
        check('name_role', 'Its necessary the name of the role').not().isEmpty(),
        check('role', 'Its necessary a number for the role').isLength({min: 1})
    ],
    positionController.createPosition
);

module.exports = router;