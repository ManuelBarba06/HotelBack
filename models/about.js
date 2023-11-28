import mongoose from 'mongoose'

const AboutSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: 
    [   
        {
            type: String,
            require: true,
            trim: true
        }
    ]
})

export default mongoose.model('About', AboutSchema)