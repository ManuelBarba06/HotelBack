import express from 'express'

import { signinCustomer,getUser } from '../controllers/userController.js'
import { signupCustomer,updateCustomer, deleteCustomer} from '../controllers/customerController.js';
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

router.get('/getOne',
    middleware,
    getUser
)

router.delete('/delete/customer/:id',
    middleware,
    deleteCustomer
)
export default router

