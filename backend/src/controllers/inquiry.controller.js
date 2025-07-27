import Inquiry from "../models/inquiry.model.js";
import Property from "../models/property.model.js";
import mongoose from "mongoose";

const createInquiry = async (req, res) => {
  try {
    if (req.user.role !== "renter") {
      return res
        .status(403)
        .json({ message: "Only renters can create inquiries" });
    }

    const renterId = req.user.id;
    const { propertyId, message } = req.body;

    if (!propertyId || !message) {
      return res
        .status(400)
        .json({ message: "Property ID and message are required" });
    }

    const objectPropertyId = new mongoose.Types.ObjectId(propertyId);

    const inquiry = await Inquiry.create({
      renterId,
      propertyId: objectPropertyId, 
      message,
      status: "pending",
    });

    res.status(201).json({
      message: "Inquiry created",
      inquiry,
    });
  } catch (error) {
    console.log("Error in createInquiry controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

 const getInquiriesForOwner = async (req, res) => {
  try {
    const ownerId = req.user.id;
    // console.log("Owner ID:", ownerId);
    const properties = await Property.find({ ownerId: ownerId }).select("_id title");
    // console.log("Properties owned by this owner:", properties);
    const propertyIds = properties.map((prop) => prop._id);
    // console.log("📦 Property IDs extracted:", propertyIds);
    const inquiries = await Inquiry.find({ propertyId: { $in: propertyIds } })
      .populate("propertyId", "title")
      .populate("renterId", "name email")
      .sort({ timestamp: -1 });
    // console.log("📬 Inquiries fetched for owner's properties:", inquiries);
    res.status(200).json({
      message: "Inquiries fetched",
      inquiries,
    });
  } catch (error) {
    console.error("❌ Error in getInquiriesForOwner:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const approveInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found." });
    }

    const property = await Property.findById(inquiry.propertyId);
    if (!property || property.ownerId.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to approve this inquiry." });
    }

    inquiry.status = "approved";
    await inquiry.save();

    res.status(200).json({
      message: "Inquiry approved",
      inquiry,
    });
  } catch (error) {
    console.log("Error in approveInquiry controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const rejectInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found." });
    }

    const property = await Property.findById(inquiry.propertyId);
    if (!property || property.ownerId.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to reject this inquiry." });
    }

    inquiry.status = "rejected";
    await inquiry.save();

    res.status(200).json({
      message: "Inquiry rejected",
      inquiry,
    });
  } catch (error) {
    console.log("Error in reject Inquiry controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createInquiry, getInquiriesForOwner, approveInquiry, rejectInquiry };
