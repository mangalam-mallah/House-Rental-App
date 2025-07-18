import User from "../models/user.model.js";

const checkAuth = async (req, res, next) => {
  try {
    const mockUserId = "687a3005952827728a758f25";
    const user = await User.findById(mockUserId).select("-password");

    if (!user || user.role !== "owner") {
      return res.status(403).json({message:"Mock user is not a valid owner. Please check the ID in mockAuth.js",});
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in mockAuth middleware: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default checkAuth;
