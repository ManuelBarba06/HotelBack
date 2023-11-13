import { validationResult } from 'express-validator';

import Role from '../models/role.js';
import {rolesData} from '../data/rolesData.js';
import { internalServerError, okRequest } from '../helper/handleResponse.js';

export const createRole = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        let position = new Role(req.body);
        await position.save();
        res.json({msg: "The position was created"});
    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
}

export const seederRole = async(req,res) => {
    try {
        
        await Role.deleteMany();
        
        await Role.insertMany(rolesData)
        
        okRequest(res, 'El seeder fue ejecutado exitosamente')
        
    }catch(error) {
        console.log(error)
        internalServerError(res)
    }
}