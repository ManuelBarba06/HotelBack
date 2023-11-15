import mongoose from "mongoose";

const parseMongoId = (id) => {
    if (!mongoose.isValidObjectId(id)){
        return false
    }
    return true
}

export default parseMongoId