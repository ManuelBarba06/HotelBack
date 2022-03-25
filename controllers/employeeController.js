const Employee =  require('../models/employee');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.signupEmployee = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try{
        let employee = await Employee.findOne({email});

        if(employee){
            return res.status(400).json({error: "The employee is allready create"});
        }

        employee = new Employee(req.body);
        
        const salt = await bycrypt.genSalt(10);
        employee.password = await bycrypt.hash(password,salt);

        await employee.save();

        const payload = {
            employee: {
                id: employee.id
            }
        }
        
        jwt.sign(payload, "Employee",{},
        (error, token) => {
            if(error) throw error;
            res.json({token});
        })
    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
}
