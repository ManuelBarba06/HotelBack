import { validationResult } from 'express-validator';

import About from '../models/about.js'

import { internalServerError, okRequest, preconditionRequiredRequest } from '../helper/handleResponse.js';

import {aboutData} from '../data/aboutData.js'

export const getAbout = async(req,res) => {
    try{
        
        const about = await About.findOne().select("-_id -__v")
        
        if(!about) { //Validate if the role exist
            return preconditionRequiredRequest(res,{msg: "Ejecuta el seeder antes de crear un nuevo usuario"})
        }
        
        okRequest(res,about)
        
    }catch(error) {
        console.log(error)
        internalServerError(res)
    }
}

export const seederAbout = async(req,res) => {
    try {
        
        await About.deleteMany();
        
        await About.insertMany(aboutData)
        
        okRequest(res, 'El seeder fue ejecutado exitosamente')
        
    }catch(error) {
        console.log(error)
        internalServerError(res)
    }
}