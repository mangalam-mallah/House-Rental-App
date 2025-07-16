import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
        },
        password : {
            type : String,
            required : [true, "Password is required"],
            minlength : 6
        },
        role : {
            type : String,
            enum : ['renter', 'owner'],
            required : true,
        },
        isApproved : {
            type : Boolean,
            default : false,
        }
    },
    {
        timestamps : true
    }
)

export default mongoose.model("User", userSchema)