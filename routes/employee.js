const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/create',
    [
        check('name', 'Its necessary a name').not().isEmpty(),
        check('last_name', 'Its necessary a last name').not().isEmpty(),
        check('address','Its necessary an address').not().isEmpty(),
        check('email','Its necessary a correct email').isEmail(),
        check('password','The password need 6 characters min').isLength({ min: 6}),
        check('id_position', 'The id_position is necesary').not().isEmpty(),
    ],
    employeeController.signupEmployee
)

module.exports = router