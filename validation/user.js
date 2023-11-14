import { check } from "express-validator";

export const userValidation = [
    check('name', 'Its necessary a name').not().isEmpty(),
    check('last_name', 'Its necessary a last name').not().isEmpty(),
    check('address','Its necessary a addres').not().isEmpty(),
    check('country','Its necessary a country').not().isEmpty(),
    check('state','Its necessary a state').not().isEmpty(),
    check('city','Its necessary a city').not().isEmpty(),
    check('email','Its necessary a correct email').isEmail(),
    check('password','The password need 6 characters min').isLength({ min: 6}),
    check('cell_phone','Its necessary a cellphone').isLength({ min: 10})
]