const Position = require('../models/position');
const {validationResult} = require('express-validator');

exports.createPosition = async(req,res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        let position = new Position(req.body);
        await position.save();
        res.json({msg: "The position was created"});
    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
}