import axiosInstance from "./axiosInstance";


export const loginUser = async (credentials) => {
  const res = await axiosInstance.post("/users/login", credentials);

  const { accessToken, user } = res.data;

  if (accessToken && user) {
    // ✅ Store accessToken under "token"
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    console.warn("Missing accessToken or user in response");
  }

  return res.data;
};

export const registerUser = async (data) => {
  const res = await axiosInstance.post("/users/signup", data);
  return res.data;
};
