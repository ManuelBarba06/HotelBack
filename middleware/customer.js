import jwt from 'jsonwebtoken'

export default function(req, res, next){
    const token = req.header('x-auth-token');


    if (!token) {
        return res.status(401).json({msg: 'There is no token'})
    }


    try{
        const cifrado = jwt.verify(token, "Customer");
        req.customer = cifrado.customer.id;
        next();

    }catch(error){
        res.status(401).json({msg: 'Token no valid'});
    }
}