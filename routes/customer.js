const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const customerController = require('../controllers/customerController');
const customer = require('../middleware/customer');

router.post('/create',
    [
        check('name', 'Its necessary a name').not().isEmpty(),
        check('last_name', 'Its necessary a last name').not().isEmpty(),
        check('address','Its necessary a addres').not().isEmpty(),
        check('country','Its necessary a country').not().isEmpty(),
        check('state','Its necessary a state').not().isEmpty(),
        check('city','Its necessary a city').not().isEmpty(),
        check('email','Its necessary a correct email').isEmail(),
        check('password','The password need 6 characters min').isLength({ min: 6}),
        check('cell_phone','Its necessary a cellphone').isLength({ min: 10}),
    ],
    customerController.signupCustomer
)

router.post('/login',
    [
        check('email','Its necessary a correct email').isEmail(),
        check('password','The password need 6 characters min').isLength({ min: 6}) 
    ],
    customerController.signinCustomer
)

router.put('/update',
    customer,
    customerController.updateCustomer 
)

router.get('/get',
    customer,
    customerController.getCustomer
)

router.delete('/delete/:id',
    customerController.deleteCustomer
)
module.exports = router;

