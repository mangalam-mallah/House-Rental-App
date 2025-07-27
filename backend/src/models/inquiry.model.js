import mongoose,{Schema} from "mongoose";
import User from './user.model.js'
import Property from './property.model.js'

const inquirySchema = new Schema(
    {
        renterId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        propertyId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Property",
            required : true,
        },
        message : {
            type : String,
            required : true
        },
        status : {
            type : String,
            enum : ["pending", "approved", "rejected"],
            default : "pending"
        }
    },
    {
        timestamps : true,
    })

export default mongoose.model("Inquiry", inquirySchema)