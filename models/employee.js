const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    address_name:{
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city:{
        type: String,
        required: true,
        trim: true
    }
})


const EmployeeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    address: AddressSchema,
    id_position: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Position'
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Employee', EmployeeSchema)