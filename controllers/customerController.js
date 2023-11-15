import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';

import User from '../models/user.js'
import Role from '../models/role.js'

import { badRequest, internalServerError, notFoundRequest, okRequest, preconditionRequiredRequest } from '../helper/handleResponse.js';
import parseMongoId from '../helper/parseMongoId.js';

export const signupCustomer = async(req,res)=> {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){ //Show error json body
        return badRequest(res,{msg: errors.array()})
    }
    
    const {email, password} = req.body;

    try{
        const role = await Role.findOne({name_role: "customer"})
        
        if(!role) { //Validate if the role exist
            return preconditionRequiredRequest(res,{msg: "Ejecuta el seeder antes de crear un nuevo usuario"})
        }
        
        let  user = await User.findOne({email}); //Validate if user exists
        
        if(user) {
            return badRequest(res, {msg: `El correo ${email} ya existe`})
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
            
            okRequest(res,{token})
        });

    }catch(error){
        console.log(error);
        internalServerError(res)
    }

}

export const updateCustomer = async(req,res) => {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){ //Show error json body
        return badRequest(res,{msg: errors.array()})
    }
    
    try{
        const {email, password} = req.body;
        const {id} = req.params
        
        const body = req.body
        
        if (!parseMongoId(id)) {
            return badRequest(res,"The id is not a uuid valid")
        }
        
        let user = await User.findById(id); //Validate if the user exist
        
        if (!user) {
            return notFoundRequest(res,{msg: "Usuario no existe"})
        }
        
        const emailExist = await User.findOne({email}) //Validate is the email is unique
        
        if (emailExist) {
            return badRequest(res,{msg: "Email ya existe"})
        }
        
        const newCustomer = body
        
        if (password){
            const salt = await bycrypt.genSalt(10);
            newCustomer.password = await bycrypt.hash(password,salt);
        }
        
        user = await User.findOneAndUpdate({_id : id}, newCustomer, {new: true}).select("-_id -role -__V");
        
        okRequest(res, user)
    }catch(error){
        console.log(error);
        internalServerError(res)
    }
}

export const deleteCustomer = async(req,res) => {    
    try{
        if (!parseMongoId(req.params.id)) {
            return badRequest(res,{msg: "The id is not a uuid valid"})
        }
        const user = await User.findById(req.params.id);

        if (!user || user == null){
            return notFoundRequest(res, {msg: "Usuario no encontrado"})
        }
        
        user.delete()
        
        okRequest(res,{msg: "Eliminado exitosamente"})
    }catch(error){
        console.log(error);
        internalServerError(res)
    }
}
