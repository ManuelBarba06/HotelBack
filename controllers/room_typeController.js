import Room_type from '../models/room_type.js'

import { room_typeData } from '../data/room_typeData.js';

import { internalServerError, okRequest, preconditionRequiredRequest, badRequest } from '../helper/handleResponse.js';
import parseMongoId from '../helper/parseMongoId.js';


export const getAllRoom_type = async(req,res) => {
    try{
        
        const room_type = await Room_type.find().select("-__v")
        
        if(!room_type) { //Validate if the role exist
            return preconditionRequiredRequest(res,{msg: "Ejecuta el seeder antes de crear un nuevo usuario"})
        }
        
        okRequest(res,room_type)
        
    }catch(error) {
        console.log(error)
        internalServerError(res)
    }
}

export const getOneRoom_type = async(req,res) => {
    const {id} = req.params
    
    try{
        
        if (!parseMongoId(id)) {
            return badRequest(res,"The id is not a uuid valid")
        }
        
        const room_type = await Room_type.findById(id).select("-__v")
        
        okRequest(res,room_type)
        
    }catch(error) {
        console.log(error)
        internalServerError(res)
    }
}

export const seederRoom_type = async(req,res) => {
    try {
        
        await Room_type.deleteMany();
        
        await Room_type.insertMany(room_typeData)
        
        okRequest(res, 'El seeder fue ejecutado exitosamente')
        
    }catch(error) {
        console.log(error)
        internalServerError(res)
    }
}