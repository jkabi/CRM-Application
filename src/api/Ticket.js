import axios from "axios";

const base_Url = process.env.REACT_APP_SERVER_URL;
export async function getallticket(data) {
  return await axios.get(`${base_Url}/crm/api/v1/tickets`, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  });
}
export async function countofticket(data) {
  return await axios.get(`${base_Url}/crm/api/v1/tickets`, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  });
}
