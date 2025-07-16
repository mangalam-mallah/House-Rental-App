import mongoose, {Schema} from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
            trim : true
        },
        location : {
            type : String,
            required : true
        },
        rent : {
            type : String,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        image : {
            type : String // Cloudinary or multer
        },
        ownerId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : User,
            required : true
        }
    },
    {
        timestamps : true,
    }
)

export default mongoose.model("Property", propertySchema)