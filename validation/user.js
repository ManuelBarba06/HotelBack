import { check } from "express-validator";


export const userValidation = [
    check('name', 'Its necessary a name').not().isEmpty(),
    check('name', 'The name needs to be string').isString(),
    check('name', 'The name the length min 4').optional().isLength({min: 4}),
    check('last_name', 'Its necessary a last name').not().isEmpty(),
    check('last_name', 'The last_name needs to be string').isString(),
    check('last_name', 'The last_name the length min 4').optional().isLength({min: 4}),
    check('address','Its necessary a address').not().isEmpty(),
    check('address', 'The address needs to be string').isString(),
    check('address', 'The address the length min 4').optional().isLength({min: 4}),
    check('country','Its necessary a country').not().isEmpty(),
    check('country', 'The country needs to be string').isString(),
    check('country', 'The country the length min 4').optional().isLength({min: 4}),
    check('state','Its necessary a state').not().isEmpty(),
    check('state', 'The state needs to be string').isString(),
    check('state', 'The state the length min 4').optional().isLength({min: 4}),
    check('city','Its necessary a city').not().isEmpty(),
    check('city', 'The city needs to be string').isString(),
    check('city', 'The city the length min 4').optional().isLength({min: 4}),
    check('email','Its necessary a correct email').isEmail(),
    check('password','The password need 6 characters min').isLength({ min: 6}),
    check('password', 'The password needs to be string').isString(),
    check('cell_phone','Its necessary a cellphone').isLength({ min: 10}),
    check('cell_phone','Total cell phone digits is 10').isLength({ max: 10}),
    check('cell_phone', 'The cell_phone needs to be number').isNumeric()
]

export const userUpdateValidation = [
    check('name', 'The name needs to be string').optional().isString(),
    check('name', 'The name the length min 5').optional().isLength({min: 5}),
    check('last_name', 'The last_name needs to be string').optional().isString(),
    check('last_name', 'The last_name the length min 5').optional().isLength({min: 5}),
    check('address', 'The address needs to be string').optional().isString(),
    check('address', 'The address the length min 5').optional().isLength({min: 5}),
    check('country', 'The country needs to be string').optional().isString(),
    check('country', 'The country the length min 5').optional().isLength({min: 5}),
    check('state', 'The state needs to be string').optional().isString(),
    check('state', 'The state the length min 5').optional().isLength({min: 5}),
    check('city', 'The city needs to be string').optional().isString(),
    check('city', 'The city the length min 5').optional().isLength({min: 5}),
    check('email','Its necessary a correct email').optional().isEmail(),
    check('password','The password need 6 characters min').optional().isLength({ min: 6}),
    check('password', 'The password needs to be string').optional().isString(),
    check('cell_phone','Its necessary a cellphone').optional().isLength({ min: 10}),
    check('cell_phone','Total cell phone digits is 10').optional().isLength({ max: 10}),
    check('cell_phone', 'The cell_phone needs to be number').optional().isNumeric()
]

export const userSigninValidation = [
    check('email','Its necessary a correct email').isEmail(),
    check('password','The password need 6 characters min').isLength({ min: 6}) 
]