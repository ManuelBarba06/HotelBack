import jwt from 'jsonwebtoken'
import { unauthorizedRequest } from '../helper/handleResponse.js';

export default function(req, res, next){
    const {authorization} = req.headers;
    
    try{
        
    if (!authorization) { // Check if the token is correct
        return unauthorizedRequest(res,"It's necessary a token")
    }
    
    const token = authorization.replace('Bearer ', '');
    
    const encryption = jwt.verify(token, process.env.SECRET_KEY);

    req.customer = encryption.user.id;
    next();

    }catch(error){
        res.status(401).json({msg: 'Token no valid'});
    }
}