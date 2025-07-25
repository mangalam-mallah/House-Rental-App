import axiosInstance from './axiosInstance';

// ✅ Public: Get all properties
export const getAllProperties = async () => {
  try {
    const res = await axiosInstance.get("/property");
    return res.data;
  } catch (err) {
    console.error("Error fetching properties:", err.message);
    throw err;
  }
};

// ✅ Public: Get property by ID
export const getPropertyById = async (id) => {
  try {
    const res = await axiosInstance.get(`/property/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching property:", err.message);
    throw err;
  }
};

// ✅ Private: Get properties added by the logged-in owner
export const fetchOwnerProperties = async () => {
  try {
    const res = await axiosInstance.get("/property/my-properties");
    return res.data;
  } catch (err) {
    console.error("Error fetching owner properties:", err.message);
    throw err;
  }
};

// ✅ Private: Create new property (multipart/form-data)
export const createProperty = async (formData) => {
  try {
    const res = await axiosInstance.post("/property", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Error creating property:", err.message);
    throw err;
  }
};

// ✅ Private: Update property (multipart/form-data)
export const updateProperty = async (id, formData) => {
  try {
    const res = await axiosInstance.put(`/property/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Error updating property:", err.message);
    throw err;
  }
};

// ✅ Private: Delete property by ID
export const deleteProperty = async (id) => {
  try {
    const res = await axiosInstance.delete(`/property/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting property:", err.message);
    throw err;
  }
};
