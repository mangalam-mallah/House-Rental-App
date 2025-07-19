import User from "../models/user.model.js"

const auth = (role = 'renter') => {
  return async(req, res, next) => {
    try {
      const user = await User.findOne({role});
      if(!user){
        return res.status(404).json({message : `No user found with role ${role}`})
      }
      req.user = {
        _id : user._id,
        name : user.name,
        email : user.email,
        role : user.role
      }
      next();
    } catch (error) {
      console.log("Error in auth middleware", error.message)
      res.status(500).json({message : "Internal Server Error"})
    }
  }
}

export default auth;
