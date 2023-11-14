import express from 'express'
import { check } from 'express-validator';

import {signinCustomer,updateCustomer,getCustomer,deleteCustomer} from '../controllers/userController.js'
import { signupCustomer } from '../controllers/customerController.js';
import middleware from '../middleware/customer.js'
import { userValidation } from '../validation/user.js';

const router = express.Router();

router.post('/create/customer',
    userValidation,
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

