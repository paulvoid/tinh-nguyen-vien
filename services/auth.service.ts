import axios from "axios";

import { setCookie } from "cookies-next";
const API_URL = "http://localhost:3000/api/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        return response
      });
  }
  register(name: string, email: string, password: string) {
    return axios
      .post(API_URL + "register", {
        name,
        email,
        password,
      })
      .then((response) => {
        return response
      });
  }
  logout() {
    return axios.get(API_URL + "user/logout").then((response) => {
      return response
    });
  }
}
export default new AuthService();
