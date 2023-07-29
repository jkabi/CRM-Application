import axios from "axios";

const base_Url = process.env.REACT_APP_SERVER_URL;

export async function signupdata(data) {
  return await axios.post(`${base_Url}/crm/api/v1/auth/signup`, data);
}
export async function signindata(data) {
  return await axios.post(`${base_Url}/crm/api/v1/auth/signin`, data);
}
