import User from '../models/user.js'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';
import { badRequest, internalServerError, notFoundRequest, okRequest } from '../helper/handleResponse.js';


export const signinCustomer = async(req,res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){ //Show error json body
        return badRequest(res,{msg: errors.array()})
    }

    const {email, password} = req.body;

    try{ //Validate email and password
        let user = await User.findOne({email});
        if(!user) {
            return badRequest(res, {
                msg: "Correo o contraseña incorrecta"
            })
        }

        const passCorrect = await bycrypt.compare(password, user.password);
        if(!passCorrect){
            return badRequest(res, {
                msg: "Correo o contraseña incorrecta"
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        
        
        jwt.sign(payload, process.env.SECRET_KEY, {
        },(error, token) => {
            if(error) throw error;

            okRequest(res,{
                token
            })
        });
        
    }catch(error){
        console.log(error);
        internalServerError(res)
    }
}

export const getUser = async(req,res) => {
    try{
        let user = await User.findById(req.user);
        
        if (!user) {
            notFoundRequest(res,'Usuario no encontrado')
        }
        
        okRequest(res, user)
    }catch(error){
        console.log(error);
        res.state(400).send(error);
    }
}


