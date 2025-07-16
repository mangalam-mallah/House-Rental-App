import mongoose,{Schema} from "mongoose";

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
        }
    },
    {
        timestamps : true,
    })

export default mongoose.model("Inquiry", inquirySchema)