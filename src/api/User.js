import axios from "axios";
const base_Url = process.env.REACT_APP_SERVER_URL;
export async function getalluser(data) {
  return await axios.get(`${base_Url}/crm/api/v1/users`, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  });
}
