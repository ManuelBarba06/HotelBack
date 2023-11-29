import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const Room_TypeSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    image_url: [
        {
        type: String,
        require: true,
        trim: true
        }
    ]
})

Room_TypeSchema.plugin(mongoose_delete, {overrideMethods: true})

export default mongoose.model('Room_type', Room_TypeSchema)