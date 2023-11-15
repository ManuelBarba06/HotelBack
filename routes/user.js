import express from 'express'

import { signinCustomer,getCustomer,deleteCustomer } from '../controllers/userController.js'
import { signupCustomer,updateCustomer } from '../controllers/customerController.js';
import middleware from '../middleware/customer.js'
import { userValidation, userSigninValidation, userUpdateValidation } from '../validation/user.js';

const router = express.Router();

router.post('/signin',
    userSigninValidation,
    signinCustomer
)

router.post('/create/customer',
    userValidation,
    signupCustomer
)

router.put('/update/customer/:id',
    middleware,
    userUpdateValidation,
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

