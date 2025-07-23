// src/services/propertyService.js

export const getAllProperties = async () => {
  try {
    const res = await fetch("/api/property");
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching properties:", err.message);
    throw err;
  }
};

export const getPropertyById = async (id) => {
  try {
    const res = await fetch(`/api/property/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch property");
    }
    return await res.json();
  } catch (err) {
    console.error("Error fetching property:", err.message);
    throw err;
  }
};
