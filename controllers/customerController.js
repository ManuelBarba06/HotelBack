const Customer = require('../models/customer');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const customer = require('../models/customer');

exports.signupCustomer = async(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body;

    try{
        let customer = await Customer.findOne({email});

        if(customer) {
            return res.status(400).json({errors: "The customer is allready create"});
        }

        customer = new Customer(req.body);

        const salt = await bycrypt.genSalt(10);
        customer.password = await bycrypt.hash(password,salt);

        await customer.save();

        const payload = {
            customer: {
                id: customer.id
            }
        }

        jwt.sign(payload, "Customer", {
        }, (error, token) => {
            if(error) throw error;

            res.json({token});
        });

    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }

}

exports.signinCustomer = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try{
        let customer = await Customer.findOne({email});
        if(!customer) {
            return res.status(400).json({msg: 'The customer does not exist'});
        }

        const passCorrect = await bycrypt.compare(password, customer.password);
        if(!passCorrect){
            return res.status(400).json({msg: 'Password Incorrect'});
        }

        const payload = {
            customer: {
                id: customer.id
            }
        };

        jwt.sign(payload, "Customer",{}, (error, token) => {
            if(error) throw error;

            res.json({token});
        });
    }catch(error){
        console.log(error);
        res.state(400).send(error)
    }
}

exports.updateCustomer = async(req,res) => {
    try{
        const {name, last_name} = req.body;
        let customer = await Customer.findById(req.customer);
        const newCustomer = {}
        newCustomer.name = name;
        newCustomer.last_name = last_name;
        customer = await Customer.findOneAndUpdate({_id : req.customer}, newCustomer, {new: true});
        res.send(customer);

    }catch(error){
        console.log(error);
        res.state(400).send(error)
    }
}

exports.getCustomer = async(req,res) => {
    try{
        let customer = await Customer.findById(req.customer);
        res.send(customer);
    }catch(error){
        console.log(error);
        res.state(400).send(error);
    }
}

exports.deleteCustomer = async(req,res) => {
    try{
        let customer = await Customer.findById(req.params.id);

        if (!customer){
            return res.status(401).json({error: 'Doesnt exist the customer'})
        }

        await Customer.findOneAndRemove({_id: req.params.id});
        res.send("It´s deleted");
    }catch(error){
        console.log(error);
        res.state(400).send(error);
    }
}
