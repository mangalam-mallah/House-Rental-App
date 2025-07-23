import Inquiry from "../models/inquiry.model.js";
import Property from "../models/property.model.js";

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

    const inquiry = await Inquiry.create({
      renterId,
      propertyId,
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

const getInquiryForProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const inquries = await Inquiry.find({ propertyId });
    res.status(200).json({
      message: "Inquiry fetched",
      inquries,
    });
  } catch (error) {
    console.log("Error in get Inquiry controller: ", error);
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

export { createInquiry, getInquiryForProperty, approveInquiry, rejectInquiry };
