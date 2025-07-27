import axiosInstance from './axiosInstance';

export const getAllOwnerInquiries = async () => {
  try {
    const res = await axiosInstance.get("/inquiry/owner");
    return res.data;
  } catch (error) {
    console.error("Error while fetching all owner inquiries", error);
    throw error;
  }
};

export const createInquiry = async (data) => {
  try {
    const res = await axiosInstance.post('/inquiry', data)
    return res.data;
  } catch (error) {
    console.error("Error while creating inquiry", error);
    throw error;
  }
}

export const approveInquiry = async (id) => {
  try {
    const res = await axiosInstance.put(`/inquiry/approve/${id}`)
    return res.data;
  } catch (error) {
    console.error("Error while approving inquiry", error);
    throw error;
  }
}

export const rejectInquiry = async (id) => {
  try {
    const res = await axiosInstance.put(`/inquiry/reject/${id}`)
    return res.data;
  } catch (error) {
    console.error("Error while rejecting inquiry", error);
    throw error;
  }
}
