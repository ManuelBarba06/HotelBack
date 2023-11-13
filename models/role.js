import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    name_role: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    permissions: [{
        type: String,
        required: true,
    }]
})

export default mongoose.model('role', RoleSchema);