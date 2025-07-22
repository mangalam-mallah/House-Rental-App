import Inquiry from "../models/inquiry.model.js";

const createInquiry = async (req, res) => {
  try {
    const { renterId, propertyId, message } = req.body;
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
    console.log("Error in create Inquiry controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getInquiryForProperty = async (req, res) => {
  try {
    const {propertyId} = req.params;
    const inquries = await Inquiry.find({propertyId})
    res.status(200).json({
        message : "Inquiry fetched",
        inquries
    })
  } catch (error) {
    console.log("Error in get Inquiry controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const approveInquiry = async (req, res) => {
    try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    );
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    console.log("Error in approve Inquiry controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const rejectInquiry = async (req, res) => {
    try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    console.log("Error in reject Inquiry controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createInquiry, getInquiryForProperty, approveInquiry, rejectInquiry };
