import express from 'express'
import { check } from 'express-validator';

const router = express.Router();
import {signupCustomer, signinCustomer,updateCustomer,getCustomer,deleteCustomer} from '../controllers/customerController.js'
import middleware from '../middleware/customer.js'

router.post('/',
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
    signupCustomer
)

router.post('/login',
    [
        check('email','Its necessary a correct email').isEmail(),
        check('password','The password need 6 characters min').isLength({ min: 6}) 
    ],
    signinCustomer
)

router.put('/update',
    middleware,
    updateCustomer 
)

router.get('/get',
    middleware,
    getCustomer
)

router.delete('/delete/:id',
    deleteCustomer
)
export default router

