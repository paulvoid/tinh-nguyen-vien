import {getCookie,setCookie} from "cookies-next";
import axios from "axios";

const API_URL = "http://localhost:3000/api/user/";

class UserService{
  getUserInfo() {
    return axios
      .get(API_URL + "get-info", {
        headers: {
          Authorization: "Bearer " + getCookie('token'),
        },
      })
      .then((response) => {
        return response;
      });
  }
}

export default new UserService();