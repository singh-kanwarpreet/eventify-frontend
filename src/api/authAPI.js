import axios from "./axios";

export const loginUser = async (credentials) => {
  const res = await axios.post("auth/user/login", credentials);
  return res.data;
};

export const signUpUser = async (userInfo) => {
  const res = await axios.post("auth/user/signUp", userInfo);
  return res.data;
}

