import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';

import User from '../models/user.js'
import Role from '../models/role.js'
import { badRequest, preconditionRequiredRequest } from '../helper/handleResponse.js';

export const signupCustomer = async(req,res)=> {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {email, password} = req.body;

    try{
        const role = await Role.findOne({name_role: "customer"})
        
        if(!role) { //Validate if the role exist
            return preconditionRequiredRequest(res,"Ejecuta el seeder antes de crear un nuevo usuario")
        }
        
        let  user = await User.findOne({email}); //Validate if user exists
        
        if(user) {
            return badRequest(res,"Ese usuario ya existe")
        }
        
        req.body.role = role._id //Add the role
        
        user = new User(req.body);
        
        const salt = await bycrypt.genSalt(10);
        user.password = await bycrypt.hash(password,salt);
        
        await user.save();
        
        const payload = {
            user: {
                id: user.id
            }
        }
        
        jwt.sign(payload, process.env.SECRET_KEY, {
        }, (error, token) => {
            if(error) throw error;
            
            res.json({token});
        });

    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }

}