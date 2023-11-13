import User from '../models/user.js'
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';


export const signupCustomer = async(req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body;

    try{
        let  user = await User.findOne({email});

        if(user) {
            return res.status(400).json({errors: "The user is allready create"});
        }

        user = new User(req.body);

        const salt = await bycrypt.genSalt(10);
        user.password = await bycrypt.hash(password,salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, "User", {
        }, (error, token) => {
            if(error) throw error;

            res.json({token});
        });

    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }

}

export const signinCustomer = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg: 'The user does not exist'});
        }

        const passCorrect = await bycrypt.compare(password, user.password);
        if(!passCorrect){
            return res.status(400).json({msg: 'Password Incorrect'});
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, "User",{}, (error, token) => {
            if(error) throw error;

            res.json({token});
        });
    }catch(error){
        console.log(error);
        res.state(400).send(error)
    }
}

export const updateCustomer = async(req,res) => {
    try{
        const {name, last_name} = req.body;
        let user = await User.findById(req.user);
        const newCustomer = {}
        newCustomer.name = name;
        newCustomer.last_name = last_name;
        user = await User.findOneAndUpdate({_id : req.user}, newCustomer, {new: true});
        res.send(user);

    }catch(error){
        console.log(error);
        res.state(400).send(error)
    }
}

export const getCustomer = async(req,res) => {
    try{
        let user = await User.findById(req.user);
        res.send(user);
    }catch(error){
        console.log(error);
        res.state(400).send(error);
    }
}

export const deleteCustomer = async(req,res) => {
    try{
        let user = await User.findById(req.params.id);

        if (!user){
            return res.status(401).json({error: 'Doesnt exist the user'})
        }

        await User.findOneAndRemove({_id: req.params.id});
        res.send("It´s deleted");
    }catch(error){
        console.log(error);
        res.state(400).send(error);
    }
}
