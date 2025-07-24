  import Property from "../models/property.model.js";
  import cloudinary from "../utils/cloudinary.js";

  const createProperty = async (req, res) => {
    try {
      if (req.user.role !== "owner") {
        return res
          .status(403)
          .json({ message: "Forbidden: Only owners can create properties." });
      }
      const { title, location, rent, description, image, bedroom, bathroom } = req.body;

      if (!title || !location || !rent || !description) {
        return res
          .status(400)
          .json({ message: "All fields except image are required" });
      }

      let imageURL;
      if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const result = await cloudinary.uploader.upload(dataURI);
        imageURL = result.secure_url;
      }

      const ownerId = req.user.id

      const property = await Property.create({
        title,
        location,
        rent,
        description,
        image: imageURL,
        ownerId,
        bedroom,
        bathroom
      });

      res.status(201).json({
        message: "Property created successfully",
        property,
      });
    } catch (err) {
      console.log("Error in create Property controller: ", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getAllProperties = async (req, res) => {
    try {
      const properties = await Property.find().populate("ownerId", "name email");
      res.status(200).json(properties);
    } catch (err) {
      console.log("Erro in get Property controller: ", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getPropertyById = async (req, res) => {
    try {
      const property = await Property.findById(req.params.id).populate(
        "ownerId",
        "name email"
      );
      if (!property)
        return res.status(404).json({ message: "Property not found" });

      res.status(200).json(property);
    } catch (err) {
      console.log("Erro in getPropertyById controller: ", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const updateProperty = async (req, res) => {
    try {
      const userRole = req.user?.role || req.body.role;
      if (userRole !== "owner") {
        return res.status(403).json({ message: "Only owners can perform this action" });
      }

      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      if (property.ownerId.toString() !== req.user.id.toString()) {
        return res
          .status(403)
          .json({ message: "Forbidden: You do not own this property." });
      }

      const { title, location, rent, description, bedroom, bathroom } = req.body;
      if (title) property.title = title;
      if (location) property.location = location;
      if (rent) property.rent = rent;
      if (description) property.description = description;
      if (bedroom) property.bedroom = bedroom;
      if (bathroom) property.bathroom = bathroom;

      if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await cloudinary.uploader.upload(dataURI);
        property.image = result.secure_url;
      }

      const updatedProperty = await property.save();

      res.status(200).json({
        message: "Property updated successfully",
        property: updatedProperty,
      });
    } catch (err) {
      console.log("Error in updateProperty controller: ", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const deleteProperty = async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
      if (!property)
        return res.status(404).json({ message: "Property not found" });

      await property.deleteOne();

      res.status(200).json({ message: "Property deleted successfully" });
    } catch (err) {
      console.log("Erro in delete Property controller: ", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const getMyProperties = async (req, res) => {
    try {
      if (req.user.role !== "owner") {
        return res.status(403).json({ message: "Only owners can view their properties" });
      }

      const properties = await Property.find({ ownerId: req.user.id }).populate(
        "ownerId",
        "name email"
      );

      // console.log(properties)

      res.status(200).json(properties);
    } catch (err) {
      console.log("Error in getMyProperties controller: ", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  export {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    getMyProperties
  };
