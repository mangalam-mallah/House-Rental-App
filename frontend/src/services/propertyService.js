const API = '/api/property';

export const getAllProperties = async () => {
  const res = await fetch(API);
  return res.json();
};

export const getPropertyById = async (id) => {
  const res = await fetch(`${API}/${id}`);
  return res.json();
};
