// services/inquiryService.js
import axios from "axios";

export const getInquiriesByPropertyId = async (propertyId) => {
  const res = await axios.get(`/api/inquiries/${propertyId}`);
  return res.data.inquries; // or `res.data.inquiries` if you renamed it
};
